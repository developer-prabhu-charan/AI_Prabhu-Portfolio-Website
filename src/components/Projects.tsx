import { useState, useEffect, SetStateAction } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { ExternalLink, Github, Play, X } from 'lucide-react';

// FIX 1: Define a type for a single project.
// This ensures that all project objects have a consistent structure.
interface Project {
  id: number;
  title: string;
  category: string;
  description: string;
  detailedDescription: string;
  image: string;
  tech: string[];
  github: string;
  live: string;
  video: string;
  gradient: string;
}

// FIX 2: Define a type for the props of the ProjectModal component.
// This resolves the "implicitly has an 'any' type" errors for isOpen, onClose, and project.
interface ProjectModalProps {
  isOpen: boolean;
  onClose: () => void;
  project: Project | null; // The project can be a Project object or null.
}

// --- Custom Modal Component ---
const ProjectModal = ({ isOpen, onClose, project }: ProjectModalProps) => {
  useEffect(() => {
    // FIX 3: Add a type for the 'event' parameter.
    // KeyboardEvent is the correct type for keyboard-related DOM events.
    const handleEsc = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleEsc);

    return () => {
      window.removeEventListener('keydown', handleEsc);
    };
  }, [onClose]);

  // If the modal isn't open or there's no project data, render nothing.
  if (!isOpen || !project) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 z-50">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.9 }}
          transition={{ duration: 0.3 }}
          className="relative max-w-4xl w-full mx-auto bg-[#10153b] border border-purple-500/20 rounded-2xl shadow-2xl outline-none"
        >
          <div className="max-h-[90vh] overflow-y-auto">
            <div className="relative">
              <img src={project.image} alt={project.title} className="w-full h-64 object-cover rounded-t-2xl" />
              <button
                onClick={onClose}
                className="absolute top-4 right-4 p-2 rounded-full bg-black/50 backdrop-blur-sm text-white hover:bg-black/70 transition-colors z-10"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            <div className="p-8 space-y-6">
              <div>
                <h3 className="text-3xl font-bold mb-2 text-white" style={{ fontFamily: "'Poppins', sans-serif" }}>{project.title}</h3>
                <p className="text-gray-300 leading-relaxed" style={{ fontFamily: "'Inter', sans-serif" }}>
                  {project.detailedDescription}
                </p>
              </div>
              <div>
                <h4 className="text-lg font-semibold mb-3 text-white" style={{ fontFamily: "'Poppins', sans-serif" }}>Technologies Used</h4>
                <div className="flex flex-wrap gap-3">
                  {/* FIX 4: Add a string type for the 'tech' parameter in the map function. */}
                  {project.tech.map((tech: string) => (
                    <span key={tech} className="px-4 py-2 bg-gradient-to-r from-purple-600/20 to-blue-600/20 text-gray-200 rounded-lg font-medium" style={{ fontFamily: "'Inter', sans-serif" }}>
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
              <div className="flex flex-wrap gap-4 pt-4">
                <motion.a whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} target="_blank" rel="noopener noreferrer" href={project.live} className="inline-flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-purple-500 to-blue-500 rounded-lg font-semibold text-sm text-white uppercase tracking-wider">
                  <ExternalLink className="h-4 w-4" />
                  <span>Live Demo</span>
                </motion.a>
                <motion.a whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} target="_blank" rel="noopener noreferrer" href={project.github} className="inline-flex items-center space-x-2 px-6 py-3 border border-purple-400 rounded-lg font-semibold text-sm text-purple-300 uppercase tracking-wider hover:bg-purple-400/10">
                  <Github className="h-4 w-4" />
                  <span>Source Code</span>
                </motion.a>
                <motion.a whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} target="_blank" rel="noopener noreferrer" href={project.video} className="inline-flex items-center space-x-2 px-6 py-3 border border-gray-600 rounded-lg font-semibold text-sm text-gray-300 uppercase tracking-wider hover:bg-gray-400/10">
                  <Play className="h-4 w-4" />
                  <span>Watch Demo</span>
                </motion.a>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};


