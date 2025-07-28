"use client";

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const Navbar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [currentTime, setCurrentTime] = useState(new Date());
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
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    const timer = setInterval(() => {
      setCurrentTime(new Date());
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

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
      clearInterval(timer);
    };
  }, []);

  const isXSmall = windowSize.width < 480;
  const isMobile = windowSize.width >= 480 && windowSize.width < 640;
  const isTablet = windowSize.width >= 640 && windowSize.width < 1024;

  const menuItems = [
    { name: 'Home', href: '#home', icon: '🎵' },
    { name: 'About', href: '#about', icon: '🔊' },
    { name: 'Team', href: '#team', icon: '🎧' },
    { name: 'Contact', href: '#contact', icon: '📻' },
  ];

  const navbarVariants = {
    initial: { y: -100, opacity: 0 },
    animate: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.8, ease: 'easeOut' },
    },
  };

  const logoVariants = {
    initial: { scale: 0, rotate: -180 },
    animate: {
      scale: 1,
      rotate: 0,
      transition: { duration: 1, ease: 'easeOut', delay: 0.2 },
    },
    hover: {
      scale: 1.1,
      rotate: 10,
      transition: { duration: 0.3 },
    },
  };

  const menuItemVariants = {
    initial: { x: -50, opacity: 0 },
    animate: (i) => ({
      x: 0,
      opacity: 1,
      transition: { delay: 0.1 * i, duration: 0.5 },
    }),
    hover: {
      scale: 1.05,
      color: flashingOrange,
      transition: { duration: 0.2 },
    },
  };

  const pulseAnimation = {
    scale: [1, 1.2, 1],
    opacity: [0.7, 1, 0.7],
    transition: {
      duration: 2,
      repeat: Infinity,
      ease: 'easeInOut',
    },
  };

  const waveformBars = [...Array(15)].map((_, i) => (
    <motion.div
      key={i}
      animate={{
        height: [8, Math.random() * 25 + 8, 8],
        backgroundColor: [flashingOrange, '#FF6500', flashingOrange],
      }}
      transition={{
        duration: 0.4 + Math.random() * 0.4,
        repeat: Infinity,
        ease: 'easeInOut',
        delay: i * 0.05,
      }}
      style={{
        width: '3px',
        backgroundColor: flashingOrange,
        borderRadius: '2px',
        margin: '0 1px',
      }}
    />
  ));

  return (
    <>
      <motion.nav
        variants={navbarVariants}
        initial="initial"
        animate="animate"
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          width: '100vw',
          margin: 0,
          padding: 0,
          zIndex: 1000,
          background: scrolled
            ? `linear-gradient(90deg, ${black} 0%, ${darkGray} 50%, ${black} 100%)`
            : 'rgba(0, 0, 0, 0.95)',
          backdropFilter: 'blur(15px)',
          borderBottom: scrolled ? `3px solid ${flashingOrange}` : 'none',
          transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
          boxShadow: scrolled ? `0 4px 20px rgba(255, 69, 0, 0.3)` : 'none',
        }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: isXSmall ? '0 1rem' : isMobile ? '0 1.5rem' : '0 2rem',
            height: isXSmall ? '60px' : '80px',
            maxWidth: isTablet ? '90%' : '1400px',
            margin: '0 auto',
          }}
        >
          {/* Logo Section */}
          <motion.div
            variants={logoVariants}
            initial="initial"
            animate="animate"
            whileHover="hover"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '15px',
              cursor: 'pointer',
            }}
          >
            <motion.img
              animate={pulseAnimation}
              src="/TAB.jpeg"
              alt="SignSound Studio Logo"
              style={{
                width: isXSmall ? '40px' : isMobile ? '50px' : '60px',
                height: isXSmall ? '40px' : isMobile ? '50px' : '60px',
                objectFit: 'contain',
                filter: `drop-shadow(0 0 10px ${flashingOrange})`,
              }}
              loading="lazy"
              onError={(e) => (e.target.src = '/TAB.jpeg')}
            />
            <div>
              <h1
                style={{
                  margin: 0,
                  fontSize: isXSmall ? '1.5rem' : isMobile ? '1.8rem' : '2rem',
                  fontWeight: 'bold',
                  color: 'white',
                  textShadow: `0 0 20px ${flashingOrange}`,
                  fontFamily: '"Orbitron", monospace, system-ui',
                }}
              >
                Sign<span style={{ color: flashingOrange }}>Sound</span>
              </h1>
              <div
                style={{
                  fontSize: isXSmall ? '0.6rem' : '0.7rem',
                  color: flashingOrange,
                  fontWeight: '500',
                  letterSpacing: '1px',
                  marginTop: '-2px',
                }}
              >
                PROFESSIONAL AUDIO
              </div>
            </div>
          </motion.div>

          {/* Waveform Visualizer */}
          <motion.div
            style={{
              display: 'flex',
              alignItems: 'flex-end',
              height: '30px',
              gap: '1px',
              position: 'absolute',
              left: '50%',
              transform: 'translateX(-50%)',
              opacity: 0.6,
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.6 }}
            transition={{ delay: 1 }}
          >
            {waveformBars}
          </motion.div>

          {/* Desktop Menu */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '1rem',
            }}
          >
            {/* Live Time Display */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5 }}
              style={{
                color: flashingOrange,
                fontSize: isXSmall ? '0.8rem' : '0.9rem',
                fontWeight: 'bold',
                marginRight: '1rem',
                fontFamily: 'monospace',
                textShadow: `0 0 10px ${flashingOrange}`,
              }}
            >
              {currentTime.toLocaleTimeString()}
            </motion.div>

            {/* Menu Items */}
            <div
              style={{
                display: windowSize.width > 768 ? 'flex' : 'none',
                gap: '0.5rem',
              }}
            >
              {menuItems.map((item, index) => (
                <motion.a
                  key={item.name}
                  href={item.href}
                  variants={menuItemVariants}
                  initial="initial"
                  animate="animate"
                  whileHover="hover"
                  custom={index}
                  style={{
                    color: 'white',
                    textDecoration: 'none',
                    fontSize: isXSmall ? '0.9rem' : '1rem',
                    fontWeight: '600',
                    padding: isXSmall ? '8px 15px' : '12px 20px',
                    borderRadius: '25px',
                    position: 'relative',
                    overflow: 'hidden',
                    background: 'rgba(255, 255, 255, 0.05)',
                    border: `1px solid rgba(255, 69, 0, 0.3)`,
                    transition: 'all 0.3s ease',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.backgroundColor = flashingOrange + '20';
                    e.target.style.transform = 'translateY(-2px)';
                    e.target.style.boxShadow = `0 8px 25px rgba(255, 69, 0, 0.4)`;
                    e.target.style.borderColor = flashingOrange;
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.backgroundColor = 'rgba(255, 255, 255, 0.05)';
                    e.target.style.transform = 'translateY(0)';
                    e.target.style.boxShadow = 'none';
                    e.target.style.borderColor = 'rgba(255, 69, 0, 0.3)';
                  }}
                >
                  <span style={{ fontSize: isXSmall ? '1rem' : '1.2rem' }}>{item.icon}</span>
                  {item.name}
                </motion.a>
              ))}
            </div>

            {/* Mobile Menu Button */}
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => setMobileOpen(!mobileOpen)}
              style={{
                display: windowSize.width <= 768 ? 'flex' : 'none',
                alignItems: 'center',
                justifyContent: 'center',
                width: isXSmall ? '40px' : '50px',
                height: isXSmall ? '40px' : '50px',
                borderRadius: '50%',
                border: `2px solid ${flashingOrange}`,
                background: `rgba(255, 69, 0, 0.1)`,
                color: flashingOrange,
                cursor: 'pointer',
                fontSize: isXSmall ? '1.2rem' : '1.5rem',
                transition: 'all 0.3s ease',
              }}
              onMouseEnter={(e) => {
                e.target.style.background = flashingOrange + '40';
                e.target.style.transform = 'rotate(90deg)';
              }}
              onMouseLeave={(e) => {
                e.target.style.background = 'rgba(255, 69, 0, 0.1)';
                e.target.style.transform = 'rotate(0deg)';
              }}
              aria-label="Toggle mobile menu"
            >
              ☰
            </motion.button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileOpen(false)}
              style={{
                position: 'fixed',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                backgroundColor: 'rgba(0, 0, 0, 0.8)',
                zIndex: 1001,
                backdropFilter: 'blur(5px)',
              }}
            />

            {/* Drawer */}
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              style={{
                position: 'fixed',
                top: 0,
                right: 0,
                bottom: 0,
                width: isXSmall ? '280px' : '320px',
                background: `linear-gradient(135deg, ${black} 0%, ${darkGray} 100%)`,
                zIndex: 1002,
                padding: isXSmall ? '1.5rem' : '2rem',
                overflowY: 'auto',
              }}
            >
              {/* Close Button */}
              <motion.button
                whileHover={{ scale: 1.1, rotate: 90 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setMobileOpen(false)}
                style={{
                  position: 'absolute',
                  top: isXSmall ? '15px' : '20px',
                  right: isXSmall ? '15px' : '20px',
                  width: isXSmall ? '32px' : '40px',
                  height: isXSmall ? '32px' : '40px',
                  borderRadius: '50%',
                  border: `2px solid ${flashingOrange}`,
                  background: 'transparent',
                  color: flashingOrange,
                  cursor: 'pointer',
                  fontSize: isXSmall ? '1rem' : '1.2rem',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
                aria-label="Close mobile menu"
              >
                ✕
              </motion.button>

              {/* Mobile Logo */}
              <motion.div
                initial={{ y: -20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.2 }}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '15px',
                  marginBottom: '3rem',
                  paddingBottom: '2rem',
                  borderBottom: `2px solid ${flashingOrange}`,
                }}
              >
                <motion.img
                  animate={pulseAnimation}
                  src="/TAB.jpeg"
                  alt="SignSound Studio Logo"
                  style={{
                    width: isXSmall ? '40px' : '50px',
                    height: isXSmall ? '40px' : '50px',
                    objectFit: 'contain',
                    filter: `drop-shadow(0 0 10px ${flashingOrange})`,
                  }}
                  loading="lazy"
                  onError={(e) => (e.target.src = '/TAB.jpeg')}
                />
                <div>
                  <h2
                    style={{
                      margin: 0,
                      color: 'white',
                      fontSize: isXSmall ? '1.2rem' : '1.5rem',
                      fontWeight: 'bold',
                    }}
                  >
                    Sign<span style={{ color: flashingOrange }}>Sound</span>
                  </h2>
                  <div
                    style={{
                      fontSize: isXSmall ? '0.5rem' : '0.6rem',
                      color: flashingOrange,
                      fontWeight: '500',
                      letterSpacing: '1px',
                    }}
                  >
                    PROFESSIONAL AUDIO
                  </div>
                </div>
              </motion.div>

              {/* Mobile Menu Items */}
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '1rem',
                }}
              >
                {menuItems.map((item, index) => (
                  <motion.a
                    key={item.name}
                    href={item.href}
                    initial={{ x: 50, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.1 * index + 0.3 }}
                    onClick={() => setMobileOpen(false)}
                    style={{
                      color: 'white',
                      textDecoration: 'none',
                      fontSize: isXSmall ? '1rem' : '1.2rem',
                      fontWeight: '600',
                      padding: isXSmall ? '10px 15px' : '15px 20px',
                      borderRadius: '15px',
                      background: 'rgba(255, 255, 255, 0.05)',
                      border: `1px solid rgba(255, 69, 0, 0.3)`,
                      transition: 'all 0.3s ease',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '15px',
                    }}
                    onMouseEnter={(e) => {
                      e.target.style.backgroundColor = flashingOrange + '20';
                      e.target.style.borderLeft = `4px solid ${flashingOrange}`;
                      e.target.style.transform = 'translateX(10px)';
                    }}
                    onMouseLeave={(e) => {
                      e.target.style.backgroundColor = 'rgba(255, 255, 255, 0.05)';
                      e.target.style.borderLeft = `1px solid rgba(255, 69, 0, 0.3)`;
                      e.target.style.transform = 'translateX(0)';
                    }}
                  >
                    <span style={{ fontSize: isXSmall ? '1.2rem' : '1.5rem' }}>{item.icon}</span>
                    {item.name}
                  </motion.a>
                ))}
              </div>

              {/* Mobile Audio Visualizer */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1 }}
                style={{
                  position: 'absolute',
                  bottom: '2rem',
                  left: '2rem',
                  right: '2rem',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'flex-end',
                  height: isXSmall ? '40px' : '50px',
                  gap: '2px',
                }}
              >
                {[...Array(25)].map((_, i) => (
                  <motion.div
                    key={i}
                    animate={{
                      height: [8, Math.random() * 40 + 8, 8],
                      backgroundColor: [flashingOrange, '#FF6500', flashingOrange],
                    }}
                    transition={{
                      duration: 0.5 + Math.random() * 0.5,
                      repeat: Infinity,
                      ease: 'easeInOut',
                      delay: i * 0.05,
                    }}
                    style={{
                      width: '4px',
                      backgroundColor: flashingOrange,
                      borderRadius: '2px',
                      opacity: 0.8,
                    }}
                  />
                ))}
              </motion.div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;