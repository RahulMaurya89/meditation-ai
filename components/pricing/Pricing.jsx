import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; // 1. Import the useNavigate hook
import './Pricing.css';
import stripeService from '../../services/stripeService';

const Pricing = () => {
  const navigate = useNavigate(); // 2. Initialize the navigate function
  const [isAnnual, setIsAnnual] = useState(false);
  const [loading, setLoading] = useState(false);
  const [userSubscription, setUserSubscription] = useState(null);
  const [error, setError] = useState(null);

  const plans = [
    {
      name: "Free Trial",
      id: "free",
      badge: "Try it free",
      price: { monthly: 0, annual: 0 },
      period: "forever",
      buttonText: "Start Free",
      buttonClass: "btn-primary",
      disabled: false,
      extraCredits: { monthly: 1900, annual: 1900 },
      features: [
        { text: "5 minutes daily meditation", included: true },
        { text: "Basic guided sessions", included: true, highlight: true },
        { text: "Breathing exercises", included: true, badge: "" },
        { text: "Sleep sounds library", included: true },
      ]
    },
    {
      name: "Mindful Plan",
      id: "MayaX",
      badge: "Most Popular",
      price: { monthly: 1, annual: 17 },
      period: "day",
      buttonText: "Begin Journey",
      buttonClass: "btn-primary",
      disabled: false,
     
      features: [
        { text: "Unlimited meditation sessions", included: true },
        { text: "Personalized voice guidance", included: true, highlight: true },
        { text: "AI-adaptive meditation programs", included: true, badge: "" },
        { text: "Sleep stories & soundscapes", included: true },
        { text: "Stress relief & anxiety programs", included: true },
        { text: "Progress tracking & insights", included: true },
      ]
    },
    
  ]

  // Fetch user's current subscription status on mount
  // useEffect(() => {
  //   fetchSubscriptionStatus()
  // }, [])

  // const fetchSubscriptionStatus = async () => {
  //   try {
  //     const status = await stripeService.getSubscriptionStatus()
  //     if (status) {
  //       setUserSubscription(status)
  //     }
  //   } catch (error) {
  //     console.error('Error fetching subscription:', error)
  //   }
  // }

  const handleGetStarted = async (plan) => {
    // Reset error state
    setError(null)
    
    // Don't process if plan is disabled
    if (plan.disabled) {
      return
    }

    // If it's the free plan, scroll to auth section
    if (plan.id === 'free') {
      const authSection = document.getElementById('auth');
      if (authSection) {
        authSection.scrollIntoView({ behavior: 'smooth' });
      }
      return
    }

    // If it's enterprise plan, open email client
    if (plan.id === 'advanced') {
      window.location.href = 'mailto:heymaya@mayaagent.ai?subject=Enterprise%20Plan%20Inquiry&body=Hi%20Maya%20Team%2C%0A%0AI%27m%20interested%20in%20learning%20more%20about%20your%20Enterprise%20%26%20Custom%20Plans.%0A%0APlease%20contact%20me%20for%20a%20discovery%20call.%0A%0AThank%20you!';
      return
    }

    // Check if user is already on this plan
    if (userSubscription?.plan === plan.id.toLowerCase()) {
      alert(`You are already subscribed to the ${plan.name} plan!`)
      return
    }

    // For any paid, non-enterprise plan
    if (plan.id === 'basic' || plan.id === 'MayaX') {
      try {
        setLoading(true);
        // Determine billing period based on plan and toggle
        let billingPeriod = 'monthly'; // Default
        if (plan.id === 'basic') {
          billingPeriod = isAnnual ? 'annual' : 'monthly';
        } else if (plan.id === 'MayaX') {
          // MayaX has a daily period as per the plan object
          billingPeriod = 'daily'; 
        }
        
        await stripeService.createCheckoutSession(plan.id, billingPeriod);
      } catch (error) {
        if (error.response && error.response.status === 401) {
          // If user is not authenticated, redirect to login/signup
          navigate('/auth'); 
        } else {
          console.error('Error starting checkout:', error);
          setError('Failed to start checkout. Please try again.');
        }
      } finally {
        setLoading(false);
      }
    }
  }

  const getButtonText = (plan) => {
    if (loading && !plan.disabled) return 'Processing...'
    if (userSubscription?.plan === plan.id.toLowerCase() && plan.id !== 'free') {
      return 'Current Plan'
    }
    return plan.buttonText
  }

  const getButtonClass = (plan) => {
    if (userSubscription?.plan === plan.id.toLowerCase() && plan.id !== 'free') {
      return 'btn-secondary'
    }
    return plan.buttonClass
  }

  const isButtonDisabled = (plan) => {
    return plan.disabled || loading || (userSubscription?.plan === plan.id.toLowerCase() && plan.id !== 'free')
  }

  return (
    <section id="pricing" className="pricing">
      <div className="pricing-container">
        <div className="pricing-header" >
          <h2 className="pricing-title" >Pricing</h2>
          
          <div className="pricing-toggle">
            {/* <button 
              className={`toggle-option ${!isAnnual ? 'active' : ''}`}
              onClick={() => setIsAnnual(false)}
            >
              Monthly
            </button>
            <button 
              className={`toggle-option ${isAnnual ? 'active' : ''}`}
              onClick={() => setIsAnnual(true)}
            >
              Annually <span className="savings">Save 17%</span>
            </button> */}
          </div>
        </div>

        {/* Error message display */}
        {error && (
          <div style={{ 
            background: '#fef2f2', 
            border: '1px solid #fecaca', 
            color: '#dc2626', 
            padding: '12px 20px', 
            borderRadius: '8px', 
            margin: '20px auto 30px', 
            maxWidth: '600px', 
            textAlign: 'center' 
          }}>
            {error}
          </div>
        )}

        <div className="pricing-grid">
          {plans.map((plan, index) => (
            <div key={index} className={`pricing-card ${plan.isEnterprise ? 'enterprise-card' : ''}`}>
              {plan.isEnterprise ? (
                <>
                  <div className="plan-header">
                    <h3 className="plan-name">{plan.name}</h3>
                    <span className="plan-badge">{plan.badge}</span>
                  </div>


                  <button 
                    className={`pricing-btn ${plan.buttonClass}`}
                    onClick={() => handleGetStarted(plan)}
                  >
                    {plan.buttonText}
                  </button>
                  <p className="enterprise-description">{plan.description}</p>

                  <div className="plan-features">
                    {plan.enterpriseFeatures.map((feature, featureIndex) => (
                      <div key={featureIndex} className="feature-item">
                        <span className="feature-check">✓</span>
                        <span className="feature-text">{feature}</span>
                      </div>
                    ))}
                  </div>
                </>
              ) : (
                <>
                  <div className="plan-header">
                    <div className="plan-name-row">
                      <h3 className="plan-name">{plan.name}</h3>
                      <span className="plan-badge">{plan.badge}</span>
                    </div>
                    
                    <div className="plan-price">
                      <span className="price-currency">$</span>
                      <span className="price-amount">
                        {isAnnual ? plan.price.annual : plan.price.monthly}
                      </span>
                      <span className="price-period">/ {plan.period}</span>
                    </div>
                  </div>

                  <button 
                    className={`pricing-btn ${getButtonClass(plan)} ${loading && !plan.disabled ? 'loading' : ''}`}
                    onClick={() => handleGetStarted(plan)}
                    disabled={isButtonDisabled(plan)}
                  >
                    {getButtonText(plan)}
                  </button>

                  <div className="plan-features">
                    {plan.features.map((feature, featureIndex) => (
                      <div key={featureIndex} className="feature-item">
                        <span className="feature-check">✓</span>
                        <span className="feature-text">
                          {feature.highlight ? (
                            <>
                              <strong>{feature.text.split(' ')[0]}</strong>
                              {' ' + feature.text.split(' ').slice(1).join(' ')}
                            </>
                          ) : (
                            feature.text
                          )}
                          {feature.badge && (
                            <span className="feature-badge">{feature.badge}</span>
                          )}
                        </span>
                      </div>
                    ))}
                  </div>
                </>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}


export default Pricing

