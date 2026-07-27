import React, { useState, useEffect } from 'react';
import { AnimatePresence } from 'framer-motion';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Services from './components/Services';
import Collections from './components/Collections';
import Process from './components/Process';
import Contact from './components/Contact';
import Footer from './components/Footer';
import ConsultationModal from './components/ConsultationModal';

import ServiceDetailModal from './components/ServiceDetailModal';

function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedService, setSelectedService] = useState(null);
  const [collectionNav, setCollectionNav] = useState(null);

  useEffect(() => {
    if (isModalOpen || selectedService) {
      document.body.classList.add('modal-open');
    } else {
      document.body.classList.remove('modal-open');
    }
  }, [isModalOpen, selectedService]);

  const handleNavigateCollection = (nav) => {
    // Use a new object each time so useEffect always triggers even for the same category
    setCollectionNav({ ...nav, _ts: Date.now() });
  };

  return (
    <>
      <Navbar onOpenModal={() => setIsModalOpen(true)} onNavigateCollection={handleNavigateCollection} />
      <main>
        <Hero onOpenModal={() => setIsModalOpen(true)} />
        <About />
        <Services onOpenModal={() => setIsModalOpen(true)} />
        <Process />
        <Collections onOpenModal={() => setIsModalOpen(true)} onSelectService={setSelectedService} externalNav={collectionNav} />

        <Contact onOpenModal={() => setIsModalOpen(true)} />
      </main>
      <Footer />
      {isModalOpen && <ConsultationModal onClose={() => setIsModalOpen(false)} />}
      
      <AnimatePresence>
        {selectedService && (
          <ServiceDetailModal 
            category={selectedService} 
            onClose={() => setSelectedService(null)} 
            onOpenConsultation={() => {
              setSelectedService(null);
              setIsModalOpen(true);
            }}
          />
        )}
      </AnimatePresence>
    </>
  );
}

export default App;
