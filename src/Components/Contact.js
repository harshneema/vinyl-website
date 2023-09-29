import React from 'react';
import './Styles/Contact.css'; // Import your CSS file for Contact
import Navbar from './Navbar';
import { motion } from 'framer-motion';
import BottomBar from './BottomBar';

const fadeIn = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 1 } }
};

const slideUp = {
  hidden: { y: 50, opacity: 0 },
  visible: { y: 0, opacity: 1, transition: { type: "spring", stiffness: 60 } }
};

function Contact() {
  return (
    <div className="contact-container">
      <Navbar />
      <motion.header className="contact-header" initial="hidden" animate="visible" variants={fadeIn}>
        <h1 className="contact-title">Contact Us</h1>
      </motion.header>
      <motion.main className="contact-content" initial="hidden" animate="visible" variants={slideUp}>
        <form className="contact-form">
          <div className="form-group">
            <label className="form-label" htmlFor="name">Your Name</label>
            <input className="form-input" type="text" id="name" name="name" placeholder="John Doe" />
          </div>
          <div className="form-group">
            <label className="form-label" htmlFor="email">Your Email</label>
            <input className="form-input" type="email" id="email" name="email" placeholder="johndoe@example.com" />
          </div>
          <div className="form-group">
            <label className="form-label" htmlFor="message">Your Message</label>
            <textarea className="form-textarea" id="message" name="message" placeholder="Type your message here"></textarea>
          </div>
          <button className="submit-button" type="submit">Submit</button>
        </form>
      </motion.main>
      <BottomBar/>
    </div>
  );
}

export default Contact;
