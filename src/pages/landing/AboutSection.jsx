import React, { useState, useEffect, useRef } from 'react';
import { motion, useInView } from 'framer-motion';

const AboutSection = () => {
  const [activeFeature, setActiveFeature] = useState(0);
  const [stats, setStats] = useState({
    projects: 0,
    clients: 0,
    awards: 0,
    years: 0
  });
  
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, threshold: 0.3 });

  // Colors
  const flashingOrange = '#FF4500';
  const black = '#000000';
  const darkGray = '#1a1a1a';

  const finalStats = {
    projects: 500,
    clients: 200,
    awards: 25,
    years: 15
  };

  const features = [
    {
      icon: '🎚️',
      title: 'Professional Mixing',
      description: 'State-of-the-art mixing suites with industry-standard equipment and acoustically treated rooms.',
      details: ['SSL Console', 'Pro Tools HDX', 'Vintage Outboard Gear', 'Custom Monitoring']
    },
    {
      icon: '🎙️',
      title: 'Recording Studios',
      description: 'Multiple recording environments from intimate vocal booths to full orchestral spaces.',
      details: ['Iso Booths', 'Live Rooms', 'Drum Rooms', 'Vocal Suites']
    },
    {
      icon: '🎧',
      title: 'Audio Mastering',
      description: 'Final polish for your tracks with precision mastering using analog and digital processing.',
      details: ['Stereo Mastering', 'Stem Mastering', 'Vinyl Preparation', 'Streaming Optimization']
    },
    {
      icon: '🎬',
      title: 'Sound Design',
      description: 'Custom audio solutions for film, television, games, and multimedia productions.',
      details: ['Foley Recording', 'ADR Services', 'Music Scoring', 'Audio Post']
    }
  ];

  useEffect(() => {
    if (isInView) {
      // Animate stats counter
      const duration = 2000;
      const steps = 60;
      const stepDuration = duration / steps;

      let step = 0;
      const interval = setInterval(() => {
        step++;
        const progress = step / steps;
        const easeOut = 1 - Math.pow(1 - progress, 3);

        setStats({
          projects: Math.floor(finalStats.projects * easeOut),
          clients: Math.floor(finalStats.clients * easeOut),
          awards: Math.floor(finalStats.awards * easeOut),
          years: Math.floor(finalStats.years * easeOut)
        });

        if (step >= steps) {
          clearInterval(interval);
          setStats(finalStats);
        }
      }, stepDuration);

      return () => clearInterval(interval);
    }
  }, [isInView]);

  useEffect(() => {
    const featureInterval = setInterval(() => {
      setActiveFeature((prev) => (prev + 1) % features.length);
    }, 4000);

    return () => clearInterval(featureInterval);
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.8,
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: 50, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.8, ease: "easeOut" }
    }
  };

  const statsVariants = {
    hidden: { scale: 0, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: { duration: 0.6, ease: "easeOut" }
    }
  };

  return (
    <div 
      id="about" 
      ref={ref}
      style={{
        background: `linear-gradient(135deg, ${black} 0%, ${darkGray} 50%, ${black} 100%)`,
        minHeight: '100vh',
        padding: '6rem 2rem',
        position: 'relative',
        overflow: 'hidden'
      }}
    >
      {/* Animated Background Elements */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        opacity: 0.1,
        pointerEvents: 'none'
      }}>
        {[...Array(30)].map((_, i) => (
          <motion.div
            key={i}
            animate={{
              rotate: [0, 360],
              scale: [0.8, 1.2, 0.8],
              opacity: [0.3, 0.7, 0.3]
            }}
            transition={{
              duration: 10 + Math.random() * 10,
              repeat: Infinity,
              ease: "linear",
              delay: Math.random() * 5
            }}
            style={{
              position: 'absolute',
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              width: '100px',
              height: '100px',
              border: `2px solid ${flashingOrange}`,
              borderRadius: '50%'
            }}
          />
        ))}
      </div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        style={{
          maxWidth: '1400px',
          margin: '0 auto',
          position: 'relative',
          zIndex: 2
        }}
      >
        {/* Section Header */}
        <motion.div 
          variants={itemVariants}
          style={{ textAlign: 'center', marginBottom: '4rem' }}
        >
          <motion.h2
            style={{
              fontSize: 'clamp(2.5rem, 6vw, 4rem)',
              fontWeight: 'bold',
              color: 'white',
              margin: '0 0 1rem 0',
              textShadow: `0 0 30px ${flashingOrange}`,
              fontFamily: '"Orbitron", monospace, system-ui'
            }}
          >
            About <span style={{ color: flashingOrange }}>SoundWave</span>
          </motion.h2>
          <motion.div
            animate={{
              width: ['0%', '100%'],
              backgroundColor: [flashingOrange, '#FF6500', flashingOrange]
            }}
            transition={{
              duration: 2,
              ease: "easeInOut",
              delay: 0.5
            }}
            style={{
              height: '4px',
              background: flashingOrange,
              margin: '0 auto',
              maxWidth: '200px',
              borderRadius: '2px'
            }}
          />
        </motion.div>

        {/* Main Content Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))',
          gap: '3rem',
          marginBottom: '4rem'
        }}>
          {/* Company Story */}
          <motion.div variants={itemVariants}>
            <div style={{
              background: 'rgba(255, 255, 255, 0.05)',
              backdropFilter: 'blur(20px)',
              borderRadius: '20px',
              padding: '3rem',
              border: `2px solid rgba(255, 69, 0, 0.3)`,
              height: '100%',
              position: 'relative',
              overflow: 'hidden'
            }}>
              {/* Animated border */}
              <motion.div
                animate={{
                  rotate: [0, 360]
                }}
                transition={{
                  duration: 20,
                  repeat: Infinity,
                  ease: "linear"
                }}
                style={{
                  position: 'absolute',
                  top: '-50%',
                  left: '-50%',
                  width: '200%',
                  height: '200%',
                  background: `conic-gradient(from 0deg, transparent, ${flashingOrange}, transparent)`,
                  opacity: 0.3,
                  zIndex: -1
                }}
              />

              <div style={{ position: 'relative', zIndex: 1 }}>
                <h3 style={{
                  fontSize: '2rem',
                  color: flashingOrange,
                  marginBottom: '1.5rem',
                  fontWeight: 'bold'
                }}>
                  Our Story
                </h3>
                <p style={{
                  fontSize: '1.1rem',
                  color: 'rgba(255, 255, 255, 0.9)',
                  lineHeight: '1.8',
                  marginBottom: '1.5rem'
                }}>
                  Founded in 2009, SoundWave Studios has been at the forefront of audio innovation, 
                  delivering world-class sound production services to artists, filmmakers, and content creators worldwide.
                </p>
                <p style={{
                  fontSize: '1.1rem',
                  color: 'rgba(255, 255, 255, 0.9)',
                  lineHeight: '1.8',
                  marginBottom: '2rem'
                }}>
                  Our passion for sonic excellence drives us to push the boundaries of what's possible 
                  in audio production, combining cutting-edge technology with artistic vision.
                </p>

                {/* Mission Statement */}
                <div style={{
                  background: `linear-gradient(45deg, ${flashingOrange}20, transparent)`,
                  padding: '1.5rem',
                  borderRadius: '15px',
                  borderLeft: `4px solid ${flashingOrange}`
                }}>
                  <p style={{
                    fontSize: '1rem',
                    color: 'white',
                    fontStyle: 'italic',
                    margin: 0
                  }}>
                    "To transform creative visions into sonic masterpieces that resonate with audiences 
                    and stand the test of time."
                  </p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Interactive Features */}
          <motion.div variants={itemVariants}>
            <div style={{
              background: 'rgba(0, 0, 0, 0.8)',
              backdropFilter: 'blur(20px)',
              borderRadius: '20px',
              padding: '3rem',
              border: `2px solid rgba(255, 69, 0, 0.3)`,
              height: '100%'
            }}>
              <h3 style={{
                fontSize: '2rem',
                color: flashingOrange,
                marginBottom: '2rem',
                fontWeight: 'bold',
                textAlign: 'center'
              }}>
                Our Services
              </h3>

              {/* Feature Selector */}
              <div style={{
                display: 'flex',
                gap: '0.5rem',
                marginBottom: '2rem',
                flexWrap: 'wrap',
                justifyContent: 'center'
              }}>
                {features.map((feature, index) => (
                  <motion.button
                    key={index}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setActiveFeature(index)}
                    style={{
                      padding: '0.8rem 1.5rem',
                      borderRadius: '25px',
                      border: `2px solid ${index === activeFeature ? flashingOrange : 'rgba(255, 69, 0, 0.3)'}`,
                      background: index === activeFeature ? flashingOrange + '20' : 'transparent',
                      color: index === activeFeature ? flashingOrange : 'white',
                      cursor: 'pointer',
                      fontSize: '0.9rem',
                      fontWeight: 'bold',
                      transition: 'all 0.3s ease',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.5rem'
                    }}
                  >
                    <span style={{ fontSize: '1.2rem' }}>{feature.icon}</span>
                    {feature.title}
                  </motion.button>
                ))}
              </div>

              {/* Active Feature Display */}
              <motion.div
                key={activeFeature}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                style={{
                  textAlign: 'center'
                }}
              >
                <div style={{
                  fontSize: '3rem',
                  marginBottom: '1rem',
                  filter: `drop-shadow(0 0 20px ${flashingOrange})`
                }}>
                  {features[activeFeature].icon}
                </div>
                <h4 style={{
                  fontSize: '1.5rem',
                  color: flashingOrange,
                  marginBottom: '1rem',
                  fontWeight: 'bold'
                }}>
                  {features[activeFeature].title}
                </h4>
                <p style={{
                  fontSize: '1rem',
                  color: 'rgba(255, 255, 255, 0.9)',
                  lineHeight: '1.6',
                  marginBottom: '1.5rem'
                }}>
                  {features[activeFeature].description}
                </p>
                
                {/* Feature Details */}
                <div style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(120px, 1fr))',
                  gap: '1rem',
                  marginTop: '1.5rem'
                }}>
                  {features[activeFeature].details.map((detail, index) => (
                    <motion.div
                      key={index}
                      initial={{ scale: 0, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ delay: index * 0.1, duration: 0.3 }}
                      style={{
                        background: `rgba(255, 69, 0, 0.1)`,
                        padding: '0.8rem',
                        borderRadius: '10px',
                        border: `1px solid rgba(255, 69, 0, 0.3)`,
                        fontSize: '0.9rem',
                        color: 'white',
                        fontWeight: '500'
                      }}
                    >
                      {detail}
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>

        {/* Statistics Section */}
        <motion.div 
          variants={itemVariants}
          style={{
            background: 'rgba(255, 69, 0, 0.1)',
            backdropFilter: 'blur(20px)',
            borderRadius: '25px',
            padding: '3rem 2rem',
            border: `3px solid ${flashingOrange}`,
            marginBottom: '4rem',
            position: 'relative',
            overflow: 'hidden'
          }}
        >
          {/* Animated background pattern */}
          <motion.div
            animate={{
              backgroundPosition: ['0% 0%', '100% 100%']
            }}
            transition={{
              duration: 20,
              repeat: Infinity,
              ease: "linear"
            }}
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              backgroundImage: `radial-gradient(circle at 20% 80%, ${flashingOrange}10 0%, transparent 50%), radial-gradient(circle at 80% 20%, ${flashingOrange}10 0%, transparent 50%)`,
              backgroundSize: '400% 400%',
              opacity: 0.3
            }}
          />

          <div style={{ position: 'relative', zIndex: 1 }}>
            <motion.h3
              variants={itemVariants}
              style={{
                fontSize: '2.5rem',
                color: 'white',
                textAlign: 'center',
                marginBottom: '3rem',
                fontWeight: 'bold',
                textShadow: `0 0 20px ${flashingOrange}`
              }}
            >
              Our Achievements
            </motion.h3>

            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
              gap: '2rem'
            }}>
              {[
                { key: 'projects', label: 'Projects Completed', suffix: '+', icon: '🎵' },
                { key: 'clients', label: 'Happy Clients', suffix: '+', icon: '🎧' },
                { key: 'awards', label: 'Industry Awards', suffix: '', icon: '🏆' },
                { key: 'years', label: 'Years Experience', suffix: '', icon: '⭐' }
              ].map((stat, index) => (
                <motion.div
                  key={stat.key}
                  variants={statsVariants}
                  style={{
                    textAlign: 'center',
                    background: 'rgba(0, 0, 0, 0.5)',
                    padding: '2rem 1rem',
                    borderRadius: '20px',
                    border: `2px solid rgba(255, 69, 0, 0.3)`,
                    position: 'relative',
                    overflow: 'hidden'
                  }}
                >
                  {/* Pulsing background */}
                  <motion.div
                    animate={{
                      scale: [1, 1.1, 1],
                      opacity: [0.1, 0.3, 0.1]
                    }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      delay: index * 0.5
                    }}
                    style={{
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      right: 0,
                      bottom: 0,
                      background: `radial-gradient(circle, ${flashingOrange}, transparent)`,
                      borderRadius: '20px'
                    }}
                  />

                  <div style={{ position: 'relative', zIndex: 1 }}>
                    <div style={{
                      fontSize: '2.5rem',
                      marginBottom: '1rem',
                      filter: `drop-shadow(0 0 10px ${flashingOrange})`
                    }}>
                      {stat.icon}
                    </div>
                    <motion.div
                      style={{
                        fontSize: '3rem',
                        fontWeight: 'bold',
                        color: flashingOrange,
                        marginBottom: '0.5rem',
                        textShadow: `0 0 20px ${flashingOrange}`,
                        fontFamily: 'monospace'
                      }}
                    >
                      {stats[stat.key]}{stat.suffix}
                    </motion.div>
                    <div style={{
                      fontSize: '1.1rem',
                      color: 'white',
                      fontWeight: '500'
                    }}>
                      {stat.label}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Equipment Showcase */}
        <motion.div variants={itemVariants}>
          <div style={{
            background: 'rgba(0, 0, 0, 0.8)',
            backdropFilter: 'blur(20px)',
            borderRadius: '25px',
            padding: '3rem',
            border: `2px solid rgba(255, 69, 0, 0.3)`,
            textAlign: 'center'
          }}>
            <h3 style={{
              fontSize: '2.5rem',
              color: flashingOrange,
              marginBottom: '2rem',
              fontWeight: 'bold'
            }}>
              Professional Equipment
            </h3>

            {/* Equipment Grid */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
              gap: '2rem',
              marginTop: '2rem'
            }}>
              {[
                { name: 'SSL Console', type: 'Mixing Desk', icon: '🎚️' },
                { name: 'Pro Tools HDX', type: 'DAW System', icon: '💻' },
                { name: 'Neumann U87', type: 'Microphone', icon: '🎙️' },
                { name: 'Genelec 8050B', type: 'Monitors', icon: '🔊' },
                { name: 'Vintage 1176', type: 'Compressor', icon: '⚡' },
                { name: 'API 550B', type: 'EQ Unit', icon: '🎛️' }
              ].map((equipment, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.1, duration: 0.5 }}
                  whileHover={{ 
                    scale: 1.05,
                    boxShadow: `0 10px 30px rgba(255, 69, 0, 0.3)`
                  }}
                  style={{
                    background: `linear-gradient(135deg, rgba(255, 69, 0, 0.1), rgba(0, 0, 0, 0.5))`,
                    padding: '2rem',
                    borderRadius: '15px',
                    border: `1px solid rgba(255, 69, 0, 0.3)`,
                    cursor: 'pointer',
                    transition: 'all 0.3s ease'
                  }}
                >
                  <div style={{
                    fontSize: '2.5rem',
                    marginBottom: '1rem',
                    filter: `drop-shadow(0 0 10px ${flashingOrange})`
                  }}>
                    {equipment.icon}
                  </div>
                  <h4 style={{
                    fontSize: '1.3rem',
                    color: 'white',
                    marginBottom: '0.5rem',
                    fontWeight: 'bold'
                  }}>
                    {equipment.name}
                  </h4>
                  <p style={{
                    fontSize: '1rem',
                    color: flashingOrange,
                    margin: 0,
                    fontWeight: '500'
                  }}>
                    {equipment.type}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default AboutSection;