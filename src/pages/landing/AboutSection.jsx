"use client"
import { useState, useEffect, useRef } from "react"
import { motion, useInView } from "framer-motion"

const AboutSection = () => {
  const [activeFeature, setActiveFeature] = useState(0)
  const [stats, setStats] = useState({
    projects: 0,
    clients: 0,
    awards: 0,
    years: 0,
  })

  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, threshold: 0.3 })

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

  const finalStats = {
    projects: 7,
    clients: 10,
    awards: 5,
    years: "Excellent",
  }

  const features = [
    {
      icon: "🎚️",
      title: "Professional Mixing",
      description: "State-of-the-art mixing suites with industry-standard equipment and acoustically treated rooms.",
      details: ["SSL Console", "Pro Tools HDX", "Vintage Outboard Gear", "Custom Monitoring"],
    },
    {
      icon: "🎙️",
      title: "Recording Studios",
      description: "Multiple recording environments from intimate vocal booths to full orchestral spaces.",
      details: ["Iso Booths", "Live Rooms", "Drum Rooms", "Vocal Suites"],
    },
    {
      icon: "🎧",
      title: "Audio Mastering",
      description: "Final polish for your tracks with precision mastering using analog and digital processing.",
      details: ["Stereo Mastering", "Stem Mastering", "Vinyl Preparation", "Streaming Optimization"],
    },
    {
      icon: "🎬",
      title: "Sound Design",
      description: "Custom audio solutions for film, television, games, and multimedia productions.",
      details: ["Foley Recording", "ADR Services", "Music Scoring", "Audio Post"],
    },
  ]

  // Responsive helper functions
  const getContainerPadding = () => {
    if (isXSmall) return "1.5rem 0.8rem"
    if (isSmall) return "2rem 1rem"
    if (isMedium) return "2.5rem 1.5rem"
    if (isLarge) return "3rem 2rem"
    if (isXLarge) return "3.5rem 2.5rem"
    return "4rem 3rem"
  }

  const getMaxWidth = () => {
    if (isXSmall || isSmall) return "100%"
    if (isMedium) return "95%"
    if (isLarge) return "90%"
    if (isXLarge) return "1000px"
    return "1200px"
  }

  const getGridColumns = () => {
    if (isXSmall || isSmall) return "1fr"
    if (isMedium) return "1fr"
    return "repeat(2, 1fr)"
  }

  const getStatsColumns = () => {
    if (isXSmall) return "repeat(2, 1fr)"
    if (isSmall || isMedium) return "repeat(2, 1fr)"
    return "repeat(4, 1fr)"
  }

  useEffect(() => {
    if (isInView) {
      // Animate stats counter
      const duration = 2000
      const steps = 60
      const stepDuration = duration / steps
      let step = 0

      const interval = setInterval(() => {
        step++
        const progress = step / steps
        const easeOut = 1 - Math.pow(1 - progress, 3)

        setStats({
          projects: Math.floor(finalStats.projects * easeOut),
          clients: Math.floor(finalStats.clients * easeOut),
          awards: Math.floor(finalStats.awards * easeOut),
          years: Math.floor(finalStats.years * easeOut),
        })

        if (step >= steps) {
          clearInterval(interval)
          setStats(finalStats)
        }
      }, stepDuration)

      return () => clearInterval(interval)
    }
  }, [isInView])

  useEffect(() => {
    const featureInterval = setInterval(() => {
      setActiveFeature((prev) => (prev + 1) % features.length)
    }, 4000)

    return () => clearInterval(featureInterval)
  }, [])

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.8,
        staggerChildren: 0.2,
      },
    },
  }

  const itemVariants = {
    hidden: { y: 50, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.8, ease: "easeOut" },
    },
  }

  const statsVariants = {
    hidden: { scale: 0, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  }

  return (
    <div
      id="about"
      ref={ref}
      style={{
        background: `linear-gradient(135deg, ${black} 0%, ${darkGray} 50%, ${black} 100%)`,
        minHeight: "100vh",
        padding: getContainerPadding(),
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Responsive Animated Background Elements */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          opacity: isXSmall ? 0.05 : 0.08,
          pointerEvents: "none",
        }}
      >
        {[...Array(isXSmall ? 10 : isSmall ? 15 : 20)].map((_, i) => (
          <motion.div
            key={i}
            animate={{
              rotate: [0, 360],
              scale: [0.8, 1.1, 0.8],
              opacity: [0.2, 0.5, 0.2],
            }}
            transition={{
              duration: 10 + Math.random() * 10,
              repeat: Number.POSITIVE_INFINITY,
              ease: "linear",
              delay: Math.random() * 5,
            }}
            style={{
              position: "absolute",
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              width: isXSmall ? "40px" : isSmall ? "50px" : "60px",
              height: isXSmall ? "40px" : isSmall ? "50px" : "60px",
              border: `1px solid ${flashingOrange}`,
              borderRadius: "50%",
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
          variants={itemVariants}
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
            About <span style={{ color: flashingOrange }}>SignSound</span>
          </motion.h2>
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
              maxWidth: isXSmall ? "120px" : "150px",
              borderRadius: "2px",
            }}
          />
        </motion.div>

        {/* Responsive Main Content Grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: getGridColumns(),
            gap: isXSmall ? "1rem" : isSmall ? "1.2rem" : "1.5rem",
            marginBottom: isXSmall ? "1.5rem" : isSmall ? "2rem" : "2.5rem",
          }}
        >
          {/* Company Story */}
          <motion.div variants={itemVariants}>
            <div
              style={{
                background: "rgba(255, 255, 255, 0.05)",
                backdropFilter: "blur(15px)",
                borderRadius: isXSmall ? "12px" : "15px",
                padding: isXSmall ? "1rem" : isSmall ? "1.2rem" : "1.8rem",
                border: `1px solid rgba(255, 69, 0, 0.3)`,
                height: "100%",
                position: "relative",
                overflow: "hidden",
              }}
            >
              {/* Animated border */}
              <motion.div
                animate={{
                  rotate: [0, 360],
                }}
                transition={{
                  duration: 20,
                  repeat: Number.POSITIVE_INFINITY,
                  ease: "linear",
                }}
                style={{
                  position: "absolute",
                  top: "-50%",
                  left: "-50%",
                  width: "200%",
                  height: "200%",
                  background: `conic-gradient(from 0deg, transparent, ${flashingOrange}40, transparent)`,
                  opacity: 0.2,
                  zIndex: -1,
                }}
              />

              <div style={{ position: "relative", zIndex: 1 }}>
                <h3
                  style={{
                    fontSize: isXSmall ? "1rem" : isSmall ? "1.2rem" : "1.4rem",
                    color: flashingOrange,
                    marginBottom: isXSmall ? "0.8rem" : "1rem",
                    fontWeight: "bold",
                  }}
                >
                  Our Story
                </h3>
                <p
                  style={{
                    fontSize: isXSmall ? "0.8rem" : isSmall ? "0.85rem" : "0.9rem",
                    color: "rgba(255, 255, 255, 0.9)",
                    lineHeight: "1.6",
                    marginBottom: isXSmall ? "0.8rem" : "1rem",
                  }}
                >
                  Sign Sound started as a vision, to be more than just a name, but a movement that redefines sound in
                  the Orange Dynasty. We're building from the ground up: Hosting community karaoke and live singing
                  sessions, Spotlighting emerging talents monthly, Providing vocal training, performance tips, and
                  production resources, Planning NFT integration to protect and monetize creative work, Laying the
                  foundation to launch a full-fledged record label.
                </p>
                <p
                  style={{
                    fontSize: isXSmall ? "0.8rem" : isSmall ? "0.85rem" : "0.9rem",
                    color: "rgba(255, 255, 255, 0.9)",
                    lineHeight: "1.6",
                    marginBottom: isXSmall ? "1rem" : "1.2rem",
                  }}
                >
                  Our passion for sonic excellence drives us to push the boundaries of what's possible in audio
                  production, combining cutting-edge technology with artistic vision.
                </p>

                {/* Mission Statement */}
                <div
                  style={{
                    background: `linear-gradient(45deg, ${flashingOrange}15, transparent)`,
                    padding: isXSmall ? "0.8rem" : "1rem",
                    borderRadius: "10px",
                    borderLeft: `3px solid ${flashingOrange}`,
                  }}
                >
                  <p
                    style={{
                      fontSize: isXSmall ? "0.75rem" : "0.8rem",
                      color: "white",
                      fontStyle: "italic",
                      margin: 0,
                      lineHeight: "1.4",
                    }}
                  >
                    "To transform creative visions into sonic masterpieces that resonate with audiences and stand the
                    test of time."
                  </p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Interactive Features */}
          <motion.div variants={itemVariants}>
            <div
              style={{
                background: "rgba(0, 0, 0, 0.8)",
                backdropFilter: "blur(15px)",
                borderRadius: isXSmall ? "12px" : "15px",
                padding: isXSmall ? "1rem" : isSmall ? "1.2rem" : "1.8rem",
                border: `1px solid rgba(255, 69, 0, 0.3)`,
                height: "100%",
              }}
            >
              <h3
                style={{
                  fontSize: isXSmall ? "1rem" : isSmall ? "1.2rem" : "1.4rem",
                  color: flashingOrange,
                  marginBottom: isXSmall ? "1rem" : "1.2rem",
                  fontWeight: "bold",
                  textAlign: "center",
                }}
              >
                Our Services
              </h3>

              {/* Responsive Feature Selector */}
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: isXSmall ? "repeat(2, 1fr)" : isSmall ? "repeat(2, 1fr)" : "repeat(4, 1fr)",
                  gap: isXSmall ? "0.3rem" : "0.4rem",
                  marginBottom: isXSmall ? "1rem" : "1.2rem",
                }}
              >
                {features.map((feature, index) => (
                  <motion.button
                    key={index}
                    whileHover={{ scale: isXSmall ? 1.02 : 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    onClick={() => setActiveFeature(index)}
                    style={{
                      padding: isXSmall ? "0.4rem 0.3rem" : isSmall ? "0.5rem 0.6rem" : "0.6rem 1rem",
                      borderRadius: "12px",
                      border: `1px solid ${index === activeFeature ? flashingOrange : "rgba(255, 69, 0, 0.3)"}`,
                      background: index === activeFeature ? flashingOrange + "20" : "transparent",
                      color: index === activeFeature ? flashingOrange : "white",
                      cursor: "pointer",
                      fontSize: isXSmall ? "0.6rem" : isSmall ? "0.65rem" : "0.7rem",
                      fontWeight: "bold",
                      transition: "all 0.3s ease",
                      display: "flex",
                      flexDirection: isXSmall ? "column" : "row",
                      alignItems: "center",
                      justifyContent: "center",
                      gap: isXSmall ? "0.2rem" : "0.3rem",
                      minHeight: isXSmall ? "60px" : "auto",
                      textAlign: "center",
                    }}
                  >
                    <span style={{ fontSize: isXSmall ? "1rem" : "0.9rem" }}>{feature.icon}</span>
                    <span style={{ lineHeight: "1.2" }}>{isXSmall ? feature.title.split(" ")[0] : feature.title}</span>
                  </motion.button>
                ))}
              </div>

              {/* Active Feature Display */}
              <motion.div
                key={activeFeature}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
                style={{
                  textAlign: "center",
                }}
              >
                <div
                  style={{
                    fontSize: isXSmall ? "1.5rem" : isSmall ? "1.8rem" : "2rem",
                    marginBottom: isXSmall ? "0.6rem" : "0.8rem",
                    filter: `drop-shadow(0 0 15px ${flashingOrange})`,
                  }}
                >
                  {features[activeFeature].icon}
                </div>
                <h4
                  style={{
                    fontSize: isXSmall ? "1rem" : isSmall ? "1.1rem" : "1.2rem",
                    color: flashingOrange,
                    marginBottom: isXSmall ? "0.6rem" : "0.8rem",
                    fontWeight: "bold",
                  }}
                >
                  {features[activeFeature].title}
                </h4>
                <p
                  style={{
                    fontSize: isXSmall ? "0.7rem" : isSmall ? "0.75rem" : "0.8rem",
                    color: "rgba(255, 255, 255, 0.9)",
                    lineHeight: "1.5",
                    marginBottom: isXSmall ? "0.8rem" : "1rem",
                  }}
                >
                  {features[activeFeature].description}
                </p>

                {/* Feature Details */}
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: isXSmall
                      ? "repeat(2, 1fr)"
                      : "repeat(auto-fit, minmax(min(100px, 100%), 1fr))",
                    gap: isXSmall ? "0.4rem" : "0.5rem",
                    marginTop: isXSmall ? "0.8rem" : "1rem",
                  }}
                >
                  {features[activeFeature].details.map((detail, index) => (
                    <motion.div
                      key={index}
                      initial={{ scale: 0, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ delay: index * 0.1, duration: 0.3 }}
                      style={{
                        background: `rgba(255, 69, 0, 0.1)`,
                        padding: isXSmall ? "0.4rem 0.3rem" : "0.5rem 0.6rem",
                        borderRadius: "8px",
                        border: `1px solid rgba(255, 69, 0, 0.3)`,
                        fontSize: isXSmall ? "0.6rem" : "0.7rem",
                        color: "white",
                        fontWeight: "500",
                        textAlign: "center",
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

        {/* Responsive Statistics Section */}
        <motion.div
          variants={itemVariants}
          style={{
            background: "rgba(255, 69, 0, 0.1)",
            backdropFilter: "blur(15px)",
            borderRadius: isXSmall ? "15px" : "18px",
            padding: isXSmall ? "1rem" : isSmall ? "1.2rem" : "1.8rem",
            border: `2px solid ${flashingOrange}`,
            position: "relative",
            overflow: "hidden",
          }}
        >
          {/* Animated background pattern */}
          <motion.div
            animate={{
              backgroundPosition: ["0% 0%", "100% 100%"],
            }}
            transition={{
              duration: 20,
              repeat: Number.POSITIVE_INFINITY,
              ease: "linear",
            }}
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              backgroundImage: `radial-gradient(circle at 20% 80%, ${flashingOrange}08 0%, transparent 50%), radial-gradient(circle at 80% 20%, ${flashingOrange}08 0%, transparent 50%)`,
              backgroundSize: "400% 400%",
              opacity: 0.3,
            }}
          />

          <div style={{ position: "relative", zIndex: 1 }}>
            <motion.h3
              variants={itemVariants}
              style={{
                fontSize: isXSmall ? "1.2rem" : isSmall ? "1.4rem" : isMedium ? "1.6rem" : "1.8rem",
                color: "white",
                textAlign: "center",
                marginBottom: isXSmall ? "1rem" : isSmall ? "1.2rem" : "1.8rem",
                fontWeight: "bold",
                textShadow: `0 0 15px ${flashingOrange}`,
              }}
            >
              Our Achievements
            </motion.h3>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: getStatsColumns(),
                gap: isXSmall ? "0.8rem" : isSmall ? "1rem" : "1.2rem",
              }}
            >
              {[
                { key: "projects", label: "Collaborations", suffix: "+", icon: "🎵" },
                { key: "clients", label: "Music Tracks", suffix: "+", icon: "🎧" },
                { key: "awards", label: "Movements", suffix: "", icon: "🏆" },
                { key: "years", label: "Cabal Experience", suffix: "", icon: "⭐" },
              ].map((stat, index) => (
                <motion.div
                  key={stat.key}
                  variants={statsVariants}
                  style={{
                    textAlign: "center",
                    background: "rgba(0, 0, 0, 0.5)",
                    padding: isXSmall ? "0.8rem 0.4rem" : isSmall ? "1rem 0.6rem" : "1.3rem 0.8rem",
                    borderRadius: isXSmall ? "10px" : "12px",
                    border: `1px solid rgba(255, 69, 0, 0.3)`,
                    position: "relative",
                    overflow: "hidden",
                  }}
                >
                  {/* Pulsing background */}
                  <motion.div
                    animate={{
                      scale: [1, 1.05, 1],
                      opacity: [0.1, 0.2, 0.1],
                    }}
                    transition={{
                      duration: 3,
                      repeat: Number.POSITIVE_INFINITY,
                      delay: index * 0.5,
                    }}
                    style={{
                      position: "absolute",
                      top: 0,
                      left: 0,
                      right: 0,
                      bottom: 0,
                      background: `radial-gradient(circle, ${flashingOrange}, transparent)`,
                      borderRadius: "12px",
                    }}
                  />

                  <div style={{ position: "relative", zIndex: 1 }}>
                    <div
                      style={{
                        fontSize: isXSmall ? "1rem" : isSmall ? "1.2rem" : "1.5rem",
                        marginBottom: isXSmall ? "0.4rem" : "0.6rem",
                        filter: `drop-shadow(0 0 8px ${flashingOrange})`,
                      }}
                    >
                      {stat.icon}
                    </div>
                    <motion.div
                      style={{
                        fontSize: isXSmall ? "1.2rem" : isSmall ? "1.4rem" : isMedium ? "1.6rem" : "1.8rem",
                        fontWeight: "bold",
                        color: flashingOrange,
                        marginBottom: isXSmall ? "0.2rem" : "0.3rem",
                        textShadow: `0 0 15px ${flashingOrange}`,
                        fontFamily: "monospace",
                      }}
                    >
                      {stats[stat.key]}
                      {stat.suffix}
                    </motion.div>
                    <div
                      style={{
                        fontSize: isXSmall ? "0.65rem" : isSmall ? "0.7rem" : "0.8rem",
                        color: "white",
                        fontWeight: "500",
                      }}
                    >
                      {stat.label}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </motion.div>
    </div>
  )
}

export default AboutSection
