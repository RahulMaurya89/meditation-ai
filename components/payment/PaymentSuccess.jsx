import React, { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
// No service is needed here anymore for basic success display
import './PaymentSuccess.css';

const PaymentSuccess = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [status, setStatus] = useState('verifying');
  const [message, setMessage] = useState('Verifying your payment...');
  
  useEffect(() => {
    const stripeSessionId = searchParams.get('session_id');
    const razorpayPaymentId = searchParams.get('razorpay_payment_id');
    
    // The backend webhook is the source of truth for activating a subscription.
    // The frontend just needs to know if a payment process was started successfully.
    if (stripeSessionId || razorpayPaymentId) {
      setStatus('success');
      setMessage('Payment successful! Your subscription is being activated.');
      
      // Redirect to dashboard after 3 seconds
      setTimeout(() => {
        window.location.href = '/maya-api/dashboard/';
      }, 5000);
    } else {
      setStatus('error');
      setMessage('Invalid payment details found.');
    }
  }, [searchParams, navigate]);

  // The verifyPayment function is removed as verification is now handled
  // reliably by backend webhooks for both Stripe and Razorpay.

  return (
    <div className="payment-success-container">
      <div className="payment-success-card">
        {status === 'verifying' && (
          <>
            <div className="spinner"></div>
            <h2>Processing...</h2>
            <p>{message}</p>
          </>
        )}
        
        {status === 'success' && (
          <>
            <div className="success-icon">
              <svg width="64" height="64" viewBox="0 0 64 64" fill="none">
                <circle cx="32" cy="32" r="32" fill="#10B981"/>
                <path d="M20 32L28 40L44 24" stroke="white" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <h2>Payment Successful!</h2>
            <p>{message}</p>
            <p className="redirect-message">Redirecting to your dashboard...</p>
          </>
        )}
        
        {status === 'error' && (
          <>
            <div className="error-icon">
              <svg width="64" height="64" viewBox="0 0 64 64" fill="none">
                <circle cx="32" cy="32" r="32" fill="#EF4444"/>
                <path d="M40 24L24 40M24 24L40 40" stroke="white" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <h2>Payment Failed</h2>
            <p>{message}</p>
            <button onClick={() => navigate('/pricing')} className="btn-primary">
              Back to Pricing
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default PaymentSuccess;