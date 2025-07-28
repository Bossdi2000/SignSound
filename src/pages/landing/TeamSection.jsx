"use client";

import React, { useState, useEffect, useRef } from 'react';
import { motion, useInView } from 'framer-motion';

const TeamSection = () => {
  const [selectedMember, setSelectedMember] = useState(null);
  const [hoveredMember, setHoveredMember] = useState(null);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, threshold: 0.2 });

  // Responsive breakpoints
  const [windowSize, setWindowSize] = useState({
    width: typeof window !== "undefined" ? window.innerWidth : 1200,
    height: typeof window !== "undefined" ? window.innerHeight : 800,
  });

  useEffect(() => {
    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const isXSmall = windowSize.width < 480;
  const isMobile = windowSize.width >= 480 && windowSize.width < 640;
  const isTablet = windowSize.width >= 640 && windowSize.width < 1024;
  const isDesktop = windowSize.width >= 1024;

  // Colors
  const flashingOrange = '#FF4500';
  const black = '#000000';
  const darkGray = '#1a1a1a';

  const teamMembers = [
    {
      id: 1,
      name: 'Marcus Rodriguez',
      role: 'Chief Audio Engineer',
      specialty: 'Mixing & Mastering',
      experience: '15+ Years',
      avatar: '👨‍🎤',
      bio: 'Grammy-nominated engineer with expertise in rock, pop, and electronic music production.',
      achievements: ['3x Grammy Nominations', '100+ Platinum Records', 'Abbey Road Certified'],
      skills: ['Pro Tools Expert', 'SSL Console', 'Analog Processing', 'Spatial Audio'],
      social: { twitter: '@marcusaudio', instagram: '@marcusrodriguez' }
    },
    {
      id: 2,
      name: 'Sarah Chen',
      role: 'Sound Designer',
      specialty: 'Film & Game Audio',
      experience: '12+ Years',
      avatar: '👩‍🎨',
      bio: 'Award-winning sound designer specializing in immersive audio experiences for visual media.',
      achievements: ['Emmy Award Winner', 'BAFTA Nominated', 'Sundance Featured'],
      skills: ['Foley Artistry', 'Surround Sound', 'Interactive Audio', 'Field Recording'],
      social: { twitter: '@sarahsounds', instagram: '@chensounddesign' }
    },
    {
      id: 3,
      name: 'David Thompson',
      role: 'Music Producer',
      specialty: 'Artist Development',
      experience: '18+ Years',
      avatar: '👨‍🎵',
      bio: 'Multi-platinum producer known for developing breakthrough artists and chart-topping hits.',
      achievements: ['50+ Gold Records', 'Producer of the Year', 'Multi-Platinum Status'],
      skills: ['Artist Coaching', 'Songwriting', 'Arrangement', 'A&R Relations'],
      social: { twitter: '@davidproduces', instagram: '@thompsonbeats' }
    },
    {
      id: 4,
      name: 'Elena Vasquez',
      role: 'Audio Technician',
      specialty: 'Equipment & Maintenance',
      experience: '10+ Years',
      avatar: '👩‍🔧',
      bio: 'Expert in studio maintenance and cutting-edge audio technology implementation.',
      achievements: ['Certified Technician', 'Innovation Award', 'System Designer'],
      skills: ['Hardware Repair', 'System Integration', 'Acoustics', 'Digital Systems'],
      social: { twitter: '@elenatech', instagram: '@vasquezaudio' }
    },
    {
      id: 5,
      name: 'James Wilson',
      role: 'Mixing Engineer',
      specialty: 'Live & Studio Mixing',
      experience: '14+ Years',
      avatar: '👨‍🎚️',
      bio: 'Versatile engineer experienced in both live concert mixing and studio production.',
      achievements: ['World Tour Engineer', 'Festival Headliner', 'Live Album Awards'],
      skills: ['Live Mixing', 'Monitor Engineering', 'Digital Consoles', 'RF Systems'],
      social: { twitter: '@jameswilsonmix', instagram: '@wilsonaudio' }
    },
    {
      id: 6,
      name: 'Aisha Patel',
      role: 'Mastering Engineer',
      specialty: 'Final Mix Processing',
      experience: '11+ Years',
      avatar: '👩‍🎧',
      bio: 'Precision mastering engineer ensuring optimal sound across all playback systems.',
      achievements: ['Mastering Guild Member', 'Streaming Specialist', 'Vinyl Expert'],
      skills: ['Digital Mastering', 'Analog Chain', 'Loudness Standards', 'Format Optimization'],
      social: { twitter: '@aishamaster', instagram: '@patelmasters' }
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { duration: 0.6, staggerChildren: 0.1 },
    },
  };

  const cardVariants = {
    hidden: { y: 50, opacity: 0, scale: 0.9 },
    visible: {
      y: 0,
      opacity: 1,
      scale: 1,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  const modalVariants = {
    hidden: { opacity: 0, scale: 0.5, y: 100 },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: { duration: 0.5, ease: "easeOut" },
    },
    exit: {
      opacity: 0,
      scale: 0.5,
      y: 100,
      transition: { duration: 0.3 },
    },
  };

  // Handle Escape key to close modal
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        setSelectedMember(null);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <div
      id="team"
      ref={ref}
      style={{
        background: `linear-gradient(180deg, ${darkGray} 0%, ${black} 50%, ${darkGray} 100%)`,
        minHeight: '100vh',
        padding: isXSmall ? '3rem 1rem' : isMobile ? '4rem 1.5rem' : '6rem 2rem',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Animated Background */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          opacity: 0.1,
          pointerEvents: 'none',
        }}
      >
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            animate={{
              y: [0, -100, 0],
              opacity: [0.3, 0.8, 0.3],
              scale: [0.5, 1, 0.5],
            }}
            transition={{
              duration: 5 + Math.random() * 5,
              repeat: Infinity,
              ease: "easeInOut",
              delay: Math.random() * 5,
            }}
            style={{
              position: 'absolute',
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              width: isXSmall ? '40px' : '60px',
              height: isXSmall ? '40px' : '60px',
              border: `3px solid ${flashingOrange}`,
              borderRadius: '50%',
              transform: 'rotate(45deg)',
            }}
          />
        ))}
      </div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        style={{
          maxWidth: isDesktop ? '1400px' : '90%',
          margin: '0 auto',
          position: 'relative',
          zIndex: 2,
        }}
      >
        {/* Section Header */}
        <motion.div variants={cardVariants} style={{ textAlign: 'center', marginBottom: isXSmall ? '2rem' : '4rem' }}>
          <motion.h2
            style={{
              fontSize: isXSmall ? '1.5rem' : isMobile ? '2rem' : 'clamp(2.5rem, 6vw, 4rem)',
              fontWeight: 'bold',
              color: 'white',
              margin: '0 0 1rem 0',
              textShadow: `0 0 30px ${flashingOrange}`,
              fontFamily: '"Orbitron", monospace, system-ui',
            }}
          >
            Our <span style={{ color: flashingOrange }}>Expert</span> Team
          </motion.h2>
          <motion.p
            style={{
              fontSize: isXSmall ? '0.9rem' : isMobile ? '1rem' : '1.3rem',
              color: 'rgba(255, 255, 255, 0.8)',
              maxWidth: isDesktop ? '600px' : '90%',
              margin: '0 auto 2rem auto',
              lineHeight: '1.6',
            }}
          >
            Meet the passionate professionals who bring your audio visions to life
          </motion.p>
          <motion.div
            animate={{
              width: ['0%', '100%'],
              backgroundColor: [flashingOrange, '#FF6500', flashingOrange],
            }}
            transition={{
              duration: 2,
              ease: "easeInOut",
              delay: 0.5,
            }}
            style={{
              height: '4px',
              background: flashingOrange,
              margin: '0 auto',
              maxWidth: isXSmall ? '150px' : '300px',
              borderRadius: '2px',
            }}
          />
        </motion.div>

        {/* Team Grid */}
        <motion.div
          style={{
            display: 'grid',
            gridTemplateColumns: isXSmall || isMobile ? '1fr' : isTablet ? 'repeat(2, 1fr)' : 'repeat(auto-fit, minmax(350px, 1fr))',
            gap: isXSmall ? '1rem' : isMobile ? '1.5rem' : '2rem',
            marginBottom: isXSmall ? '2rem' : '4rem',
          }}
        >
          {teamMembers.map((member) => (
            <motion.div
              key={member.id}
              variants={cardVariants}
              whileHover={{ 
                scale: 1.03, 
                y: -10,
                boxShadow: `0 20px 40px rgba(255, 69, 0, 0.3)`,
              }}
              onHoverStart={() => setHoveredMember(member.id)}
              onHoverEnd={() => setHoveredMember(null)}
              onClick={() => setSelectedMember(member)}
              style={{
                background: hoveredMember === member.id 
                  ? `linear-gradient(135deg, rgba(255, 69, 0, 0.2), rgba(0, 0, 0, 0.9))`
                  : 'rgba(255, 255, 255, 0.05)',
                backdropFilter: 'blur(20px)',
                borderRadius: '25px',
                padding: isXSmall ? '1.5rem' : '2.5rem',
                border: `2px solid ${hoveredMember === member.id ? flashingOrange : 'rgba(255, 69, 0, 0.3)'}`,
                cursor: 'pointer',
                transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                position: 'relative',
                overflow: 'hidden',
              }}
            >
              {/* Animated border effect */}
              <motion.div
                animate={hoveredMember === member.id ? {
                  rotate: [0, 360],
                  scale: [1, 1.1, 1],
                } : {}}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "linear",
                }}
                style={{
                  position: 'absolute',
                  top: '-50%',
                  left: '-50%',
                  width: '200%',
                  height: '200%',
                  background: `conic-gradient(from 0deg, transparent, ${flashingOrange}40, transparent)`,
                  opacity: hoveredMember === member.id ? 0.5 : 0,
                  transition: 'opacity 0.3s ease',
                  zIndex: 0,
                }}
              />

              <div style={{ position: 'relative', zIndex: 1, textAlign: 'center' }}>
                {/* Avatar */}
                <motion.div
                  animate={hoveredMember === member.id ? {
                    scale: [1, 1.2, 1],
                    rotate: [0, 10, -10, 0],
                  } : {}}
                  transition={{ duration: 2, repeat: Infinity }}
                  style={{
                    fontSize: isXSmall ? '3rem' : isMobile ? '3.5rem' : '4rem',
                    marginBottom: isXSmall ? '1rem' : '1.5rem',
                    filter: `drop-shadow(0 0 20px ${flashingOrange})`,
                    display: 'inline-block',
                    width: isXSmall ? '80px' : '100px',
                    height: isXSmall ? '80px' : '100px',
                    lineHeight: isXSmall ? '80px' : '100px',
                  }}
                >
                  {member.avatar}
                </motion.div>

                {/* Name & Role */}
                <h3 style={{
                  fontSize: isXSmall ? '1.2rem' : isMobile ? '1.5rem' : '1.8rem',
                  color: 'white',
                  marginBottom: '0.5rem',
                  fontWeight: 'bold',
                }}>
                  {member.name}
                </h3>
                <p style={{
                  fontSize: isXSmall ? '0.9rem' : isMobile ? '1rem' : '1.2rem',
                  color: flashingOrange,
                  marginBottom: '0.5rem',
                  fontWeight: '600',
                }}>
                  {member.role}
                </p>
                <p style={{
                  fontSize: isXSmall ? '0.8rem' : '1rem',
                  color: 'rgba(255, 255, 255, 0.7)',
                  marginBottom: '1rem',
                }}>
                  {member.specialty}
                </p>

                {/* Experience Badge */}
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  style={{
                    display: 'inline-block',
                    background: `linear-gradient(45deg, ${flashingOrange}, #FF6500)`,
                    color: 'black',
                    padding: isXSmall ? '0.4rem 0.8rem' : '0.5rem 1rem',
                    borderRadius: '20px',
                    fontSize: isXSmall ? '0.8rem' : '0.9rem',
                    fontWeight: 'bold',
                    marginBottom: isXSmall ? '1rem' : '1.5rem',
                    boxShadow: `0 4px 15px rgba(255, 69, 0, 0.3)`,
                  }}
                >
                  {member.experience}
                </motion.div>

                {/* Bio Preview */}
                <p style={{
                  fontSize: isXSmall ? '0.8rem' : '1rem',
                  color: 'rgba(255, 255, 255, 0.8)',
                  lineHeight: '1.5',
                  marginBottom: isXSmall ? '1rem' : '1.5rem',
                }}>
                  {member.bio.substring(0, isXSmall ? 60 : 80)}...
                </p>

                {/* View Profile Button */}
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  style={{
                    background: 'transparent',
                    border: `2px solid ${flashingOrange}`,
                    color: flashingOrange,
                    padding: isXSmall ? '0.6rem 1.5rem' : '0.8rem 2rem',
                    borderRadius: '25px',
                    fontSize: isXSmall ? '0.9rem' : '1rem',
                    cursor: 'pointer',
                    fontWeight: 'bold',
                    transition: 'all 0.3s ease',
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.background = flashingOrange;
                    e.target.style.color = 'black';
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.background = 'transparent';
                    e.target.style.color = flashingOrange;
                  }}
                >
                  View Profile
                </motion.button>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Team Statistics */}
        <motion.div
          variants={cardVariants}
          style={{
            background: 'rgba(255, 69, 0, 0.1)',
            backdropFilter: 'blur(20px)',
            borderRadius: '25px',
            padding: isXSmall ? '1.5rem' : isMobile ? '2rem' : '3rem',
            border: `3px solid ${flashingOrange}`,
            textAlign: 'center',
          }}
        >
          <h3 style={{
            fontSize: isXSmall ? '1.5rem' : isMobile ? '2rem' : '2.5rem',
            color: 'white',
            marginBottom: isXSmall ? '1rem' : '2rem',
            fontWeight: 'bold',
          }}>
            Collective Experience
          </h3>
          <div style={{
            display: 'grid',
            gridTemplateColumns: isXSmall || isMobile ? '1fr' : isTablet ? 'repeat(2, 1fr)' : 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: isXSmall ? '1rem' : '2rem',
          }}>
            {[
              { number: '80+', label: 'Years Combined', icon: '⏰' },
              { number: '15+', label: 'Major Awards', icon: '🏆' },
              { number: '500+', label: 'Albums Produced', icon: '💿' },
              { number: '50+', label: 'Chart Toppers', icon: '📈' },
            ].map((stat, index) => (
              <motion.div
                key={index}
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: index * 0.2 + 1, duration: 0.6 }}
                style={{
                  background: 'rgba(0, 0, 0, 0.5)',
                  padding: isXSmall ? '1rem' : '2rem',
                  borderRadius: '20px',
                  border: `2px solid rgba(255, 69, 0, 0.3)`,
                }}
              >
                <div style={{
                  fontSize: isXSmall ? '1.5rem' : '2.5rem',
                  marginBottom: '1rem',
                }}>
                  {stat.icon}
                </div>
                <div style={{
                  fontSize: isXSmall ? '1.5rem' : '2.5rem',
                  fontWeight: 'bold',
                  color: flashingOrange,
                  marginBottom: '0.5rem',
                }}>
                  {stat.number}
                </div>
                <div style={{
                  fontSize: isXSmall ? '0.9rem' : '1.1rem',
                  color: 'white',
                }}>
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Member Detail Modal */}
        {selectedMember && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedMember(null)}
            style={{
              position: 'fixed',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              background: 'rgba(0, 0, 0, 0.9)',
              backdropFilter: 'blur(10px)',
              zIndex: 1000,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: isXSmall ? '1rem' : '2rem',
            }}
            role="dialog"
            aria-labelledby="modal-title"
            aria-modal="true"
          >
            <motion.div
              variants={modalVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              onClick={(e) => e.stopPropagation()}
              style={{
                background: `linear-gradient(135deg, ${darkGray}, ${black})`,
                borderRadius: '25px',
                padding: isXSmall ? '1.5rem' : '3rem',
                border: `3px solid ${flashingOrange}`,
                maxWidth: isXSmall || isMobile ? '90vw' : '600px',
                width: '100%',
                maxHeight: isXSmall || isMobile ? '90vh' : '80vh',
                overflowY: 'auto',
                position: 'relative',
              }}
            >
              {/* Close Button */}
              <motion.button
                whileHover={{ scale: 1.1, rotate: 90 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setSelectedMember(null)}
                style={{
                  position: 'absolute',
                  top: isXSmall ? '0.5rem' : '1rem',
                  right: isXSmall ? '0.5rem' : '1rem',
                  width: isXSmall ? '32px' : '40px',
                  height: isXSmall ? '32px' : '40px',
                  borderRadius: '50%',
                  border: `2px solid ${flashingOrange}`,
                  background: 'transparent',
                  color: flashingOrange,
                  fontSize: isXSmall ? '0.9rem' : '1rem',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  transition: 'all 0.3s ease',
                }}
                onMouseEnter={(e) => {
                  e.target.style.background = flashingOrange;
                  e.target.style.color = 'black';
                }}
                onMouseLeave={(e) => {
                  e.target.style.background = 'transparent';
                  e.target.style.color = flashingOrange;
                }}
                aria-label="Close modal"
              >
                ✕
              </motion.button>

              {/* Modal Content */}
              <div style={{ textAlign: 'center' }}>
                <motion.div
                  style={{
                    fontSize: isXSmall ? '3rem' : isMobile ? '4rem' : '5rem',
                    marginBottom: isXSmall ? '1rem' : '1.5rem',
                    filter: `drop-shadow(0 0 20px ${flashingOrange})`,
                    display: 'inline-block',
                    width: isXSmall ? '80px' : isMobile ? '100px' : '120px',
                    height: isXSmall ? '80px' : isMobile ? '100px' : '120px',
                    lineHeight: isXSmall ? '80px' : isMobile ? '100px' : '120px',
                  }}
                >
                  {selectedMember.avatar}
                </motion.div>
                <h2 id="modal-title" style={{
                  fontSize: isXSmall ? '1.5rem' : isMobile ? '2rem' : '2.5rem',
                  color: 'white',
                  marginBottom: '0.5rem',
                  fontWeight: 'bold',
                }}>
                  {selectedMember.name}
                </h2>
                <p style={{
                  fontSize: isXSmall ? '0.9rem' : isMobile ? '1rem' : '1.2rem',
                  color: flashingOrange,
                  marginBottom: '0.5rem',
                  fontWeight: '600',
                }}>
                  {selectedMember.role}
                </p>
                <p style={{
                  fontSize: isXSmall ? '0.8rem' : '1rem',
                  color: 'rgba(255, 255, 255, 0.7)',
                  marginBottom: '1rem',
                }}>
                  {selectedMember.specialty} • {selectedMember.experience}
                </p>
                <p style={{
                  fontSize: isXSmall ? '0.9rem' : '1rem',
                  color: 'rgba(255, 255, 255, 0.8)',
                  lineHeight: '1.6',
                  marginBottom: '1.5rem',
                }}>
                  {selectedMember.bio}
                </p>

                {/* Achievements */}
                <div style={{
                  marginBottom: '1.5rem',
                }}>
                  <h3 style={{
                    fontSize: isXSmall ? '1rem' : '1.2rem',
                    color: flashingOrange,
                    marginBottom: '0.5rem',
                    fontWeight: '600',
                  }}>
                    Achievements
                  </h3>
                  <ul style={{
                    listStyle: 'none',
                    padding: 0,
                    display: 'grid',
                    gridTemplateColumns: isXSmall || isMobile ? '1fr' : 'repeat(2, 1fr)',
                    gap: '0.5rem',
                  }}>
                    {selectedMember.achievements.map((achievement, index) => (
                      <li key={index} style={{
                        fontSize: isXSmall ? '0.8rem' : '0.9rem',
                        color: 'rgba(255, 255, 255, 0.8)',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.5rem',
                      }}>
                        <span style={{
                          width: '8px',
                          height: '8px',
                          backgroundColor: flashingOrange,
                          borderRadius: '50%',
                        }} />
                        {achievement}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Skills */}
                <div style={{
                  marginBottom: '1.5rem',
                }}>
                  <h3 style={{
                    fontSize: isXSmall ? '1rem' : '1.2rem',
                    color: flashingOrange,
                    marginBottom: '0.5rem',
                    fontWeight: '600',
                  }}>
                    Skills
                  </h3>
                  <div style={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    gap: '0.5rem',
                    justifyContent: 'center',
                  }}>
                    {selectedMember.skills.map((skill, index) => (
                      <span key={index} style={{
                        background: `linear-gradient(45deg, ${flashingOrange}, #FF6500)`,
                        color: 'black',
                        padding: isXSmall ? '0.3rem 0.6rem' : '0.4rem 0.8rem',
                        borderRadius: '15px',
                        fontSize: isXSmall ? '0.7rem' : '0.8rem',
                        fontWeight: 'bold',
                      }}>
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Social Links */}
                <div style={{
                  display: 'flex',
                  justifyContent: 'center',
                  gap: '1rem',
                }}>
                  <a
                    href={`https://twitter.com/${selectedMember.social.twitter.replace('@', '')}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      fontSize: isXSmall ? '0.8rem' : '1rem',
                      color: flashingOrange,
                      textDecoration: 'none',
                      border: `2px solid ${flashingOrange}`,
                      padding: isXSmall ? '0.4rem 0.8rem' : '0.5rem 1rem',
                      borderRadius: '15px',
                      transition: 'all 0.3s ease',
                    }}
                    onMouseEnter={(e) => {
                      e.target.style.background = flashingOrange;
                      e.target.style.color = 'black';
                    }}
                    onMouseLeave={(e) => {
                      e.target.style.background = 'transparent';
                      e.target.style.color = flashingOrange;
                    }}
                  >
                    Twitter
                  </a>
                  <a
                    href={`https://instagram.com/${selectedMember.social.instagram.replace('@', '')}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      fontSize: isXSmall ? '0.8rem' : '1rem',
                      color: flashingOrange,
                      textDecoration: 'none',
                      border: `2px solid ${flashingOrange}`,
                      padding: isXSmall ? '0.4rem 0.8rem' : '0.5rem 1rem',
                      borderRadius: '15px',
                      transition: 'all 0.3s ease',
                    }}
                    onMouseEnter={(e) => {
                      e.target.style.background = flashingOrange;
                      e.target.style.color = 'black';
                    }}
                    onMouseLeave={(e) => {
                      e.target.style.background = 'transparent';
                      e.target.style.color = flashingOrange;
                    }}
                  >
                    Instagram
                  </a>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </motion.div>
    </div>
  );
};

export default TeamSection;