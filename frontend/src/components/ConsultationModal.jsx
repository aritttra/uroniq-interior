import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronRight, ChevronLeft, CheckCircle2 } from 'lucide-react';

const ConsultationModal = ({ onClose }) => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: '', phone: '', email: '', city: '',
    service: '',
    propertyType: '', propertySize: '',
    budget: '',
    timeline: '',
    styles: [],
    description: ''
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [refNumber, setRefNumber] = useState('');

  // Handle escape key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  const validateStep = () => {
    let newErrors = {};
    if (step === 1) {
      if (!formData.name || formData.name.length < 2) newErrors.name = 'Name must be at least 2 characters';
      if (!formData.email || !/^\S+@\S+\.\S+$/.test(formData.email)) newErrors.email = 'Valid email is required';
      if (!formData.phone) newErrors.phone = 'Phone number is required';
      if (!formData.city) newErrors.city = 'City is required';
    } else if (step === 2 && !formData.service) {
      newErrors.service = 'Please select a service';
    } else if (step === 3) {
      if (!formData.propertyType) newErrors.propertyType = 'Property type is required';
      if (!formData.propertySize) newErrors.propertySize = 'Property size is required';
    } else if (step === 4 && !formData.budget) {
      newErrors.budget = 'Please select a budget range';
    } else if (step === 5 && !formData.timeline) {
      newErrors.timeline = 'Please select a timeline';
    } else if (step === 6 && formData.styles.length === 0) {
      newErrors.styles = 'Please select at least one style';
    } else if (step === 7) {
      if (!formData.description || formData.description.length < 20) newErrors.description = 'Please provide more details (min 20 characters)';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateStep()) {
      setStep(prev => prev + 1);
    }
  };

  const handlePrev = () => {
    setStep(prev => prev - 1);
  };

  const handleSubmit = async () => {
    if (validateStep()) {
      setIsSubmitting(true);
      setErrors({});

      try {
        const response = await fetch('http://localhost:5000/api/consultation', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData),
        });

        const data = await response.json();

        if (response.ok && data.success) {
          setRefNumber(data.refNumber);
          setIsSuccess(true);
        } else {
          setErrors({ submit: data.message || 'Failed to submit consultation request. Please try again.' });
        }
      } catch (err) {
        console.error('Error submitting consultation request:', err);
        setErrors({ submit: 'Could not connect to the backend server. Please make sure the backend is running.' });
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  const toggleStyle = (style) => {
    setFormData(prev => ({
      ...prev,
      styles: prev.styles.includes(style)
        ? prev.styles.filter(s => s !== style)
        : [...prev.styles, style]
    }));
  };

  const inputStyle = {
    width: '100%',
    padding: '1rem',
    background: 'rgba(26, 26, 26, 0.6)',
    border: '1px solid var(--color-gray-800)',
    color: 'white',
    outline: 'none',
    fontFamily: 'var(--font-sans)',
    marginBottom: '0.5rem',
    transition: 'border-color 0.3s'
  };

  const selectCardStyle = (isSelected) => ({
    padding: '1.5rem',
    border: `1px solid ${isSelected ? 'var(--color-gold)' : 'var(--color-gray-800)'}`,
    background: isSelected ? 'rgba(212, 175, 55, 0.1)' : 'rgba(26, 26, 26, 0.6)',
    cursor: 'pointer',
    transition: 'all 0.3s',
    textAlign: 'center',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  });

  const renderStepContent = () => {
    switch (step) {
      case 1:
        return (
          <div className="flex-col gap-4">
            <div>
              <input type="text" placeholder="Full Name" style={inputStyle} value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} />
              {errors.name && <div style={{ color: '#ef4444', fontSize: '0.8rem' }}>{errors.name}</div>}
            </div>
            <div>
              <input type="email" placeholder="Email Address" style={inputStyle} value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} />
              {errors.email && <div style={{ color: '#ef4444', fontSize: '0.8rem' }}>{errors.email}</div>}
            </div>
            <div>
              <input type="tel" placeholder="Phone Number" style={inputStyle} value={formData.phone} onChange={e => setFormData({...formData, phone: e.target.value})} />
              {errors.phone && <div style={{ color: '#ef4444', fontSize: '0.8rem' }}>{errors.phone}</div>}
            </div>
            <div>
              <input type="text" placeholder="City / Location" style={inputStyle} value={formData.city} onChange={e => setFormData({...formData, city: e.target.value})} />
              {errors.city && <div style={{ color: '#ef4444', fontSize: '0.8rem' }}>{errors.city}</div>}
            </div>
          </div>
        );
      case 2:
        return (
          <div className="grid grid-cols-2 gap-4">
            {['Residential Interior Design', 'Office Interior Design', 'Commercial Interior Design', 'Renovation', 'Furniture & Decor Consultation', 'Full Interior Design Package', 'Other'].map(s => (
              <div key={s} style={selectCardStyle(formData.service === s)} onClick={() => setFormData({...formData, service: s})}>
                {s}
              </div>
            ))}
            {errors.service && <div style={{ color: '#ef4444', fontSize: '0.8rem', gridColumn: 'span 2' }}>{errors.service}</div>}
          </div>
        );
      case 3:
        return (
          <div className="flex-col gap-8">
            <div>
              <h4 style={{ marginBottom: '1rem', color: 'var(--color-gray-400)' }}>Property Type</h4>
              <div className="grid grid-cols-3 gap-2">
                {['Apartment', 'Villa', 'Independent House', 'Office', 'Retail Store', 'Restaurant', 'Hotel', 'Other'].map(t => (
                  <div key={t} style={{...selectCardStyle(formData.propertyType === t), padding: '1rem', fontSize: '0.9rem'}} onClick={() => setFormData({...formData, propertyType: t})}>
                    {t}
                  </div>
                ))}
              </div>
              {errors.propertyType && <div style={{ color: '#ef4444', fontSize: '0.8rem', marginTop: '0.5rem' }}>{errors.propertyType}</div>}
            </div>
            <div>
              <h4 style={{ marginBottom: '1rem', color: 'var(--color-gray-400)' }}>Property Size</h4>
              <div className="grid grid-cols-2 gap-2">
                {['Below 500 sq ft', '500–1000 sq ft', '1000–2000 sq ft', '2000–5000 sq ft', 'Above 5000 sq ft'].map(s => (
                  <div key={s} style={{...selectCardStyle(formData.propertySize === s), padding: '1rem', fontSize: '0.9rem'}} onClick={() => setFormData({...formData, propertySize: s})}>
                    {s}
                  </div>
                ))}
              </div>
              {errors.propertySize && <div style={{ color: '#ef4444', fontSize: '0.8rem', marginTop: '0.5rem' }}>{errors.propertySize}</div>}
            </div>
          </div>
        );
      case 4:
        return (
          <div className="grid grid-cols-2 gap-4">
            {['Under ₹2 Lakhs', '₹2–5 Lakhs', '₹5–10 Lakhs', '₹10–20 Lakhs', '₹20–50 Lakhs', 'Above ₹50 Lakhs'].map(b => (
              <div key={b} style={selectCardStyle(formData.budget === b)} onClick={() => setFormData({...formData, budget: b})}>
                {b}
              </div>
            ))}
            {errors.budget && <div style={{ color: '#ef4444', fontSize: '0.8rem', gridColumn: 'span 2' }}>{errors.budget}</div>}
          </div>
        );
      case 5:
        return (
          <div className="flex-col gap-4">
            {['Immediately', 'Within 1 Month', 'Within 3 Months', 'Within 6 Months', 'Just Exploring'].map(t => (
              <div key={t} style={{...selectCardStyle(formData.timeline === t), justifyContent: 'flex-start'}} onClick={() => setFormData({...formData, timeline: t})}>
                {t}
              </div>
            ))}
            {errors.timeline && <div style={{ color: '#ef4444', fontSize: '0.8rem' }}>{errors.timeline}</div>}
          </div>
        );
      case 6:
        return (
          <div className="grid grid-cols-3 gap-4">
            {['Modern', 'Minimalist', 'Luxury', 'Contemporary', 'Scandinavian', 'Industrial', 'Traditional', 'Not Sure'].map(s => (
              <div key={s} style={selectCardStyle(formData.styles.includes(s))} onClick={() => toggleStyle(s)}>
                {s}
              </div>
            ))}
            {errors.styles && <div style={{ color: '#ef4444', fontSize: '0.8rem', gridColumn: 'span 3' }}>{errors.styles}</div>}
          </div>
        );
      case 7:
        return (
          <div className="flex-col gap-4">
            <textarea 
              placeholder="Describe your project, design goals, inspirations, preferred colors, functionality requirements, special requests, and any details that will help us understand your vision."
              style={{ ...inputStyle, minHeight: '200px', resize: 'vertical' }}
              value={formData.description}
              onChange={e => setFormData({...formData, description: e.target.value})}
              maxLength={1000}
            ></textarea>
            <div style={{ textAlign: 'right', color: 'var(--color-gray-400)', fontSize: '0.8rem' }}>
              {formData.description.length}/1000
            </div>
            {errors.description && <div style={{ color: '#ef4444', fontSize: '0.8rem' }}>{errors.description}</div>}
          </div>
        );
      default: return null;
    }
  };

  const stepTitles = [
    "Tell us about yourself",
    "What service are you interested in?",
    "Tell us about your property",
    "What is your estimated budget?",
    "When would you like to begin?",
    "What design style do you prefer?",
    "Tell us about your vision"
  ];

  return (
    <div style={{
      position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
      backgroundColor: 'rgba(0, 0, 0, 0.8)',
      backdropFilter: 'blur(8px)',
      zIndex: 1000,
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      padding: '2rem'
    }} onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}>
      
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        style={{
          width: '100%', maxWidth: '800px', maxHeight: '90vh',
          backgroundColor: 'rgba(17, 17, 17, 0.95)',
          border: '1px solid var(--color-gray-800)',
          position: 'relative',
          display: 'flex', flexDirection: 'column'
        }}
      >
        <button onClick={onClose} style={{
          position: 'absolute', top: '1.5rem', right: '1.5rem',
          background: 'none', border: 'none', color: 'var(--color-gray-400)',
          cursor: 'pointer', zIndex: 10
        }}>
          <X size={24} />
        </button>

        {isSuccess ? (
          <div style={{ padding: '4rem', textAlign: 'center' }}>
            <CheckCircle2 size={80} className="text-gold" style={{ margin: '0 auto 2rem' }} />
            <h2 className="heading-md" style={{ marginBottom: '1rem' }}>Thank You!</h2>
            <p style={{ color: 'var(--color-gray-200)', fontSize: '1.1rem', marginBottom: '2rem', maxWidth: '400px', margin: '0 auto 2rem' }}>
              We've received your project requirements. Our design team will review your submission and contact you shortly.
            </p>
            <div style={{ padding: '1.5rem', border: '1px dashed var(--color-gold)', display: 'inline-block', marginBottom: '3rem' }}>
              <div style={{ color: 'var(--color-gray-400)', fontSize: '0.9rem', marginBottom: '0.5rem' }}>Reference Number</div>
              <div className="text-gold" style={{ fontSize: '1.5rem', fontWeight: 600, letterSpacing: '0.1em' }}>{refNumber}</div>
            </div>
            <div>
              <button className="btn btn-primary" onClick={onClose}>Return to Website</button>
            </div>
          </div>
        ) : (
          <>
            <div style={{ padding: '2rem 3rem', borderBottom: '1px solid var(--color-gray-800)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                <span style={{ color: 'var(--color-gold)', fontWeight: 600 }}>Step {step} of 7</span>
                <span style={{ color: 'var(--color-gray-400)', fontSize: '0.9rem' }}>{Math.round((step / 7) * 100)}% Completed</span>
              </div>
              <div style={{ width: '100%', height: '4px', backgroundColor: 'var(--color-gray-800)', borderRadius: '2px', overflow: 'hidden' }}>
                <div style={{ width: `${(step / 7) * 100}%`, height: '100%', backgroundColor: 'var(--color-gold)', transition: 'width 0.3s' }}></div>
              </div>
            </div>

            <div style={{ padding: '3rem', flex: 1, overflowY: 'auto' }}>
              <h2 className="heading-sm" style={{ marginBottom: '2rem' }}>{stepTitles[step - 1]}</h2>
              <AnimatePresence mode="wait">
                <motion.div
                  key={step}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  {renderStepContent()}
                </motion.div>
              </AnimatePresence>
            </div>

            {errors.submit && (
              <div style={{ color: '#ef4444', fontSize: '0.9rem', textAlign: 'center', padding: '0 3rem 1.5rem', fontFamily: 'var(--font-sans)' }}>
                {errors.submit}
              </div>
            )}

            <div style={{ padding: '2rem 3rem', borderTop: '1px solid var(--color-gray-800)', display: 'flex', justifyContent: 'space-between' }}>
              {step > 1 ? (
                <button className="btn btn-outline" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }} onClick={handlePrev}>
                  <ChevronLeft size={18} /> Previous
                </button>
              ) : <div></div>}

              {step < 7 ? (
                <button className="btn btn-primary" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }} onClick={handleNext}>
                  Next <ChevronRight size={18} />
                </button>
              ) : (
                <button className="btn btn-primary" onClick={handleSubmit} disabled={isSubmitting}>
                  {isSubmitting ? 'Submitting...' : 'Request Consultation'}
                </button>
              )}
            </div>
          </>
        )}
      </motion.div>
    </div>
  );
};

export default ConsultationModal;
