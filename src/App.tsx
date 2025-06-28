import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Services from './components/Services';
import Projects from './components/Projects';
import VideoShowcase from './components/VideoShowcase';
import Skills from './components/Skills';
import Stats from './components/Stats';
import Contact from './components/Contact';
import Footer from './components/Footer';
import ChatBot from './components/ChatBot';
import BackgroundElements from './components/BackgroundElements';

function App() {
  return (
    <Router>
      
      <div className="min-h-screen bg-primary text-text-primary overflow-x-hidden overflow-y-hidden">
        <BackgroundElements />
        <Navbar />
        <main className="relative z-10">
          <Hero />
          <About />
          <Services />
          <Projects />
          <VideoShowcase />
          <Skills />
          <Stats />
          <Contact />
        </main>
        <Footer />
        <ChatBot />
      </div>
    </Router>
  );
}

export default App;