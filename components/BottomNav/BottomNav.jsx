import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FaComments } from 'react-icons/fa';
import { FaPhoneAlt } from 'react-icons/fa';
import { FaHeart } from 'react-icons/fa';
import { FaGem } from 'react-icons/fa';
import { FaUser } from 'react-icons/fa';
import './BottomNav.css';

const BottomNav = () => {
  const location = useLocation();

  return (
    <div className="bottom-nav">
      <div className="nav-container">

        <Link
          to="/chat"
          className={`nav-btn ${location.pathname === '/chat' ? 'active' : ''}`}
        >
          <FaComments size={24} color="blue" />
          <span className="label">Chat</span>
        </Link>

        <Link
          to="/call"
          className={`nav-btn ${location.pathname === '/call' ? 'active' : ''}`}
        >
          <FaPhoneAlt size={24} color="green" />
          <span className="label">Call</span>
        </Link>

        <Link
          to="/"
          className={`nav-btn ${location.pathname === '/' ? 'active' : ''}`}
        >
          <FaHeart size={24} color="red" />
          <span className="label">Home</span>
        </Link>

        <Link
          to="/pricing"
          className={`nav-btn ${location.pathname === '/pricing' ? 'premium-active' : ''}`}
        >
          <FaGem size={28} color="#00BFFF" />
          <span className="label">Premium</span>
        </Link>

        <Link
          to="/dashboard"
          className={`nav-btn ${location.pathname === '/dashboard' ? 'active' : ''}`}
        >
          <div className="profile-icon"><FaUser size={28} color="#333" /></div>
          <span className="label">Profile</span>
        </Link>

      </div>
    </div>
  );
};

export default BottomNav;
