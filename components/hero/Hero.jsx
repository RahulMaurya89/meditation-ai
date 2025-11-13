import React, { useState, useEffect, useCallback, memo } from "react";
import { Suspense } from "react";
import Auth from "../auth/Auth";
import VideoCarousel from "../VideoCarousel/VideoCarousel";
import FAQ from "../FAQ/FAQ";
import Features from "../Features/features";
import Pricing from "../pricing/Pricing";
import "./Hero.css";

const Hero = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);
  const [videoLoaded, setVideoLoaded] = useState(false);
  const [thumbnailSrc, setThumbnailSrc] = useState(
    "https://img.youtube.com/vi/4o9gEDfOUsQ/maxresdefault.jpg"
  );
  const fallbackThumbnail =
    "https://img.youtube.com/vi/4o9gEDfOUsQ/sddefault.jpg";

  // Performance: Memoize slides array
  const slides = React.useMemo(
    () => [
      {
        id: 1,
        title: "Your Journey to",
        highlight: "Inner Peace",
        subtitle: "",
        background: "spreadsheet",
      },
      {
        id: 2,
        title: "Personalized",
        highlight: "Meditation Guide",
        subtitle: "",
        background: "webpage",
      },
      {
        id: 3,
        title: "AI-Powered",
        highlight: "Mindfulness",
        subtitle: "",
        background: "audio",
      },
    ],
    []
  );


  const currentSlideData = slides[currentSlide];

  const closeVideoModal = useCallback(() => {
    setIsVideoModalOpen(false);
  }, []);
  const handleGetStartedClick = useCallback(() => {
    const authSection = document.getElementById("auth");
    if (authSection) {
      authSection.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, []);

  const handleVideoClick = useCallback(() => {
    setVideoLoaded((prev) => !prev);
  }, []);

  return (
    <>
      <section id="hero" className="hero">
        <div className="hero-background" aria-hidden="true"></div>

        <div className="hero-content">
          {/* Main Two-Column Layout */}
          <div className="hero-main-grid">
            
            {/* Left Column - Heading & Illustration */}
            <div className="hero-left-column">
              <div className="heading-wrapper">
                <h1 className="main-heading">
                  Your Journey to
                </h1>
                <h1 className="main-heading highlight-text">
                  Inner Peace
                </h1>
              </div>

              <div className="meditation-illustration">
                <svg viewBox="0 0 400 400" xmlns="http://www.w3.org/2000/svg" className="meditation-svg">
                  {/* Background Circles */}
                  <circle cx="200" cy="200" r="180" fill="url(#gradient1)" opacity="0.15"/>
                  <circle cx="200" cy="200" r="150" fill="url(#gradient2)" opacity="0.25"/>
                  
                  {/* Gradient Definitions */}
                  <defs>
                    <linearGradient id="gradient1" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" style={{stopColor: '#a78bfa', stopOpacity: 1}} />
                      <stop offset="100%" style={{stopColor: '#8b5cf6', stopOpacity: 1}} />
                    </linearGradient>
                    <linearGradient id="gradient2" x1="0%" y1="100%" x2="100%" y2="0%">
                      <stop offset="0%" style={{stopColor: '#c4b5fd', stopOpacity: 1}} />
                      <stop offset="100%" style={{stopColor: '#a78bfa', stopOpacity: 1}} />
                    </linearGradient>
                    <linearGradient id="skinGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                      <stop offset="0%" style={{stopColor: '#fbbf24', stopOpacity: 1}} />
                      <stop offset="100%" style={{stopColor: '#f59e0b', stopOpacity: 1}} />
                    </linearGradient>
                  </defs>
                  
                  {/* Person meditating */}
                  {/* Head */}
                  <circle cx="200" cy="150" r="35" fill="url(#skinGradient)"/>
                  
                  {/* Body */}
                  <ellipse cx="200" cy="210" rx="42" ry="52" fill="#8b5cf6"/>
                  
                  {/* Legs in lotus position */}
                  <ellipse cx="168" cy="260" rx="36" ry="22" fill="#7c3aed" transform="rotate(-12 168 260)"/>
                  <ellipse cx="232" cy="260" rx="36" ry="22" fill="#7c3aed" transform="rotate(12 232 260)"/>
                  
                  {/* Arms */}
                  <ellipse cx="163" cy="198" rx="13" ry="32" fill="#6d28d9" transform="rotate(-32 163 198)"/>
                  <ellipse cx="237" cy="198" rx="13" ry="32" fill="#6d28d9" transform="rotate(32 237 198)"/>
                  
                  {/* Hands in mudra position */}
                  <circle cx="153" cy="218" r="11" fill="url(#skinGradient)"/>
                  <circle cx="247" cy="218" r="11" fill="url(#skinGradient)"/>
                  
                  {/* Peaceful face details */}
                  <circle cx="190" cy="145" r="3" fill="#4c1d95"/>
                  <circle cx="210" cy="145" r="3" fill="#4c1d95"/>
                  <path d="M 190 160 Q 200 165 210 160" stroke="#4c1d95" strokeWidth="2.5" fill="none" strokeLinecap="round"/>
                  
                  {/* Energy/Aura circles */}
                  <circle cx="200" cy="120" r="8" fill="none" stroke="#a78bfa" strokeWidth="2.5" opacity="0.7">
                    <animate attributeName="r" values="8;13;8" dur="3s" repeatCount="indefinite"/>
                    <animate attributeName="opacity" values="0.7;0.3;0.7" dur="3s" repeatCount="indefinite"/>
                  </circle>
                  <circle cx="200" cy="120" r="16" fill="none" stroke="#8b5cf6" strokeWidth="2" opacity="0.5">
                    <animate attributeName="r" values="16;22;16" dur="4s" repeatCount="indefinite"/>
                    <animate attributeName="opacity" values="0.5;0.2;0.5" dur="4s" repeatCount="indefinite"/>
                  </circle>
                  
                  {/* Floating particles */}
                  <circle cx="135" cy="175" r="4" fill="#a78bfa" opacity="0.6">
                    <animate attributeName="cy" values="175;155;175" dur="5s" repeatCount="indefinite"/>
                    <animate attributeName="opacity" values="0.6;0.9;0.6" dur="5s" repeatCount="indefinite"/>
                  </circle>
                  <circle cx="265" cy="195" r="3.5" fill="#8b5cf6" opacity="0.6">
                    <animate attributeName="cy" values="195;175;195" dur="6s" repeatCount="indefinite"/>
                    <animate attributeName="opacity" values="0.6;1;0.6" dur="6s" repeatCount="indefinite"/>
                  </circle>
                  <circle cx="200" cy="305" r="3" fill="#c4b5fd" opacity="0.5">
                    <animate attributeName="cy" values="305;290;305" dur="4.5s" repeatCount="indefinite"/>
                    <animate attributeName="opacity" values="0.5;0.8;0.5" dur="4.5s" repeatCount="indefinite"/>
                  </circle>
                </svg>
                
                {/* Meditation Emojis */}
                <div className="meditation-emojis">
                  <span className="emoji emoji-center">🧘</span>
                  <span className="emoji emoji-top-left floating" style={{animationDelay: '0s'}}>✨</span>
                  <span className="emoji emoji-top-right floating" style={{animationDelay: '1s'}}>🌸</span>
                  <span className="emoji emoji-bottom-left floating" style={{animationDelay: '0.5s'}}>🕉️</span>
                  <span className="emoji emoji-bottom-right floating" style={{animationDelay: '1.5s'}}>💫</span>
                </div>
              </div>

              {/* CTA Button */}
              <div className="hero-actions" role="group" aria-label="Call to action buttons">
                <button
                  className="btn btn-primary cta-button"
                  onClick={handleGetStartedClick}
                  aria-label="Start your meditation journey"
                  type="button"
                >
                  Begin Your Journey
                  <span className="btn-arrow" aria-hidden="true">→</span>
                </button>
              </div>
            </div>
            
            {/* Right Column - Video & Content */}
            <div className="hero-right-column">
              <h2 className="video-section-heading">
                Discover <span className="video-heading-highlight">AI Personalized Voice Meditation Assistant</span>
              </h2>
              
              <div className="hero-video" role="region" aria-label="Meditation demonstration video">
                {!videoLoaded ? (
                  <button
                    className="video-thumbnail"
                    onClick={handleVideoClick}
                    aria-label="Play meditation demonstration video"
                    aria-pressed={videoLoaded}
                    type="button"
                  >
                    <picture>
                      <source
                        srcSet="https://i.ytimg.com/vi/4o9gEDfOUsQ/maxresdefault.jpg"
                        media="(min-width: 48rem)"
                      />
                      <img
                        src={thumbnailSrc}
                        onError={() => setThumbnailSrc(fallbackThumbnail)}
                        alt="Meditation AI Video Thumbnail - Click to play"
                        width="640"
                        height="360"
                        fetchPriority="high"
                        decoding="async"
                        sizes="(max-width: 48rem) 100vw, 50rem"
                      />
                    </picture>
                    <div className="play-button" aria-hidden="true">
                      <svg
                        viewBox="0 0 24 24"
                        width="40"
                        height="40"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        aria-label="Play button"
                      >
                        <path
                          d="M8 5.5V18.5L18 12L8 5.5Z"
                          fill="white"
                          stroke="white"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </div>
                  </button>
                ) : (
                  <iframe
                    className="hero-video-player"
                    src="https://www.youtube.com/embed/4o9gEDfOUsQ?autoplay=1&rel=0&modestbranding=1"
                    title="Meditation AI Product Demonstration Video"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="strict-origin-when-cross-origin"
                  ></iframe>
                )}
              </div>

              {/* Description Below Video */}
              <p className="discover-description">
                Experience guided meditation with AI-powered voice personalization. Practice mindfulness daily, reduce stress, improve sleep, and achieve mental clarity with sessions tailored to your voice and needs.
              </p>
            </div>
          </div>
        </div>
      </section>


      {/* Performance: Lazy load VideoModal */}
      <Suspense fallback={null}>
        {isVideoModalOpen && <VideoModal isOpen={isVideoModalOpen} onClose={closeVideoModal} />}
      </Suspense>

      {/* Performance: Lazy load Auth component */}
      <div id="auth-section">
        <Suspense fallback={<div className="page-loader"><div className="loader-spinner"></div></div>}>
          <div id="features">
            <Features />
            <VideoCarousel />
          </div>
          <Auth />
          <div id="pricing">
            <Pricing />
          </div>
          <FAQ />
        </Suspense>
      </div>


    </>
  );
};

// Performance: Use React.memo to prevent unnecessary re-renders
export default memo(Hero);


