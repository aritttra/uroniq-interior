import React from 'react';

const Footer = () => {
  return (
    <footer style={{ backgroundColor: 'var(--color-black)', paddingTop: '4rem', paddingBottom: '2rem', borderTop: '1px solid var(--color-gray-800)' }}>
      <div className="container">
        <div className="grid grid-cols-4 gap-8" style={{ marginBottom: '4rem' }}>
          <div style={{ gridColumn: 'span 2' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1.5rem' }}>
              <img src="/logo.svg" alt="Uroniq Interiors" style={{ height: '50px', width: 'auto' }} />
            </div>
            <p style={{ color: 'var(--color-gray-400)', maxWidth: '400px' }}>
              We blend creativity, functionality, and sophistication to create interiors that reflect your personality and elevate your lifestyle.
            </p>
          </div>
          
          <div>
            <h4 style={{ fontSize: '1.2rem', marginBottom: '1.5rem' }}>Quick Links</h4>
            <ul style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem', color: 'var(--color-gray-400)' }}>
              <li><a href="#home" style={{ transition: 'color 0.3s' }} onMouseOver={e=>e.target.style.color='var(--color-gold)'} onMouseOut={e=>e.target.style.color='var(--color-gray-400)'}>Home</a></li>
              <li><a href="#about" style={{ transition: 'color 0.3s' }} onMouseOver={e=>e.target.style.color='var(--color-gold)'} onMouseOut={e=>e.target.style.color='var(--color-gray-400)'}>About</a></li>
              <li><a href="#services" style={{ transition: 'color 0.3s' }} onMouseOver={e=>e.target.style.color='var(--color-gold)'} onMouseOut={e=>e.target.style.color='var(--color-gray-400)'}>Services</a></li>
              <li><a href="#contact" style={{ transition: 'color 0.3s' }} onMouseOver={e=>e.target.style.color='var(--color-gold)'} onMouseOut={e=>e.target.style.color='var(--color-gray-400)'}>Contact</a></li>
            </ul>
          </div>

          <div>
            <h4 style={{ fontSize: '1.2rem', marginBottom: '1.5rem' }}>Newsletter</h4>
            <p style={{ color: 'var(--color-gray-400)', marginBottom: '1rem', fontSize: '0.9rem' }}>Subscribe to get the latest updates.</p>
            <div style={{ display: 'flex' }}>
              <input type="email" placeholder="Your email address" style={{ padding: '0.8rem', background: 'var(--color-gray-900)', border: '1px solid var(--color-gray-800)', color: 'white', flex: 1, outline: 'none' }} />
              <button 
                style={{ backgroundColor: 'var(--color-gold)', color: 'var(--color-black)', border: 'none', padding: '0 1.5rem', cursor: 'pointer', fontWeight: 600, transition: 'all 0.3s' }}
                onMouseOver={e => { e.currentTarget.style.backgroundColor = 'var(--color-gold-dark)'; }}
                onMouseOut={e => { e.currentTarget.style.backgroundColor = 'var(--color-gold)'; }}
              >
                OK
              </button>
            </div>
          </div>
        </div>

        <div style={{ textAlign: 'center', color: 'var(--color-gray-400)', fontSize: '0.9rem', borderTop: '1px solid var(--color-gray-800)', paddingTop: '2rem' }}>
          &copy; {new Date().getFullYear()} Uroniq Interiors. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
