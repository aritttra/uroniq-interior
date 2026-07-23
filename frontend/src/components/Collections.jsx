import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, ArrowLeft, Calendar, ArrowRight } from 'lucide-react';
import { serviceCategories } from '../data/servicesData';

const Collections = ({ onOpenModal, onSelectService, externalNav }) => {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedSubcategory, setSelectedSubcategory] = useState(null);
  const scrollRef = useRef(null);
  // Handle external navigation from Navbar
  useEffect(() => {
    if (!externalNav) return;
    const { categoryId, subcategoryName } = externalNav;
    const cat = serviceCategories.find(c => c.id === categoryId);
    if (cat) {
      setSelectedCategory(cat);
      if (subcategoryName) {
        const sub = cat.subcategories.find(s => s.name === subcategoryName);
        if (sub) setSelectedSubcategory(sub);
        else setSelectedSubcategory(null);
      } else {
        setSelectedSubcategory(null);
      }
      // Scroll to section
      setTimeout(() => {
        document.getElementById('collections')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 50);
    }
  }, [externalNav]);

  const scrollBy = (direction) => {
    const el = scrollRef.current;
    if (!el) return;
    const amount = 340;
    if (direction === 'left') {
      if (el.scrollLeft <= 10) {
        el.scrollTo({ left: el.scrollWidth - el.clientWidth, behavior: 'smooth' });
      } else {
        el.scrollBy({ left: -amount, behavior: 'smooth' });
      }
    } else {
      if (el.scrollLeft >= el.scrollWidth - el.clientWidth - 10) {
        el.scrollTo({ left: 0, behavior: 'smooth' });
      } else {
        el.scrollBy({ left: amount, behavior: 'smooth' });
      }
    }
  };

  const handleCategoryClick = (cat) => {
    setSelectedCategory(cat);
    setSelectedSubcategory(null);
  };

  const handleBack = () => {
    setSelectedCategory(null);
    setSelectedSubcategory(null);
  };

  const handleSubcategoryClick = (sub) => {
    setSelectedSubcategory(prev => prev?.name === sub.name ? null : sub);
  };

  const activeCat = serviceCategories.find(c => c.id === selectedCategory?.id);

  return (
    <section id="collections" className="section" style={{ backgroundColor: 'var(--color-black)', overflow: 'hidden' }}>
      <div className="container">
        {/* Section Header */}
        <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
          <h2 className="heading-lg">Our <span className="text-gold">Services</span></h2>
          <p style={{ color: 'var(--color-gray-400)', fontSize: '1.2rem', maxWidth: '700px', margin: '1rem auto 0' }}>
            Comprehensive interior solutions spanning residential, commercial, and hospitality spaces—crafted with precision and passion.
          </p>
        </div>

        <AnimatePresence mode="wait">
          {!selectedCategory ? (
            /* ======= SERVICE CATEGORY GRID ======= */
            <motion.div
              key="category-grid"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
            >
              <div className="collections-category-grid">
                {serviceCategories.map((cat, idx) => {
                  const Icon = cat.icon;
                  return (
                    <motion.div
                      key={cat.id}
                      initial={{ opacity: 0, y: 30 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: idx * 0.06 }}
                      className="collections-cat-card"
                      onClick={() => handleCategoryClick(cat)}
                      style={{ '--cat-color': cat.color }}
                    >
                      <div className="collections-cat-icon-wrap">
                        <Icon size={28} strokeWidth={1.5} />
                      </div>
                      <h3 className="collections-cat-title">{cat.title}</h3>
                      <p className="collections-cat-desc">{cat.description}</p>
                      <div className="collections-cat-footer">
                        <span className="collections-cat-count">{cat.subcategories.length} Services</span>
                        <span className="collections-cat-arrow">
                          Explore <ArrowRight size={14} />
                        </span>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </motion.div>
          ) : (
            /* ======= EXPANDED CATEGORY VIEW ======= */
            <motion.div
              key="expanded-view"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
            >
              {/* Back + Category Header */}
              <div className="collections-expanded-header">
                <button className="collections-back-btn" onClick={handleBack}>
                  <ArrowLeft size={18} />
                  <span>All Services</span>
                </button>
                <div className="collections-expanded-title-row">
                  {activeCat && (() => {
                    const Icon = activeCat.icon;
                    return (
                      <div className="collections-expanded-icon" style={{ '--cat-color': activeCat.color }}>
                        <Icon size={32} strokeWidth={1.5} />
                      </div>
                    );
                  })()}
                  <div>
                    <h3 className="collections-expanded-title">{activeCat?.title}</h3>
                    <p className="collections-expanded-desc">{activeCat?.description}</p>
                  </div>
                </div>
              </div>

              {/* Horizontally Scrollable Subcategory Cards */}
              <div className="collections-scroll-wrapper">
                {/* Left scroll arrow */}
                <button
                  className="collections-scroll-btn collections-scroll-btn-left"
                  onClick={() => scrollBy('left')}
                  aria-label="Scroll left"
                >
                  <ChevronLeft size={22} />
                </button>

                {/* Scroll container */}
                <div
                  className="collections-scroll-container"
                  ref={scrollRef}
                >
                  {activeCat?.subcategories.map((sub, idx) => (
                    <motion.div
                      key={sub.name}
                      initial={{ opacity: 0, x: 40 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.4, delay: idx * 0.04 }}
                      className={`collections-sub-card ${selectedSubcategory?.name === sub.name ? 'active' : ''}`}
                      onClick={() => handleSubcategoryClick(sub)}
                      style={{ '--cat-color': activeCat.color }}
                    >
                      <div className="collections-sub-img-wrap">
                        <img src={sub.img} alt={sub.name} loading="lazy" />
                        <div className="collections-sub-img-overlay" />
                      </div>
                      <div className="collections-sub-info">
                        <h4 className="collections-sub-name">{sub.name}</h4>
                        <p className="collections-sub-desc">{sub.description}</p>
                      </div>
                      <div className="collections-sub-view-btn">
                        View Details <ArrowRight size={12} />
                      </div>
                    </motion.div>
                  ))}
                </div>

                {/* Right scroll arrow */}
                <button
                  className="collections-scroll-btn collections-scroll-btn-right"
                  onClick={() => scrollBy('right')}
                  aria-label="Scroll right"
                >
                  <ChevronRight size={22} />
                </button>
              </div>

              {/* Subcategory Detail Panel */}
              <AnimatePresence mode="wait">
                {selectedSubcategory && (
                  <motion.div
                    key={selectedSubcategory.name}
                    initial={{ opacity: 0, y: 20, height: 0 }}
                    animate={{ opacity: 1, y: 0, height: 'auto' }}
                    exit={{ opacity: 0, y: 10, height: 0 }}
                    transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
                    className="collections-detail-panel"
                    style={{ '--cat-color': activeCat?.color }}
                  >
                    <div className="collections-detail-inner">
                      <div className="collections-detail-img-side">
                        <img src={selectedSubcategory.img} alt={selectedSubcategory.name} />
                        <div className="collections-detail-img-gradient" />
                      </div>
                      <div className="collections-detail-content">
                        <div className="collections-detail-badge" style={{ color: activeCat?.color }}>
                          <span className="collections-detail-dot" style={{ backgroundColor: activeCat?.color }} />
                          {activeCat?.title}
                        </div>
                        <h3 className="collections-detail-title">{selectedSubcategory.name}</h3>
                        <p className="collections-detail-desc">{selectedSubcategory.description}</p>
                        <div className="collections-detail-features">
                          <div className="collections-detail-feature">
                            <span className="collections-feature-check" style={{ color: activeCat?.color }}>✓</span>
                            Custom design consultation
                          </div>
                          <div className="collections-detail-feature">
                            <span className="collections-feature-check" style={{ color: activeCat?.color }}>✓</span>
                            Premium materials & finishes
                          </div>
                          <div className="collections-detail-feature">
                            <span className="collections-feature-check" style={{ color: activeCat?.color }}>✓</span>
                            End-to-end project management
                          </div>
                          <div className="collections-detail-feature">
                            <span className="collections-feature-check" style={{ color: activeCat?.color }}>✓</span>
                            Quality assurance & handover
                          </div>
                        </div>
                        <div className="collections-detail-actions">
                          <button className="btn btn-primary" onClick={onOpenModal}>
                            <Calendar size={16} />
                            Book Consultation
                          </button>
                          <button
                            className="collections-detail-more-btn"
                            onClick={() => onSelectService && onSelectService(selectedSubcategory.name)}
                          >
                            View Full Details <ArrowRight size={14} />
                          </button>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Bottom CTA */}
        <div className="collections-bottom-cta">
          <h2 className="heading-md" style={{ marginBottom: '1rem' }}>Inspired by What You See?</h2>
          <p style={{ color: 'var(--color-gray-200)', fontSize: '1.2rem', marginBottom: '3rem', maxWidth: '600px', margin: '0 auto 3rem' }}>
            Let's create a space that reflects your vision, lifestyle, and personality.
          </p>
          <button className="btn btn-primary" onClick={onOpenModal}>Make a Schedule</button>
        </div>
      </div>

      {/* ======= STYLES ======= */}
      <style dangerouslySetInnerHTML={{ __html: `
        /* === Category Grid === */
        .collections-category-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 1.5rem;
        }

        .collections-cat-card {
          background: rgba(18, 18, 18, 0.6);
          border: 1px solid rgba(255, 255, 255, 0.06);
          border-radius: 12px;
          padding: 2rem;
          cursor: pointer;
          transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
          position: relative;
          overflow: hidden;
          backdrop-filter: blur(8px);
        }

        .collections-cat-card::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 2px;
          background: var(--cat-color, var(--color-gold));
          transform: scaleX(0);
          transition: transform 0.4s cubic-bezier(0.4, 0, 0.2, 1);
          transform-origin: left;
        }

        .collections-cat-card:hover::before {
          transform: scaleX(1);
        }

        .collections-cat-card:hover {
          background: rgba(25, 25, 25, 0.9);
          border-color: rgba(255, 255, 255, 0.12);
          transform: translateY(-4px);
          box-shadow: 0 12px 40px rgba(0, 0, 0, 0.5), 0 0 20px rgba(212, 175, 55, 0.03);
        }

        .collections-cat-icon-wrap {
          width: 52px;
          height: 52px;
          border-radius: 12px;
          background: rgba(255, 255, 255, 0.04);
          border: 1px solid rgba(255, 255, 255, 0.08);
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 1.25rem;
          color: var(--cat-color, var(--color-gold));
          transition: all 0.3s ease;
        }

        .collections-cat-card:hover .collections-cat-icon-wrap {
          background: rgba(212, 175, 55, 0.08);
          border-color: var(--cat-color, var(--color-gold));
          box-shadow: 0 0 15px rgba(212, 175, 55, 0.1);
        }

        .collections-cat-title {
          font-family: var(--font-serif);
          font-size: 1.25rem;
          color: var(--color-white);
          margin-bottom: 0.75rem;
          line-height: 1.3;
        }

        .collections-cat-desc {
          font-size: 0.88rem;
          color: var(--color-gray-400);
          line-height: 1.6;
          margin-bottom: 1.5rem;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }

        .collections-cat-footer {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding-top: 1rem;
          border-top: 1px solid rgba(255, 255, 255, 0.06);
        }

        .collections-cat-count {
          font-size: 0.78rem;
          color: var(--color-gray-400);
          text-transform: uppercase;
          letter-spacing: 0.1em;
          font-weight: 500;
        }

        .collections-cat-arrow {
          font-size: 0.8rem;
          color: var(--cat-color, var(--color-gold));
          display: flex;
          align-items: center;
          gap: 0.35rem;
          font-weight: 500;
          opacity: 0;
          transform: translateX(-8px);
          transition: all 0.3s ease;
        }

        .collections-cat-card:hover .collections-cat-arrow {
          opacity: 1;
          transform: translateX(0);
        }

        /* === Expanded Header === */
        .collections-expanded-header {
          margin-bottom: 2.5rem;
        }

        .collections-back-btn {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          background: none;
          border: 1px solid rgba(255, 255, 255, 0.1);
          color: var(--color-gray-400);
          font-family: var(--font-sans);
          font-size: 0.85rem;
          padding: 0.5rem 1rem;
          cursor: pointer;
          border-radius: 6px;
          margin-bottom: 1.5rem;
          transition: all 0.3s;
        }

        .collections-back-btn:hover {
          color: var(--color-white);
          border-color: var(--color-gold);
        }

        .collections-expanded-title-row {
          display: flex;
          align-items: center;
          gap: 1.25rem;
        }

        .collections-expanded-icon {
          width: 60px;
          height: 60px;
          border-radius: 14px;
          background: rgba(255, 255, 255, 0.04);
          border: 1px solid rgba(255, 255, 255, 0.1);
          display: flex;
          align-items: center;
          justify-content: center;
          color: var(--cat-color, var(--color-gold));
          flex-shrink: 0;
        }

        .collections-expanded-title {
          font-family: var(--font-serif);
          font-size: 2rem;
          color: var(--color-white);
          margin-bottom: 0.25rem;
        }

        .collections-expanded-desc {
          color: var(--color-gray-400);
          font-size: 1rem;
        }

        /* === Scroll Area === */
        .collections-scroll-wrapper {
          position: relative;
          margin: 0 -2rem;
          padding: 0 2rem;
        }

        .collections-scroll-container {
          display: flex;
          gap: 1.25rem;
          overflow-x: auto;
          scroll-behavior: smooth;
          scroll-snap-type: x mandatory;
          padding: 1rem 0.5rem 2rem;
          -ms-overflow-style: none;
          scrollbar-width: none;
        }

        .collections-scroll-container::-webkit-scrollbar {
          display: none;
        }

        .collections-scroll-btn {
          position: absolute;
          top: 50%;
          transform: translateY(-50%);
          width: 44px;
          height: 44px;
          border-radius: 50%;
          background: rgba(10, 10, 10, 0.9);
          border: 1px solid rgba(255, 255, 255, 0.12);
          color: var(--color-white);
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          z-index: 10;
          transition: all 0.3s;
          backdrop-filter: blur(8px);
        }

        .collections-scroll-btn:hover {
          border-color: var(--color-gold);
          color: var(--color-gold);
          box-shadow: 0 0 15px rgba(212, 175, 55, 0.15);
        }

        .collections-scroll-btn-left {
          left: 0.5rem;
        }

        .collections-scroll-btn-right {
          right: 0.5rem;
        }

        /* === Subcategory Cards === */
        .collections-sub-card {
          min-width: 300px;
          max-width: 300px;
          background: rgba(15, 15, 15, 0.8);
          border: 1px solid rgba(255, 255, 255, 0.06);
          border-radius: 10px;
          overflow: hidden;
          cursor: pointer;
          transition: all 0.35s cubic-bezier(0.4, 0, 0.2, 1);
          scroll-snap-align: start;
          flex-shrink: 0;
          display: flex;
          flex-direction: column;
        }

        .collections-sub-card:hover {
          border-color: rgba(255, 255, 255, 0.15);
          transform: translateY(-4px);
          box-shadow: 0 12px 30px rgba(0, 0, 0, 0.5);
        }

        .collections-sub-card.active {
          border-color: var(--cat-color, var(--color-gold));
          box-shadow: 0 0 20px rgba(212, 175, 55, 0.1), 0 12px 30px rgba(0, 0, 0, 0.5);
        }

        .collections-sub-img-wrap {
          position: relative;
          width: 100%;
          height: 180px;
          overflow: hidden;
        }

        .collections-sub-img-wrap img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.5s ease;
        }

        .collections-sub-card:hover .collections-sub-img-wrap img {
          transform: scale(1.08);
        }

        .collections-sub-img-overlay {
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          height: 60%;
          background: linear-gradient(to top, rgba(15, 15, 15, 1), transparent);
          pointer-events: none;
        }

        .collections-sub-info {
          padding: 1rem 1.25rem 0.5rem;
          flex: 1;
        }

        .collections-sub-name {
          font-family: var(--font-serif);
          font-size: 1.05rem;
          color: var(--color-white);
          margin-bottom: 0.5rem;
          line-height: 1.3;
        }

        .collections-sub-desc {
          font-size: 0.8rem;
          color: var(--color-gray-400);
          line-height: 1.5;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }

        .collections-sub-view-btn {
          display: flex;
          align-items: center;
          gap: 0.4rem;
          padding: 0.75rem 1.25rem;
          font-size: 0.78rem;
          color: var(--cat-color, var(--color-gold));
          text-transform: uppercase;
          letter-spacing: 0.08em;
          font-weight: 500;
          border-top: 1px solid rgba(255, 255, 255, 0.04);
          transition: all 0.3s;
        }

        .collections-sub-card:hover .collections-sub-view-btn {
          color: var(--color-white);
        }

        /* === Detail Panel === */
        .collections-detail-panel {
          margin-top: 2rem;
          overflow: hidden;
          border-radius: 12px;
          border: 1px solid rgba(255, 255, 255, 0.08);
          background: rgba(12, 12, 12, 0.9);
          backdrop-filter: blur(12px);
        }

        .collections-detail-inner {
          display: flex;
          min-height: 400px;
        }

        .collections-detail-img-side {
          flex: 1.1;
          position: relative;
          overflow: hidden;
        }

        .collections-detail-img-side img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          position: absolute;
          top: 0;
          left: 0;
        }

        .collections-detail-img-gradient {
          position: absolute;
          top: 0;
          right: 0;
          bottom: 0;
          width: 50%;
          background: linear-gradient(to left, rgba(12, 12, 12, 0.95), transparent);
          pointer-events: none;
        }

        .collections-detail-content {
          flex: 1;
          padding: 2.5rem;
          display: flex;
          flex-direction: column;
          justify-content: center;
        }

        .collections-detail-badge {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          font-size: 0.72rem;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.15em;
          margin-bottom: 0.75rem;
        }

        .collections-detail-dot {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          display: inline-block;
        }

        .collections-detail-title {
          font-family: var(--font-serif);
          font-size: 2rem;
          color: var(--color-white);
          margin-bottom: 1rem;
          line-height: 1.2;
        }

        .collections-detail-desc {
          font-size: 0.95rem;
          color: var(--color-gray-400);
          line-height: 1.7;
          margin-bottom: 1.5rem;
        }

        .collections-detail-features {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 0.6rem;
          margin-bottom: 2rem;
        }

        .collections-detail-feature {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          font-size: 0.82rem;
          color: var(--color-gray-400);
        }

        .collections-feature-check {
          font-weight: 700;
          font-size: 0.9rem;
        }

        .collections-detail-actions {
          display: flex;
          align-items: center;
          gap: 1.5rem;
          flex-wrap: wrap;
        }

        .collections-detail-actions .btn {
          display: inline-flex;
          align-items: center;
          gap: 0.6rem;
        }

        .collections-detail-more-btn {
          background: none;
          border: none;
          color: var(--color-gray-400);
          font-family: var(--font-sans);
          font-size: 0.85rem;
          cursor: pointer;
          display: inline-flex;
          align-items: center;
          gap: 0.4rem;
          transition: color 0.3s;
          padding: 0;
        }

        .collections-detail-more-btn:hover {
          color: var(--color-gold);
        }

        /* === Bottom CTA === */
        .collections-bottom-cta {
          margin-top: 6rem;
          padding: 5rem 2rem;
          background-color: rgba(26, 26, 26, 0.4);
          border: 1px solid rgba(255, 255, 255, 0.05);
          text-align: center;
          backdrop-filter: blur(10px);
          border-radius: 8px;
        }

        /* === Responsive === */
        @media (max-width: 1024px) {
          .collections-category-grid {
            grid-template-columns: repeat(2, 1fr);
          }
          .collections-sub-card {
            min-width: 260px;
            max-width: 260px;
          }
          .collections-detail-inner {
            flex-direction: column;
            min-height: auto;
          }
          .collections-detail-img-side {
            height: 250px;
            flex: none;
          }
          .collections-detail-img-gradient {
            width: 100%;
            height: 50%;
            top: auto;
            bottom: 0;
            left: 0;
            right: 0;
            background: linear-gradient(to top, rgba(12, 12, 12, 0.95), transparent);
          }
        }

        @media (max-width: 768px) {
          .collections-category-grid {
            grid-template-columns: 1fr;
          }
          .collections-expanded-title {
            font-size: 1.5rem;
          }
          .collections-sub-card {
            min-width: 240px;
            max-width: 240px;
          }
          .collections-sub-img-wrap {
            height: 140px;
          }
          .collections-detail-features {
            grid-template-columns: 1fr;
          }
          .collections-detail-title {
            font-size: 1.5rem;
          }
          .collections-detail-content {
            padding: 1.5rem;
          }
          .collections-scroll-btn {
            width: 36px;
            height: 36px;
          }
        }
      `}} />
    </section>
  );
};

export default Collections;
