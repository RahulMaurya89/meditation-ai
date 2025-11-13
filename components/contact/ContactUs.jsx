import React, { useState, useEffect } from 'react'
import { AiOutlineMail } from 'react-icons/ai';
import { FaWhatsapp } from 'react-icons/fa6';
import { MdPhoneInTalk } from 'react-icons/md';
import { FaBolt } from 'react-icons/fa6';
import { FaGlobe } from "react-icons/fa";
import { FaRegClock } from "react-icons/fa";  
import './ContactUs.css'

const ContactUs = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  })
  const [submissionStatus, setSubmissionStatus] = useState(null) // null, 'submitting', 'success', 'error'

  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth'
    })
  }, [])

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setSubmissionStatus('submitting')

    try {
      const response = await fetch('https://formspree.io/f/xgvnpznk', { 
        method: 'POST',
        headers: {
          'Accept': 'application/json'
        },
        body: new FormData(e.target)
      });

      if (response.ok) {
        setSubmissionStatus('success')
        setFormData({ name: '', email: '', subject: '', message: '' })
      } else {
        setSubmissionStatus('error')
      }
    } catch (error) {
      console.error('Form submission error:', error)
      setSubmissionStatus('error')
    }
  }

  const contactMethods = [
    {
      id: 'email',
      icon: <AiOutlineMail size={30} color="#f51212ff" />,
      title: 'Email Us',
      description: 'Send us an email and we\'ll respond within 24 hours',
      action: 'Send Email',
      contact: 'heymaya@mayaagent.ai',
      link: 'mailto:heymaya@mayaagent.ai?subject=Contact from MayaAgent Website'
    },
    {
      id: 'whatsapp',
      icon: <FaWhatsapp size={35} color="#38d312ff" />,
      title: 'WhatsApp',
      description: 'Chat with us directly for quick support',
      action: 'Start Chat',
      contact: '+1 (555) 761-3904',
      link: 'https://wa.me/15557613904?text=/friend'
    },
    {
      id: 'phone',
      icon: <MdPhoneInTalk size={30} color="#e61414ff" />,
      title: 'Call Us',
      description: 'Speak directly with our support team',
      action: 'Call Now',
      contact: '+1 (218) 845-5198',
      link: 'tel:+12188455198'
    }
  ]

  return (
    <section id="contact" className="contact-us">
      <div className="contact-container">
        {/* Header Section */}
        <div className="contact-header">
          <h1>Get in Touch</h1>
          <p>We'd love to hear from you. Choose your preferred way to contact us.</p>
        </div>

        {/* Contact Methods */}
        <div className="contact-methods">
          {contactMethods.map((method) => (
            <div key={method.id} className="contact-method">
              <div className="method-icon">
                <span>{method.icon}</span>
              </div>
              <div className="method-content">
                <h3>{method.title}</h3>
                <p>{method.description}</p>
                <div className="method-contact">
                  <span>{method.contact}</span>
                </div>
                <a 
                  href={method.link}
                  className="method-button"
                  target={method.id === 'whatsapp' ? '_blank' : '_self'}
                  rel={method.id === 'whatsapp' ? 'noopener noreferrer' : ''}
                >
                  {method.action}
                </a>
              </div>
            </div>
          ))}
        </div>

        {/* Contact Form */}
        <div className="contact-form-section">
          <div className="form-header">
            <h2>Send us a Message</h2>
            <p>Fill out the form below and we'll get back to you as soon as possible.</p>
          </div>
          
          <form className="contact-form" onSubmit={handleSubmit}>
            <div className="form-group">
              <div className="form-row">
                <div className="form-field">
                  <label htmlFor="name">Name *</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="Your full name"
                    required
                  />
                </div>
                <div className="form-field">
                  <label htmlFor="email">Email *</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="your.email@example.com"
                    required
                  />
                </div>
              </div>
            </div>
            
            <div className="form-field">
              <label htmlFor="subject">Subject *</label>
              <input
                type="text"
                id="subject"
                name="subject"
                value={formData.subject}
                onChange={handleInputChange}
                placeholder="What's this about?"
                required
              />
            </div>
            
            <div className="form-field">
              <label htmlFor="message">Message *</label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleInputChange}
                placeholder="Tell us more about your inquiry..."
                rows="6"
                required
              />
            </div>
            
            <button type="submit" className="submit-button" disabled={submissionStatus === 'submitting'}>
              {submissionStatus === 'submitting' ? 'Sending...' : 'Send Message'}
            </button>

            {submissionStatus === 'success' && (
              <p className="form-status-message success">
                Thank you for your message! We'll get back to you soon.
              </p>
            )}
            {submissionStatus === 'error' && (
              <p className="form-status-message error">
                Oops! Something went wrong. Please try again or email us directly.
              </p>
            )}
          </form>
        </div>

        {/* Additional Info */}
        <div className="contact-info">
          <div className="info-section">
            <h3><FaRegClock size={20} color="#ffffff" /> Business Hours</h3>
            <p>Monday - Friday: 9:00 AM - 6:00 PM (PST)</p>
            <p>Saturday - Sunday: 10:00 AM - 4:00 PM (PST)</p>
          </div>
          <div className="info-section">
            <h3><FaGlobe size={20} color="#109df5ff" /> Location</h3>
            <p>San Francisco, CA</p>
            <p>United States</p>
          </div>
          <div className="info-section">
            <h3><FaBolt size={20} color="#f5a110ff" /> Response Time</h3>
            <p>Email: Within 24 hours</p>
            <p>WhatsApp/Phone: Immediate during business hours</p>
          </div>
        </div>
      </div>
    </section>
  )
}

export default ContactUs
