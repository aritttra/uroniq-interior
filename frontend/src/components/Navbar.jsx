import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronRight } from 'lucide-react';
import { serviceCategories } from '../data/servicesData';

const Navbar = ({ onOpenModal, onNavigateCollection }) => {
  const [scrolled, setScrolled] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [hoveredCategory, setHoveredCategory] = useState(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const dropdownTimeout = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const openDropdown = () => {
    clearTimeout(dropdownTimeout.current);
    setIsDropdownOpen(true);
    if (!hoveredCategory) setHoveredCategory(serviceCategories[0]);
  };

  const closeDropdown = () => {
    dropdownTimeout.current = setTimeout(() => {
      setIsDropdownOpen(false);
      setHoveredCategory(null);
    }, 150);
  };

  const handleCategoryClick = (cat) => {
    setIsDropdownOpen(false);
    setIsMobileMenuOpen(false);
    setHoveredCategory(null);
    onNavigateCollection({ categoryId: cat.id });
  };

  const handleSubcategoryClick = (cat, sub) => {
    setIsDropdownOpen(false);
    setIsMobileMenuOpen(false);
    setHoveredCategory(null);
    onNavigateCollection({ categoryId: cat.id, subcategoryName: sub.name });
  };

  return (
    <header style={{
      position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100,
      transition: 'all 0.3s ease',
      backgroundColor: scrolled || isMobileMenuOpen ? 'rgba(43, 31, 25, 0.98)' : 'transparent',
      backdropFilter: scrolled ? 'blur(10px)' : 'none',
      borderBottom: scrolled ? '1px solid rgba(255, 255, 255, 0.05)' : 'none',
      padding: scrolled ? '0.8rem 0' : '1.2rem 0'
    }}>
      <div className="container flex items-center justify-between" style={{ position: 'relative' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <img src="/logo.svg" alt="Uroniq Interiors" style={{ height: '55px', width: 'auto' }} />
          <div className="navbar-logo-text" style={{
            display: 'flex',
            flexDirection: 'column',
            fontFamily: "'Cinzel Decorative', serif",
            color: '#D2B48C',
            fontWeight: 700,
            lineHeight: 1,
            letterSpacing: '0.12em',
            fontSize: '1.25rem'
          }}>
            <span style={{ fontSize: '1em' }}>URONIQ</span>
            <span style={{ fontSize: '0.58em', marginTop: '0.2rem', opacity: 0.85, letterSpacing: '0.2em' }}>INTERIORS</span>
          </div>
        </div>
        
        {/* Desktop Nav */}
        <nav className="desktop-nav" style={{ display: 'flex', gap: '2rem', alignItems: 'center' }}>
          <a href="#home" className="nav-link-hover" style={{ fontSize: '0.9rem', transition: 'color 0.3s' }}>Home</a>
          <a href="#about" className="nav-link-hover" style={{ fontSize: '0.9rem', transition: 'color 0.3s' }}>About</a>
          <a href="#services" className="nav-link-hover" style={{ fontSize: '0.9rem', transition: 'color 0.3s' }}>Services</a>
          
          {/* Collections Mega Dropdown */}
          <div 
            style={{ position: 'relative' }}
            onMouseEnter={openDropdown}
            onMouseLeave={closeDropdown}
          >
            <button 
              style={{ 
                background: 'none', border: 'none', color: isDropdownOpen ? 'var(--color-gold)' : 'var(--color-white)', 
                fontSize: '0.9rem', cursor: 'pointer', transition: 'color 0.3s', 
                display: 'flex', alignItems: 'center', gap: '0.4rem', fontFamily: 'inherit',
                padding: '0.5rem 0', margin: 0
              }}
              onClick={() => {
                document.getElementById('collections')?.scrollIntoView({ behavior: 'smooth' });
                setIsDropdownOpen(false);
              }}
            >
              Collections 
              <span style={{ 
                fontSize: '0.65rem', 
                transform: isDropdownOpen ? 'rotate(180deg)' : 'none', 
                transition: 'transform 0.3s',
                display: 'inline-block'
              }}>▼</span>
            </button>
            
            <AnimatePresence>
              {isDropdownOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 12 }}
                  transition={{ duration: 0.25 }}
                  className="navbar-mega-dropdown"
                  onMouseEnter={() => clearTimeout(dropdownTimeout.current)}
                  onMouseLeave={closeDropdown}
                >
                  {/* Left: Category List */}
                  <div className="navbar-mega-cats">
                    {serviceCategories.map((cat) => {
                      const Icon = cat.icon;
                      const isHovered = hoveredCategory?.id === cat.id;
                      return (
                        <button
                          key={cat.id}
                          className={`navbar-mega-cat-item ${isHovered ? 'active' : ''}`}
                          onMouseEnter={() => setHoveredCategory(cat)}
                          onClick={() => handleCategoryClick(cat)}
                          style={{ '--cat-color': cat.color }}
                        >
                          <div className="navbar-mega-cat-icon">
                            <Icon size={16} strokeWidth={1.5} />
                          </div>
                          <span className="navbar-mega-cat-label">{cat.title}</span>
                          <ChevronRight size={14} className="navbar-mega-cat-chevron" />
                        </button>
                      );
                    })}
                  </div>

                  {/* Right: Subcategories of hovered category */}
                  <div className="navbar-mega-subs">
                    <AnimatePresence mode="wait">
                      {hoveredCategory && (
                        <motion.div
                          key={hoveredCategory.id}
                          initial={{ opacity: 0, x: 10 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: -10 }}
                          transition={{ duration: 0.2 }}
                          className="navbar-mega-subs-inner"
                        >
                          <div className="navbar-mega-subs-header" style={{ color: hoveredCategory.color }}>
                            <span className="navbar-mega-subs-dot" style={{ backgroundColor: hoveredCategory.color }} />
                            {hoveredCategory.title}
                          </div>
                          <div className="navbar-mega-subs-grid">
                            {hoveredCategory.subcategories.map((sub) => (
                              <button
                                key={sub.name}
                                className="navbar-mega-sub-item"
                                onClick={() => handleSubcategoryClick(hoveredCategory, sub)}
                                style={{ '--cat-color': hoveredCategory.color }}
                              >
                                <span className="navbar-mega-sub-bullet" style={{ backgroundColor: hoveredCategory.color }} />
                                <span>{sub.name}</span>
                              </button>
                            ))}
                          </div>
                          <button
                            className="navbar-mega-view-all"
                            onClick={() => handleCategoryClick(hoveredCategory)}
                            style={{ color: hoveredCategory.color }}
                          >
                            View all {hoveredCategory.title} →
                          </button>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <a href="#contact" style={{ fontSize: '0.9rem', transition: 'color 0.3s' }}>Contact</a>
        </nav>

        <div className="desktop-nav">
          <button className="btn btn-primary" onClick={onOpenModal}>Make a Schedule</button>
        </div>

        {/* Mobile Hamburger Toggle Button */}
        <button 
          className="mobile-toggle-btn"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label="Toggle menu"
          style={{
            display: 'none', background: 'none', border: 'none', color: '#fff', fontSize: '1.5rem', cursor: 'pointer'
          }}
        >
          {isMobileMenuOpen ? '✕' : '☰'}
        </button>
      </div>

      {/* Mobile Drawer Menu */}
      {isMobileMenuOpen && (
        <div className="mobile-menu-drawer" style={{
          backgroundColor: 'rgba(43, 31, 25, 0.98)',
          borderBottom: '1px solid var(--color-gray-800)',
          padding: '1.5rem',
          display: 'flex',
          flexDirection: 'column',
          gap: '1rem'
        }}>
          <a href="#home" onClick={() => setIsMobileMenuOpen(false)}>Home</a>
          <a href="#about" onClick={() => setIsMobileMenuOpen(false)}>About</a>
          <a href="#services" onClick={() => setIsMobileMenuOpen(false)}>Services</a>
          <a href="#collections" onClick={() => setIsMobileMenuOpen(false)}>Collections</a>
          <a href="#contact" onClick={() => setIsMobileMenuOpen(false)}>Contact</a>
          <button className="btn btn-primary" style={{ marginTop: '0.5rem', width: '100%' }} onClick={() => { setIsMobileMenuOpen(false); onOpenModal(); }}>Make a Schedule</button>
        </div>
      )}

      {/* Mega Dropdown Styles */}
      <style dangerouslySetInnerHTML={{ __html: `
        .navbar-mega-dropdown {
          position: absolute;
          top: calc(100% + 0.5rem);
          left: 50%;
          transform: translateX(-40%);
          width: 720px;
          background: rgba(43, 31, 25, 0.98);
          backdrop-filter: blur(20px);
          border: 1px solid rgba(255, 255, 255, 0.08);
          border-radius: 10px;
          box-shadow: 0 20px 50px rgba(0, 0, 0, 0.8), 0 0 30px rgba(210, 180, 140, 0.04);
          display: flex;
          overflow: hidden;
          z-index: 1000;
        }

        /* Left panel - category list */
        .navbar-mega-cats {
          width: 260px;
          padding: 0.5rem;
          display: flex;
          flex-direction: column;
          border-right: 1px solid rgba(255, 255, 255, 0.06);
          max-height: 480px;
          overflow-y: auto;
        }

        .navbar-mega-cats::-webkit-scrollbar { width: 3px; }
        .navbar-mega-cats::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.1); border-radius: 3px; }

        .navbar-mega-cat-item {
          display: flex;
          align-items: center;
          gap: 0.6rem;
          padding: 0.65rem 0.85rem;
          background: none;
          border: none;
          color: var(--color-gray-400);
          font-family: var(--font-sans);
          font-size: 0.82rem;
          cursor: pointer;
          text-align: left;
          border-radius: 6px;
          transition: all 0.2s ease;
          width: 100%;
          position: relative;
        }

        .navbar-mega-cat-item:hover,
        .navbar-mega-cat-item.active {
          background: var(--color-gray-700);
          color: var(--color-white);
        }

        .navbar-mega-cat-item.active {
          background: rgba(255, 255, 255, 0.06);
        }

        .navbar-mega-cat-item.active::before {
          content: '';
          position: absolute;
          left: 0;
          top: 25%;
          bottom: 25%;
          width: 2px;
          background: var(--cat-color, var(--color-gold));
          border-radius: 2px;
        }

        .navbar-mega-cat-icon {
          width: 28px;
          height: 28px;
          border-radius: 6px;
          background: rgba(255, 255, 255, 0.03);
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
          color: var(--cat-color, var(--color-gold));
          transition: all 0.2s;
        }

        .navbar-mega-cat-item.active .navbar-mega-cat-icon,
        .navbar-mega-cat-item:hover .navbar-mega-cat-icon {
          background: rgba(210, 180, 140, 0.08);
        }

        .navbar-mega-cat-label {
          flex: 1;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        .navbar-mega-cat-chevron {
          opacity: 0.3;
          flex-shrink: 0;
          transition: all 0.2s;
        }

        .navbar-mega-cat-item.active .navbar-mega-cat-chevron,
        .navbar-mega-cat-item:hover .navbar-mega-cat-chevron {
          opacity: 0.7;
          color: var(--cat-color, var(--color-gold));
        }

        /* Right panel - subcategories */
        .navbar-mega-subs {
          flex: 1;
          padding: 1.25rem;
          min-height: 300px;
          overflow-y: auto;
          max-height: 480px;
        }

        .navbar-mega-subs::-webkit-scrollbar { width: 3px; }
        .navbar-mega-subs::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.1); border-radius: 3px; }

        .navbar-mega-subs-inner {
          display: flex;
          flex-direction: column;
          height: 100%;
        }

        .navbar-mega-subs-header {
          font-size: 0.7rem;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.15em;
          margin-bottom: 1rem;
          padding-bottom: 0.6rem;
          border-bottom: 1px solid rgba(255, 255, 255, 0.06);
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }

        .navbar-mega-subs-dot {
          width: 5px;
          height: 5px;
          border-radius: 50%;
          display: inline-block;
        }

        .navbar-mega-subs-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 0.15rem;
          flex: 1;
        }

        .navbar-mega-sub-item {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.5rem 0.6rem;
          background: none;
          border: none;
          color: var(--color-gray-400);
          font-family: var(--font-sans);
          font-size: 0.8rem;
          cursor: pointer;
          text-align: left;
          border-radius: 4px;
          transition: all 0.2s ease;
          width: 100%;
        }

        .navbar-mega-sub-item:hover {
          background: var(--color-gray-700);
          color: var(--color-white);
        }

        .navbar-mega-sub-bullet {
          width: 4px;
          height: 4px;
          border-radius: 50%;
          flex-shrink: 0;
          opacity: 0.5;
          transition: opacity 0.2s;
        }

        .navbar-mega-sub-item:hover .navbar-mega-sub-bullet {
          opacity: 1;
        }

        .navbar-mega-view-all {
          background: none;
          border: none;
          font-family: var(--font-sans);
          font-size: 0.78rem;
          font-weight: 500;
          cursor: pointer;
          padding: 0.75rem 0 0.25rem;
          margin-top: 0.75rem;
          border-top: 1px solid rgba(255, 255, 255, 0.06);
          text-align: left;
          transition: opacity 0.2s;
        }

        .navbar-mega-view-all:hover {
          opacity: 0.8;
        }

        /* Responsive - hide mega on small screens */
        @media (max-width: 1024px) {
          .navbar-mega-dropdown {
            width: 500px;
            transform: translateX(-60%);
          }
          .navbar-mega-cats {
            width: 200px;
          }
          .navbar-mega-subs-grid {
            grid-template-columns: 1fr;
          }
        }

        @media (max-width: 768px) {
          .desktop-nav {
            display: none !important;
          }
          .mobile-toggle-btn {
            display: block !important;
          }
          .navbar-mega-dropdown {
            width: calc(100vw - 2rem);
            left: 0;
            transform: translateX(-40%);
            flex-direction: column;
          }
          .navbar-mega-cats {
            width: 100%;
            max-height: 200px;
            border-right: none;
            border-bottom: 1px solid rgba(255, 255, 255, 0.06);
          }
          .navbar-mega-subs {
            max-height: 250px;
          }
        }
      `}} />
    </header>
  );
};

export default Navbar;
