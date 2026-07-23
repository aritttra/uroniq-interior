import React from 'react';
import { motion } from 'framer-motion';

const steps = [
  { num: '01', title: 'Consultation', desc: 'Initial meeting to understand your vision.' },
  { num: '02', title: 'Planning', desc: 'Gathering requirements and space planning.' },
  { num: '03', title: 'Concept', desc: 'Creating 3D designs and selecting materials.' },
  { num: '04', title: 'Execution', desc: 'Project management and implementation.' },
  { num: '05', title: 'Delivery', desc: 'Final walkthrough and space handover.' }
];

const Process = () => {
  return (
    <section className="section" style={{ backgroundColor: 'var(--color-gray-900)' }}>
      <div className="container">
        <div style={{ textAlign: 'center', marginBottom: '5rem' }}>
          <h2 className="heading-lg">Our Design <span className="text-gold">Process</span></h2>
        </div>

        <div style={{ position: 'relative', maxWidth: '800px', margin: '0 auto' }}>
          {/* Vertical Line */}
          <div style={{ position: 'absolute', left: '50%', top: 0, bottom: 0, width: '2px', backgroundColor: 'var(--color-gray-800)', transform: 'translateX(-50%)' }}></div>

          {steps.map((step, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.6 }}
              style={{
                display: 'flex',
                justifyContent: idx % 2 === 0 ? 'flex-start' : 'flex-end',
                position: 'relative',
                marginBottom: '4rem',
                width: '100%'
              }}
            >
              <div style={{ width: '45%', textAlign: idx % 2 === 0 ? 'right' : 'left', position: 'relative' }}>
                <div style={{
                  position: 'absolute',
                  top: '50%',
                  [idx % 2 === 0 ? 'right' : 'left']: '-11%',
                  width: '20px',
                  height: '20px',
                  backgroundColor: 'var(--color-gold)',
                  borderRadius: '50%',
                  transform: 'translateY(-50%)',
                  zIndex: 2,
                  boxShadow: '0 0 0 5px var(--color-gray-900)'
                }}></div>
                <div className="text-gold" style={{ fontFamily: 'var(--font-serif)', fontSize: '3rem', opacity: 0.3, lineHeight: 1 }}>{step.num}</div>
                <h3 className="heading-sm" style={{ marginBottom: '0.5rem', marginTop: '-1rem' }}>{step.title}</h3>
                <p style={{ color: 'var(--color-gray-400)' }}>{step.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Process;
