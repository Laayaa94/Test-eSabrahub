import React, { useState } from 'react';
import './ContactUs.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faLocationDot, faPhone } from '@fortawesome/free-solid-svg-icons';

const ContactUs = () => {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission
    console.log('Full Name:', fullName);
    console.log('Email:', email);
    console.log('Message:', message);
  };

  return (
    <div className='contact-us-container'>
      <div className="contact-us-container-leftside">
        <div className="contact-us-container-leftside-topic">
          <h1>CONTACT</h1><span>US</span>
        </div>
        <div className="contact-us-container-leftside-lists">
          <div className="contact-us-container-leftside-lists-icon">
            <FontAwesomeIcon icon={faLocationDot} className="contactus-icon" />
          </div>
          <div className="contact-us-container-leftside-lists-text">
            <p>Sabaragamuwa University of Sri Lanka</p>
            <p>Belihul Oya</p>
            <p>70140</p>
          </div>
        </div>

        <div className="contact-us-container-leftside-lists">
          <div className="contact-us-container-leftside-lists-icon">
            <FontAwesomeIcon icon={faEnvelope} className="contactus-icon"/>
          </div>
          <div className="contact-us-container-leftside-lists-text">
            <p>esabrahub@gmail.com</p>
          </div>
        </div>

        <div className="contact-us-container-leftside-lists">
          <div className="contact-us-container-leftside-lists-icon">
            <FontAwesomeIcon icon={faPhone} className="contactus-icon"/>
          </div>
          <div className="contact-us-container-leftside-lists-text">
            <p>+94705845755</p>
          </div>
        </div>
      </div>

      <div className="contact-us-rightside">
        <form onSubmit={handleSubmit} className="contact-us-rightside-form">
          <h2>Send Message</h2>
          <div className="contact-us-rightside-inputBox">
            <input
              type="text"
              required="required"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
            />
            <span>Full Name</span>
          </div>
          <div className="contact-us-rightside-inputBox">
            <input
              type="text"
              required="required"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <span>Email</span>
          </div>
          <div className="contact-us-rightside-inputBox">
            <textarea
              required="required"
              rows="8"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            ></textarea>
            <span>Type Your Message</span>
          </div>
          <div className="contact-us-rightside-inputBox">
            <input type="submit" className="contact-us-rightside-btn" value="Send" />
          </div>
        </form>
      </div>
    </div>
  );
};

export default ContactUs;
