"use client";

import React from 'react';
import { Box } from '@mui/material';
import Navbar from './Navbar';
import HeroSection from './HeroSection';
import AboutSection from './AboutSection';
import TeamSection from './TeamSection';
import Footer from './Footer';

const LandingPage = () => {
  return (
    <Box
      sx={{
        width: '100vw', // Full viewport width
        minHeight: '100vh',
        margin: 0,
        padding: 0,
        overflowX: 'hidden',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <Navbar />
      <HeroSection />
      <Box
        sx={{
          width: '100vw',
          py: { xs: 2, sm: 3, md: 4 }, // Vertical padding only
          px: 0, // No horizontal padding
        }}
      >
        <AboutSection />
        <TeamSection />
        <Footer/>
      </Box>
    </Box>
  );
};

export default LandingPage;