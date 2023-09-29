import React , {useEffect}from 'react';
import './Styles/TracklistSection.css'; 
import { motion, useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';


function TracklistSection({ tracklist, selected, albumCover }) {
  const controls = useAnimation();
  const [ref, inView] = useInView({
    triggerOnce: true,
  });

  // Trigger animation when the element is in view
  useEffect(() => {
    if (inView) {
      controls.start({
        opacity: 1,
        x: 0,
        transition: { duration: 1, ease: 'easeOut' }
      });
    }
  }, [controls, inView]);

  return (
    <section className="tracklist-section">
      <div className="container">
        <motion.div 
          className="left"
          initial={{ x: '100%', opacity: 0 }} 
          animate={controls}
          ref={ref}
        ></motion.div>
        <div className="right">
          <div className="tracklist-content">
            <h1>Tracklist</h1>
            <ul>
              {tracklist.map((track, index) => (
                <li key={index}>{track}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}

export default TracklistSection;


