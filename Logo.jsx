import React from 'react';
import './Logo.css';
import logoImage from './assets/logo.webp';

const Logo = () => {
  return (
    <div className="logo-container" >
      <img
        src={logoImage}
        alt="Meditation AI Logo"
        className="logo-image"
        width={70}
        height={40}
        fetchPriority="high"
        decoding="async"
      />
    </div>
  );
};

export default Logo;