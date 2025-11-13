import React from 'react';
import { FaBrain, FaMoon, FaHeartbeat, FaCalendarAlt } from 'react-icons/fa';
import { FaRobot } from "react-icons/fa";
import { FaMicrophone } from "react-icons/fa";
import { FaSpa } from "react-icons/fa";
import { FaBolt } from "react-icons/fa";
import './features.css';

const Features = () => {
  return (
    <section className="features-section">
      <div className="features-container">
        {/* Header */}
        <div className="features-header">
          <div className="features-badge">
            <span className="badge-icon"><FaRobot size={28} color="#8b5cf6" /></span>
            <span className="badge-text">AI Meditation Guide</span>
          </div>
          <div className="value-props" role="region" aria-label="Key benefits">
            <div className="value-prop-card">
              <div className="value-icon"><FaMicrophone size={28} color="#8b5cf6" /></div>
              <h3>Personalized Voice Meditation</h3>
              <p>Experience guided meditation with AI that adapts to your unique voice and preferences. Each session is tailored to your emotional state, helping you achieve deeper relaxation and mindfulness through personalized voice guidance.</p>
            </div>
            <div className="value-prop-card">
              <div className="value-icon"><FaSpa size={28} color="#8b5cf6" /></div>
              <h3>Adaptive Meditation Programs</h3>
              <p>Our AI learns your meditation journey and creates customized programs for stress relief, better sleep, anxiety reduction, and mental clarity. Progress at your own pace with sessions designed specifically for your needs.</p>
            </div>
            <div className="value-prop-card">
              <div className="value-icon"><FaBolt size={28} color="#8b5cf6" /></div>
              <h3>Meditate Anytime, Anywhere</h3>
              <p>Access your personal meditation guide 24/7. Whether you need a quick 5 minute breathing exercise or a deep 30-minute session, practice mindfulness whenever and wherever you need it most.</p>
            </div>
          </div>
        </div>

        {/* Learning Features */}
        <div className="romance-features">
          <h3 className="romance-title">Why Choose Our AI Meditation Platform</h3>
          <div className="romance-grid">
            <div className="romance-item">
              <span className="romance-icon">
                <FaBrain color="#8b5cf6" />
              </span>
              <h4>Mindfulness Training</h4>
              <p>
                Follow expertly designed meditation programs that guide you from beginner to advanced practice. Build lasting mindfulness habits with structured sessions for stress relief, focus, and emotional balance.
              </p>
            </div>
            <div className="romance-item">
              <span className="romance-icon">
                <FaHeartbeat color="#8b5cf6" />
              </span>
              <h4>Wellness Tracking</h4>
              <p>Monitor your meditation journey with detailed insights. Track your mood improvements, stress reduction, sleep quality, and mindfulness streaks to see your transformation over time.</p>
            </div>
            <div className="romance-item">
              <span className="romance-icon">
                <FaMoon color="#8b5cf6" />
              </span>
              <h4>Sleep & Relaxation</h4>
              <p>Discover specialized meditation sessions for better sleep, deep relaxation, and anxiety relief. Our AI creates soothing bedtime stories and calming soundscapes personalized to your voice.</p>
            </div>
            <div className="romance-item">
              <span className="romance-icon">
                <FaCalendarAlt color="#8b5cf6" />
              </span>
              <h4>Daily Meditation Streak</h4>
              <p>Build a consistent meditation practice with daily reminders and streak tracking. Stay motivated with personalized goals and celebrate your mindfulness milestones along the journey.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};


export default Features;
