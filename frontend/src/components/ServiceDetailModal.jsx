import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronLeft, ChevronRight, Check, Calendar } from 'lucide-react';
import { servicesData } from '../data/servicesData';

const ServiceDetailModal = ({ category, onClose, onOpenConsultation }) => {
  const data = servicesData[category];
  const [currentPhotoIdx, setCurrentPhotoIdx] = useState(0);

  // Handle escape key to close
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  if (!data) return null;

  const handleNextPhoto = (e) => {
    e.stopPropagation();
    setCurrentPhotoIdx((prev) => (prev + 1) % data.photos.length);
  };

  const handlePrevPhoto = (e) => {
    e.stopPropagation();
    setCurrentPhotoIdx((prev) => (prev - 1 + data.photos.length) % data.photos.length);
  };

  return (
    <div 
      style={{
        position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.85)',
        backdropFilter: 'blur(12px)',
        zIndex: 1500,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        padding: '2rem'
      }} 
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 30 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 30 }}
        transition={{ type: 'spring', damping: 25, stiffness: 150 }}
        style={{
          width: '100%',
          maxWidth: '900px',
          maxHeight: '90vh',
          backgroundColor: 'rgba(10, 10, 10, 0.95)',
          border: '1px solid rgba(212, 175, 55, 0.2)',
          boxShadow: '0 20px 50px rgba(0, 0, 0, 0.8), 0 0 30px rgba(212, 175, 55, 0.05)',
          position: 'relative',
          display: 'flex',
          flexDirection: 'row',
          overflow: 'hidden',
          borderRadius: '8px'
        }}
        className="service-card-modal"
      >
        {/* Close Button */}
        <button 
          onClick={onClose} 
          style={{
            position: 'absolute', top: '1.25rem', right: '1.25rem',
            background: 'rgba(10, 10, 10, 0.6)', border: '1px solid rgba(255, 255, 255, 0.1)', 
            color: 'var(--color-white)', borderRadius: '50%', width: '36px', height: '36px',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            cursor: 'pointer', zIndex: 10, transition: 'all 0.3s'
          }}
          onMouseOver={e => {
            e.currentTarget.style.borderColor = 'var(--color-gold)';
            e.currentTarget.style.color = 'var(--color-gold)';
          }}
          onMouseOut={e => {
            e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.1)';
            e.currentTarget.style.color = 'var(--color-white)';
          }}
        >
          <X size={18} />
        </button>

        {/* Left Side: Photo Gallery / Carousel */}
        <div style={{ flex: '1.2', position: 'relative', backgroundColor: '#050505', minHeight: '400px' }}>
          <img 
            src={data.photos[currentPhotoIdx]} 
            alt={`${data.title} portfolio`} 
            style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block', position: 'absolute', top: 0, left: 0 }} 
          />
          <div style={{
            position: 'absolute', top: 0, left: 0, right: 0, bottom: 0,
            background: 'linear-gradient(to right, rgba(0,0,0,0.4) 0%, rgba(0,0,0,0) 40%, rgba(0,0,0,0) 60%, rgba(0,0,0,0.6) 100%)',
            pointerEvents: 'none'
          }} />

          {/* Navigation Arrows for Photos */}
          {data.photos.length > 1 && (
            <>
              <button 
                onClick={handlePrevPhoto} 
                style={{
                  position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)',
                  background: 'rgba(10, 10, 10, 0.7)', border: '1px solid rgba(255,255,255,0.08)', color: 'var(--color-white)',
                  width: '40px', height: '40px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center',
                  cursor: 'pointer', zIndex: 5, transition: 'all 0.3s'
                }}
                onMouseOver={e => e.currentTarget.style.borderColor = 'var(--color-gold)'}
                onMouseOut={e => e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)'}
              >
                <ChevronLeft size={20} />
              </button>
              <button 
                onClick={handleNextPhoto} 
                style={{
                  position: 'absolute', right: '1rem', top: '50%', transform: 'translateY(-50%)',
                  background: 'rgba(10, 10, 10, 0.7)', border: '1px solid rgba(255,255,255,0.08)', color: 'var(--color-white)',
                  width: '40px', height: '40px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center',
                  cursor: 'pointer', zIndex: 5, transition: 'all 0.3s'
                }}
                onMouseOver={e => e.currentTarget.style.borderColor = 'var(--color-gold)'}
                onMouseOut={e => e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)'}
              >
                <ChevronRight size={20} />
              </button>
            </>
          )}

          {/* Thumbnail/Indicator Dots */}
          {data.photos.length > 1 && (
            <div style={{
              position: 'absolute', bottom: '1.5rem', left: '50%', transform: 'translateX(-50%)',
              display: 'flex', gap: '0.5rem', zIndex: 5,
              background: 'rgba(0,0,0,0.5)', padding: '0.4rem 0.8rem', borderRadius: '20px', backdropFilter: 'blur(5px)'
            }}>
              {data.photos.map((_, idx) => (
                <div 
                  key={idx}
                  onClick={(e) => { e.stopPropagation(); setCurrentPhotoIdx(idx); }}
                  style={{
                    width: '8px', height: '8px', borderRadius: '50%',
                    backgroundColor: idx === currentPhotoIdx ? 'var(--color-gold)' : 'rgba(255,255,255,0.4)',
                    cursor: 'pointer', transition: 'all 0.3s'
                  }}
                />
              ))}
            </div>
          )}
        </div>

        {/* Right Side: Contact-Card Details */}
        <div style={{ flex: '1', padding: '2.5rem', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', borderLeft: '1px solid rgba(255, 255, 255, 0.05)', backgroundColor: 'rgba(15, 15, 15, 0.95)' }}>
          <div>
            {/* Header / Sub-title */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.75rem' }}>
              <span style={{ display: 'inline-block', width: '6px', height: '6px', backgroundColor: 'var(--color-gold)', borderRadius: '50%' }}></span>
              <span style={{ fontSize: '0.75rem', fontWeight: 600, letterSpacing: '0.15em', color: 'var(--color-gold)', textTransform: 'uppercase' }}>
                NÜVO DESIGN SERVICE
              </span>
            </div>

            {/* Main Title */}
            <h3 style={{ 
              fontFamily: 'var(--font-serif)', fontSize: '2rem', color: 'var(--color-white)', 
              marginBottom: '1.5rem', lineHeight: '1.2', borderBottom: '1px solid rgba(255,255,255,0.08)', paddingBottom: '0.75rem' 
            }}>
              {data.title}
            </h3>

            {/* Contact Card Details Block */}
            <div style={{ 
              display: 'flex', flexDirection: 'column', gap: '0.8rem', 
              backgroundColor: 'rgba(255,255,255,0.02)', padding: '1.25rem', 
              borderRadius: '6px', border: '1px solid rgba(255,255,255,0.05)',
              marginBottom: '1.5rem'
            }}>
              <div style={{ display: 'flex', fontSize: '0.85rem' }}>
                <span style={{ width: '100px', color: 'var(--color-gray-400)', fontWeight: 500 }}>Vibe:</span>
                <span style={{ color: 'var(--color-white)', fontWeight: 600 }}>{data.vibe}</span>
              </div>
              <div style={{ display: 'flex', fontSize: '0.85rem' }}>
                <span style={{ width: '100px', color: 'var(--color-gray-400)', fontWeight: 500 }}>Timeline:</span>
                <span style={{ color: 'var(--color-white)', fontWeight: 600 }}>{data.timeframe}</span>
              </div>
              <div style={{ display: 'flex', fontSize: '0.85rem' }}>
                <span style={{ width: '100px', color: 'var(--color-gray-400)', fontWeight: 500 }}>Materials:</span>
                <span style={{ color: 'var(--color-gold)', fontWeight: 600 }}>{data.materials}</span>
              </div>
            </div>

            {/* Description */}
            <p style={{ color: 'var(--color-gray-300)', fontSize: '0.95rem', lineHeight: '1.6', marginBottom: '1.5rem' }}>
              {data.desc}
            </p>

            {/* Included Features */}
            <div style={{ marginBottom: '2rem' }}>
              <h4 style={{ color: 'var(--color-white)', fontSize: '0.9rem', fontWeight: 600, marginBottom: '0.75rem', letterSpacing: '0.05em' }}>
                SERVICE INCLUSIONS:
              </h4>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                {data.features.map((feature, idx) => (
                  <li key={idx} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--color-gray-400)', fontSize: '0.85rem' }}>
                    <Check size={14} className="text-gold" style={{ flexShrink: 0 }} />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Action CTA */}
          <button 
            className="btn btn-primary" 
            onClick={onOpenConsultation}
            style={{
              width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.75rem',
              padding: '1rem', cursor: 'pointer'
            }}
          >
            <Calendar size={16} />
            <span>Book Service Consultation</span>
          </button>
        </div>
      </motion.div>

      {/* Embedded CSS for responsive styles */}
      <style dangerouslySetInnerHTML={{__html: `
        @media (max-width: 768px) {
          .service-card-modal {
            flex-direction: column !important;
            max-height: 95vh !important;
            overflow-y: auto !important;
          }
          .service-card-modal > div {
            flex: none !important;
            width: 100% !important;
          }
          .service-card-modal > div:first-child {
            height: 250px !important;
            min-height: 250px !important;
          }
        }
      `}} />
    </div>
  );
};

export default ServiceDetailModal;
