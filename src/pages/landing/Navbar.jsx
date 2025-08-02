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

  // Enhanced responsive breakpoints
  const isXSmall = windowSize.width < 375;
  const isSmall = windowSize.width >= 375 && windowSize.width < 480;
  const isMobile = windowSize.width >= 480 && windowSize.width < 640;
  const isTablet = windowSize.width >= 640 && windowSize.width < 768;
  const isMedium = windowSize.width >= 768 && windowSize.width < 1024;
  const isLarge = windowSize.width >= 1024 && windowSize.width < 1280;
  const isXLarge = windowSize.width >= 1280;

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
      scale: 1.05,
      rotate: 5,
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
    scale: [1, 1.1, 1],
    opacity: [0.8, 1, 0.8],
    transition: {
      duration: 2,
      repeat: Infinity,
      ease: 'easeInOut',
    },
  };

  // Responsive logo sizes - significantly reduced
  const getLogoSize = () => {
    if (isXSmall) return '28px';
    if (isSmall) return '32px';
    if (isMobile) return '36px';
    if (isTablet) return '40px';
    if (isMedium) return '42px';
    if (isLarge) return '44px';
    return '46px'; // XLarge
  };

  // Responsive navbar height
  const getNavbarHeight = () => {
    if (isXSmall) return '56px';
    if (isSmall || isMobile) return '60px';
    if (isTablet) return '65px';
    if (isMedium) return '70px';
    return '75px'; // Large and XLarge
  };

  // Responsive padding
  const getNavbarPadding = () => {
    if (isXSmall) return '0 0.75rem';
    if (isSmall) return '0 1rem';
    if (isMobile) return '0 1.25rem';
    if (isTablet) return '0 1.5rem';
    if (isMedium) return '0 2rem';
    if (isLarge) return '0 2.5rem';
    return '0 3rem'; // XLarge
  };

  // Responsive font sizes
  const getTitleFontSize = () => {
    if (isXSmall) return '1.1rem';
    if (isSmall) return '1.25rem';
    if (isMobile) return '1.4rem';
    if (isTablet) return '1.5rem';
    if (isMedium) return '1.6rem';
    if (isLarge) return '1.75rem';
    return '1.9rem'; // XLarge
  };

  const getSubtitleFontSize = () => {
    if (isXSmall) return '0.45rem';
    if (isSmall) return '0.5rem';
    if (isMobile) return '0.55rem';
    if (isTablet) return '0.6rem';
    return '0.65rem'; // Medium and above
  };

  const getMenuItemFontSize = () => {
    if (isMedium) return '0.9rem';
    if (isLarge) return '0.95rem';
    return '1rem'; // XLarge
  };

  const waveformBars = [...Array(isXSmall ? 8 : isMobile ? 12 : 15)].map((_, i) => (
    <motion.div
      key={i}
      animate={{
        height: [6, Math.random() * (isXSmall ? 15 : 20) + 6, 6],
        backgroundColor: [flashingOrange, '#FF6500', flashingOrange],
      }}
      transition={{
        duration: 0.4 + Math.random() * 0.4,
        repeat: Infinity,
        ease: 'easeInOut',
        delay: i * 0.05,
      }}
      style={{
        width: isXSmall ? '2px' : '3px',
        backgroundColor: flashingOrange,
        borderRadius: '1px',
        margin: '0 0.5px',
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
          borderBottom: scrolled ? `2px solid ${flashingOrange}` : 'none',
          transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
          boxShadow: scrolled ? `0 4px 20px rgba(255, 69, 0, 0.2)` : 'none',
        }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: getNavbarPadding(),
            height: getNavbarHeight(),
            maxWidth: isXLarge ? '1400px' : '100%',
            margin: '0 auto',
          }}
        >
          {/* Logo Section - Significantly reduced size */}
          <motion.div
            variants={logoVariants}
            initial="initial"
            animate="animate"
            whileHover="hover"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: isXSmall ? '8px' : isMobile ? '10px' : '12px',
              cursor: 'pointer',
            }}
          >
            <motion.img
              animate={pulseAnimation}
              src="/REAL.jpeg"
              alt="SignSound Studio Logo"
              style={{
                width: getLogoSize(),
                height: getLogoSize(),
                objectFit: 'contain',
                borderRadius: '25%',
                filter: `drop-shadow(0 0 8px ${flashingOrange})`,
              }}
              loading="lazy"
              onError={(e) => (e.target.src = '/TAB.jpeg')}
            />
            <div>
              <h1
                style={{
                  margin: 0,
                  fontSize: getTitleFontSize(),
                  fontWeight: 'bold',
                  color: 'white',
                  textShadow: `0 0 15px ${flashingOrange}`,
                  fontFamily: '"Orbitron", monospace, system-ui',
                  lineHeight: 1.1,
                }}
              >
                Sign<span style={{ color: flashingOrange }}>Sound</span>
              </h1>
              <div
                style={{
                  fontSize: getSubtitleFontSize(),
                  color: flashingOrange,
                  fontWeight: '500',
                  letterSpacing: isXSmall ? '0.5px' : '1px',
                  marginTop: '-1px',
                }}
              >
                Orange sound Revolution
              </div>
            </div>
          </motion.div>

          {/* Waveform Visualizer - Responsive positioning */}
          {windowSize.width > 640 && (
            <motion.div
              style={{
                display: 'flex',
                alignItems: 'flex-end',
                height: isTablet ? '20px' : '25px',
                gap: '1px',
                position: 'absolute',
                left: '50%',
                transform: 'translateX(-50%)',
                opacity: 0.5,
              }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.5 }}
              transition={{ delay: 1 }}
            >
              {waveformBars}
            </motion.div>
          )}

          {/* Desktop Menu and Controls */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: isTablet ? '0.5rem' : isMedium ? '0.75rem' : '1rem',
            }}
          >
            {/* Live Time Display - Hide on very small screens */}
            {windowSize.width > 480 && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5 }}
                style={{
                  color: flashingOrange,
                  fontSize: isTablet ? '0.7rem' : isMedium ? '0.8rem' : '0.85rem',
                  fontWeight: 'bold',
                  marginRight: isTablet ? '0.5rem' : '0.75rem',
                  fontFamily: 'monospace',
                  textShadow: `0 0 8px ${flashingOrange}`,
                }}
              >
                {currentTime.toLocaleTimeString()}
              </motion.div>
            )}

            {/* Menu Items - Show on medium screens and above */}
            <div
              style={{
                display: windowSize.width > 768 ? 'flex' : 'none',
                gap: isMedium ? '0.25rem' : '0.4rem',
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
                    fontSize: getMenuItemFontSize(),
                    fontWeight: '600',
                    padding: isMedium ? '8px 12px' : isLarge ? '10px 16px' : '12px 18px',
                    borderRadius: '20px',
                    position: 'relative',
                    overflow: 'hidden',
                    background: 'rgba(255, 255, 255, 0.05)',
                    border: `1px solid rgba(255, 69, 0, 0.3)`,
                    transition: 'all 0.3s ease',
                    display: 'flex',
                    alignItems: 'center',
                    gap: isMedium ? '6px' : '8px',
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.backgroundColor = flashingOrange + '20';
                    e.target.style.transform = 'translateY(-1px)';
                    e.target.style.boxShadow = `0 6px 20px rgba(255, 69, 0, 0.3)`;
                    e.target.style.borderColor = flashingOrange;
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.backgroundColor = 'rgba(255, 255, 255, 0.05)';
                    e.target.style.transform = 'translateY(0)';
                    e.target.style.boxShadow = 'none';
                    e.target.style.borderColor = 'rgba(255, 69, 0, 0.3)';
                  }}
                >
                  <span style={{ fontSize: isMedium ? '1rem' : '1.1rem' }}>{item.icon}</span>
                  {item.name}
                </motion.a>
              ))}
            </div>

            {/* Mobile Menu Button */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setMobileOpen(!mobileOpen)}
              style={{
                display: windowSize.width <= 768 ? 'flex' : 'none',
                alignItems: 'center',
                justifyContent: 'center',
                width: isXSmall ? '36px' : isSmall ? '38px' : '42px',
                height: isXSmall ? '36px' : isSmall ? '38px' : '42px',
                borderRadius: '50%',
                border: `2px solid ${flashingOrange}`,
                background: `rgba(255, 69, 0, 0.1)`,
                color: flashingOrange,
                cursor: 'pointer',
                fontSize: isXSmall ? '1rem' : '1.2rem',
                transition: 'all 0.3s ease',
              }}
              onMouseEnter={(e) => {
                e.target.style.background = flashingOrange + '30';
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
                width: isXSmall ? '260px' : isSmall ? '280px' : '300px',
                background: `linear-gradient(135deg, ${black} 0%, ${darkGray} 100%)`,
                zIndex: 1002,
                padding: isXSmall ? '1.25rem' : '1.5rem',
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
                  top: '15px',
                  right: '15px',
                  width: isXSmall ? '30px' : '36px',
                  height: isXSmall ? '30px' : '36px',
                  borderRadius: '50%',
                  border: `2px solid ${flashingOrange}`,
                  background: 'transparent',
                  color: flashingOrange,
                  cursor: 'pointer',
                  fontSize: isXSmall ? '0.9rem' : '1.1rem',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
                aria-label="Close mobile menu"
              >
                ✕
              </motion.button>

              {/* Mobile Logo - Smaller size */}
              <motion.div
                initial={{ y: -20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.2 }}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: isXSmall ? '10px' : '12px',
                  marginBottom: '2.5rem',
                  paddingBottom: '1.5rem',
                  borderBottom: `2px solid ${flashingOrange}`,
                }}
              >
                <motion.img
                  animate={pulseAnimation}
                  src="/TAB.jpeg"
                  alt="SignSound Studio Logo"
                  style={{
                    width: isXSmall ? '32px' : '36px',
                    height: isXSmall ? '32px' : '36px',
                    objectFit: 'contain',
                    filter: `drop-shadow(0 0 8px ${flashingOrange})`,
                  }}
                  loading="lazy"
                  onError={(e) => (e.target.src = '/TAB.jpeg')}
                />
                <div>
                  <h2
                    style={{
                      margin: 0,
                      color: 'white',
                      fontSize: isXSmall ? '1rem' : '1.2rem',
                      fontWeight: 'bold',
                      lineHeight: 1.1,
                    }}
                  >
                    Sign<span style={{ color: flashingOrange }}>Sound</span>
                  </h2>
                  <div
                    style={{
                      fontSize: isXSmall ? '0.4rem' : '0.5rem',
                      color: flashingOrange,
                      fontWeight: '500',
                      letterSpacing: '0.5px',
                    }}
                  >
                    Orange Sound Revolution
                  </div>
                </div>
              </motion.div>

              {/* Mobile Menu Items */}
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: isXSmall ? '0.75rem' : '1rem',
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
                      fontSize: isXSmall ? '0.95rem' : '1.1rem',
                      fontWeight: '600',
                      padding: isXSmall ? '10px 12px' : '12px 15px',
                      borderRadius: '12px',
                      background: 'rgba(255, 255, 255, 0.05)',
                      border: `1px solid rgba(255, 69, 0, 0.3)`,
                      transition: 'all 0.3s ease',
                      display: 'flex',
                      alignItems: 'center',
                      gap: isXSmall ? '10px' : '12px',
                    }}
                    onMouseEnter={(e) => {
                      e.target.style.backgroundColor = flashingOrange + '20';
                      e.target.style.borderLeft = `4px solid ${flashingOrange}`;
                      e.target.style.transform = 'translateX(8px)';
                    }}
                    onMouseLeave={(e) => {
                      e.target.style.backgroundColor = 'rgba(255, 255, 255, 0.05)';
                      e.target.style.borderLeft = `1px solid rgba(255, 69, 0, 0.3)`;
                      e.target.style.transform = 'translateX(0)';
                    }}
                  >
                    <span style={{ fontSize: isXSmall ? '1.1rem' : '1.3rem' }}>{item.icon}</span>
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
                  bottom: '1.5rem',
                  left: '1.5rem',
                  right: '1.5rem',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'flex-end',
                  height: isXSmall ? '30px' : '35px',
                  gap: '2px',
                }}
              >
                {[...Array(isXSmall ? 18 : 22)].map((_, i) => (
                  <motion.div
                    key={i}
                    animate={{
                      height: [6, Math.random() * 25 + 6, 6],
                      backgroundColor: [flashingOrange, '#FF6500', flashingOrange],
                    }}
                    transition={{
                      duration: 0.5 + Math.random() * 0.5,
                      repeat: Infinity,
                      ease: 'easeInOut',
                      delay: i * 0.05,
                    }}
                    style={{
                      width: '3px',
                      backgroundColor: flashingOrange,
                      borderRadius: '1px',
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