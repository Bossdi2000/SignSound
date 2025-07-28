"use client";

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const HeroSection = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(75);
  const [currentTime, setCurrentTime] = useState(0);
  const [windowSize, setWindowSize] = useState({
    width: typeof window !== 'undefined' ? window.innerWidth : 1200,
    height: typeof window !== 'undefined' ? window.innerHeight : 800,
  });

  // Colors
  const flashingOrange = '#FF4500';
  const black = '#000000';
  const darkGray = '#1a1a1a';

  // Responsive breakpoints
  useEffect(() => {
    const slideInterval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 5000);

    const timeInterval = setInterval(() => {
      setCurrentTime((prev) => (prev + 1) % 180); // 3 minute loop
    }, 1000);

    const debounce = (fn, ms) => {
      let timeout;
      return (...args) => {
        clearTimeout(timeout);
        timeout = setTimeout(() => fn(...args), ms);
      };
    };

    const handleResize = debounce(() => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    }, 100);

    window.addEventListener('resize', handleResize);
    return () => {
      clearInterval(slideInterval);
      clearInterval(timeInterval);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const isXSmall = windowSize.width < 480;
  const isMobile = windowSize.width >= 480 && windowSize.width < 640;
  const isTablet = windowSize.width >= 640 && windowSize.width < 1024;

  const heroSlides = [
    {
      title: "Sound Design",
      subtitle: "Innovation",
      description: "Cutting-edge audio solutions for film, games, and digital media",
      bg: "linear-gradient(135deg, #1a1a1a 0%, #FF6500 50%, #000000 100%)",
    },
  ];

  const containerVariants = {
    initial: { opacity: 0 },
    animate: {
      opacity: 1,
      transition: { duration: 1, staggerChildren: 0.3 },
    },
  };

  const titleVariants = {
    initial: { y: 100, opacity: 0 },
    animate: {
      y: 0,
      opacity: 1,
      transition: { duration: 1, ease: "easeOut" },
    },
  };

  const subtitleVariants = {
    initial: { x: -100, opacity: 0 },
    animate: {
      x: 0,
      opacity: 1,
      transition: { duration: 1, ease: "easeOut", delay: 0.3 },
    },
  };

  const descriptionVariants = {
    initial: { y: 50, opacity: 0 },
    animate: {
      y: 0,
      opacity: 1,
      transition: { duration: 1, ease: "easeOut", delay: 0.6 },
    },
  };

  const buttonVariants = {
    initial: { scale: 0, opacity: 0 },
    animate: {
      scale: 1,
      opacity: 1,
      transition: { duration: 0.8, ease: "easeOut", delay: 0.9 },
    },
    hover: {
      scale: 1.05,
      boxShadow: `0 12px 48px rgba(255, 69, 0, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.2)`,
      background: 'linear-gradient(135deg, rgba(255, 69, 0, 0.2) 0%, rgba(255, 101, 0, 0.3) 50%, rgba(255, 69, 0, 0.2) 100%)',
      borderColor: '#FF6500',
      transition: { duration: 0.3 },
    },
  };

  // Audio visualizer bars
  const generateVisualizerBars = (count) =>
    [...Array(count)].map((_, i) => (
      <motion.div
        key={i}
        animate={{
          height: [10, Math.random() * 80 + 20, 10],
          backgroundColor: [flashingOrange, '#FF6500', '#FF8C00', flashingOrange],
        }}
        transition={{
          duration: 0.5 + Math.random() * 0.8,
          repeat: Infinity,
          ease: "easeInOut",
          delay: i * 0.05,
        }}
        style={{
          width: '4px',
          backgroundColor: flashingOrange,
          borderRadius: '2px',
          opacity: 0.8,
          margin: '0 1px',
        }}
      />
    ));

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div
      style={{
        position: 'relative',
        minHeight: '100vh',
        width: '100vw',
        margin: 0,
        padding: 0,
        overflow: 'hidden',
        background: heroSlides[currentSlide].bg,
        transition: 'background 2s ease-in-out',
      }}
    >
      {/* Animated Background Particles */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          overflow: 'hidden',
          pointerEvents: 'none',
        }}
      >
        {[...Array(50)].map((_, i) => (
          <motion.div
            key={i}
            animate={{
              y: [-20, -100],
              opacity: [0, 1, 0],
              scale: [0.5, 1, 0.5],
            }}
            transition={{
              duration: 3 + Math.random() * 4,
              repeat: Infinity,
              delay: Math.random() * 5,
              ease: "easeInOut",
            }}
            style={{
              position: 'absolute',
              left: `${Math.random() * 100}%`,
              top: '100%',
              width: '2px',
              height: '2px',
              backgroundColor: flashingOrange,
              borderRadius: '50%',
              boxShadow: `0 0 10px ${flashingOrange}`,
            }}
          />
        ))}
      </div>

      {/* Main Content */}
      <motion.div
        variants={containerVariants}
        initial="initial"
        animate="animate"
        style={{
          position: 'relative',
          zIndex: 2,
          minHeight: '100vh',
          width: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: isXSmall ? '0 1rem' : isMobile ? '0 1.5rem' : '0 2rem',
          paddingTop: isXSmall ? '100px' : isMobile ? '120px' : '140px', // Added top padding to move content down
          textAlign: 'center',
        }}
      >
        <div style={{ maxWidth: isTablet ? '90%' : '1200px', width: '100%' }}>
          {/* Slide Content */}
          <div style={{ 
            display: 'flex', 
            flexDirection: 'column', 
            alignItems: 'center',
            maxWidth: '900px',
            margin: '0 auto'
          }}>
            <motion.h1
              key={`title-${currentSlide}`}
              variants={titleVariants}
              initial="initial"
              animate="animate"
              style={{
                fontSize: isXSmall
                  ? '2.2rem'
                  : isMobile
                  ? '3rem'
                  : isTablet
                  ? '4.5rem'
                  : 'clamp(3rem, 7vw, 7rem)',
                fontWeight: '700',
                color: 'white',
                margin: '0 0 0.8rem 0',
                textShadow: `0 0 30px ${flashingOrange}, 0 0 60px rgba(255, 69, 0, 0.3)`,
                fontFamily: '"Orbitron", monospace, system-ui',
                letterSpacing: '3px',
                textTransform: 'uppercase',
                lineHeight: '1.0',
                textAlign: 'center',
              }}
            >
              {heroSlides[currentSlide].title}
            </motion.h1>

            <motion.h2
              key={`subtitle-${currentSlide}`}
              variants={subtitleVariants}
              initial="initial"
              animate="animate"
              style={{
                fontSize: isXSmall
                  ? '1.4rem'
                  : isMobile
                  ? '1.8rem'
                  : isTablet
                  ? '2.5rem'
                  : 'clamp(1.8rem, 4vw, 3.5rem)',
                fontWeight: '300',
                color: flashingOrange,
                margin: '0 0 1.5rem 0',
                textShadow: `0 0 20px ${flashingOrange}`,
                letterSpacing: '4px',
                textTransform: 'uppercase',
                lineHeight: '1.1',
                textAlign: 'center',
              }}
            >
              {heroSlides[currentSlide].subtitle}
            </motion.h2>

            <motion.p
              key={`description-${currentSlide}`}
              variants={descriptionVariants}
              initial="initial"
              animate="animate"
              style={{
                fontSize: isXSmall
                  ? '1rem'
                  : isMobile
                  ? '1.2rem'
                  : 'clamp(1.2rem, 2.2vw, 1.6rem)',
                color: 'rgba(255, 255, 255, 0.85)',
                margin: '0 0 2.5rem 0',
                maxWidth: isXSmall ? '95%' : '700px',
                lineHeight: '1.5',
                fontWeight: '300',
                textAlign: 'center',
                letterSpacing: '0.5px',
              }}
            >
              {heroSlides[currentSlide].description}
            </motion.p>

            {/* Get Started Button */}
            <motion.button
              variants={buttonVariants}
              initial="initial"
              animate="animate"
              whileHover="hover"
              whileTap={{ scale: 0.95 }}
              style={{
                padding: isXSmall ? '0.8rem 2.5rem' : '1rem 3rem',
                fontSize: isXSmall ? '1rem' : '1.2rem',
                fontWeight: '600',
                color: 'white',
                background: 'linear-gradient(135deg, rgba(255, 69, 0, 0.1) 0%, rgba(255, 101, 0, 0.2) 50%, rgba(255, 69, 0, 0.1) 100%)',
                border: `2px solid ${flashingOrange}`,
                borderRadius: '50px',
                cursor: 'pointer',
                textTransform: 'uppercase',
                letterSpacing: '2px',
                boxShadow: `0 8px 32px rgba(255, 69, 0, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.1)`,
                position: 'relative',
                overflow: 'hidden',
                marginTop: isXSmall ? '2rem' : '2.5rem',
                backdropFilter: 'blur(10px)',
                transition: 'all 0.3s ease',
              }}
              aria-label="Get Started with SignSound Studio"
            >
              <div
                style={{
                  position: 'absolute',
                  top: 0,
                  left: '-100%',
                  width: '100%',
                  height: '100%',
                  background: 'linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent)',
                  transition: 'left 0.6s ease',
                }}
              />
              <span style={{ position: 'relative', zIndex: 1 }}>Get Started</span>
            </motion.button>
          </div>

          {/* Audio Player Interface */}
          <motion.div
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2, duration: 0.8 }}
            style={{
              background: 'rgba(0, 0, 0, 0.8)',
              backdropFilter: 'blur(20px)',
              borderRadius: '20px',
              padding: isXSmall ? '1.2rem' : '1.5rem', // Reduced padding
              margin: isXSmall ? '1.5rem auto' : '2rem auto', // Reduced margin
              maxWidth: isXSmall ? '90%' : '600px',
              border: `2px solid rgba(255, 69, 0, 0.3)`,
              boxShadow: `0 10px 40px rgba(255, 69, 0, 0.2)`,
            }}
          >
            {/* Audio Visualizer */}
            <div
              style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'flex-end',
                height: isXSmall ? '70px' : '80px', // Reduced height
                marginBottom: '1.5rem', // Reduced margin
                gap: '1px',
              }}
            >
              {generateVisualizerBars(isXSmall ? 30 : 40)}
            </div>

            {/* Player Controls */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                marginBottom: '1rem',
              }}
            >
              {/* Play/Pause Button */}
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setIsPlaying(!isPlaying)}
                style={{
                  width: isXSmall ? '50px' : '60px',
                  height: isXSmall ? '50px' : '60px',
                  borderRadius: '50%',
                  border: `3px solid ${flashingOrange}`,
                  background: isPlaying ? flashingOrange : 'transparent',
                  color: isPlaying ? 'black' : flashingOrange,
                  cursor: 'pointer',
                  fontSize: isXSmall ? '1.2rem' : '1.5rem',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  transition: 'all 0.3s ease',
                }}
                aria-label={isPlaying ? 'Pause audio' : 'Play audio'}
              >
                {isPlaying ? '⏸️' : '▶️'}
              </motion.button>

              {/* Time Progress */}
              <div
                style={{
                  flex: 1,
                  margin: isXSmall ? '0 1rem' : '0 2rem',
                  color: 'white',
                }}
              >
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    fontSize: isXSmall ? '0.8rem' : '0.9rem',
                    marginBottom: '0.5rem',
                  }}
                >
                  <span>{formatTime(currentTime)}</span>
                  <span>3:00</span>
                </div>
                <div
                  style={{
                    height: '4px',
                    background: 'rgba(255, 255, 255, 0.2)',
                    borderRadius: '2px',
                    overflow: 'hidden',
                  }}
                >
                  <motion.div
                    animate={{
                      width: `${(currentTime / 180) * 100}%`,
                    }}
                    style={{
                      height: '100%',
                      background: `linear-gradient(90deg, ${flashingOrange}, #FF6500)`,
                      borderRadius: '2px',
                    }}
                  />
                </div>
              </div>

              {/* Volume Control */}
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '10px',
                  color: flashingOrange,
                }}
              >
                <span style={{ fontSize: isXSmall ? '1rem' : '1.2rem' }}>🔊</span>
                <div
                  style={{
                    width: isXSmall ? '60px' : '80px',
                    height: '4px',
                    background: 'rgba(255, 255, 255, 0.2)',
                    borderRadius: '2px',
                    position: 'relative',
                    cursor: 'pointer',
                  }}
                >
                  <div
                    style={{
                      width: `${volume}%`,
                      height: '100%',
                      background: flashingOrange,
                      borderRadius: '2px',
                    }}
                  />
                </div>
              </div>
            </div>

            {/* Track Info */}
            <div
              style={{
                textAlign: 'center',
                color: 'white',
              }}
            >
              <div
                style={{
                  fontSize: isXSmall ? '0.9rem' : '1.1rem',
                  fontWeight: 'bold',
                  marginBottom: '0.5rem',
                }}
              >
                Demo Track - Professional Mix
              </div>
              <div
                style={{
                  fontSize: isXSmall ? '0.7rem' : '0.9rem',
                  color: flashingOrange,
                  opacity: 0.8,
                }}
              >
                SoundWave Studios
              </div>
            </div>
          </motion.div>
        </div>
      </motion.div>

      {/* Slide Indicators */}
      <div
        style={{
          position: 'absolute',
          bottom: '2rem',
          left: '50%',
          transform: 'translateX(-50%)',
          display: 'flex',
          gap: '1rem',
          zIndex: 3,
        }}
      >
        {heroSlides.map((_, index) => (
          <motion.button
            key={index}
            whileHover={{ scale: 1.2 }}
            onClick={() => setCurrentSlide(index)}
            style={{
              width: '12px',
              height: '12px',
              borderRadius: '50%',
              border: `2px solid ${flashingOrange}`,
              background: index === currentSlide ? flashingOrange : 'transparent',
              cursor: 'pointer',
              transition: 'all 0.3s ease',
            }}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>

      {/* Scroll Indicator */}
      <motion.div
        animate={{
          y: [0, 10, 0],
          opacity: [0.5, 1, 0.5],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        style={{
          position: 'absolute',
          bottom: '1rem',
          right: isXSmall ? '1rem' : '2rem',
          color: flashingOrange,
          fontSize: isXSmall ? '1.5rem' : '2rem',
          zIndex: 3,
        }}
      >
        ↓
      </motion.div>
    </div>
  );
};

export default HeroSection;