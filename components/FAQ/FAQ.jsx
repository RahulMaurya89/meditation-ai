import React, { useState, useMemo, useCallback } from 'react';
import './FAQ.css';

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState(null);

  // Memoize FAQ data to prevent re-creation on every render
  const faqData = useMemo(() => [
    {
      id: 1,
      question: 'How can Maya help me with meditation?',
      answer: "I’m your personal AI meditation guide. I help you relax, focus, and find inner peace through guided sessions tailored to your mood, goals, and energy level."
    },
    {
      id: 2,
      question: 'What kind of meditation sessions does Maya offer?',
      answer: "I offer short, 10–20 minute sessions focused on stress relief, better sleep, focus, healing, and emotional balance. Each session adapts to your personal needs and progress."
    },
    {
      id: 3,
      question: 'Can Maya personalize my meditation experience?',
      answer: "Yes! I track your mood, breathing pattern, and goals to create personalized sessions. Every meditation adjusts in real-time to help you stay mindful and calm."
    },
    {
      id: 4,
      question: 'Is Maya suitable for beginners?',
      answer: "Absolutely. I start with simple breathing exercises and easy guidance. Whether you’re new or experienced, I’ll match your pace and help you grow your mindfulness habit."
    },
    {
      id: 5,
      question: 'Can I do daily guided meditation with Maya?',
      answer: "Yes, that’s what I’m here for! You can meditate with me every day — morning, evening, or whenever you need calm. Regular sessions help reduce stress and improve focus."
    },
    {
      id: 6,
      question: 'How does Maya help reduce stress and anxiety?',
      answer: "Through calming voice guidance, mindful breathing, and visualization exercises. I’ll teach you how to quiet your mind and handle stress with balance and ease."
    },
    {
      id: 7,
      question: 'Can Maya help me sleep better?',
      answer: "Yes! I offer sleep meditations, soft soundscapes, and bedtime stories to help you relax and fall asleep faster. Each session gently eases your mind into deep rest."
    },
    {
      id: 8,
      question: 'Do I need any experience before using Maya?',
      answer: "Not at all! You can start anytime. I’ll guide you step-by-step — from simple breathing to deep mindfulness practices — no prior experience needed."
    },
    {
      id: 9,
      question: 'How often should I meditate with Maya?',
      answer: "Just 10 minutes a day can make a big difference. Daily practice builds focus, emotional strength, and inner peace that stays with you all day."
    },
    {
      id: 10,
      question: 'What makes Maya different from other meditation apps?',
      answer: "I don’t just play audio — I connect with you personally. My sessions are interactive, emotion-aware, and adapt to your feelings, helping you grow mindfully every day."
    }

  ], []);

  // Memoize toggle function for performance
  const toggleFAQ = useCallback((id) => {
    setOpenIndex(openIndex === id ? null : id);
  }, [openIndex]);
  return (
    <section id="faq" className="faq-section" role="region" aria-label="Frequently Asked Questions">
      <div className="faq-container">
        <div className="faq-header">
          <h2>Frequently Asked Questions</h2>
          <p>Everything you need to know about Maya</p>
        </div>

        <div className="faq-grid">
          {faqData.map((item, index) => (
            <div
              key={item.id}
              className={`faq-item ${openIndex === item.id ? 'active' : ''}`}
              role="region"
              aria-labelledby={`faq-question-${item.id}`}
            >
              <button
                id={`faq-question-${item.id}`}
                className="faq-question"
                onClick={() => toggleFAQ(item.id)}
                aria-expanded={openIndex === item.id}
                aria-controls={`faq-answer-${item.id}`}
                type="button"
              >
                <span className="faq-question-text">{item.question}</span>
                <span
                  className="faq-icon"
                  aria-hidden="true"
                >
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <polyline points="6 9 12 15 18 9"></polyline>
                  </svg>
                </span>
              </button>

              {openIndex === item.id && (
                <div
                  id={`faq-answer-${item.id}`}
                  className="faq-answer"
                  role="region"
                >
                  <p>{item.answer}</p>
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="faq-cta">
          <h3>Join thousands who have transformed their lives through meditation</h3>
          <p>Whether you seek stress relief, better sleep, or inner peace, our AI meditation guide is here for you. Start your mindfulness journey today—no credit card needed.</p>
          <a
            href="https://t.me/MayaFriend_bot"
            className="faq-button"
            aria-label="Start your meditation journey now"
          >
            Begin Your Meditation Journey
          </a>
        </div>
      </div>
    </section>
  );
};


export default React.memo(FAQ);



