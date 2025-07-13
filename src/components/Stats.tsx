import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

// --- Types ---
interface Stat {
  number: number;
  suffix: string;
  label: string;
  description: string;
  icon: string;
  color: string;
}

interface Milestone {
  year: string;
  title: string;
  description: string;
  side: 'left' | 'right';
}

// --- Count Up Animation ---
const CountUpAnimation = ({ targetNumber, suffix, inView }: { targetNumber: number; suffix: string; inView: boolean }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!inView) return;

    const duration = 2000;
    const steps = 60;
    const stepValue = targetNumber / steps;
    const stepDuration = duration / steps;

    let currentStep = 0;
    const timer = setInterval(() => {
      currentStep++;
      const newCount = Math.min(targetNumber, Math.floor(stepValue * currentStep));
      setCount(newCount);

      if (newCount >= targetNumber) {
        clearInterval(timer);
      }
    }, stepDuration);

    return () => clearInterval(timer);
  }, [targetNumber, inView]);

  return (
    <span className="text-4xl md:text-5xl lg:text-6xl font-poppins font-bold">
      {count}{suffix}
    </span>
  );
};

// --- Milestone Item Component ---
const MilestoneItem = ({ milestone }: { milestone: Milestone }) => {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.4,
  });

  const variants = {
    hidden: {
      opacity: 0,
      x: milestone.side === 'left' ? -150 : 150,
      scale: 0.8,
    },
    visible: {
      opacity: 1,
      x: 0,
      scale: 1,
      transition: {
        type: 'spring',
        stiffness: 60,
        damping: 20,
        duration: 0.8,
      },
    },
  };

  return (
    <div ref={ref} className="relative flex justify-center items-center">
      <motion.div
        variants={variants}
        initial="hidden"
        animate={inView ? 'visible' : 'hidden'}
        className={`w-4/12 ml-auto md:w-5/12 flex ${milestone.side === 'left' ? 'md:ml-20 mr-auto md:justify-end md:pr-12' : 'md:mr-20 ml-auto md:justify-start md:pl-12'}`}
      >
        <div className={`w-full md:max-w-sm ${milestone.side === 'left' ? 'md:text-right' : 'md:text-left'}`}>
          <div className="p-6 rounded-xl bg-gradient-to-br from-secondary/10 to-accent/10 border border-secondary/20 shadow-lg">
            <div className="text-2xl font-poppins font-bold text-accent mb-2">
              {milestone.year}
            </div>
            <h4 className="text-lg font-poppins font-semibold mb-2">
              {milestone.title}
            </h4>
            <p className="text-text-secondary font-inter text-sm">
              {milestone.description}
            </p>
          </div>
        </div>
      </motion.div>

      {/* Timeline Dot */}
      <div className="absolute left-1/2 transform -translate-x-1/2 w-4 h-4 bg-gradient-to-r from-secondary to-accent rounded-full border-4 border-primary z-10 shadow-md"></div>
    </div>
  );
};

// --- Main Stats Component ---
const Stats = () => {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const stats: Stat[] = [
    { number: 20, suffix: '+', label: 'Projects Completed', description: 'Successful projects delivered across various domains', icon: '🚀', color: 'from-blue-500 to-purple-600' },
    { number: 4, suffix: '+', label: 'Years Experience', description: 'Continuous learning and professional development', icon: '⏰', color: 'from-green-500 to-teal-600' },
    { number: 2000, suffix: '+', label: 'Hours of Coding', description: 'Dedicated time spent crafting quality code', icon: '💻', color: 'from-pink-500 to-rose-600' },
    { number: 11, suffix: '+', label: 'Technologies Mastered', description: 'Diverse tech stack across multiple domains', icon: '⚡', color: 'from-orange-500 to-red-600' },
    { number: 100, suffix: '%', label: 'Client Satisfaction', description: 'Commitment to excellence and quality delivery', icon: '⭐', color: 'from-purple-500 to-indigo-600' },
    { number: 25, suffix: '+', label: 'Happy Clients', description: 'Building lasting relationships through quality work', icon: '🤝', color: 'from-cyan-500 to-blue-600' },
  ];

  const milestones: Milestone[] = [
    { year: '2016', title: 'Innovation Journey Begins', description: 'Started with Building Robot from scratch and VVPAT Demo piece used in elections.', side: 'left' },
    { year: '2022', title: 'First Major Project', description: 'Successfully delivered first Voice Assistant V 1.0 {Mummy}', side: 'right' },
    { year: '2023', title: 'Pygame Mastery', description: 'Achieved advanced game development using Pygame', side: 'left' },
    { year: '2024', title: 'AI Integration Specialist', description: 'Started implementing AI solutions in Voice Assistant V 2.0 {Yamuna}', side: 'right' },
    { year: '2025', title: 'CGI', description: 'Mastered CGI animations advanced 3D software that is "Blender 3D"', side: 'left' },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  return (
    <section className="py-20 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-secondary/5 to-accent/5"></div>
      <div className="absolute top-0 left-0 w-72 h-72 bg-secondary/10 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-accent/10 rounded-full blur-3xl animate-pulse delay-1000"></div>

      <div className="px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          className="space-y-16"
        >
          <motion.div variants={itemVariants} className="text-center">
            <h2 className="text-4xl md:text-5xl font-poppins font-bold mb-4">
              Numbers Tell the <span className="bg-gradient-to-r from-secondary to-accent bg-clip-text text-transparent">Story</span>
            </h2>
            <p className="text-lg text-text-secondary max-w-3xl mx-auto font-inter">
              Here are some key metrics that showcase my journey, experience, and commitment to delivering exceptional results.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                whileHover={{ scale: 1.05, rotateY: 5, rotateX: 5 }}
                className="group relative"
              >
                <div className={`absolute inset-0 bg-gradient-to-r ${stat.color} rounded-2xl blur-xl opacity-20 group-hover:opacity-30 transition-opacity duration-500`}></div>
                <div className="relative h-full p-8 rounded-2xl bg-gradient-to-br from-primary/90 to-primary/70 backdrop-blur-sm border border-secondary/20 hover:border-accent/40 transition-all duration-500">
                  <div className="text-4xl mb-4 group-hover:scale-110 transition-transform duration-300">{stat.icon}</div>
                  <div className={`bg-gradient-to-r ${stat.color} bg-clip-text text-transparent mb-2`}>
                    <CountUpAnimation targetNumber={stat.number} suffix={stat.suffix} inView={inView} />
                  </div>
                  <h3 className="text-xl font-poppins font-semibold mb-3 group-hover:text-accent transition-colors duration-300">{stat.label}</h3>
                  <p className="text-text-secondary font-inter text-sm leading-relaxed">{stat.description}</p>
                  <div className={`absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r ${stat.color} rounded-b-2xl transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500`}></div>
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div variants={itemVariants} className="mt-20">
            <h3 className="text-3xl font-poppins font-bold text-center mb-12">
              Key <span className="bg-gradient-to-r from-secondary to-accent bg-clip-text text-transparent">Milestones</span>
            </h3>

            <div className="relative">
              {/* Timeline Line */}
              <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-gradient-to-b from-secondary to-accent rounded-full" aria-hidden="true"></div>

              {/* Milestones */}
              <div className="space-y-12 md:space-y-16">
                {milestones.map((milestone) => (
                  <MilestoneItem key={milestone.year} milestone={milestone} />
                ))}
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Stats;
