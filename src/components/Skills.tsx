import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

// Define the structure for a single skill
interface Skill {
  name: string;
  level: string;
  description: string;
  icon: string; // Emojis or SVG icons can be used here
}

// Define the structure for skill categories
interface SkillCategory {
  title: string;
  skills: Skill[];
}

// Data for all skill cards, now organized by category
const skillCategories: SkillCategory[] = [
  {
    title: 'Frontend Development',
    skills: [
      { name: 'React', level: 'Advanced', description: 'Building complex UIs with hooks, context, and modern patterns.', icon: '⚛️' },
      { name: 'TypeScript', level: 'Advanced', description: 'Writing type-safe, scalable applications with robust architecture.', icon: '📘' },
      { name: 'Tailwind CSS', level: 'Advanced', description: 'Rapidly building custom designs with a utility-first CSS framework.', icon: '💨' },
      { name: 'Three.js', level: 'Intermediate', description: 'Creating immersive 3D web experiences and interactive graphics.', icon: '🎲' },
      { name: 'Framer Motion', level: 'Intermediate', description: 'Implementing fluid and complex animations in React applications.', icon: '✨' },
    ],
  },
  {
    title: 'Backend & Database',
    skills: [
      { name: 'Node.js', level: 'Advanced', description: 'Building fast and scalable server-side applications and APIs.', icon: '🟢' },
      { name: 'Python', level: 'Advanced', description: 'Utilizing Python for data analysis, automation, and backend development.', icon: '🐍' },
      { name: 'MongoDB', level: 'Intermediate', description: 'Working with NoSQL databases for flexible data storage.', icon: '🍃' },
      { name: 'Firebase', level: 'Advanced', description: 'Leveraging Google\'s platform for backend services and real-time data.', icon: '🔥' },
    ],
  },
  {
      title: 'AI & Machine Learning',
      skills: [
        { name: 'TensorFlow', level: 'Intermediate', description: 'Building and training machine learning models.', icon: '🧠' },
        { name: 'PyTorch', level: 'Beginner', description: 'Exploring deep learning with a flexible research-first framework.', icon: '🔥' },
        { name: 'Gemini API', level: 'Intermediate', description: 'Integrating cutting-edge language models into applications.', icon: '🤖' },
        { name: 'Scikit-learn', level: 'Intermediate', description: 'Applying classic machine learning algorithms for data analysis.', icon: '📊' },
        { name: 'Pandas & NumPy', level: 'Advanced', description: 'Manipulating and analyzing large datasets efficiently in Python.', icon: '🐼' },
        { name: 'Git', level: 'Advanced', description: 'Using version control for collaborative development and CI/CD workflows.', icon: '🌿' },
    ]
  },
  {
      title: 'Softwares',
      skills: [
        { name: 'Blender 3D', level: 'Intermediate', description: 'Modelling and Animating CGI models.', icon: '🛞' },
        { name: 'Visual Studio Code', level: 'Beginner', description: 'Exploring VS Code with a deep unnderstanding of framework.', icon: '💻' },
        { name: 'Unity 3D', level: 'Intermediate', description: 'Developing games with Unity 3D.', icon: '🤓' },
    ]
  }
];

// Reusable SkillCard component with the 3D flip animation
const SkillCard: React.FC<{ skill: Skill; index: number }> = ({ skill, index }) => {
  const [isFlipped, setIsFlipped] = useState(false);

  // Animation variants for the card's appearance
  const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, delay: index * 0.1 }
    }
  };

  return (
    <motion.div
      variants={cardVariants}
      className="[perspective:1000px] h-48 w-full"
      onMouseEnter={() => setIsFlipped(true)}
      onMouseLeave={() => setIsFlipped(false)}
    >
      <div
        className={`relative w-full h-full transition-transform duration-700 [transform-style:preserve-3d] ${isFlipped ? '[transform:rotateY(180deg)]' : ''}`}
      >
        {/* Front of the card */}
        <div className="absolute inset-0 [backface-visibility:hidden] bg-gray-800/40 backdrop-blur-sm border border-purple-500/30 rounded-lg p-6 flex flex-col items-center justify-center text-center hover:border-purple-500/60 transition-colors">
          <div className="text-4xl mb-4">{skill.icon}</div>
          <h3 className="text-xl font-semibold text-gray-50 mb-2">{skill.name}</h3>
          <div className="text-purple-400 text-sm font-medium">{skill.level}</div>
        </div>

        {/* Back of the card */}
        <div className="absolute inset-0 [backface-visibility:hidden] [transform:rotateY(180deg)] bg-gradient-to-br from-purple-600/30 to-blue-500/30 backdrop-blur-md border border-purple-500/60 rounded-lg p-6 flex flex-col items-center justify-center text-center">
          <p className="text-gray-200 text-sm leading-relaxed">{skill.description}</p>
        </div>
      </div>
    </motion.div>
  );
};


// The main Skills component that combines everything
const Skills = () => {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  return (
    <section id="skills" className="py-20 bg-[#0a0f2e] text-white">
      <div className="px-4 sm:px-6 lg:px-8">
        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          className="space-y-16"
        >
          {/* Section Header (from first file) */}
          <motion.div variants={itemVariants} className="text-center">
            <h2 className="text-4xl md:text-5xl font-bold mb-4" style={{fontFamily: "'Poppins', sans-serif"}}>
              My <span className="bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">Skills</span>
            </h2>
            <p className="text-lg text-gray-300 max-w-3xl mx-auto" style={{fontFamily: "'Inter', sans-serif"}}>
              A comprehensive overview of my technical expertise across various domains of software development and emerging technologies.
            </p>
          </motion.div>

          {/* Skill Categories and Flipping Cards */}
          {skillCategories.map((category, categoryIndex) => (
            <motion.div key={categoryIndex} variants={itemVariants} className="space-y-8">
              {/* Category Header */}
              <div className="text-center lg:text-left">
                <h3 className="text-2xl font-semibold mb-2" style={{fontFamily: "'Poppins', sans-serif"}}>
                  {category.title}
                </h3>
                <div className="w-20 h-1 bg-gradient-to-r from-purple-400 to-blue-400 rounded-full mx-auto lg:mx-0"></div>
              </div>
              
              {/* Grid of Skill Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                {category.skills.map((skill, skillIndex) => (
                  <SkillCard key={skill.name} skill={skill} index={skillIndex} />
                ))}
              </div>
            </motion.div>
          ))}

          {/* "Always Learning" Section (from first file) */}
          <motion.div
            variants={itemVariants}
            className="text-center p-8 rounded-2xl bg-gradient-to-r from-purple-900/20 to-blue-900/20 border border-purple-500/20 mt-16"
          >
            <h3 className="text-2xl font-semibold mb-4" style={{fontFamily: "'Poppins', sans-serif"}}>
              Always Learning, Always Growing
            </h3>
            <p className="text-gray-300 mb-6 max-w-2xl mx-auto" style={{fontFamily: "'Inter', sans-serif"}}>
              Technology evolves rapidly, and so do I. I'm constantly exploring new frameworks, languages, and methodologies to stay at the forefront of innovation.
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              {['WebAssembly', 'Rust', 'Kubernetes', 'GraphQL', 'Web3', 'AR/VR'].map((tech, index) => (
                <span key={index} className="px-4 py-2 bg-purple-500/20 rounded-full text-sm font-medium" style={{fontFamily: "'Inter', sans-serif"}}>
                  {tech}
                </span>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Skills;
