import React, { useState, useEffect, useCallback } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Logo from '../../Logo';
import './Nav.css';

// SVG Icon Components
const MoonIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="currentColor">
    <path d="M480-120q-150 0-255-105T120-480q0-150 105-255t255-105q14 0 27.5 1t26.5 3q-41 29-65.5 75.5T444-660q0 90 63 153t153 63q55 0 101-24.5t75-65.5q2 13 3 26.5t1 27.5q0 150-105 255T480-120Zm0-80q88 0 158-48.5T740-375q-20 5-40 8t-40 3q-123 0-209.5-86.5T364-660q0-20 3-40t8-40q-78 32-126.5 102T200-480q0 116 82 198t198 82Zm-10-270Z"/>
  </svg>
);

const SunIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="currentColor">
    <path d="M480-360q50 0 85-35t35-85q0-50-35-85t-85-35q-50 0-85 35t-35 85q0 50 35 85t85 35Zm0 80q-83 0-141.5-58.5T280-480q0-83 58.5-141.5T480-680q83 0 141.5 58.5T680-480q0 83-58.5 141.5T480-280ZM200-440H40v-80h160v80Zm720 0H760v-80h160v80ZM440-760v-160h80v160h-80Zm0 720v-160h80v160h-80ZM256-650l-101-97 57-59 96 100-52 56Zm492 496-97-101 53-55 101 97-57 59Zm-98-550 97-101 59 57-100 96-56-52ZM154-212l101-97 55 53-97 101-59-57Zm326-268Z"/>
  </svg>
);

const Nav = () => {
  const navigate = useNavigate();
  const [isDarkMode, setIsDarkMode] = useState(() => {
    return localStorage.getItem('theme') === 'light';
  });
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Memoize navigation links
  const navLinks = React.useMemo(() => [
    { id: 'features', name: 'Features', ariaLabel: 'Navigate to Features section' },
    { id: 'pricing', name: 'Pricing', ariaLabel: 'Navigate to Pricing section' }
  ], []);

  const toggleMobileMenu = useCallback(() => {
    setIsMobileMenuOpen(prev => !prev);
  }, []);

  const closeMobileMenu = useCallback(() => {
    setIsMobileMenuOpen(false);
  }, []);

  // Memoize login handler
  const handleLoginClick = useCallback(() => {
    navigate('/dashboard');
    closeMobileMenu();
  }, [navigate, closeMobileMenu]);

  // Improved scroll handler with retry logic for lazy-loaded components
  const handleScrollLinkClick = useCallback((sectionId) => {
    closeMobileMenu();
    
    const scrollToElement = (retries = 3) => {
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      } else if (retries > 0) {
        // Retry if element not found (lazy component still loading)
        setTimeout(() => scrollToElement(retries - 1), 150);
      }
    };

    if (window.location.pathname !== '/') {
      window.location.pathname = '/';
      requestAnimationFrame(() => {
        setTimeout(() => scrollToElement(), 200);
      });
    } else {
      // Wait for lazy components to mount
      setTimeout(() => scrollToElement(), 100);
    }
  }, [closeMobileMenu]);

  // Close mobile menu on Escape key
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape' && isMobileMenuOpen) {
        closeMobileMenu();
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [isMobileMenuOpen, closeMobileMenu]);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
    };
  }, [isMobileMenuOpen]);

  return (
    <header className="navbar-header" role="banner">
      <nav className="navbar-container" role="navigation" aria-label="Main navigation">
        <Link 
          to="/" 
          className="navbar-logo" 
          onClick={() => handleScrollLinkClick('hero')} 
          aria-label="Meditation AI - Go to homepage"
        >
          <Logo size={45} />
        </Link>

        <ul 
          className={`navbar-menu ${isMobileMenuOpen ? 'active' : ''}`}
          role="list"
          aria-label="Navigation menu"
        >
          {navLinks.map(link => (
            <li key={link.id} className="navbar-item" role="listitem">
              <button 
                className="navbar-link" 
                onClick={() => handleScrollLinkClick(link.id)}
                aria-label={link.ariaLabel}
                type="button"
              >
                {link.name}
              </button>
            </li>
          ))}
          <li className="navbar-item" role="listitem">
            <Link 
              to="/contact" 
              className="navbar-link" 
              onClick={closeMobileMenu}
              aria-label="Navigate to Contact page"
            >
              Contact
            </Link>
          </li>
        </ul>

        <div className="navbar-actions" role="group" aria-label="Navigation actions">
          <button 
            onClick={handleLoginClick} 
            className="navbar-auth-btn navbar-login-btn"
            aria-label="Login to Meditation Dashboard"
            type="button"
          >
            Login
          </button>
          
          <button 
            className={`hamburger-btn ${isMobileMenuOpen ? 'active' : ''}`} 
            onClick={toggleMobileMenu} 
            aria-label={isMobileMenuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={isMobileMenuOpen}
            aria-controls="navbar-menu"
            type="button"
          >
            <span className="hamburger-line" aria-hidden="true"></span>
            <span className="hamburger-line" aria-hidden="true"></span>
            <span className="hamburger-line" aria-hidden="true"></span>
          </button>
        </div>
      </nav>
    </header>
  );
};

export default React.memo(Nav);

