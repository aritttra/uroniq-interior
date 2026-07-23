import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2 } from 'lucide-react';

const stats = [
  { value: '12+', label: 'Years Experience' },
  { value: '1000+', label: 'Projects Completed' },
  { value: '95%', label: 'Client Satisfaction' },
  { value: '40+', label: 'Expert Designers' }
];

const benefits = [
  "Personalized Design Approach",
  "End-to-End Project Management",
  "Premium Materials",
  "Timely Delivery",
  "Transparent Communication"
];

const WhyChooseUs = () => {
  return (
    <section className="section" style={{ backgroundColor: 'var(--color-gray-900)' }}>
      <div className="container">
        <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
          <h2 className="heading-lg">Why <span className="text-gold">Choose Us</span></h2>
        </div>

        <div className="grid grid-cols-4 gap-4" style={{ marginBottom: '4rem' }}>
          {stats.map((stat, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="glass"
              style={{
                padding: '2rem',
                textAlign: 'center',
                borderBottom: '2px solid var(--color-gold)',
                transition: 'transform 0.3s ease'
              }}
              onMouseOver={e => e.currentTarget.style.transform = 'translateY(-5px)'}
              onMouseOut={e => e.currentTarget.style.transform = 'translateY(0)'}
            >
              <div className="text-gold heading-md" style={{ marginBottom: '0.5rem' }}>{stat.value}</div>
              <div style={{ color: 'var(--color-gray-200)', fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>{stat.label}</div>
            </motion.div>
          ))}
        </div>

        <div className="grid grid-cols-2 gap-8 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <img src="/residential.png" alt="Interior Detail" style={{ width: '100%', height: 'auto', objectFit: 'cover' }} />
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <h3 className="heading-sm" style={{ marginBottom: '1.5rem' }}>The Uroniq Difference</h3>
            <ul style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {benefits.map((benefit, idx) => (
                <li key={idx} style={{ display: 'flex', alignItems: 'center', gap: '1rem', fontSize: '1.1rem', color: 'var(--color-gray-200)' }}>
                  <CheckCircle2 size={20} className="text-gold" />
                  {benefit}
                </li>
              ))}
            </ul>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
