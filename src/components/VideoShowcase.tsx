import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Play, X } from 'lucide-react';
import ReactPlayer from 'react-player';
import Modal from 'react-modal';

const VideoShowcase = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const [selectedVideo, setSelectedVideo] = useState<any>(null);

  const videos = [
    
    {
      id: 1,
      title: 'YAMUNA - Voice Assistant',
      description: 'Intelligent assistant with natural language processing, context awareness, and highly-scalable.',
      thumbnail: 'src//components//images//Yamuna_voice_assistant.jpg',
      url: 'https://youtu.be/BNn6pevs4mk',
      duration: '21:55',
      category: 'AI/ML',
    },
    {
      id: 2,
      title: 'Space Shooter Game',
      description: '2D game developed using pygame.',
      thumbnail: 'src//components//images//Space_Shooter_Game.jpg',
      url: 'https://youtu.be/rP0p22MDCXc',
      duration: '14:56',
      category: 'Games',
    },
    {
      id: 3,
      title: 'Biped Robot V 1.0',
      description: 'Radio-controlled Biped Robot.',
      thumbnail: 'src//components//images//robot_0.png',
      url: 'https://youtu.be/PNT3fIZqBPU?si=hfd4Mp5u1eRpaVsK',
      duration: '01:07',
      category: 'IOT',
    },{
      id: 4,
      title: 'Building a Sci-Fi Robot',
      description: 'Modelling and animating model in Blender 3D.',
      thumbnail: 'src//components//images//CGI1.jpg',
      url: 'https://www.youtube.com/watch?v=2WChZT9UXu4',
      duration: '29:40',
      category: 'CGI',
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
    <section id="videos" className="py-20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
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
              Video <span className="bg-gradient-to-r from-secondary to-accent bg-clip-text text-transparent">Showcase</span>
            </h2>
            <p className="text-lg text-text-secondary max-w-3xl mx-auto font-inter">
              Watch detailed walkthroughs of my projects, tutorials, and insights 
              into modern development techniques and best practices.
            </p>
          </motion.div>

          {/* Featured Video */}
          <motion.div variants={itemVariants} className="relative">
            <div className="relative rounded-2xl overflow-hidden bg-gradient-to-br from-secondary/20 to-accent/20 p-1">
              <div className="relative rounded-xl overflow-hidden bg-primary/90 backdrop-blur-sm">
                <div className="aspect-video relative group cursor-pointer" onClick={() => setSelectedVideo(videos[0])}>
                  <img
                    src={videos[0].thumbnail}
                    alt={videos[0].title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-black/30 group-hover:bg-black/50 transition-colors duration-300"></div>
                  
                  {/* Play Button */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <motion.div
                      whileHover={{ scale: 1.1 }}
                      className="w-20 h-20 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center group-hover:bg-white/30 transition-colors duration-300"
                    >
                      <Play className="h-8 w-8 text-white ml-1" />
                    </motion.div>
                  </div>

                  {/* Video Info Overlay */}
                  <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/80 to-transparent">
                    <span className="inline-block px-3 py-1 bg-accent rounded-full text-xs font-manrope font-semibold mb-2">
                      FEATURED
                    </span>
                    <h3 className="text-2xl font-poppins font-bold text-white mb-2">{videos[0].title}</h3>
                    <p className="text-gray-200 font-inter">{videos[0].description}</p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Video Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {videos.slice(1).map((video, index) => (
              <motion.div
                key={video.id}
                variants={itemVariants}
                whileHover={{ scale: 1.05, y: -10 }}
                className="group relative cursor-pointer"
                onClick={() => setSelectedVideo(video)}
              >
                <div className="relative rounded-xl overflow-hidden bg-gradient-to-br from-primary/80 to-primary/60 backdrop-blur-sm border border-secondary/20 hover:border-accent/40 transition-all duration-300">
                  {/* Thumbnail */}
                  <div className="relative aspect-video overflow-hidden">
                    <img
                      src={video.thumbnail}
                      alt={video.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors duration-300"></div>
                    
                    {/* Play Button */}
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <div className="w-14 h-14 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
                        <Play className="h-6 w-6 text-white ml-1" />
                      </div>
                    </div>

                    {/* Duration */}
                    <div className="absolute bottom-2 right-2 px-2 py-1 bg-black/70 rounded text-white text-xs font-manrope">
                      {video.duration}
                    </div>

                    {/* Category */}
                    <div className="absolute top-2 left-2 px-2 py-1 bg-accent rounded text-white text-xs font-manrope font-semibold">
                      {video.category}
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-4 space-y-2">
                    <h4 className="font-poppins font-semibold group-hover:text-accent transition-colors duration-300 line-clamp-2">
                      {video.title}
                    </h4>
                    <p className="text-text-secondary font-inter text-sm leading-relaxed line-clamp-2">
                      {video.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* CTA Section */}
          <motion.div
            variants={itemVariants}
            className="text-center p-8 rounded-2xl bg-gradient-to-r from-secondary/10 to-accent/10 border border-secondary/20"
          >
            <h3 className="text-2xl font-poppins font-semibold mb-4">
              Want to See More Content?
            </h3>
            <p className="text-text-secondary font-inter mb-6 max-w-2xl mx-auto">
              Subscribe to my YouTube channel for more tutorials, project walkthroughs, 
              and insights into modern technology and innovations.
            </p>
            <motion.a
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              href="https://www.youtube.com/@ppcprogrammerprabhucharan6691"
              target="_blank"
              rel="noopener noreferrer"
              className="px-8 py-4 bg-gradient-to-r from-accent-purple to-accent-pink rounded-lg font-manrope font-semibold text-sm uppercase tracking-wider transition-all duration-300 hover:shadow-lg hover:shadow-accent/25"
            >
              Subscribe Now
            </motion.a>

          </motion.div>
        </motion.div>
      </div>

      {/* Video Modal */}
      <Modal
        isOpen={!!selectedVideo}
        onRequestClose={() => setSelectedVideo(null)}
        className="max-w-5xl mx-auto my-8 bg-primary border border-secondary/20 rounded-2xl overflow-hidden outline-none"
        overlayClassName="fixed inset-0 bg-black/90 backdrop-blur-sm flex items-center justify-center p-4 z-50"
      >
        {selectedVideo && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="max-h-[90vh] overflow-y-auto"
          >
            {/* Video Player */}
            <div className="relative">
              <div className="aspect-video">
                <ReactPlayer
                  url={selectedVideo.url}
                  width="100%"
                  height="100%"
                  controls
                  playing
                />
              </div>
              <button
                onClick={() => setSelectedVideo(null)}
                className="absolute top-4 right-4 p-2 rounded-full bg-black/50 backdrop-blur-sm text-white hover:bg-black/70 transition-colors z-10"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Video Info */}
            <div className="p-6 space-y-4">
              <div className="flex items-center space-x-3">
                <span className={`px-3 py-1 bg-accent rounded-full text-xs font-manrope font-semibold`}>
                  {selectedVideo.category}
                </span>
                <span className="text-text-secondary text-sm font-manrope">
                  {selectedVideo.duration}
                </span>
              </div>
              
              <h3 className="text-2xl font-poppins font-bold">{selectedVideo.title}</h3>
              <p className="text-text-secondary font-inter leading-relaxed">
                {selectedVideo.description}
              </p>
            </div>
          </motion.div>
        )}
      </Modal>
    </section>
  );
};

export default VideoShowcase;