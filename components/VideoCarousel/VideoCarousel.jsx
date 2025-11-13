import React from "react";
import "./VideoCarousel.css";
import thumbnail1 from "../../assets/images/11.jpg";
import thumbnail2 from "../../assets/images/22.jpg";
import thumbnail3 from "../../assets/images/33.jpg";
import thumbnail4 from "../../assets/images/44.jpg";
import thumbnail5 from "../../assets/images/55.jpg";
import thumbnail6 from "../../assets/images/66.jpg";
import thumbnail7 from "../../assets/images/77.jpg";
import thumbnail8 from "../../assets/images/88.jpg";

const VideoCarousel = () => {
  const videoData = [
    { 
      id: 1, 
      title: "Morning Mindfulness", 
      description: "Start your day with clarity and focus. A 10-minute guided meditation to energize your mind and set positive intentions.",
      category: "morning", 
      duration: "10:00",
      thumbnail: thumbnail1
    },
    { 
      id: 2, 
      title: "Stress Relief Session", 
      description: "Release tension and anxiety with calming breathing exercises and guided visualization techniques for instant relaxation.",
      category: "stress relief", 
      duration: "15:00",
      thumbnail: thumbnail2
    },
    { 
      id: 3, 
      title: "Deep Sleep Meditation", 
      description: "Fall asleep naturally with soothing voice guidance, calming sounds, and body relaxation techniques for restful sleep.",
      category: "sleep", 
      duration: "20:00",
      thumbnail: thumbnail3
    },
    { 
      id: 4, 
      title: "Focus & Concentration", 
      description: "Enhance your mental clarity and productivity with mindfulness techniques designed for better focus and performance.",
      category: "focus", 
      duration: "12:00",
      thumbnail: thumbnail4
    },
    { 
      id: 5, 
      title: "Anxiety Management", 
      description: "Find inner peace and calm your anxious thoughts with proven meditation techniques and breathing patterns.",
      category: "anxiety", 
      duration: "15:00",
      thumbnail: thumbnail5
    },
    { 
      id: 6, 
      title: "Loving-Kindness Practice", 
      description: "Cultivate compassion, gratitude, and positive emotions toward yourself and others through heart-centered meditation.",
      category: "emotional", 
      duration: "18:00",
      thumbnail: thumbnail6
    },
    { 
      id: 7, 
      title: "Body Scan Relaxation", 
      description: "Release physical tension and connect with your body through progressive relaxation and mindful awareness techniques.",
      category: "relaxation", 
      duration: "25:00",
      thumbnail: thumbnail7
    },
    { 
      id: 8, 
      title: "Midday Energy Boost", 
      description: "Refresh and recharge during your day with quick meditation techniques to restore mental energy and clarity.",
      category: "energy", 
      duration: "8:00",
      thumbnail: thumbnail8
    },
  ];

  return (
    <section id="videos" className="video-carousel">
      <div className="video-carousel-container">
        {/* Header */}
        <div className="video-header">
          <div className="video-intro">
            <h2 className="video-title">
              Meditation{"  "}
              <span className="title-highlight">Sessions</span>
            </h2>
            <p className="video-description">
              Explore our collection of guided meditation sessions designed for every moment of your day. 
              From morning mindfulness to deep sleep, find the perfect practice for your needs.
            </p>
          </div>
        </div>

        {/* Thumbnails Grid */}
        <div className="marquee-wrapper">
          <div className="marquee-row">
            <div className="marquee-content">
              <div className="marquee-track">
                {videoData.map((video, index) => (
                  <div key={video.id} className="video-card-carousel">
                    <div className="video-card-link">
                      <div className="video-thumbnail-wrapper">
                        <img
                          src={video.thumbnail}
                          alt={video.title}
                          className="video-thumbnail"
                          loading="lazy"
                          style={{marginTop:"-100px"}}
                        />
                      </div>
                      <div className="video-card-content">
                        <h3 className="video-card-title">{video.title}</h3>
                        <p className="video-card-description">{video.description}</p>
                        <div className="video-card-meta">
                          <span className="video-card-category">
                            <svg viewBox="0 0 24 24" fill="currentColor" width="12" height="12">
                              <path d="M9.4 16.6L4.8 12l4.6-4.6L8 6l-6 6 6 6 1.4-1.4zm5.2 0l4.6-4.6-4.6-4.6L16 6l6 6-6 6-1.4-1.4z"/>
                            </svg>
                            {video.category}
                          </span>
                          <span className="video-card-duration">
                            <svg viewBox="0 0 24 24" fill="currentColor">
                              <path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10 10-4.5 10-10S17.5 2 12 2zm0 18c-4.4 0-8-3.6-8-8s3.6-8 8-8 8 3.6 8 8-3.6 8-8 8zm.5-13H11v6l5.2 3.2.8-1.3-4.5-2.7V7z"/>
                            </svg>
                            {video.duration}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default React.memo(VideoCarousel);