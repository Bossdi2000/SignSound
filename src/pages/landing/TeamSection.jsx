"use client"
import { useState, useEffect, useRef } from "react"
import { motion, useInView } from "framer-motion"

const TeamSection = () => {
  const [selectedMember, setSelectedMember] = useState(null)
  const [hoveredMember, setHoveredMember] = useState(null)
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, threshold: 0.2 })

  // Enhanced responsive breakpoints
  const [windowSize, setWindowSize] = useState({
    width: typeof window !== "undefined" ? window.innerWidth : 1200,
    height: typeof window !== "undefined" ? window.innerHeight : 800,
  })

  useEffect(() => {
    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      })
    }
    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  // Enhanced breakpoint system
  const isXSmall = windowSize.width < 480
  const isSmall = windowSize.width >= 480 && windowSize.width < 640
  const isMedium = windowSize.width >= 640 && windowSize.width < 768
  const isLarge = windowSize.width >= 768 && windowSize.width < 1024
  const isXLarge = windowSize.width >= 1024 && windowSize.width < 1280
  const is2XLarge = windowSize.width >= 1280

  // Colors
  const flashingOrange = "#FF4500"
  const black = "#000000"
  const darkGray = "#1a1a1a"

  const teamMembers = [
    {
      id: 1,
      name: "Marcus Rodriguez",
      role: "Chief Audio Engineer",
      specialty: "Rock & Electronic",
      experience: "15+ Years",
      image: "/placeholder.svg?height=120&width=120&text=Marcus",
      bio: "Grammy-nominated engineer with expertise in rock, pop, and electronic music production. Marcus has worked with top-tier artists and brings innovative techniques to every project.",
      skills: ["Pro Tools Expert", "SSL Console", "Analog Processing", "Spatial Audio"],
      achievements: [
        "Grammy Nomination 2023",
        "50+ Platinum Records",
        "Abbey Road Certified",
        "Dolby Atmos Specialist",
      ],
      social: { twitter: "@marcusaudio" },
    },
    {
      id: 2,
      name: "Sarah Chen",
      role: "Mixing Specialist",
      specialty: "Pop & R&B",
      experience: "12+ Years",
      image: "/placeholder.svg?height=120&width=120&text=Sarah",
      bio: "Award-winning mixing engineer specializing in contemporary pop and R&B. Sarah's innovative approach to vocal processing has defined the sound of modern hits.",
      skills: ["Vocal Processing", "Digital Mixing", "Auto-Tune Expert", "Creative Effects"],
      achievements: ["Billboard #1 Engineer", "30+ Gold Records", "TEC Award Winner", "Berklee Alumni"],
      social: { twitter: "@sarahchenmix" },
    },
    {
      id: 3,
      name: "David Thompson",
      role: "Mastering Engineer",
      specialty: "All Genres",
      experience: "20+ Years",
      image: "/placeholder.svg?height=120&width=120&text=David",
      bio: "Veteran mastering engineer with two decades of experience across all genres. David's meticulous attention to detail ensures your tracks sound perfect on any system.",
      skills: ["Mastering Suite", "Analog EQ", "Loudness Standards", "Vinyl Cutting"],
      achievements: ["AES Fellow", "100+ Albums Mastered", "Sterling Sound Alumni", "Multiple Genre Expert"],
      social: { twitter: "@davidmastering" },
    },
    {
      id: 4,
      name: "Luna Martinez",
      role: "Producer & Songwriter",
      specialty: "Indie & Alternative",
      experience: "10+ Years",
      image: "/placeholder.svg?height=120&width=120&text=Luna",
      bio: "Creative producer and songwriter with a passion for indie and alternative music. Luna brings fresh perspectives and innovative arrangements to every collaboration.",
      skills: ["Songwriting", "Arrangement", "Live Recording", "Vintage Gear"],
      achievements: ["ASCAP Award Winner", "25+ Artist Collaborations", "Indie Chart Success", "Multi-Instrumentalist"],
      social: { twitter: "@lunaproducer" },
    },
    {
      id: 5,
      name: "Alex Kim",
      role: "Sound Designer",
      specialty: "Electronic & Ambient",
      experience: "8+ Years",
      image: "/placeholder.svg?height=120&width=120&text=Alex",
      bio: "Innovative sound designer specializing in electronic music and ambient soundscapes. Alex creates unique sonic textures that push the boundaries of conventional music.",
      skills: ["Synthesis", "Sound Design", "Modular Systems", "Field Recording"],
      achievements: ["Film Score Credits", "Synthesizer Expert", "Ambient Pioneer", "Tech Innovation"],
      social: { twitter: "@alexsounddesign" },
    },
    {
      id: 6,
      name: "Jordan Blake",
      role: "Recording Engineer",
      specialty: "Live & Studio",
      experience: "14+ Years",
      image: "/placeholder.svg?height=120&width=120&text=Jordan",
      bio: "Experienced recording engineer with expertise in both live and studio environments. Jordan's technical precision and creative input elevate every recording session.",
      skills: ["Live Recording", "Microphone Techniques", "Studio Setup", "Remote Recording"],
      achievements: ["Live Album Specialist", "Concert Recording Pro", "Studio Design", "Technical Innovation"],
      social: { twitter: "@jordanrecords" },
    },
    {
      id: 7,
      name: "Riley Foster",
      role: "Audio Post-Production",
      specialty: "Film & Media",
      experience: "11+ Years",
      image: "/placeholder.svg?height=120&width=120&text=Riley",
      bio: "Specialized audio post-production engineer for film, TV, and digital media. Riley ensures crystal-clear dialogue and immersive soundscapes for visual content.",
      skills: ["Dialogue Editing", "Foley", "Surround Sound", "Sync Technology"],
      achievements: ["Emmy Nomination", "Film Festival Awards", "Streaming Platform Work", "ADR Specialist"],
      social: { twitter: "@rileypostpro" },
    },
  ]

  // Responsive helper functions
  const getGridColumns = () => {
    if (isXSmall) return "1fr"
    if (isSmall) return "repeat(2, 1fr)"
    if (isMedium) return "repeat(2, 1fr)"
    if (isLarge) return "repeat(3, 1fr)"
    if (isXLarge) return "repeat(4, 1fr)"
    if (is2XLarge) return "repeat(5, 1fr)"
    return "repeat(4, 1fr)"
  }

  const getStatsColumns = () => {
    if (isXSmall || isSmall) return "repeat(2, 1fr)"
    if (isMedium || isLarge) return "repeat(2, 1fr)"
    return "repeat(4, 1fr)"
  }

  const getContainerPadding = () => {
    if (isXSmall) return "1.5rem 0.8rem"
    if (isSmall) return "2rem 1rem"
    if (isMedium) return "2.5rem 1.5rem"
    if (isLarge) return "3rem 2rem"
    if (isXLarge) return "4rem 2.5rem"
    return "5rem 3rem"
  }

  const getMaxWidth = () => {
    if (isXSmall || isSmall) return "100%"
    if (isMedium) return "95%"
    if (isLarge) return "90%"
    if (isXLarge) return "1200px"
    return "1400px"
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { duration: 0.6, staggerChildren: 0.1 },
    },
  }

  const cardVariants = {
    hidden: { y: 50, opacity: 0, scale: 0.9 },
    visible: {
      y: 0,
      opacity: 1,
      scale: 1,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  }

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
  }

  // Handle Escape key to close modal
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        setSelectedMember(null)
      }
    }
    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [])

  return (
    <div
      id="team"
      ref={ref}
      style={{
        background: `linear-gradient(180deg, ${darkGray} 0%, ${black} 50%, ${darkGray} 100%)`,
        minHeight: "100vh",
        padding: getContainerPadding(),
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Responsive Animated Background */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          opacity: isXSmall ? 0.05 : 0.1,
          pointerEvents: "none",
        }}
      >
        {[...Array(isXSmall ? 10 : isSmall ? 12 : 15)].map((_, i) => (
          <motion.div
            key={i}
            animate={{
              y: [0, -100, 0],
              opacity: [0.3, 0.8, 0.3],
              scale: [0.5, 1, 0.5],
            }}
            transition={{
              duration: 5 + Math.random() * 5,
              repeat: Number.POSITIVE_INFINITY,
              ease: "easeInOut",
              delay: Math.random() * 5,
            }}
            style={{
              position: "absolute",
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              width: isXSmall ? "20px" : isSmall ? "25px" : "35px",
              height: isXSmall ? "20px" : isSmall ? "25px" : "35px",
              border: `2px solid ${flashingOrange}`,
              borderRadius: "50%",
              transform: "rotate(45deg)",
            }}
          />
        ))}
      </div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        style={{
          maxWidth: getMaxWidth(),
          margin: "0 auto",
          position: "relative",
          zIndex: 2,
        }}
      >
        {/* Responsive Section Header */}
        <motion.div
          variants={cardVariants}
          style={{
            textAlign: "center",
            marginBottom: isXSmall ? "1.5rem" : isSmall ? "2rem" : "2.5rem",
          }}
        >
          <motion.h2
            style={{
              fontSize: isXSmall ? "1.5rem" : isSmall ? "1.8rem" : isMedium ? "2.2rem" : isLarge ? "2.5rem" : "3rem",
              fontWeight: "bold",
              color: "white",
              margin: "0 0 0.8rem 0",
              textShadow: `0 0 20px ${flashingOrange}`,
              fontFamily: '"Orbitron", monospace, system-ui',
            }}
          >
            Our <span style={{ color: flashingOrange }}>Expert</span> Team
          </motion.h2>
          <motion.p
            style={{
              fontSize: isXSmall ? "0.8rem" : isSmall ? "0.9rem" : "1.1rem",
              color: "rgba(255, 255, 255, 0.8)",
              maxWidth: isXSmall ? "100%" : isSmall ? "90%" : "500px",
              margin: "0 auto 1.5rem auto",
              lineHeight: "1.5",
              padding: isXSmall ? "0 1rem" : "0",
            }}
          >
            Meet the passionate professionals who bring your audio visions to life
          </motion.p>
          <motion.div
            animate={{
              width: ["0%", "100%"],
              backgroundColor: [flashingOrange, "#FF6500", flashingOrange],
            }}
            transition={{
              duration: 2,
              ease: "easeInOut",
              delay: 0.5,
            }}
            style={{
              height: "3px",
              background: flashingOrange,
              margin: "0 auto",
              maxWidth: isXSmall ? "120px" : "200px",
              borderRadius: "2px",
            }}
          />
        </motion.div>

        {/* Responsive Team Grid */}
        <motion.div
          style={{
            display: "grid",
            gridTemplateColumns: getGridColumns(),
            gap: isXSmall ? "0.8rem" : isSmall ? "1rem" : isMedium ? "1.2rem" : "1.5rem",
            marginBottom: isXSmall ? "1.5rem" : isSmall ? "2rem" : "2.5rem",
          }}
        >
          {teamMembers.map((member) => (
            <motion.div
              key={member.id}
              variants={cardVariants}
              whileHover={{
                scale: isXSmall ? 1.01 : 1.02,
                y: isXSmall ? -3 : -5,
                boxShadow: `0 ${isXSmall ? "10px 20px" : "15px 30px"} rgba(255, 69, 0, 0.3)`,
              }}
              onHoverStart={() => setHoveredMember(member.id)}
              onHoverEnd={() => setHoveredMember(null)}
              onClick={() => setSelectedMember(member)}
              style={{
                background:
                  hoveredMember === member.id
                    ? `linear-gradient(135deg, rgba(255, 69, 0, 0.2), rgba(0, 0, 0, 0.9))`
                    : "rgba(255, 255, 255, 0.05)",
                backdropFilter: "blur(15px)",
                borderRadius: isXSmall ? "12px" : "15px",
                padding: isXSmall ? "1rem" : isSmall ? "1.2rem" : "1.5rem",
                border: `2px solid ${hoveredMember === member.id ? flashingOrange : "rgba(255, 69, 0, 0.3)"}`,
                cursor: "pointer",
                transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                position: "relative",
                overflow: "hidden",
                minHeight: isXSmall ? "auto" : "280px",
              }}
            >
              {/* Animated border effect */}
              <motion.div
                animate={
                  hoveredMember === member.id
                    ? {
                        rotate: [0, 360],
                        scale: [1, 1.05, 1],
                      }
                    : {}
                }
                transition={{
                  duration: 3,
                  repeat: Number.POSITIVE_INFINITY,
                  ease: "linear",
                }}
                style={{
                  position: "absolute",
                  top: "-50%",
                  left: "-50%",
                  width: "200%",
                  height: "200%",
                  background: `conic-gradient(from 0deg, transparent, ${flashingOrange}30, transparent)`,
                  opacity: hoveredMember === member.id ? 0.4 : 0,
                  transition: "opacity 0.3s ease",
                  zIndex: 0,
                }}
              />

              <div style={{ position: "relative", zIndex: 1, textAlign: "center" }}>
                {/* Responsive Profile Image */}
                <motion.div
                  animate={
                    hoveredMember === member.id
                      ? {
                          scale: [1, 1.1, 1],
                        }
                      : {}
                  }
                  transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
                  style={{
                    marginBottom: isXSmall ? "0.8rem" : "1rem",
                    display: "inline-block",
                  }}
                >
                  <img
                    src={member.image || "/placeholder.svg"}
                    alt={member.name}
                    style={{
                      width: isXSmall ? "50px" : isSmall ? "60px" : isMedium ? "70px" : "80px",
                      height: isXSmall ? "50px" : isSmall ? "60px" : isMedium ? "70px" : "80px",
                      borderRadius: "50%",
                      border: `2px solid ${flashingOrange}`,
                      filter: `drop-shadow(0 0 10px ${flashingOrange}40)`,
                      objectFit: "cover",
                    }}
                  />
                </motion.div>

                {/* Responsive Text Content */}
                <h3
                  style={{
                    fontSize: isXSmall ? "0.9rem" : isSmall ? "1rem" : isMedium ? "1.1rem" : "1.2rem",
                    color: "white",
                    marginBottom: "0.3rem",
                    fontWeight: "bold",
                    lineHeight: "1.2",
                  }}
                >
                  {member.name}
                </h3>
                <p
                  style={{
                    fontSize: isXSmall ? "0.7rem" : isSmall ? "0.8rem" : "0.9rem",
                    color: flashingOrange,
                    marginBottom: "0.3rem",
                    fontWeight: "600",
                  }}
                >
                  {member.role}
                </p>
                <p
                  style={{
                    fontSize: isXSmall ? "0.6rem" : "0.7rem",
                    color: "rgba(255, 255, 255, 0.7)",
                    marginBottom: "0.8rem",
                  }}
                >
                  {member.specialty}
                </p>

                {/* Experience Badge */}
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  style={{
                    display: "inline-block",
                    background: `linear-gradient(45deg, ${flashingOrange}, #FF6500)`,
                    color: "black",
                    padding: isXSmall ? "0.2rem 0.5rem" : "0.3rem 0.6rem",
                    borderRadius: "12px",
                    fontSize: isXSmall ? "0.6rem" : "0.7rem",
                    fontWeight: "bold",
                    marginBottom: isXSmall ? "0.8rem" : "1rem",
                    boxShadow: `0 2px 8px rgba(255, 69, 0, 0.3)`,
                  }}
                >
                  {member.experience}
                </motion.div>

                {/* Bio Preview */}
                <p
                  style={{
                    fontSize: isXSmall ? "0.6rem" : "0.7rem",
                    color: "rgba(255, 255, 255, 0.8)",
                    lineHeight: "1.4",
                    marginBottom: isXSmall ? "0.8rem" : "1rem",
                    display: isXSmall ? "-webkit-box" : "block",
                    WebkitLineClamp: isXSmall ? 2 : 3,
                    WebkitBoxOrient: "vertical",
                    overflow: "hidden",
                  }}
                >
                  {member.bio.substring(0, isXSmall ? 40 : isSmall ? 60 : 80)}...
                </p>

                {/* View Profile Button */}
                <motion.button
                  whileHover={{ scale: isXSmall ? 1.02 : 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  style={{
                    background: "transparent",
                    border: `1px solid ${flashingOrange}`,
                    color: flashingOrange,
                    padding: isXSmall ? "0.4rem 1rem" : "0.5rem 1.2rem",
                    borderRadius: "15px",
                    fontSize: isXSmall ? "0.7rem" : "0.8rem",
                    cursor: "pointer",
                    fontWeight: "bold",
                    transition: "all 0.3s ease",
                    width: isXSmall ? "100%" : "auto",
                    minHeight: "36px",
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.background = flashingOrange
                    e.target.style.color = "black"
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.background = "transparent"
                    e.target.style.color = flashingOrange
                  }}
                >
                  View Profile
                </motion.button>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Responsive Team Statistics */}
        <motion.div
          variants={cardVariants}
          style={{
            background: "rgba(255, 69, 0, 0.1)",
            backdropFilter: "blur(15px)",
            borderRadius: isXSmall ? "15px" : "20px",
            padding: isXSmall ? "1.2rem" : isSmall ? "1.5rem" : "2rem",
            border: `2px solid ${flashingOrange}`,
            textAlign: "center",
          }}
        >
          <h3
            style={{
              fontSize: isXSmall ? "1.2rem" : isSmall ? "1.5rem" : isMedium ? "1.8rem" : "2rem",
              color: "white",
              marginBottom: isXSmall ? "1rem" : "1.5rem",
              fontWeight: "bold",
            }}
          >
            Collective Experience
          </h3>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: getStatsColumns(),
              gap: isXSmall ? "0.8rem" : isSmall ? "1rem" : "1.2rem",
            }}
          >
            {[
              { number: "90+", label: "Years Combined", icon: "⏰" },
              { number: "20+", label: "Major Awards", icon: "🏆" },
              { number: "600+", label: "Albums Produced", icon: "💿" },
              { number: "75+", label: "Chart Toppers", icon: "📈" },
            ].map((stat, index) => (
              <motion.div
                key={index}
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: index * 0.2 + 1, duration: 0.6 }}
                style={{
                  background: "rgba(0, 0, 0, 0.5)",
                  padding: isXSmall ? "0.8rem" : isSmall ? "1rem" : "1.2rem",
                  borderRadius: "15px",
                  border: `1px solid rgba(255, 69, 0, 0.3)`,
                }}
              >
                <div
                  style={{
                    fontSize: isXSmall ? "1.2rem" : isSmall ? "1.5rem" : "1.8rem",
                    marginBottom: "0.5rem",
                  }}
                >
                  {stat.icon}
                </div>
                <div
                  style={{
                    fontSize: isXSmall ? "1.2rem" : isSmall ? "1.5rem" : "1.8rem",
                    fontWeight: "bold",
                    color: flashingOrange,
                    marginBottom: "0.3rem",
                  }}
                >
                  {stat.number}
                </div>
                <div
                  style={{
                    fontSize: isXSmall ? "0.7rem" : isSmall ? "0.8rem" : "0.9rem",
                    color: "white",
                  }}
                >
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Responsive Member Detail Modal */}
        {selectedMember && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedMember(null)}
            style={{
              position: "fixed",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              background: "rgba(0, 0, 0, 0.9)",
              backdropFilter: "blur(10px)",
              zIndex: 1000,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              padding: isXSmall ? "1rem" : "2rem",
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
                borderRadius: isXSmall ? "15px" : "20px",
                padding: isXSmall ? "1.5rem" : isSmall ? "2rem" : "2.5rem",
                border: `2px solid ${flashingOrange}`,
                maxWidth: isXSmall ? "95vw" : isSmall ? "90vw" : isMedium ? "80vw" : "500px",
                width: "100%",
                maxHeight: isXSmall ? "95vh" : "80vh",
                overflowY: "auto",
                position: "relative",
              }}
            >
              {/* Close Button */}
              <motion.button
                whileHover={{ scale: 1.1, rotate: 90 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setSelectedMember(null)}
                style={{
                  position: "absolute",
                  top: isXSmall ? "0.5rem" : "1rem",
                  right: isXSmall ? "0.5rem" : "1rem",
                  width: isXSmall ? "32px" : "40px",
                  height: isXSmall ? "32px" : "40px",
                  borderRadius: "50%",
                  border: `2px solid ${flashingOrange}`,
                  background: "transparent",
                  color: flashingOrange,
                  fontSize: isXSmall ? "0.8rem" : "1rem",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  transition: "all 0.3s ease",
                  zIndex: 10,
                }}
                onMouseEnter={(e) => {
                  e.target.style.background = flashingOrange
                  e.target.style.color = "black"
                }}
                onMouseLeave={(e) => {
                  e.target.style.background = "transparent"
                  e.target.style.color = flashingOrange
                }}
                aria-label="Close modal"
              >
                ✕
              </motion.button>

              {/* Modal Content */}
              <div style={{ textAlign: "center", paddingTop: isXSmall ? "2rem" : "0" }}>
                <motion.div
                  style={{
                    marginBottom: isXSmall ? "1rem" : "1.5rem",
                    display: "inline-block",
                  }}
                >
                  <img
                    src={selectedMember.image || "/placeholder.svg"}
                    alt={selectedMember.name}
                    style={{
                      width: isXSmall ? "80px" : isSmall ? "100px" : "120px",
                      height: isXSmall ? "80px" : isSmall ? "100px" : "120px",
                      borderRadius: "50%",
                      border: `3px solid ${flashingOrange}`,
                      filter: `drop-shadow(0 0 20px ${flashingOrange}40)`,
                      objectFit: "cover",
                    }}
                  />
                </motion.div>

                <h2
                  id="modal-title"
                  style={{
                    fontSize: isXSmall ? "1.3rem" : isSmall ? "1.6rem" : "2rem",
                    color: "white",
                    marginBottom: "0.5rem",
                    fontWeight: "bold",
                  }}
                >
                  {selectedMember.name}
                </h2>
                <p
                  style={{
                    fontSize: isXSmall ? "0.9rem" : isSmall ? "1rem" : "1.2rem",
                    color: flashingOrange,
                    marginBottom: "0.5rem",
                    fontWeight: "600",
                  }}
                >
                  {selectedMember.role}
                </p>
                <p
                  style={{
                    fontSize: isXSmall ? "0.8rem" : "0.9rem",
                    color: "rgba(255, 255, 255, 0.7)",
                    marginBottom: "1rem",
                  }}
                >
                  {selectedMember.specialty} • {selectedMember.experience}
                </p>
                <p
                  style={{
                    fontSize: isXSmall ? "0.8rem" : "0.9rem",
                    color: "rgba(255, 255, 255, 0.8)",
                    lineHeight: "1.5",
                    marginBottom: "1.5rem",
                    textAlign: "left",
                  }}
                >
                  {selectedMember.bio}
                </p>

                {/* Achievements */}
                <div
                  style={{
                    marginBottom: "1.5rem",
                    textAlign: "left",
                  }}
                >
                  <h3
                    style={{
                      fontSize: isXSmall ? "1rem" : "1.1rem",
                      color: flashingOrange,
                      marginBottom: "0.5rem",
                      fontWeight: "600",
                      textAlign: "center",
                    }}
                  >
                    Achievements
                  </h3>
                  <ul
                    style={{
                      listStyle: "none",
                      padding: 0,
                      display: "grid",
                      gridTemplateColumns: isXSmall || isSmall ? "1fr" : "repeat(2, 1fr)",
                      gap: "0.4rem",
                    }}
                  >
                    {selectedMember.achievements.map((achievement, index) => (
                      <li
                        key={index}
                        style={{
                          fontSize: isXSmall ? "0.7rem" : "0.8rem",
                          color: "rgba(255, 255, 255, 0.8)",
                          display: "flex",
                          alignItems: "center",
                          gap: "0.5rem",
                        }}
                      >
                        <span
                          style={{
                            width: "6px",
                            height: "6px",
                            backgroundColor: flashingOrange,
                            borderRadius: "50%",
                            flexShrink: 0,
                          }}
                        />
                        {achievement}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Skills */}
                <div
                  style={{
                    marginBottom: "1.5rem",
                  }}
                >
                  <h3
                    style={{
                      fontSize: isXSmall ? "1rem" : "1.1rem",
                      color: flashingOrange,
                      marginBottom: "0.5rem",
                      fontWeight: "600",
                    }}
                  >
                    Skills
                  </h3>
                  <div
                    style={{
                      display: "flex",
                      flexWrap: "wrap",
                      gap: "0.4rem",
                      justifyContent: "center",
                    }}
                  >
                    {selectedMember.skills.map((skill, index) => (
                      <span
                        key={index}
                        style={{
                          background: `linear-gradient(45deg, ${flashingOrange}, #FF6500)`,
                          color: "black",
                          padding: isXSmall ? "0.2rem 0.5rem" : "0.3rem 0.6rem",
                          borderRadius: "12px",
                          fontSize: isXSmall ? "0.6rem" : "0.7rem",
                          fontWeight: "bold",
                        }}
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Twitter Link */}
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                  }}
                >
                  <a
                    href={`https://twitter.com/${selectedMember.social.twitter.replace("@", "")}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      fontSize: isXSmall ? "0.8rem" : "0.9rem",
                      color: flashingOrange,
                      textDecoration: "none",
                      border: `2px solid ${flashingOrange}`,
                      padding: isXSmall ? "0.5rem 1rem" : "0.6rem 1.2rem",
                      borderRadius: "12px",
                      transition: "all 0.3s ease",
                      display: "inline-block",
                      minHeight: "40px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                    onMouseEnter={(e) => {
                      e.target.style.background = flashingOrange
                      e.target.style.color = "black"
                    }}
                    onMouseLeave={(e) => {
                      e.target.style.background = "transparent"
                      e.target.style.color = flashingOrange
                    }}
                  >
                    Follow on Twitter
                  </a>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </motion.div>
    </div>
  )
}

export default TeamSection
