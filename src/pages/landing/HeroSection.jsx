import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

const HeroSection = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(75);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [windowSize, setWindowSize] = useState({
    width: typeof window !== "undefined" ? window.innerWidth : 1200,
    height: typeof window !== "undefined" ? window.innerHeight : 800,
  });

  const audioRef = useRef(null);
  const videoRef = useRef(null);
  const navigate = useNavigate();

  const flashingOrange = "#FF4500";
  const black = "#000000";
  const darkGray = "#1a1a1a";

  const musicTracks = [
    {
      name: "Chill Vibes",
      duration: 185,
      artist: "SignSound Studios",
      src: "Tab.mp3",
    },
  ];

  const [currentTrack, setCurrentTrack] = useState(0);

  useEffect(() => {
    if (!audioRef.current) {
      audioRef.current = new Audio();
      audioRef.current.preload = "metadata";
      audioRef.current.volume = volume / 100;
    }

    const audio = audioRef.current;

    const handleTimeUpdate = () => {
      setCurrentTime(Math.floor(audio.currentTime));
    };

    const handleLoadedMetadata = () => {
      setDuration(Math.floor(audio.duration) || musicTracks[currentTrack].duration);
      setIsLoading(false);
    };

    const handleLoadStart = () => {
      setIsLoading(true);
    };

    const handleCanPlay = () => {
      setIsLoading(false);
    };

    const handleEnded = () => {
      const nextTrackIndex = (currentTrack + 1) % musicTracks.length;
      setCurrentTrack(nextTrackIndex);
      setCurrentTime(0);
      setIsPlaying(false);
    };

    const handleError = (e) => {
      console.warn("Audio file not found:", musicTracks[currentTrack].src, "Error:", e);
      setIsLoading(false);
      setIsPlaying(false);
      setDuration(musicTracks[currentTrack].duration);
    };

    audio.addEventListener("timeupdate", handleTimeUpdate);
    audio.addEventListener("loadedmetadata", handleLoadedMetadata);
    audio.addEventListener("loadstart", handleLoadStart);
    audio.addEventListener("canplay", handleCanPlay);
    audio.addEventListener("ended", handleEnded);
    audio.addEventListener("error", handleError);

    if (audio.src !== musicTracks[currentTrack].src) {
      audio.src = musicTracks[currentTrack].src;
    }

    if (videoRef.current) {
      const video = videoRef.current;
      video.muted = true;
      video.loop = true;
      video.autoplay = true;
      video.playsInline = true;
      video.play().catch((error) => {
        console.warn("Video autoplay failed:", error);
      });
    }

    const slideInterval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 5000);

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

    window.addEventListener("resize", handleResize);

    return () => {
      clearInterval(slideInterval);
      window.removeEventListener("resize", handleResize);
      audio.removeEventListener("timeupdate", handleTimeUpdate);
      audio.removeEventListener("loadedmetadata", handleLoadedMetadata);
      audio.removeEventListener("loadstart", handleLoadStart);
      audio.removeEventListener("canplay", handleCanPlay);
      audio.removeEventListener("ended", handleEnded);
      audio.removeEventListener("error", handleError);
    };
  }, []);

  useEffect(() => {
    if (audioRef.current) {
      const audio = audioRef.current;
      const wasPlaying = isPlaying;
      audio.pause();
      setIsPlaying(false);
      setCurrentTime(0);
      setIsLoading(true);
      audio.src = musicTracks[currentTrack].src;
      audio.load();
      if (wasPlaying) {
        const playWhenReady = () => {
          audio
            .play()
            .then(() => {
              setIsPlaying(true);
            })
            .catch((e) => {
              console.warn("Playback failed:", e);
              setIsPlaying(false);
            });
          audio.removeEventListener("canplay", playWhenReady);
        };
        audio.addEventListener("canplay", playWhenReady);
      }
    }
  }, [currentTrack]);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume / 100;
    }
  }, [volume]);

  const isXSmall = windowSize.width < 375;
  const isSmall = windowSize.width >= 375 && windowSize.width < 640;
  const isMobile = windowSize.width >= 640 && windowSize.width < 768;
  const isTablet = windowSize.width >= 768 && windowSize.width < 1024;
  const isLarge = windowSize.width >= 1024;

  const heroSlides = [
    {
      title: "Sound Design",
      subtitle: "Innovation",
      description: "Join SignSound Studios to create groundbreaking audio experiences.",
      bg: "linear-gradient(135deg, rgba(26, 26, 26, 0.7) 0%, rgba(255, 101, 0, 0.6) 50%, rgba(0, 0, 0, 0.8) 100%)",
    },
  ];

  const getTitleFontSize = () => {
    if (isXSmall) return "2rem";
    if (isSmall) return "2.5rem";
    if (isMobile) return "3.5rem";
    if (isTablet) return "4.5rem";
    return "6rem";
  };

  const getSubtitleFontSize = () => {
    if (isXSmall) return "2.5rem";
    if (isSmall) return "3.5rem";
    if (isMobile) return "4.5rem";
    if (isTablet) return "6rem";
    return "8rem";
  };

  const getDescriptionFontSize = () => {
    if (isXSmall) return "0.9rem";
    if (isSmall) return "1rem";
    if (isMobile) return "1.2rem";
    if (isTablet) return "1.4rem";
    return "1.6rem";
  };

  const getButtonFontSize = () => {
    if (isXSmall) return "0.9rem";
    if (isSmall) return "1rem";
    if (isMobile) return "1.1rem";
    return "1.3rem";
  };

  const getButtonPadding = () => {
    if (isXSmall) return "0.8rem 2rem";
    if (isSmall) return "1rem 2.5rem";
    if (isMobile) return "1.2rem 3rem";
    return "1.5rem 4rem";
  };

  const getTopPadding = () => {
    if (isXSmall) return "80px";
    if (isSmall) return "100px";
    if (isMobile) return "120px";
    if (isTablet) return "140px";
    return "160px";
  };

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
    initial: { x: -100, opacity: 0, scale: 0.8 },
    animate: {
      x: 0,
      opacity: 1,
      scale: 1,
      transition: { duration: 1.2, ease: "easeOut", delay: 0.3 },
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
      boxShadow: `0 12px 48px rgba(0, 0, 0, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.2)`,
      background: black,
      color: "white",
      borderColor: black,
      transition: { duration: 0.3 },
    },
  };

  const generateVisualizerBars = (count) =>
    [...Array(count)].map((_, i) => {
      const baseHeight = isPlaying ? 15 : 8;
      const maxHeight = isPlaying ? 80 + Math.sin(currentTime * 0.1 + i) * 20 : 15;
      const animationSpeed = isPlaying ? 0.3 + Math.random() * 0.4 : 2;

      return (
        <motion.div
          key={i}
          animate={{
            height: isPlaying
              ? [baseHeight, maxHeight * (0.3 + Math.random() * 0.7), baseHeight]
              : [baseHeight, baseHeight + Math.random() * 5, baseHeight],
            backgroundColor: isPlaying
              ? [flashingOrange, "#FF6500", "#FF8C00", flashingOrange]
              : ["rgba(255, 69, 0, 0.3)", "rgba(255, 69, 0, 0.5)", "rgba(255, 69, 0, 0.3)"],
            opacity: isPlaying ? [0.8, 1, 0.8] : [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: animationSpeed,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
            delay: i * 0.05,
          }}
          style={{
            width: isXSmall ? "3px" : isMobile ? "4px" : "5px",
            backgroundColor: flashingOrange,
            borderRadius: "2px",
            opacity: 0.8,
            margin: "0 1px",
          }}
        />
      );
    });

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  const handlePlayPause = async () => {
    if (!audioRef.current) return;
    const audio = audioRef.current;
    if (isPlaying) {
      audio.pause();
      setIsPlaying(false);
    } else {
      try {
        await audio.play();
        setIsPlaying(true);
      } catch (error) {
        console.warn("Playback failed:", error);
        setIsPlaying(false);
        if (error.name === "NotSupportedError" || error.name === "NotAllowedError") {
          setIsPlaying(true);
          const simulateProgress = () => {
            setCurrentTime((prev) => {
              const next = prev + 1;
              if (next >= (duration || musicTracks[currentTrack].duration)) {
                setIsPlaying(false);
                return 0;
              }
              return next;
            });
          };
          const interval = setInterval(simulateProgress, 1000);
          const cleanup = () => {
            clearInterval(interval);
            audio.removeEventListener("pause", cleanup);
          };
          audio.addEventListener("pause", cleanup);
        }
      }
    }
  };

  const skipToNextTrack = () => {
    const nextIndex = (currentTrack + 1) % musicTracks.length;
    setCurrentTrack(nextIndex);
  };

  const skipToPrevTrack = () => {
    const prevIndex = currentTrack === 0 ? musicTracks.length - 1 : currentTrack - 1;
    setCurrentTrack(prevIndex);
  };

  const handleProgressClick = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const trackDuration = duration || musicTracks[currentTrack].duration;
    const newTime = Math.floor((clickX / rect.width) * trackDuration);
    setCurrentTime(newTime);
    if (audioRef.current && !isNaN(audioRef.current.duration)) {
      audioRef.current.currentTime = newTime;
    }
  };

  const handleVolumeClick = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const newVolume = Math.floor((clickX / rect.width) * 100);
    setVolume(Math.max(0, Math.min(100, newVolume)));
  };

  const currentTrackInfo = musicTracks[currentTrack];
  const trackDuration = duration || currentTrackInfo.duration;

  return (
    <div
      style={{
        position: "relative",
        minHeight: "100vh",
        width: "100vw",
        margin: 0,
        padding: 0,
        overflow: "hidden",
      }}
    >
      <video
        ref={videoRef}
        autoPlay
        loop
        muted
        playsInline
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          objectFit: "cover",
          zIndex: 0,
        }}
      >
        <source src="/VI.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: heroSlides[currentSlide].bg,
          transition: "background 2s ease-in-out",
          zIndex: 1,
        }}
      />

      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          overflow: "hidden",
          pointerEvents: "none",
          zIndex: 2,
        }}
      >
        {[...Array(isXSmall ? 20 : isSmall ? 35 : 50)].map((_, i) => (
          <motion.div
            key={i}
            animate={{
              y: [-20, -100],
              opacity: [0, 1, 0],
              scale: [0.5, 1, 0.5],
            }}
            transition={{
              duration: 3 + Math.random() * 4,
              repeat: Number.POSITIVE_INFINITY,
              delay: Math.random() * 5,
              ease: "easeInOut",
            }}
            style={{
              position: "absolute",
              left: `${Math.random() * 100}%`,
              top: "100%",
              width: isXSmall ? "1px" : "2px",
              height: isXSmall ? "1px" : "2px",
              backgroundColor: flashingOrange,
              borderRadius: "50%",
              boxShadow: `0 0 ${isXSmall ? "5px" : "10px"} ${flashingOrange}`,
            }}
          />
        ))}
      </div>

      <motion.div
        variants={containerVariants}
        initial="initial"
        animate="animate"
        style={{
          position: "relative",
          zIndex: 3,
          minHeight: "100vh",
          width: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: isXSmall ? "0 1rem" : isSmall ? "0 1.5rem" : isMobile ? "0 2rem" : "0 3rem",
          paddingTop: getTopPadding(),
          textAlign: "center",
        }}
      >
        <div
          style={{
            maxWidth: isTablet ? "95%" : "1200px",
            width: "100%",
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              maxWidth: isXSmall ? "100%" : "900px",
              margin: "0 auto",
            }}
          >
            <motion.h1
              key={`title-${currentSlide}`}
              variants={titleVariants}
              initial="initial"
              animate="animate"
              style={{
                fontSize: getTitleFontSize(),
                fontWeight: "700",
                color: "white",
                margin: "0 0 1rem 0",
                textShadow: `0 0 30px ${flashingOrange}, 0 0 60px rgba(255, 69, 0, 0.3)`,
                fontFamily: "system-ui, -apple-system, sans-serif",
                letterSpacing: isXSmall ? "2px" : "4px",
                textTransform: "uppercase",
                lineHeight: "1.0",
                textAlign: "center",
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
                fontSize: getSubtitleFontSize(),
                fontWeight: "900",
                color: black,
                margin: "0 0 2rem 0",
                textShadow: `0 4px 20px rgba(0, 0, 0, 0.5), 0 0 40px rgba(0, 0, 0, 0.3)`,
                letterSpacing: isXSmall ? "3px" : "6px",
                textTransform: "uppercase",
                lineHeight: "0.9",
                textAlign: "center",
                fontFamily: "system-ui, -apple-system, sans-serif",
                filter: "drop-shadow(0 0 10px rgba(0, 0, 0, 0.5))",
              }}
            >
              {heroSlides[currentSlide].subtitle}
            </motion.h2>

            {heroSlides[currentSlide].description && (
              <motion.p
                key={`description-${currentSlide}`}
                variants={descriptionVariants}
                initial="initial"
                animate="animate"
                style={{
                  fontSize: getDescriptionFontSize(),
                  color: "rgba(255, 255, 255, 0.9)",
                  margin: "0 0 3rem 0",
                  maxWidth: isXSmall ? "100%" : isSmall ? "95%" : "700px",
                  lineHeight: "1.6",
                  fontWeight: "300",
                  textAlign: "center",
                  letterSpacing: "0.5px",
                  fontFamily: "system-ui, -apple-system, sans-serif",
                }}
              >
                {heroSlides[currentSlide].description}
              </motion.p>
            )}

            <motion.button
              variants={buttonVariants}
              initial="initial"
              animate="animate"
              whileHover="hover"
              whileTap={{ scale: 0.95 }}
              onClick={() => navigate("/artist-signup")}
              style={{
                padding: getButtonPadding(),
                fontSize: getButtonFontSize(),
                fontWeight: "600",
                color: black,
                background: "transparent",
                border: `2px solid ${black}`,
                borderRadius: "50px",
                cursor: "pointer",
                textTransform: "uppercase",
                letterSpacing: isXSmall ? "1px" : "2px",
                boxShadow: `0 8px 32px rgba(0, 0, 0, 0.2), inset 0 1px 0 rgba(255, 255, 255, 0.1)`,
                position: "relative",
                overflow: "hidden",
                marginTop: isXSmall ? "2rem" : "2.5rem",
                backdropFilter: "blur(10px)",
                transition: "all 0.3s ease",
                fontFamily: "system-ui, -apple-system, sans-serif",
              }}
              aria-label="Get Started with SignSound Studio"
            >
              <div
                style={{
                  position: "absolute",
                  top: 0,
                  left: "-100%",
                  width: "100%",
                  height: "100%",
                  background: "linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent)",
                  transition: "left 0.6s ease",
                }}
              />
              <span style={{ position: "relative", zIndex: 1 }}>Get Started</span>
            </motion.button>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2, duration: 0.8 }}
            style={{
              background: "rgba(0, 0, 0, 0.8)",
              backdropFilter: "blur(20px)",
              borderRadius: isXSmall ? "15px" : "20px",
              padding: isXSmall ? "1.2rem" : isSmall ? "1.5rem" : "2rem",
              margin: isXSmall ? "2rem auto" : "3rem auto",
              maxWidth: isXSmall ? "95%" : isSmall ? "90%" : "700px",
              border: `2px solid rgba(255, 69, 0, 0.3)`,
              boxShadow: `0 10px 40px rgba(255, 69, 0, 0.2)`,
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "flex-end",
                height: isXSmall ? "70px" : isSmall ? "80px" : "100px",
                marginBottom: isXSmall ? "1.5rem" : "2rem",
                gap: "1px",
              }}
            >
              {generateVisualizerBars(isXSmall ? 30 : isSmall ? 40 : 50)}
            </div>

            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                marginBottom: "1.5rem",
                flexWrap: isXSmall ? "wrap" : "nowrap",
                gap: isXSmall ? "1rem" : "1.5rem",
              }}
            >
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={skipToPrevTrack}
                style={{
                  width: isXSmall ? "40px" : "45px",
                  height: isXSmall ? "40px" : "45px",
                  borderRadius: "50%",
                  border: `2px solid ${flashingOrange}`,
                  background: "transparent",
                  color: flashingOrange,
                  cursor: "pointer",
                  fontSize: isXSmall ? "1rem" : "1.2rem",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  transition: "all 0.3s ease",
                }}
                aria-label="Previous track"
              >
                ⏮️
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={handlePlayPause}
                disabled={isLoading}
                style={{
                  width: isXSmall ? "55px" : isSmall ? "65px" : "75px",
                  height: isXSmall ? "55px" : isSmall ? "65px" : "75px",
                  borderRadius: "50%",
                  border: `3px solid ${flashingOrange}`,
                  background: isPlaying ? flashingOrange : "transparent",
                  color: isPlaying ? "black" : flashingOrange,
                  cursor: isLoading ? "not-allowed" : "pointer",
                  fontSize: isXSmall ? "1.5rem" : isSmall ? "1.8rem" : "2rem",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  transition: "all 0.3s ease",
                  opacity: isLoading ? 0.6 : 1,
                }}
                aria-label={isPlaying ? "Pause audio" : "Play audio"}
              >
                {isLoading ? "⏳" : isPlaying ? "⏸️" : "▶️"}
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={skipToNextTrack}
                style={{
                  width: isXSmall ? "40px" : "45px",
                  height: isXSmall ? "40px" : "45px",
                  borderRadius: "50%",
                  border: `2px solid ${flashingOrange}`,
                  background: "transparent",
                  color: flashingOrange,
                  cursor: "pointer",
                  fontSize: isXSmall ? "1rem" : "1.2rem",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  transition: "all 0.3s ease",
                }}
                aria-label="Next track"
              >
                ⏭️
              </motion.button>

              <div
                style={{
                  flex: 1,
                  margin: isXSmall ? "1rem 0" : "0 1.5rem",
                  color: "white",
                  minWidth: isXSmall ? "100%" : "auto",
                  order: isXSmall ? 1 : 0,
                }}
              >
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    fontSize: isXSmall ? "0.8rem" : "1rem",
                    marginBottom: "0.8rem",
                  }}
                >
                  <span>{formatTime(currentTime)}</span>
                  <span>{formatTime(trackDuration)}</span>
                </div>
                <div
                  style={{
                    height: "6px",
                    background: "rgba(255, 255, 255, 0.2)",
                    borderRadius: "3px",
                    overflow: "hidden",
                    cursor: "pointer",
                  }}
                  onClick={handleProgressClick}
                >
                  <motion.div
                    animate={{
                      width: `${(currentTime / trackDuration) * 100}%`,
                    }}
                    style={{
                      height: "100%",
                      background: `linear-gradient(90deg, ${flashingOrange}, #FF6500)`,
                      borderRadius: "3px",
                    }}
                  />
                </div>
              </div>

              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: isXSmall ? "8px" : "12px",
                  color: flashingOrange,
                }}
              >
                <span style={{ fontSize: isXSmall ? "1.2rem" : "1.5rem" }}>
                  {volume === 0 ? "🔇" : volume < 50 ? "🔉" : "🔊"}
                </span>
                <div
                  style={{
                    width: isXSmall ? "60px" : isSmall ? "80px" : "100px",
                    height: "6px",
                    background: "rgba(255, 255, 255, 0.2)",
                    borderRadius: "3px",
                    position: "relative",
                    cursor: "pointer",
                  }}
                  onClick={handleVolumeClick}
                >
                  <div
                    style={{
                      width: `${volume}%`,
                      height: "100%",
                      background: flashingOrange,
                      borderRadius: "3px",
                    }}
                  />
                </div>
              </div>
            </div>

            <div
              style={{
                textAlign: "center",
                color: "white",
              }}
            >
              <div
                style={{
                  fontSize: isXSmall ? "1rem" : isSmall ? "1.2rem" : "1.4rem",
                  fontWeight: "bold",
                  marginBottom: "0.5rem",
                  fontFamily: "system-ui, -apple-system, sans-serif",
                }}
              >
                {currentTrackInfo.name}
              </div>
              <div
                style={{
                  fontSize: isXSmall ? "0.8rem" : isSmall ? "0.9rem" : "1rem",
                  color: flashingOrange,
                  opacity: 0.8,
                  fontFamily: "system-ui, -apple-system, sans-serif",
                }}
              >
                {currentTrackInfo.artist}
              </div>
            </div>
          </motion.div>
        </div>
      </motion.div>

      <div
        style={{
          position: "absolute",
          bottom: isXSmall ? "2rem" : "2.5rem",
          left: "50%",
          transform: "translateX(-50%)",
          display: "flex",
          gap: isXSmall ? "0.8rem" : "1rem",
          zIndex: 4,
        }}
      >
        {heroSlides.map((_, index) => (
          <motion.button
            key={index}
            whileHover={{ scale: 1.2 }}
            onClick={() => setCurrentSlide(index)}
            style={{
              width: isXSmall ? "12px" : "15px",
              height: isXSmall ? "12px" : "15px",
              borderRadius: "50%",
              border: `2px solid ${flashingOrange}`,
              background: index === currentSlide ? flashingOrange : "transparent",
              cursor: "pointer",
              transition: "all 0.3s ease",
            }}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>

      <motion.div
        animate={{
          y: [0, 15, 0],
          opacity: [0.5, 1, 0.5],
        }}
        transition={{
          duration: 2,
          repeat: Number.POSITIVE_INFINITY,
          ease: "easeInOut",
        }}
        style={{
          position: "absolute",
          bottom: isXSmall ? "1rem" : "1.5rem",
          right: isXSmall ? "1.5rem" : "2rem",
          color: flashingOrange,
          fontSize: isXSmall ? "1.5rem" : isSmall ? "2rem" : "2.5rem",
          zIndex: 4,
        }}
      >
        ↓
      </motion.div>
    </div>
  );
};

export default HeroSection;