import React from 'react';
import { motion } from 'framer-motion';
import { TypeAnimation } from 'react-type-animation';
import { ArrowDown, Github, Linkedin, Mail } from 'lucide-react';
import Scene3D from './Scene3D';

const Hero = () => {
  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="home" className="min-h-screen flex items-center justify-center relative overflow-hidden">
      {/* 3D Background */}
      <div className="absolute inset-0 z-0">
        <Scene3D />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-8"
          >
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-4xl md:text-6xl lg:text-7xl font-poppins font-bold leading-tight"
            >
              Hi, I'm{' '}
              <span className="bg-gradient-to-r from-secondary to-accent bg-clip-text text-transparent">
                Prabhu
              </span>
            </motion.h1>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-xl md:text-2xl lg:text-3xl font-poppins font-medium text-text-secondary"
            >
              <TypeAnimation
                sequence={[
                  'I am a Web Developer',
                  2000,
                  'I am an AI Engineer',
                  2000,
                  'I am a Creative 3D Designer',
                  2000,
                  'I am a Problem Solver',
                  2000,
                ]}
                wrapper="span"
                speed={50}
                repeat={Infinity}
              />
            </motion.div>

            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="text-lg text-text-secondary max-w-2xl font-inter leading-relaxed"
            >
              I build beautiful, interactive digital experiences that bridge the gap between 
              imagination and reality. Specializing in modern web technologies, AI integration, 
              and 3D visualizations.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
              className="flex flex-col sm:flex-row gap-4"
            >
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => scrollToSection('#projects')}
                className="px-8 py-4 bg-gradient-to-r from-accent-purple to-accent-pink rounded-lg font-manrope font-semibold text-sm uppercase tracking-wider transition-all duration-300 hover:shadow-lg hover:shadow-accent/25"
              >
                See My Work
              </motion.button>
              
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => scrollToSection('#contact')}
                className="px-8 py-4 border border-accent rounded-lg font-manrope font-semibold text-sm uppercase tracking-wider transition-all duration-300 hover:bg-accent/10 hover:shadow-lg hover:shadow-accent/25"
              >
                Get In Touch
              </motion.button>
            </motion.div>

            {/* Social Links */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1 }}
              className="flex space-x-6"
            >
              {[
                { icon: Github, href: 'https://github.com/developer-prabhu-charan', label: 'GitHub' },
                { icon: Linkedin, href: 'https://www.linkedin.com/in/prabhu-charan-jerripothula-8006b7352/', label: 'LinkedIn' },
                { icon: Mail, href: '#contact', label: 'Email' },
              ].map((social) => {
                const Icon = social.icon;
                return (
                  <motion.a
                    key={social.label}
                    whileHover={{ scale: 1.2, y: -5 }}
                    whileTap={{ scale: 0.9 }}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={social.href.startsWith('#') ? (e) => {
                      e.preventDefault();
                      scrollToSection(social.href);
                    } : undefined}
                    className="p-3 rounded-full bg-gradient-to-r from-secondary/20 to-accent/20 hover:from-secondary/30 hover:to-accent/30 transition-all duration-300"
                    aria-label={social.label}
                  >
                    <Icon className="h-6 w-6" />
                  </motion.a>
                );
              })}
            </motion.div>
          </motion.div>

          {/* Profile Image with 3D Effect */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="relative flex justify-center lg:justify-end"
          >
            <div className="relative">
              <motion.div
                animate={{ 
                  rotate: [0, 360],
                }}
                transition={{ 
                  duration: 20,
                  repeat: Infinity,
                  ease: "linear"
                }}
                className="absolute inset-0 rounded-full bg-gradient-to-r from-secondary via-accent to-accent-pink p-1 animate-glow"
              >
                <div className="h-full w-full rounded-full bg-primary"></div>
              </motion.div>
              
              <motion.div
                animate={{ y: [0, -20, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="relative z-10 w-80 h-80 rounded-full overflow-hidden bg-gradient-to-br from-secondary/20 to-accent/20 p-2"
              >
                <img
                  src="https://drive.google.com/file/d/1dq_YMZNEjsXQWJ4vOeuJ-sTRAdaf3oJ-/view?usp=sharing"
                  alt="Profile"
                  className="w-full h-full object-cover rounded-full"
                />
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 cursor-pointer"
        onClick={() => scrollToSection('#about')}
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="flex flex-col items-center space-y-2"
        >
          <span className="text-text-secondary text-sm font-manrope">Scroll Down</span>
          <ArrowDown className="h-5 w-5 text-accent" />
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Hero;
