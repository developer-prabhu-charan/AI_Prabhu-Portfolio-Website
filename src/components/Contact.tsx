import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Mail, Phone, MapPin, Send, CheckCircle, AlertCircle } from 'lucide-react';
import emailjs from 'emailjs-com';

const Contact = () => {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const [formStatus, setFormStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormStatus('loading');

    try {
      await emailjs.send(
        'service_nd76tqf', // EmailJS Service ID
        'template_abcd123', // EmailJS Template ID
        {
          name: formData.name,
          email: formData.email,
          subject: formData.subject,
          message: formData.message,
        },
        'YRKPxg6mgQ2yZ7Jni' // EmailJS Public Key
      );

      setFormStatus('success');
      setFormData({ name: '', email: '', subject: '', message: '' });
      setTimeout(() => setFormStatus('idle'), 3000);
    } catch (error) {
      console.error('EmailJS Error:', error);
      setFormStatus('error');
      setTimeout(() => setFormStatus('idle'), 3000);
    }
  };

  const contactInfo = [
    {
      icon: Mail,
      label: 'Email',
      value: 'developerprabhucharan@gmail.com',
      href: 'https://mail.google.com/mail/?view=cm&to=developerprabhucharan@gmail.com',
      external: true,
    },
    {
      icon: Phone,
      label: 'Phone',
      value: '+91 9390094496',
      href: 'tel:+919390094496',
      external: true,
    },
    {
      icon: MapPin,
      label: 'Location',
      value: 'Gandipet, Hyderabad, 500075',
      href: 'https://www.google.com/maps/place/Gandipet,+Hyderabad,+Telangana+500075',
      external: true,
    },
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
    <section id="contact" className="py-20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          className="space-y-16"
        >
          {/* Header */}
          <motion.div variants={itemVariants} className="text-center">
            <h2 className="text-4xl md:text-5xl font-poppins font-bold mb-4">
              Get In <span className="bg-gradient-to-r from-secondary to-accent bg-clip-text text-transparent">Touch</span>
            </h2>
            <p className="text-lg text-text-secondary max-w-3xl mx-auto font-inter">
              Let's connect and build something great. I'm open to freelance, collaborations, and innovative opportunities.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            {/* Contact Info */}
            <motion.div variants={itemVariants} className="space-y-8">
              <div>
                <h3 className="text-2xl font-poppins font-semibold mb-6">Let’s Start a Conversation</h3>
                <p className="text-text-secondary font-inter leading-relaxed mb-8">
                  Whether you have a project idea, a technical query, or just want to chat — I’m all ears!
                </p>
              </div>

              {contactInfo.map((info, index) => {
                const Icon = info.icon;
                return (
                  <motion.a
                    key={index}
                    href={info.href}
                    target={info.external ? '_blank' : '_self'}
                    rel={info.external ? 'noopener noreferrer' : undefined}
                    whileHover={{ scale: 1.02, x: 10 }}
                    className="flex items-center space-x-4 p-4 rounded-xl bg-gradient-to-br from-secondary/10 to-accent/10 border border-secondary/20 hover:border-accent/40 transition-all duration-300 group"
                  >
                    <div className="p-3 rounded-lg bg-gradient-to-r from-secondary to-accent group-hover:scale-110 transition-transform duration-300">
                      <Icon className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <div className="text-text-secondary text-sm font-manrope">{info.label}</div>
                      <div className="font-inter font-medium group-hover:text-accent transition-colors duration-300">
                        {info.value}
                      </div>
                    </div>
                  </motion.a>
                );
              })}
            </motion.div>

            {/* Contact Form */}
            <motion.div variants={itemVariants}>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="Your Name"
                    required
                    className="w-full px-4 py-4 rounded-xl bg-secondary/10 border border-secondary/20 text-text-primary"
                  />
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="Email Address"
                    required
                    className="w-full px-4 py-4 rounded-xl bg-secondary/10 border border-secondary/20 text-text-primary"
                  />
                </div>

                <input
                  type="text"
                  name="subject"
                  value={formData.subject}
                  onChange={handleInputChange}
                  placeholder="Subject"
                  required
                  className="w-full px-4 py-4 rounded-xl bg-secondary/10 border border-secondary/20 text-text-primary"
                />

                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  placeholder="Your Message"
                  rows={6}
                  required
                  className="w-full px-4 py-4 rounded-xl bg-secondary/10 border border-secondary/20 text-text-primary"
                />

                <motion.button
                  type="submit"
                  disabled={formStatus === 'loading'}
                  whileHover={{ scale: formStatus === 'loading' ? 1 : 1.05 }}
                  whileTap={{ scale: formStatus === 'loading' ? 1 : 0.95 }}
                  className={`w-full py-4 px-8 rounded-xl font-semibold text-sm uppercase tracking-wider transition-all duration-300 flex items-center justify-center space-x-2 ${
                    formStatus === 'success'
                      ? 'bg-green-500 text-white'
                      : formStatus === 'error'
                      ? 'bg-red-500 text-white'
                      : formStatus === 'loading'
                      ? 'bg-secondary/50 text-text-secondary cursor-not-allowed'
                      : 'bg-gradient-to-r from-accent-purple to-accent-pink hover:shadow-lg hover:shadow-accent/25'
                  }`}
                >
                  {formStatus === 'loading' && (
                    <div className="w-4 h-4 border-2 border-text-secondary border-t-transparent rounded-full animate-spin"></div>
                  )}
                  {formStatus === 'success' && <CheckCircle className="h-4 w-4" />}
                  {formStatus === 'error' && <AlertCircle className="h-4 w-4" />}
                  {(formStatus === 'idle' || formStatus === 'loading') && <Send className="h-4 w-4" />}
                  <span>
                    {formStatus === 'loading'
                      ? 'Sending...'
                      : formStatus === 'success'
                      ? 'Message Sent!'
                      : formStatus === 'error'
                      ? 'Try Again'
                      : 'Send Message'}
                  </span>
                </motion.button>
              </form>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Contact;
