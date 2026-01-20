import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Hero from './components/Hero';
import Skills from './components/Skills';
import Services from './components/Services';
import Portfolio from './components/Portfolio';
import Stats from './components/Stats';
import Contact from './components/Contact';
import Footer from './components/Footer';
import ScrollBackground from './components/ScrollBackground';

const MainLayout = () => (
  <>
    <ScrollBackground />
    <Header />
    <Hero />
    <main id="main" className="site-main" style={{ background: 'transparent' }}>
      <Skills />
      <Services />
      <Portfolio />
      <Stats />
      <Contact />
    </main>
    <Footer />
  </>
);

function App() {
  return (
    <Router basename={import.meta.env.BASE_URL}>
      <div className="app-container" style={{ minHeight: '100vh', position: 'relative' }}>
        <Routes>
          <Route path="/" element={<MainLayout />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
