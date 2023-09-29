import React from 'react';
import './Styles/HorizontalScroller.css'; // Import the CSS file from HorizontalScroller
import Navbar from './Navbar'; 
import { motion,  } from 'framer-motion';
import BottomBar from './BottomBar';


function About() {
  const fadeIn = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 1 } }
  };
  
  const slideInFromRight = {
    hidden: { x: 300, opacity: 0 },
    visible: { x: 0, opacity: 1, transition: { type: "spring", stiffness: 60 } }
  };
  
  return (
    <div className="about-page">
      <Navbar />
        <motion.header className="about-header" initial="hidden" animate="visible" variants={fadeIn}>
        <h1 className="about-heading">About Us</h1>
      </motion.header>
      <motion.main className="detailFrameMain2" initial="hidden" animate="visible" variants={slideInFromRight}>
          <img src='images/pic.jpg' alt = 'ok'></img>
          <p style={{ paddingBottom: '20px' }}>
            Welcome to Vinyl Grooves, your one-stop destination for the finest vinyl records and vintage music classics. 
            Our passion for music and the rich sound of vinyl has driven us to curate an exceptional collection of vinyl records 
            spanning various genres and eras. At Vinyl Grooves, we believe that music is an experience, and vinyl records 
            offer a timeless and authentic way to immerse yourself in your favorite tunes.
          </p>
          <p style={{ paddingBottom: '20px' }}>
            Our collection includes rare and limited-edition vinyl records, carefully selected for audiophiles and collectors. 
            Whether you're a fan of classic rock, jazz, blues, or contemporary hits, you'll find something special in our store. 
            Explore our vinyl store, rediscover the magic of analog sound, and enrich your music journey with Vinyl Grooves.
          </p>

      </motion.main>
      <BottomBar/>
    </div>
  );
}

export default About;