const Projects = () => {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  // FIX 5: Provide an explicit type for the useState hook.
  // This tells TypeScript that selectedProject can be a Project object or null.
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [filter, setFilter] = useState('all');

  // Provide the 'Project[]' type to the projects array for type safety.
  const projects: Project[] = [
    {
      id: 1,
      title: 'Biped Robot V 1.0',
      category: 'iot',
      description: 'Radio-controlled Biped Robot.',
      detailedDescription: 'A Robot which powered by single motor and controlled via radio control remote. It can walk forward and backward.',
      image: 'robot_0.png',
      tech: ['DC motor', 'Bicycle Spokes', 'L - Crankshaft'],
      github: 'https://github.com/developer-prabhu-charan',
      live: '',
      video: 'https://youtu.be/PNT3fIZqBPU?si=hfd4Mp5u1eRpaVsK',
      gradient: 'from-green-500 to-purple-600',
    },
    {
      id: 2,
      title: 'Mummy - Voice Assistant V 1.0',
      category: 'ai',
      description: 'Intelligent assistant with opening applications and playing music.',
      detailedDescription: 'An advanced AI voice assistant built with Python, featuring applications opening, playing songs. Includes voice recognition.',
      image: 'mummy_voice_assistant.png',
      tech: ['Python', 'Gemini API', 'PyQt5', 'Tkinter'],
      github: 'https://github.com/developer-prabhu-charan',
      live: '',
      video: 'https://drive.google.com/file/d/1eiID1WDJJ133DeiauAS8k8HSYTxDd2mY/view?usp=sharing',
      gradient: 'from-green-500 to-teal-600',
    },
    {
      id: 3,
      title: 'YAMUNA - Voice Assistant V 2.0',
      category: 'ai',
      description: 'Intelligent assistant with natural language processing, context awareness, and highly-scalable.',
      detailedDescription: 'An advanced AI voice assistant built with Google Gemini API, featuring context retention, sentiment analysis. Includes voice recognition, text-to-speech, and integration capabilities for various platforms.',
      image: 'yamuna_voice_assistant.jpg',
      tech: ['Python', 'Gemini API', 'PyQt5', 'Tkinter'],
      github: 'https://github.com/developer-prabhu-charan',
      live: '',
      video: 'https://www.instagram.com/reel/DGZv7QlPNWZ/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA==',
      gradient: 'from-green-500 to-teal-600',
    },
    {
      id: 4,
      title: '3D Sci-Fi Robot in Blender',
      category: '3d',
      description: 'Sci-Fi Robot completely modeled from scratch in Blender 3D.',
      detailedDescription: 'Computer Generated Image technology based Sci-Fi robot is crafted in Blender 3D and Animated with bones and added stunning audio effects.',
      image: 'CGI1.jpg',
      tech: ['Blender 3D', 'Cap Cut'],
      github: 'https://github.com/developer-prabhu-charan',
      live: '',
      video: 'https://www.instagram.com/reel/DKYZkdLvbKm/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA==',
      gradient: 'from-cyan-500 to-blue-600',
    },
    {
      id: 5,
      title: 'Mobile Fitness App',
      category: 'mobile',
      description: 'Cross-platform fitness tracking app with workout plans, progress analytics, and social features.',
      detailedDescription: 'A comprehensive fitness application built with React Native, featuring workout tracking, custom exercise plans, progress analytics, social sharing, and integration with wearable devices for health monitoring.',
      image: 'https://images.pexels.com/photos/841130/pexels-photo-841130.jpeg?auto=compress&cs=tinysrgb&w=800',
      tech: ['Flutter', 'Dart','React Native', 'Firebase',],
      github: 'https://github.com/developer-prabhu-charan',
      live: '',
      video: 'https://www.youtube.com/@ppcprogrammerprabhucharan6691',
      gradient: 'from-orange-500 to-red-600',
    },
    {
      id: 6,
      title: 'Biped Robot(CGI)',
      category: 'iot',
      description: 'Two-leged biped robot walk based on the voice commands.',
      detailedDescription: 'A powerful Robot powered by ESP32 and Python works on voice commands. It can walk, sit, turn, run, etc.',
      image: 'robot.png',
      tech: ['Blender 3D'],
      github: 'https://github.com/developer-prabhu-charan',
      live: '',
      video: 'https://www.instagram.com/reel/DK30fHxP7dC/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA==',
      gradient: 'from-purple-500 to-indigo-600',
    },
    {
      id: 7,
      title: '3D Portfolio Website',
      category: 'web',
      description: 'Interactive 3D portfolio with WebGL animations, particle effects, and smooth scroll interactions.',
      detailedDescription: 'A cutting-edge portfolio website featuring Three.js 3D animations, particle systems, and interactive elements. Built with React Three Fiber, featuring smooth scroll animations, dynamic lighting, and responsive 3D scenes.',
      image: '3D_protfolio.png',
      tech: ['React', 'Three.js', 'GSAP', 'WebGL', 'Framer Motion'],
      github: 'https://github.com/developer-prabhu-charan',
      live: '',
      video: 'https://www.youtube.com/@ppcprogrammerprabhucharan6691',
      gradient: 'from-pink-500 to-rose-600',
    },
    {
      id: 8,
      title: 'Space Shooter Game',
      category: 'games',
      description: '2D game developed using pygame.',
      detailedDescription: 'Superb 2D game, which is very challenging and hard when increasing time and score, completely developed using pygame.',
      image: 'Space_Shooter_Game.jpg',
      tech: ['Python', 'PyGame', 'PyQt5', 'Tkinter'],
      github: 'https://github.com/developer-prabhu-charan',
      live: '',
      video: 'https://www.instagram.com/reel/DGdf_Lkv6R9/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA==',
      gradient: 'from-cyan-500 to-blue-600',
    },
  ];

  const categories = [
    { id: 'all', label: 'All Projects' },
    { id: 'web', label: 'Web Apps' },
    { id: 'mobile', label: 'Mobile Apps' },
    { id: 'ai', label: 'AI Projects' },
    { id: 'iot', label: 'IoT Solutions' },
    { id: 'games', label: 'Games'},
    { id: '3d', label: 'CGI'},
  ];

  const filteredProjects = filter === 'all'
    ? projects
    : projects.filter(project => project.category === filter);

  const sectionVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 50, scale: 0.95 },
    visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.4, ease: "easeOut" } },
    exit: { opacity: 0, y: -30, scale: 0.95, transition: { duration: 0.3, ease: "easeIn" } }
  };

  return (
    <section id="projects" className="py-20 bg-[#0a0f2e] text-white">
      <div className="px-4 sm:px-6 lg:px-8">
        <motion.div
          ref={ref}
          variants={sectionVariants}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          className="space-y-16"
        >
          <motion.div variants={itemVariants} className="text-center">
            <h2 className="text-4xl md:text-5xl font-bold mb-4" style={{ fontFamily: "'Poppins', sans-serif" }}>
              My <span className="bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">Projects</span>
            </h2>
            <p className="text-lg text-gray-300 max-w-3xl mx-auto" style={{ fontFamily: "'Inter', sans-serif" }}>
              A showcase of my recent work, featuring diverse projects that demonstrate my expertise across different technologies and domains.
            </p>
          </motion.div>

          <motion.div variants={itemVariants} className="flex flex-wrap justify-center gap-4">
            {categories.map((category) => (
              <motion.button
                key={category.id}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setFilter(category.id)}
                className={`px-6 py-3 rounded-full font-medium transition-all duration-300 ${filter === category.id ? 'bg-gradient-to-r from-purple-500 to-blue-500 text-white shadow-lg' : 'bg-gray-800 text-gray-300 hover:bg-gray-700 hover:text-white'}`}
                style={{ fontFamily: "'Inter', sans-serif" }}
              >
                {category.label}
              </motion.button>
            ))}
          </motion.div>

          <motion.div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <AnimatePresence>
              {filteredProjects.map((project) => (
                <motion.div
                  key={project.id}
                  variants={cardVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  layout
                  className="group relative cursor-pointer"
                  onClick={() => setSelectedProject(project)}
                >
                  <div className="relative overflow-hidden rounded-2xl bg-gray-900/60 backdrop-blur-sm border border-gray-700/50 hover:border-purple-500/60 transition-all duration-500">
                    <div className="relative overflow-hidden h-48">
                      <img
                        src={project.image}
                        alt={project.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
                    </div>
                    <div className="p-6 space-y-4">
                      <h3 className="text-xl font-semibold group-hover:text-purple-400 transition-colors duration-300" style={{ fontFamily: "'Poppins', sans-serif" }}>
                        {project.title}
                      </h3>
                      <p className="text-gray-400 text-sm leading-relaxed h-16" style={{ fontFamily: "'Inter', sans-serif" }}>
                        {project.description}
                      </p>
                      <div className="flex flex-wrap gap-2 pt-2">
                        {project.tech.slice(0, 3).map((tech) => (
                          <span key={tech} className="px-3 py-1 text-xs bg-gray-700/50 text-purple-300 rounded-full" style={{ fontFamily: "'Inter', sans-serif" }}>
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                    <div className={`absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r ${project.gradient} transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-500`}></div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        </motion.div>
      </div>

      <ProjectModal
        isOpen={!!selectedProject}
        onClose={() => setSelectedProject(null)}
        project={selectedProject}
      />
    </section>
  );
};

export default Projects;