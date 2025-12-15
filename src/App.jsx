import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import Services from './components/Services';
import Portfolio from './components/Portfolio';
import Stats from './components/Stats';
import Contact from './components/Contact';
import Footer from './components/Footer';
import ScrollBackground from './components/ScrollBackground';

// Solar System Imports
import SolarSystem from './solar-system/pages/SolarSystem';
import PlanetDetail from './solar-system/pages/PlanetDetail';
import Background from './solar-system/components/Background';
import LanguageSwitcher from './solar-system/components/LanguageSwitcher';

const MainLayout = () => (
  <>
    <ScrollBackground />
    <Header />
    <Hero />
    <main id="main" className="site-main" style={{ background: 'transparent' }}>
      <About />
      <Skills />
      <Services />
      <Portfolio />
      <Stats />
      <Contact />
    </main>
    <Footer />
  </>
);

const SolarLayout = () => (
  <>
    <Background />
    <LanguageSwitcher />
    <Routes>
      <Route path="/" element={<SolarSystem />} />
      <Route path="/planet/:id" element={<PlanetDetail />} />
    </Routes>
  </>
);

function App() {
  return (
    <Router>
      <div className="app-container" style={{ minHeight: '100vh', position: 'relative' }}>
        <Routes>
          <Route path="/" element={<MainLayout />} />
          <Route path="/solar/*" element={<SolarLayout />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
