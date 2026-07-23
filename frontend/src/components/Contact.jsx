import React from 'react';
import { motion } from 'framer-motion';
import { Phone, Mail, MapPin } from 'lucide-react';

const Contact = ({ onOpenModal }) => {
  return (
    <section id="contact" className="section" style={{ position: 'relative' }}>
      <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, backgroundImage: 'url(/office.png)', backgroundSize: 'cover', backgroundPosition: 'center', zIndex: -2 }}></div>
      <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(5, 5, 5, 0.85)', zIndex: -1 }}></div>

      <div className="container">
        <div style={{ maxWidth: '800px', margin: '0 auto', textAlign: 'center' }}>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="heading-lg" style={{ marginBottom: '1.5rem' }}>Ready To <span className="text-gold">Transform Your Space?</span></h2>
            <p style={{ fontSize: '1.2rem', color: 'var(--color-gray-200)', marginBottom: '3rem' }}>
              Book a consultation with our expert designers and let's start bringing your vision to life.
            </p>
            <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', marginBottom: '4rem' }}>
              <button className="btn btn-primary" onClick={onOpenModal}>Make a Schedule</button>
              <a href="tel:+1234567890" className="btn btn-outline">Call Now</a>
            </div>
            
            <div className="grid grid-cols-3 gap-4 text-center">
              <div>
                <Phone className="text-gold" size={24} style={{ margin: '0 auto 1rem' }} />
                <div>+1 (234) 567-8900</div>
              </div>
              <div>
                <Mail className="text-gold" size={24} style={{ margin: '0 auto 1rem' }} />
                <div>hello@uroniqinteriors.com</div>
              </div>
              <div>
                <MapPin className="text-gold" size={24} style={{ margin: '0 auto 1rem' }} />
                <div>123 Luxury Avenue, NY</div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
