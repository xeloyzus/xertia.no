import { useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './App.css';

import Navigation from './components/Navigation';
import HeroSection from './sections/HeroSection';
import ServicesSection from './sections/ServicesSection';
import TechnologySection from './sections/TechnologySection';
import ProjectsSection from './sections/ProjectsSection';
import ContactSection from './sections/ContactSection';

gsap.registerPlugin(ScrollTrigger);

function App() {
  useEffect(() => {
    // Smooth scroll behavior
    ScrollTrigger.defaults({
      toggleActions: 'play none none reverse',
    });

    return () => {
      ScrollTrigger.getAll().forEach((st) => st.kill());
    };
  }, []);

  return (
    <div className="relative min-h-screen bg-black ps5-noise">
      <Navigation />
      
      <main className="relative">
        <HeroSection />
        <ServicesSection />
        <TechnologySection />
        <ProjectsSection />
        <ContactSection />
      </main>
    </div>
  );
}

export default App;
