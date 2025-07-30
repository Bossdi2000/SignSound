"use client";

import React, { useState, useEffect, useRef } from 'react';
import { motion, useInView } from 'framer-motion';

const Footer = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, threshold: 0.2 });

  // Responsive breakpoints
  const [windowSize, setWindowSize] = useState({
    width: typeof window !== 'undefined' ? window.innerWidth : 1200,
    height: typeof window !== 'undefined' ? window.innerHeight : 800,
  });

  useEffect(() => {
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
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const isXSmall = windowSize.width < 480;
  const isMobile = windowSize.width >= 480 && windowSize.width < 768;
  const isTablet = windowSize.width >= 768 && windowSize.width < 1024;
  const isDesktop = windowSize.width >= 1024;

  // Colors
  const flashingOrange = '#FF4500';
  const black = '#000000';
  const darkGray = '#1a1a1a';

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { duration: 0.6, staggerChildren: 0.1 },
    },
  };

  const itemVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.6, ease: 'easeOut' },
    },
  };

  const logoVariants = {
    hidden: { scale: 0, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: { duration: 0.8, ease: 'easeOut' },
    },
    hover: {
      scale: [1, 1.1, 1],
      rotate: [0, 10, -10, 0],
      transition: { duration: 2, repeat: Infinity },
    },
  };

  return (
    <footer
      id="footer"
      ref={ref}
      style={{
        background: `linear-gradient(180deg, ${darkGray} 0%, ${black} 50%, ${darkGray} 100%)`,
        padding: isXSmall ? '2rem 1rem' : isMobile ? '2.5rem 1.5rem' : isTablet ? '3rem 2rem' : '4rem 2rem',
        position: 'relative',
        overflow: 'hidden',
        color: 'white',
      }}
      role="contentinfo"
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
          willChange: 'transform, opacity',
        }}
      >
        {[...Array(isXSmall || isMobile ? 5 : 10)].map((_, i) => (
          <motion.div
            key={i}
            animate={{
              y: [0, -50, 0],
              opacity: [0.3, 0.8, 0.3],
              scale: [0.5, 1, 0.5],
            }}
            transition={{
              duration: 5 + Math.random() * 5,
              repeat: Infinity,
              ease: 'easeInOut',
              delay: Math.random() * 5,
            }}
            style={{
              position: 'absolute',
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              width: isXSmall ? '20px' : isMobile ? '30px' : '50px',
              height: isXSmall ? '20px' : isMobile ? '30px' : '50px',
              border: `2px solid ${flashingOrange}`,
              borderRadius: '50%',
              transform: 'rotate(45deg)',
            }}
          />
        ))}
      </div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate={isInView ? 'visible' : 'hidden'}
        style={{
          maxWidth: isDesktop ? '1400px' : isTablet ? '90%' : '95%',
          margin: '0 auto',
          position: 'relative',
          zIndex: 2,
        }}
      >
        {/* Footer Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: isXSmall || isMobile ? '1fr' : isTablet ? 'repeat(2, minmax(0, 1fr))' : 'repeat(3, minmax(0, 1fr))',
            gap: isXSmall ? '1rem' : isMobile ? '1.5rem' : '2rem',
            marginBottom: isXSmall ? '1rem' : '1.5rem',
          }}
        >
          {/* Logo and About */}
          <motion.div variants={itemVariants} style={{ textAlign: isXSmall || isMobile ? 'center' : 'left' }}>
            <motion.div
              variants={logoVariants}
              whileHover="hover"
              style={{
                width: isXSmall ? '60px' : isMobile ? '80px' : isTablet ? '100px' : '120px',
                height: isXSmall ? '60px' : isMobile ? '80px' : isTablet ? '100px' : '120px',
                margin: isXSmall || isMobile ? '0 auto 0.75rem' : '0 0 1rem',
                filter: `drop-shadow(0 0 20px ${flashingOrange})`,
              }}
            >
              <img
                src="/logo.svg"
                alt="AudioVibe Studio Logo"
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'contain',
                }}
                loading="lazy"
                onError={(e) => (e.target.src = '/placeholder.svg?height=120&width=120&text=Logo')}
              />
            </motion.div>
            <h3
              style={{
                fontSize: isXSmall ? '1.1rem' : isMobile ? '1.3rem' : '1.6rem',
                fontWeight: 'bold',
                color: 'white',
                marginBottom: '0.5rem',
                fontFamily: '"Orbitron", monospace, system-ui',
              }}
            >
              AudioVibe Studio
            </h3>
            <p
              style={{
                fontSize: isXSmall ? '0.75rem' : isMobile ? '0.9rem' : '1rem',
                color: 'rgba(255, 255, 255, 0.8)',
                lineHeight: '1.6',
                maxWidth: isDesktop ? '300px' : '100%',
              }}
            >
              Crafting immersive audio experiences with passion and precision.
            </p>
          </motion.div>

          {/* Navigation Links */}
          <motion.div variants={itemVariants} style={{ textAlign: isXSmall || isMobile ? 'center' : 'left' }}>
            <h3
              style={{
                fontSize: isXSmall ? '0.9rem' : isMobile ? '1.1rem' : '1.4rem',
                fontWeight: 'bold',
                color: flashingOrange,
                marginBottom: '0.5rem',
                fontFamily: '"Orbitron", monospace, system-ui',
              }}
            >
              Quick Links
            </h3>
            <nav aria-label="Footer navigation">
              <ul
                style={{
                  listStyle: 'none',
                  padding: 0,
                  display: 'flex',
                  flexDirection: isXSmall || isMobile ? 'column' : 'row',
                  gap: isXSmall ? '0.5rem' : isMobile ? '0.75rem' : '1rem',
                  flexWrap: 'wrap',
                }}
              >
                {[
                  { label: 'Home', href: '/' },
                  { label: 'About', href: '/about' },
                  { label: 'Services', href: '/services' },
                  { label: 'Team', href: '/#team' },
                  { label: 'Contact', href: '/#contact' },
                ].map((link, index) => (
                  <li key={index}>
                    <motion.a
                      href={link.href}
                      whileHover={{ scale: 1.05, color: flashingOrange }}
                      style={{
                        fontSize: isXSmall ? '0.75rem' : isMobile ? '0.9rem' : '1rem',
                        color: 'rgba(255, 255, 255, 0.8)',
                        textDecoration: 'none',
                        transition: 'all 0.3s ease',
                      }}
                    >
                      {link.label}
                    </motion.a>
                  </li>
                ))}
              </ul>
            </nav>
          </motion.div>

          {/* Contact and Newsletter */}
          <motion.div variants={itemVariants} style={{ textAlign: isXSmall || isMobile ? 'center' : 'left' }}>
            <h3
              style={{
                fontSize: isXSmall ? '0.9rem' : isMobile ? '1.1rem' : '1.4rem',
                fontWeight: 'bold',
                color: flashingOrange,
                marginBottom: '0.5rem',
                fontFamily: '"Orbitron", monospace, system-ui',
              }}
            >
              Get in Touch
            </h3>
            <p
              style={{
                fontSize: isXSmall ? '0.75rem' : isMobile ? '0.9rem' : '1rem',
                color: 'rgba(255, 255, 255, 0.8)',
                marginBottom: '1rem',
                lineHeight: '1.6',
              }}
            >
              Email:{' '}
              <a href="mailto:info@audiovibe.studio" style={{ color: flashingOrange, textDecoration: 'none' }}>
                info@audiovibe.studio
              </a>
              <br />
              Phone:{' '}
              <a href="tel:+1234567890" style={{ color: flashingOrange, textDecoration: 'none' }}>
                +1 (234) 567-890
              </a>
            </p>
            <h4
              style={{
                fontSize: isXSmall ? '0.85rem' : isMobile ? '1rem' : '1.1rem',
                fontWeight: '600',
                color: 'white',
                marginBottom: '0.5rem',
              }}
            >
              Newsletter
            </h4>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                alert('Subscribed!'); // Replace with actual newsletter logic
              }}
              style={{
                display: 'flex',
                flexDirection: isXSmall || isMobile ? 'column' : 'row',
                gap: isXSmall ? '0.5rem' : '0.75rem',
                maxWidth: isDesktop ? '400px' : '100%',
              }}
            >
              <input
                type="email"
                placeholder="Enter your email"
                style={{
                  padding: isXSmall ? '0.6rem' : isMobile ? '0.7rem' : '0.8rem',
                  borderRadius: '15px',
                  border: `2px solid ${flashingOrange}`,
                  background: 'transparent',
                  color: 'white',
                  fontSize: isXSmall ? '0.75rem' : isMobile ? '0.9rem' : '1rem',
                  outline: 'none',
                  flexGrow: 1,
                  minHeight: '44px', // Touch-friendly height
                }}
                aria-label="Email for newsletter"
                required
              />
              <motion.button
                type="submit"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                style={{
                  padding: isXSmall ? '0.6rem 1rem' : isMobile ? '0.7rem 1.25rem' : '0.8rem 1.5rem',
                  borderRadius: '15px',
                  border: `2px solid ${flashingOrange}`,
                  background: 'transparent',
                  color: flashingOrange,
                  fontSize: isXSmall ? '0.75rem' : isMobile ? '0.9rem' : '1rem',
                  fontWeight: 'bold',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  minHeight: '44px', // Touch-friendly height
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
                Subscribe
              </motion.button>
            </form>
          </motion.div>
        </div>

        {/* Social Media and Copyright */}
        <motion.div
          variants={itemVariants}
          style={{
            textAlign: 'center',
            borderTop: `1px solid rgba(255, 69, 0, 0.3)`,
            paddingTop: isXSmall ? '1rem' : '1.5rem',
          }}
        >
          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              gap: isXSmall ? '0.75rem' : isMobile ? '1rem' : '1.5rem',
              marginBottom: '1rem',
            }}
          >
            {[
              { platform: 'Twitter', href: 'https://twitter.com/audiovibe', icon: '\u1F426' }, // 🐦
              { platform: 'Instagram', href: 'https://instagram.com/audiovibe', icon: '\u1F4F8' }, // 📸
              { platform: 'LinkedIn', href: 'https://linkedin.com/company/audiovibe', icon: '\u1F4BC' }, // 💼
            ].map((social, index) => (
              <motion.a
                key={index}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.2, rotate: [0, 10, -10, 0] }}
                transition={{ duration: 0.5 }}
                style={{
                  fontSize: isXSmall ? '1.2rem' : isMobile ? '1.4rem' : '1.6rem',
                  color: flashingOrange,
                  textDecoration: 'none',
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: '44px', // Touch-friendly size
                  height: '44px',
                }}
                aria-label={`Follow us on ${social.platform}`}
              >
                {social.icon}
              </motion.a>
            ))}
          </div>
          <p
            style={{
              fontSize: isXSmall ? '0.65rem' : isMobile ? '0.8rem' : '0.9rem',
              color: 'rgba(255, 255, 255, 0.6)',
              lineHeight: '1.5',
            }}
          >
            &copy; {new Date().getFullYear()} AudioVibe Studio. All rights reserved.
          </p>
        </motion.div>
      </motion.div>
    </footer>
  );
};

export default Footer;