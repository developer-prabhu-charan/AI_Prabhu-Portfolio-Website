import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Code, Smartphone, Palette, Brain, Database, Zap } from 'lucide-react';

const Services = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const services = [
    {
      icon: Code,
      title: 'Web Development',
      description: 'Full-stack web applications with modern frameworks like React, Node.js, and TypeScript.',
      features: ['Responsive Design', 'Performance Optimization', 'SEO Friendly', 'Cross-browser Compatibility'],
      gradient: 'from-blue-500 to-purple-600',
    },
    {
      icon: Smartphone,
      title: 'Mobile Development',
      description: 'Native and cross-platform mobile applications with seamless user experiences.',
      features: ['iOS & Android', 'React Native', 'Progressive Web Apps', 'App Store Deployment'],
      gradient: 'from-green-500 to-teal-600',
    },
    {
      icon: Palette,
      title: 'UI/UX Design',
      description: 'Beautiful, intuitive interfaces designed with user experience at the forefront.',
      features: ['User Research', 'Wireframing', 'Prototyping', 'Design Systems'],
      gradient: 'from-pink-500 to-rose-600',
    },
    {
      icon: Brain,
      title: 'AI Integration',
      description: 'Intelligent features powered by machine learning and artificial intelligence.',
      features: ['Natural Language Processing', 'Computer Vision', 'Predictive Analytics', 'Chatbots'],
      gradient: 'from-purple-500 to-indigo-600',
    },
    {
      icon: Database,
      title: 'Backend Solutions',
      description: 'Scalable server-side architecture with robust databases and APIs.',
      features: ['RESTful APIs', 'Database Design', 'Cloud Integration', 'Security Implementation'],
      gradient: 'from-orange-500 to-red-600',
    },
    {
      icon: Zap,
      title: '3D Modelling, Animation and CGI',
      description: 'Interactive 3D experiences and smooth animations that bring interfaces to life.',
      features: ['Blender 3D', 'Motion Graphics', 'Interactive Experiences'],
      gradient: 'from-cyan-500 to-blue-600',
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
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

  return (
    <section id="services" className="py-20 relative">
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
              What I <span className="bg-gradient-to-r from-secondary to-accent bg-clip-text text-transparent">Do</span>
            </h2>
            <p className="text-lg text-text-secondary max-w-3xl mx-auto font-inter">
              I offer a comprehensive range of services to bring your digital vision to life, 
              from concept to deployment and beyond.
            </p>
          </motion.div>

          {/* Services Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => {
              const Icon = service.icon;
              return (
                <motion.div
                  key={index}
                  variants={itemVariants}
                  whileHover={{ 
                    scale: 1.05, 
                    rotateY: 10,
                    rotateX: 5,
                  }}
                  className="group relative"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-secondary/20 to-accent/20 rounded-2xl blur-xl group-hover:blur-2xl transition-all duration-300"></div>
                  
                  <div className="relative h-full p-8 rounded-2xl bg-gradient-to-br from-primary/80 to-primary/60 backdrop-blur-sm border border-secondary/20 hover:border-accent/40 transition-all duration-300">
                    {/* Icon */}
                    <div className={`inline-flex p-4 rounded-xl bg-gradient-to-r ${service.gradient} mb-6`}>
                      <Icon className="h-8 w-8 text-white" />
                    </div>

                    {/* Content */}
                    <div className="space-y-4">
                      <h3 className="text-xl font-poppins font-semibold group-hover:text-accent transition-colors duration-300">
                        {service.title}
                      </h3>
                      
                      <p className="text-text-secondary font-inter leading-relaxed">
                        {service.description}
                      </p>

                      {/* Features */}
                      <ul className="space-y-2">
                        {service.features.map((feature, featureIndex) => (
                          <li key={featureIndex} className="flex items-center space-x-2">
                            <div className="w-1.5 h-1.5 bg-accent rounded-full"></div>
                            <span className="text-text-secondary text-sm font-inter">{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Hover Effect */}
                    <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-secondary to-accent rounded-b-2xl transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></div>
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* CTA Section */}
          <motion.div
            variants={itemVariants}
            className="text-center p-8 rounded-2xl bg-gradient-to-r from-secondary/10 to-accent/10 border border-secondary/20"
          >
            <h3 className="text-2xl font-poppins font-semibold mb-4">
              Ready to Start Your Project?
            </h3>
            <p className="text-text-secondary font-inter mb-6 max-w-2xl mx-auto">
              Let's collaborate to turn your ideas into reality. I'm here to help you build 
              something amazing that stands out from the crowd.
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => {
                const element = document.querySelector('#contact');
                element?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="px-8 py-4 bg-gradient-to-r from-accent-purple to-accent-pink rounded-lg font-manrope font-semibold text-sm uppercase tracking-wider transition-all duration-300 hover:shadow-lg hover:shadow-accent/25"
            >
              Let's Work Together
            </motion.button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Services;