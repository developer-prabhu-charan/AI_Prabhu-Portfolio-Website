import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Code, Palette, Cpu, Lightbulb } from 'lucide-react';

const About = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 },
    },
  };

  const highlights = [
    {
      icon: Code,
      title: 'Full-Stack Development',
      description: 'Building scalable web applications with modern technologies and best practices.',
    },
    {
      icon: Palette,
      title: 'UI/UX Design',
      description: 'Creating intuitive and beautiful user interfaces that enhance user experience.',
    },
    {
      icon: Cpu,
      title: 'AI & Machine Learning',
      description: 'Implementing intelligent solutions and automation using cutting-edge AI technologies.',
    },
    {
      icon: Lightbulb,
      title: 'Creative Problem Solving',
      description: 'Turning complex challenges into elegant, innovative solutions.',
    },
  ];

  return (
    <section id="about" className="py-20 relative">
      <div className="px-4 sm:px-6 lg:px-8">
        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          className="space-y-16"
        >
          {/* Section Header */}
          <motion.div variants={itemVariants} className="text-center">
            <h2 className="text-4xl md:text-5xl font-poppins font-bold mb-4">
              About <span className="bg-gradient-to-r from-secondary to-accent bg-clip-text text-transparent">Me</span>
            </h2>
            <p className="text-lg text-text-secondary max-w-3xl mx-auto font-inter">
              I'm a passionate developer who loves creating digital experiences that make a difference. 
              With expertise in both frontend and backend technologies, I bring ideas to life through code.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Content */}
            <motion.div variants={itemVariants} className="space-y-8">
              <div className="space-y-6">
                <h3 className="text-2xl font-poppins font-semibold">My Journey</h3>
                <p className="text-text-secondary font-inter leading-relaxed">
                  Started as a curious student exploring the boundaries between technology and creativity. 
                  What began as simple biped robot, C language and HTML pages has evolved into a passion for creating complex innovations and 
                  interactive applications that solve real-world problems.
                </p>
                <p className="text-text-secondary font-inter leading-relaxed">
                  Today, I specialize in modern web development, artificial intelligence, and 3D graphics, robotics and CGI, 
                  constantly learning and adapting to the ever-evolving tech landscape. My goal is to 
                  bridge the gap between imagination and digital reality.
                </p>
              </div>

              {/* Timeline */}
              <div className="space-y-4">
                <h4 className="text-xl font-poppins font-semibold">Key Milestones</h4>
                <div className="space-y-3">
                  {[
                    { year: '2016', event: 'Started Robotics' },
                    { year: '2021', event: 'First Voice Assistant and Space Shooter Game' },
                    { year: '2022', event: 'Step into AI, ML, DL and Mobile App Developement' },
                    { year: '2023', event: 'Developed Games, 3D Modeling and CGI' },
                  ].map((milestone, index) => (
                    <motion.div
                      key={index}
                      whileHover={{ x: 10 }}
                      className="flex items-center space-x-4 p-3 rounded-lg bg-gradient-to-r from-secondary/5 to-accent/5 hover:from-secondary/10 hover:to-accent/10 transition-all duration-300"
                    >
                      <div className="w-2 h-2 bg-accent rounded-full"></div>
                      <span className="font-manrope font-semibold text-accent">{milestone.year}</span>
                      <span className="text-text-secondary">{milestone.event}</span>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* Highlights Grid */}
            <motion.div variants={itemVariants} className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {highlights.map((highlight, index) => {
                const Icon = highlight.icon;
                return (
                  <motion.div
                    key={index}
                    whileHover={{ scale: 1.05, y: -5 }}
                    className="p-6 rounded-xl bg-gradient-to-br from-secondary/10 to-accent/10 border border-secondary/20 hover:border-accent/40 transition-all duration-300"
                  >
                    <div className="flex items-center space-x-3 mb-3">
                      <div className="p-2 rounded-lg bg-gradient-to-r from-secondary to-accent">
                        <Icon className="h-5 w-5 text-white" />
                      </div>
                      <h4 className="font-poppins font-semibold text-lg">{highlight.title}</h4>
                    </div>
                    <p className="text-text-secondary text-sm font-inter leading-relaxed">
                      {highlight.description}
                    </p>
                  </motion.div>
                );
              })}
            </motion.div>
          </div>

          {/* Stats */}
          <motion.div
            variants={itemVariants}
            className="grid grid-cols-2 md:grid-cols-4 gap-8 pt-8 border-t border-secondary/20"
          >
            {[
              { number: '20+', label: 'Projects Completed' },
              { number: '4+', label: 'Years Experience' },
              { number: '11+', label: 'Technologies Mastered' },
              { number: '100%', label: 'Client Satisfaction' },
            ].map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl md:text-4xl font-poppins font-bold bg-gradient-to-r from-secondary to-accent bg-clip-text text-transparent">
                  {stat.number}
                </div>
                <div className="text-text-secondary font-inter text-sm mt-2">{stat.label}</div>
              </div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default About;