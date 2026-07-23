import React from 'react';
import { motion } from 'framer-motion';
import { Star } from 'lucide-react';

const testimonials = [
  { name: 'Sarah Jenkins', role: 'Homeowner', review: 'Uroniq completely transformed our living space. Their attention to detail and ability to capture our vision was extraordinary. Highly recommended for luxury designs.', rating: 5 },
  { name: 'Michael Chen', role: 'CEO, TechFlow', review: 'The office redesign by Uroniq boosted our team morale and productivity. They perfectly balanced modern aesthetics with functional workspaces.', rating: 5 },
  { name: 'Elena Rodriguez', role: 'Restaurant Owner', review: 'Our customers constantly compliment the interior. Uroniq created an atmosphere that is both elegant and welcoming. True professionals.', rating: 5 }
];

const Testimonials = () => {
  return (
    <section id="testimonials" className="section">
      <div className="container">
        <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
          <h2 className="heading-lg">Hear From Our <span className="text-gold">Happy Clients</span></h2>
          <div style={{ display: 'flex', justifyContent: 'center', gap: '2rem', marginTop: '1rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <span className="text-gold" style={{ fontSize: '1.5rem', fontWeight: 600 }}>1000+</span>
              <span style={{ color: 'var(--color-gray-400)' }}>Happy Clients</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <span className="text-gold" style={{ fontSize: '1.5rem', fontWeight: 600 }}>4.9/5</span>
              <span style={{ color: 'var(--color-gray-400)' }}>Average Rating</span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-8">
          {testimonials.map((test, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="glass"
              style={{ padding: '2.5rem', borderRadius: '4px' }}
            >
              <div style={{ display: 'flex', gap: '0.2rem', marginBottom: '1.5rem' }}>
                {[...Array(test.rating)].map((_, i) => <Star key={i} size={16} fill="var(--color-gold)" color="var(--color-gold)" />)}
              </div>
              <p style={{ color: 'var(--color-gray-200)', fontSize: '1.1rem', fontStyle: 'italic', marginBottom: '2rem', lineHeight: 1.8 }}>
                "{test.review}"
              </p>
              <div>
                <div style={{ fontWeight: 600, fontSize: '1.1rem' }}>{test.name}</div>
                <div style={{ color: 'var(--color-gold)', fontSize: '0.9rem' }}>{test.role}</div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
