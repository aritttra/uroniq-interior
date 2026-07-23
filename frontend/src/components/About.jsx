import React from 'react';
import { motion } from 'framer-motion';

const About = () => {
  return (
    <section id="about" className="section">
      <div className="container grid grid-cols-2 gap-8 items-center">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="heading-lg" style={{ marginBottom: '2rem' }}>Design <span className="text-gold">Beyond Ordinary</span></h2>
          <p style={{ marginBottom: '1.5rem', color: 'var(--color-gray-400)', fontSize: '1.1rem' }}>
            We are a premier interior design agency dedicated to transforming ordinary spaces into extraordinary environments. With a keen eye for detail and a passion for perfection, our expert designers craft bespoke interiors that resonate with luxury and comfort.
          </p>
          <p style={{ marginBottom: '2rem', color: 'var(--color-gray-400)', fontSize: '1.1rem' }}>
            From conceptualization to execution, we ensure every element serves a purpose while maintaining a cohesive, sophisticated aesthetic. Let us help you realize the true potential of your space.
          </p>
          <div style={{ display: 'flex', gap: '2rem', borderTop: '1px solid var(--color-gray-800)', paddingTop: '2rem' }}>
            <div>
              <div className="text-gold" style={{ fontSize: '2rem', fontFamily: 'var(--font-serif)' }}>Award</div>
              <div style={{ fontSize: '0.9rem', color: 'var(--color-gray-400)' }}>Winning Design</div>
            </div>
            <div>
              <div className="text-gold" style={{ fontSize: '2rem', fontFamily: 'var(--font-serif)' }}>Premium</div>
              <div style={{ fontSize: '0.9rem', color: 'var(--color-gray-400)' }}>Quality Materials</div>
            </div>
          </div>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          style={{ position: 'relative' }}
        >
          <div style={{ position: 'absolute', top: '-2rem', right: '-2rem', width: '100%', height: '100%', border: '2px solid var(--color-gold)', zIndex: -1 }}></div>
          <img src="/about.png" alt="Luxury Interior" style={{ width: '100%', height: 'auto', display: 'block', objectFit: 'cover', aspectRatio: '4/5' }} />
        </motion.div>
      </div>
    </section>
  );
};

export default About;
