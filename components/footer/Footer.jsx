import React from 'react'
import { Link } from 'react-router-dom'
import { FaLock } from "react-icons/fa";
import { FaShieldAlt } from "react-icons/fa";
import { FaBolt } from "react-icons/fa";
import Logo from '../../Logo.jsx'
import './Footer.css'

const Footer = () => {
  const currentYear = new Date().getFullYear()

  const footerLinks = {
    product: [
      { name: 'Features', href: '/features' },
      { name: 'Pricing', href: '/pricing' },
    ],
    support: [
      { name: 'Contact Us', href: '/contact' },
      { name: 'Community', href: 'https://www.linkedin.com/company/mayaagentai/' }
    ],
    legal: [
      { name: 'Privacy Policy', href: '/privacy' },
      { name: 'Terms of Service', href: '/terms' },   
    ]
  }

  const socialLinks = [
    {
      name: 'Twitter',
      icon: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" version="1.1"> <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/> </svg>',
      href: 'https://x.com/MayaAgentAI',
      color: '#1DA1F2',
      isSvg: true,
    },
    {
      name: 'LinkedIn',
      icon: '<svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="currentColor"><path d="M160-120q-33 0-56.5-23.5T80-200v-440q0-33 23.5-56.5T160-720h160v-80q0-33 23.5-56.5T400-880h160q33 0 56.5 23.5T640-800v80h160q33 0 56.5 23.5T880-640v440q0 33-23.5 56.5T800-120H160Zm0-80h640v-440H160v440Zm240-520h160v-80H400v80ZM160-200v-440 440Z"/></svg>',
      href: 'https://www.linkedin.com/company/mayaagentai/',
      color: '#0A66C2',
      isSvg: true
    },
    {
      name: 'Website',
      icon: '<svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="currentColor"><path d="M240-80q-33 0-56.5-23.5T160-160v-400q0-33 23.5-56.5T240-640h40v-80q0-83 58.5-141.5T480-920q83 0 141.5 58.5T680-720v80h40q33 0 56.5 23.5T800-560v400q0 33-23.5 56.5T720-80H240Zm0-80h480v-400H240v400Zm240-120q33 0 56.5-23.5T560-360q0-33-23.5-56.5T480-440q-33 0-56.5 23.5T400-360q0 33 23.5 56.5T480-280ZM360-640h240v-80q0-50-35-85t-85-35q-50 0-85 35t-35 85v80ZM240-160v-400 400Z"/></svg>',
      href: 'https://mayaagent.ai',
      color: '#0A66C2',
      isSvg: true,
    },
  ]

  return (
    <footer className="footer">
      <div className="footer-container">
        {/* Main Footer Content */}
        <div className="footer-content">
          {/* Brand Section */}
          <div className="footer-brand">
            <div className="footer-logo">
              <Logo size={32} />
              <span className="footer-brand-name" style={{ color: '#8b5cf6' }}>Meditation-Maya</span>
            </div>
            <p className="footer-description">
              The 24/7 AI that delivers Voice Support for you. 
              Empowering productivity through intelligent automation.
            </p>
            <div className="footer-social">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="social-link"
                  aria-label={`Follow us on ${social.name}`}
                  style={{ '--social-color': social.color }}
                >
                  <span className="social-icon">
                    {social.isSvg ? (
                      <span dangerouslySetInnerHTML={{ __html: social.icon }} />
                    ) : (
                      social.icon
                    )}
                  </span>
                </a>
              ))}
            </div>
          </div>

          {/* Links Sections */}
          <div className="footer-links">
            <div className="footer-section">
              <h3 className="footer-section-title">Product</h3>
              <ul className="footer-section-links">
                {footerLinks.product.map((link) => (
                  <li key={link.name}>
                    <Link to={link.href} className="footer-link">
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div className="footer-section">
              <h3 className="footer-section-title">Support</h3>
              <ul className="footer-section-links">
                {footerLinks.support.map((link) => (
                  <li key={link.name}>
                    <Link to={link.href} className="footer-link">
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div className="footer-section">
              <h3 className="footer-section-title">Legal</h3>
              <ul className="footer-section-links">
                {footerLinks.legal.map((link) => (
                  <li key={link.name}>
                    <Link to={link.href} className="footer-link">
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="footer-bottom">
          <div className="footer-bottom-left">
            <p className="footer-copyright">
              © {currentYear} MayaAgent. All rights reserved.
            </p>
          </div>
          <div className="footer-bottom-right">
            <div className="footer-badges">
              <span className="footer-badge">
                <FaLock size={12} color="#d08711ff" /> SOC2 Compliant
              </span>
              <span className="footer-badge">
                <FaShieldAlt size={13} color="#1177d0ff" /> GDPR Ready
              </span>
              <span className="footer-badge">
                <FaBolt size={13} color="#d08711ff" /> 99.9% Uptime
              </span>
            </div>
          </div>
        </div>
      </div>
      
      {/* Decorative Background */}
      <div className="footer-background">
        <div className="footer-gradient"></div>
      </div>
    </footer>
  )
}


export default Footer
