import axios from 'axios';

// Performance: Cache API base URL
const API_BASE_URL = import.meta.env.VITE_API_URL;

if (!API_BASE_URL) {
  console.error("FATAL ERROR: VITE_API_URL is not defined! Please check your .env file.");
}

// Performance: Create axios instance with caching headers
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  // Performance: Add timeout to prevent hanging requests
  timeout: 15000,
});

// Performance: Cache for subscription status (5 minutes)
let subscriptionCache = {
  data: null,
  timestamp: 0,
  ttl: 5 * 60 * 1000, // 5 minutes
};

// Performance: Lazy load Stripe only when needed
// let stripePromise = null;
// const getStripe = async () => {
//   if (!stripePromise) {
//     const { loadStripe } = await import('@stripe/stripe-js');
//     stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);
//   }
//   return stripePromise;
// };

// Add auth token to requests if available
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('authToken');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  
  // Performance: Add cache control headers for GET requests
  if (config.method === 'get') {
    config.headers['Cache-Control'] = 'max-age=300'; // 5 minutes
  }
  
  return config;
});

// Performance: Add response caching interceptor
api.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error('API Error:', error.message);
    return Promise.reject(error);
  }
);

// --- Helper to load Razorpay script ---
const loadRazorpayScript = () => {
  return new Promise((resolve) => {
    const script = document.createElement('script');
    script.src = 'https://checkout.razorpay.com/v1/checkout.js';
    script.onload = () => {
      resolve(true);
    };
    script.onerror = () => {
      resolve(false);
    };
    document.body.appendChild(script);
  });
};


export const paymentService = {
  /**
   * Create a checkout session and redirect to the appropriate gateway.
   * @param {string} plan - The plan name (e.g., 'basic')
   * @param {string} billingPeriod - 'monthly' or 'annual'
   * @param {string|null} userEmail - The logged-in user's email, if available
   */
  async createCheckoutSession(plan, billingPeriod, userEmail = null) {
    try {
      // 1. Detect user's country (simple example using a free API)
      let country = 'US'; // Default
      try {
        const geoRes = await axios.get('https://ipapi.co/json/');
        if (geoRes.data && geoRes.data.country_code) {
          country = geoRes.data.country_code;
        }
      } catch (geoError) {
        console.warn("Could not detect country, defaulting to US.", geoError);
      }

      // 2. Call the unified backend endpoint
      const response = await api.post('/create-checkout-session', {
        plan: plan.toLowerCase(),
        billing_period: billingPeriod,
        success_url: `${window.location.origin}/payment/success`,
        cancel_url: `${window.location.origin}/pricing`,
        user_email: userEmail,
        country: country, // Pass the detected country
      });

      // 3. Handle the response based on the gateway
      if (response.data.checkout_url) {
        // This is a Stripe response, redirect to Stripe
        window.location.href = response.data.checkout_url;
      } else if (response.data.order_id) {
        // This is a Razorpay response, open the Razorpay checkout
        const razorpayLoaded = await loadRazorpayScript();
        if (!razorpayLoaded) {
          throw new Error('Could not load Razorpay checkout.');
        }

        const options = {
          key: response.data.key_id,
          amount: response.data.amount,
          currency: response.data.currency,
          name: "Maya Agent",
          description: `Purchase of ${plan} plan`,
          order_id: response.data.order_id,
          handler: function (res) {
            // On successful payment, redirect to your success page
            // You can also verify the payment signature here on the frontend
            // before redirecting, but server-side verification via webhook is more secure.
            window.location.href = `${window.location.origin}/payment/success?razorpay_payment_id=${res.razorpay_payment_id}`;
          },
          prefill: {
            email: userEmail,
          },
          notes: {
            plan: plan,
          },
          theme: {
            color: "#667eea"
          }
        };
        const rzp = new window.Razorpay(options);
        rzp.open();
      } else {
        throw new Error('Invalid response from payment server');
      }
    } catch (error) {
      console.error('Error creating checkout session:', error);
      throw error;
    }
  },

  /**
   * Cancel user's subscription
   * Performance: Clear cache after cancellation
   */
  async cancelSubscription() {
    try {
      const response = await api.post('/cancel-subscription');
      
      // Performance: Clear subscription cache
      subscriptionCache.data = null;
      subscriptionCache.timestamp = 0;
      
      return response.data;
    } catch (error) {
      console.error('Error cancelling subscription:', error);
      throw error;
    }
  },
  
  /**
   * Clear subscription cache manually
   */
  clearCache() {
    subscriptionCache.data = null;
    subscriptionCache.timestamp = 0;
  },
};

export default paymentService;