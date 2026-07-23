import React from 'react';
import { motion } from 'framer-motion';

const Hero = ({ onOpenModal }) => {
  return (
    <section id="home" style={{
      position: 'relative',
      height: '100vh',
      display: 'flex',
      alignItems: 'center',
      paddingTop: '80px',
      overflow: 'hidden'
    }}>
      <div style={{
        position: 'absolute',
        top: 0, left: 0, right: 0, bottom: 0,
        backgroundImage: 'url(/hero.png)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        zIndex: -2
      }}></div>
      <div style={{
        position: 'absolute',
        top: 0, left: 0, right: 0, bottom: 0,
        background: 'linear-gradient(to right, rgba(5,5,5,0.95) 0%, rgba(5,5,5,0.3) 100%)',
        zIndex: -1
      }}></div>

      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: 'easeOut' }}
          style={{ maxWidth: '800px' }}
        >
          <h1 className="heading-xl" style={{ marginBottom: '1.5rem', color: 'var(--color-white)' }}>
            Where Every Space <br />
            <span className="text-gold">Becomes a Masterpiece</span>
          </h1>
          <p style={{ fontSize: '1.125rem', color: 'var(--color-gray-200)', marginBottom: '3rem', maxWidth: '600px' }}>
            We blend creativity, functionality, and sophistication to create interiors that reflect your personality and elevate your lifestyle.
          </p>
          <div className="flex items-center gap-4">
            <button className="btn btn-primary" onClick={onOpenModal}>Make a Schedule</button>
            <a href="#about" className="btn btn-outline">Learn More</a>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
