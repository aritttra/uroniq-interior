import React from 'react';
import { motion } from 'framer-motion';
import { Home, Briefcase, Building, Hammer, Sofa, Layers } from 'lucide-react';

const services = [
  { icon: Home, title: 'Residential Interior Design', desc: 'Create a sanctuary that reflects your personal style and accommodates your lifestyle.' },
  { icon: Briefcase, title: 'Office Interior Design', desc: 'Inspire productivity and brand identity with a modern, functional workspace.' },
  { icon: Building, title: 'Commercial Interior Design', desc: 'Engage customers and elevate your brand with stunning commercial spaces.' },
  { icon: Hammer, title: 'Renovation & Remodeling', desc: 'Transform existing spaces into modern masterpieces with our expert team.' },
  { icon: Sofa, title: 'Furniture & Decor', desc: 'Curated selection of premium furniture and decor to complete your space.' },
  { icon: Layers, title: 'Full Design Package', desc: 'Comprehensive end-to-end design solutions from concept to final installation.' },
];

const Services = ({ onOpenModal }) => {
  return (
    <section id="services" className="section">
      <div className="container">
        <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
          <h2 className="heading-lg">Our Expert <span className="text-gold">Services</span></h2>
        </div>

        <div className="grid grid-cols-3 gap-8" style={{ marginBottom: '4rem' }}>
          {services.map((service, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="glass"
              style={{
                padding: '2.5rem',
                borderTop: '2px solid transparent',
                transition: 'all 0.3s ease',
                cursor: 'pointer'
              }}
              onMouseOver={e => {
                e.currentTarget.style.borderTopColor = 'var(--color-gold)';
                e.currentTarget.style.backgroundColor = 'rgba(26, 26, 26, 0.8)';
              }}
              onMouseOut={e => {
                e.currentTarget.style.borderTopColor = 'transparent';
                e.currentTarget.style.backgroundColor = 'rgba(26, 26, 26, 0.4)';
              }}
            >
              <service.icon size={40} className="text-gold" style={{ marginBottom: '1.5rem' }} />
              <h3 className="heading-sm" style={{ marginBottom: '1rem', fontSize: '1.25rem' }}>{service.title}</h3>
              <p style={{ color: 'var(--color-gray-400)', marginBottom: '1.5rem' }}>{service.desc}</p>
              <button style={{ 
                background: 'none', border: 'none', color: 'var(--color-gold)', 
                fontFamily: 'var(--font-sans)', textTransform: 'uppercase', 
                fontSize: '0.8rem', letterSpacing: '0.1em', cursor: 'pointer',
                display: 'flex', alignItems: 'center', gap: '0.5rem'
              }} onClick={onOpenModal}>
                Learn More <span style={{ fontSize: '1.2rem' }}>→</span>
              </button>
            </motion.div>
          ))}
        </div>

        <div style={{ textAlign: 'center' }}>
          <button className="btn btn-primary" onClick={onOpenModal}>Make a Schedule</button>
        </div>
      </div>
    </section>
  );
};

export default Services;
