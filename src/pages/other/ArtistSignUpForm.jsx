import { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom"; // Added for navigation

const ArtistSignUpForm = () => {
  const [formData, setFormData] = useState({
    signName: "",
    xUsername: "",
    tgUsername: "",
    whatsappNo: "",
    email: "",
  });
  const [focusedField, setFocusedField] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const navigate = useNavigate(); // Initialize useNavigate

  const flashingOrange = "#FF4500";
  const black = "#000000";
  const darkGray = "#1a1a1a";

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const validateForm = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.signName) {
      alert("Please enter your artist name");
      return false;
    }
    if (!formData.email || !emailRegex.test(formData.email)) {
      alert("Please enter a valid email address");
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    setIsSubmitting(true);
    await new Promise((resolve) => setTimeout(resolve, 2000));
    setIsSubmitting(false);
    setIsSubmitted(true);
  };

  const containerVariants = {
    initial: { opacity: 0 },
    animate: {
      opacity: 1,
      transition: { duration: 1, staggerChildren: 0.1 },
    },
  };

  const itemVariants = {
    initial: { y: 50, opacity: 0 },
    animate: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.8, ease: "easeOut" },
    },
  };

  const formFields = [
    {
      id: "signName",
      label: "Artist Name / Alias",
      placeholder: "What should we call you?",
      type: "text",
      icon: "🎭",
      description: "Your creative identity - the name that represents your artistry",
    },
    {
      id: "xUsername",
      label: "X (Twitter) Username or Link",
      placeholder: "@yourusername or full profile link",
      type: "text",
      icon: "🐦",
      description: "Connect with us on X - where conversations spark creativity",
    },
    {
      id: "tgUsername",
      label: "Telegram Username",
      placeholder: "@yourusername",
      type: "text",
      icon: "✈️",
      description: "Join our creative community for instant updates and collaboration",
    },
    {
      id: "whatsappNo",
      label: "WhatsApp Number",
      placeholder: "+1234567890",
      type: "tel",
      icon: "📱",
      description: "For direct communication and exclusive opportunities",
    },
    {
      id: "email",
      label: "Email Address",
      placeholder: "your.creative.email@domain.com",
      type: "email",
      icon: "📧",
      description: "Your professional gateway to endless possibilities",
    },
  ];

  // Determine responsive padding based on screen size
  const getResponsivePadding = () => {
    const width = window.innerWidth;
    if (width < 375) return "1rem"; // isXSmall
    if (width < 640) return "1.5rem"; // isSmall
    if (width < 768) return "2rem"; // isMobile
    return "3rem"; // isTablet or larger
  };

  if (isSubmitted) {
    return (
      <div
        style={{
          minHeight: "100vh",
          width: "100vw", // Full viewport width
          margin: 0,
          background: "linear-gradient(135deg, #000000 0%, #1a1a1a 50%, #000000 100%)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: getResponsivePadding(),
          boxSizing: "border-box",
        }}
      >
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          style={{
            background: "rgba(0, 0, 0, 0.9)",
            backdropFilter: "blur(20px)",
            borderRadius: "30px",
            padding: getResponsivePadding(),
            textAlign: "center",
            border: `2px solid ${flashingOrange}`,
            boxShadow: `0 20px 80px rgba(255, 69, 0, 0.3)`,
            width: "100%",
            maxWidth: "600px", // Keep maxWidth for readability
            boxSizing: "border-box",
          }}
        >
          <motion.div
            animate={{
              scale: [1, 1.1, 1],
              rotate: [0, 5, -5, 0],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            style={{
              fontSize: "4rem",
              marginBottom: "2rem",
            }}
          >
            🎉
          </motion.div>

          <h2
            style={{
              fontSize: "2.5rem",
              fontWeight: "bold",
              color: flashingOrange,
              marginBottom: "1.5rem",
              textShadow: `0 0 20px ${flashingOrange}`,
            }}
          >
            Welcome to the Family!
          </h2>

          <p
            style={{
              fontSize: "1.3rem",
              color: "rgba(255, 255, 255, 0.9)",
              lineHeight: "1.6",
              marginBottom: "2rem",
            }}
          >
            Your creative journey with SignSound Studios begins now. We'll be in touch soon with
            exclusive opportunities and collaborations.
          </p>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate("/")} // Navigate back to home
            style={{
              padding: "1rem 2.5rem",
              fontSize: "1.1rem",
              fontWeight: "600",
              color: "black",
              background: flashingOrange,
              border: "none",
              borderRadius: "50px",
              cursor: "pointer",
              textTransform: "uppercase",
              letterSpacing: "2px",
            }}
          >
            Continue Exploring
          </motion.button>
        </motion.div>
      </div>
    );
  }

  return (
    <div
      style={{
        minHeight: "100vh",
        width: "100vw", // Full viewport width
        margin: 0,
        background: "linear-gradient(135deg, #000000 0%, #1a1a1a 30%, #000000 70%, #1a1a1a 100%)",
        position: "relative",
        overflow: "hidden",
        boxSizing: "border-box",
      }}
    >
      {/* Animated Background Particles */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          overflow: "hidden",
          pointerEvents: "none",
        }}
      >
        {[...Array(15)].map((_, i) => (
          <motion.div
            key={i}
            animate={{
              y: [-10, -50],
              opacity: [0, 0.6, 0],
              scale: [0.3, 1, 0.3],
            }}
            transition={{
              duration: 4 + Math.random() * 2,
              repeat: 3,
              delay: Math.random() * 5,
              ease: "easeInOut",
            }}
            style={{
              position: "absolute",
              left: `${Math.random() * 100}%`,
              top: "100%",
              width: "2px",
              height: "2px",
              backgroundColor: flashingOrange,
              borderRadius: "50%",
              boxShadow: `0 0 10px ${flashingOrange}`,
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
          zIndex: 2,
          minHeight: "100vh",
          width: "100%", // Full width of parent (100vw)
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: getResponsivePadding(),
          boxSizing: "border-box",
        }}
      >
        <div
          style={{
            width: "100%", // Full width
            maxWidth: "900px", // Increased for better form spread on larger screens
          }}
        >
          {/* Header Section */}
          <motion.div
            variants={itemVariants}
            style={{
              textAlign: "center",
              marginBottom: "3rem",
            }}
          >
            <motion.h1
              animate={{
                textShadow: [
                  `0 0 20px ${flashingOrange}`,
                  `0 0 40px ${flashingOrange}`,
                  `0 0 20px ${flashingOrange}`,
                ],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              style={{
                fontSize: window.innerWidth < 640 ? "2.5rem" : "3.5rem",
                fontWeight: "900",
                color: "white",
                marginBottom: "1rem",
                letterSpacing: "3px",
                textTransform: "uppercase",
              }}
            >
              Join the Revolution
            </motion.h1>

            <motion.p
              variants={itemVariants}
              style={{
                fontSize: window.innerWidth < 640 ? "1rem" : "1.3rem",
                color: "rgba(255, 255, 255, 0.8)",
                lineHeight: "1.6",
                maxWidth: "800px",
                margin: "0 auto",
                fontWeight: "300",
              }}
            >
              Every great artist starts with a single step. Let's create something extraordinary
              together. Your voice matters, your creativity inspires, and your journey begins here.
            </motion.p>
          </motion.div>

          {/* Form Container */}
          <motion.div
            variants={itemVariants}
            style={{
              background: "rgba(0, 0, 0, 0.8)",
              backdropFilter: "blur(20px)",
              borderRadius: "25px",
              padding: getResponsivePadding(),
              border: `2px solid rgba(255, 69, 0, 0.3)`,
              boxShadow: `0 20px 60px rgba(255, 69, 0, 0.2)`,
              width: "100%", // Full width
            }}
          >
            <form onSubmit={handleSubmit} style={{ width: "100%" }}>
              {formFields.map((field) => (
                <motion.div
                  key={field.id}
                  variants={itemVariants}
                  style={{
                    marginBottom: "2.5rem",
                    position: "relative",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      marginBottom: "0.8rem",
                    }}
                  >
                    <span
                      style={{
                        fontSize: window.innerWidth < 640 ? "1.2rem" : "1.5rem",
                        marginRight: "0.8rem",
                      }}
                    >
                      {field.icon}
                    </span>
                    <label
                      style={{
                        fontSize: window.innerWidth < 640 ? "1rem" : "1.1rem",
                        fontWeight: "600",
                        color: focusedField === field.id ? flashingOrange : "white",
                        transition: "color 0.3s ease",
                      }}
                    >
                      {field.label}
                    </label>
                  </div>

                  <p
                    id={`${field.id}-description`}
                    style={{
                      fontSize: window.innerWidth < 640 ? "0.8rem" : "0.9rem",
                      color: "rgba(255, 255, 255, 0.6)",
                      marginBottom: "1rem",
                      fontStyle: "italic",
                      lineHeight: "1.4",
                    }}
                  >
                    {field.description}
                  </p>

                  <motion.div
                    animate={{
                      scale: focusedField === field.id ? 1.02 : 1,
                      boxShadow: focusedField === field.id
                        ? `0 0 20px rgba(255, 69, 0, 0.4)`
                        : "0 5px 15px rgba(0, 0, 0, 0.3)",
                    }}
                    transition={{ duration: 0.3 }}
                    style={{
                      position: "relative",
                      borderRadius: "15px",
                      background: "rgba(26, 26, 26, 0.8)",
                      border: `2px solid ${
                        focusedField === field.id ? flashingOrange : "rgba(255, 255, 255, 0.1)"
                      }`,
                      overflow: "hidden",
                    }}
                  >
                    <input
                      type={field.type}
                      placeholder={field.placeholder}
                      value={formData[field.id]}
                      onChange={(e) => handleInputChange(field.id, e.target.value)}
                      onFocus={() => setFocusedField(field.id)}
                      onBlur={() => setFocusedField("")}
                      required
                      aria-describedby={`${field.id}-description`}
                      style={{
                        width: "100%",
                        padding: window.innerWidth < 640 ? "1rem" : "1.2rem 1.5rem",
                        fontSize: window.innerWidth < 640 ? "1rem" : "1.1rem",
                        background: "transparent",
                        border: "none",
                        outline: "none",
                        color: "white",
                        fontFamily: "system-ui, -apple-system, sans-serif",
                      }}
                    />

                    <motion.div
                      animate={{
                        width: focusedField === field.id ? "100%" : "0%",
                      }}
                      transition={{ duration: 0.3 }}
                      style={{
                        position: "absolute",
                        bottom: 0,
                        left: 0,
                        height: "2px",
                        background: `linear-gradient(90deg, ${flashingOrange}, #FF6500)`,
                      }}
                    />
                  </motion.div>
                </motion.div>
              ))}

              <motion.button
                type="submit"
                disabled={isSubmitting}
                whileHover={{ scale: isSubmitting ? 1 : 1.05 }}
                whileTap={{ scale: isSubmitting ? 1 : 0.95 }}
                animate={{
                  boxShadow: isSubmitting
                    ? [
                        `0 0 20px ${flashingOrange}`,
                        `0 0 40px ${flashingOrange}`,
                        `0 0 20px ${flashingOrange}`,
                      ]
                    : "0 10px 30px rgba(255, 69, 0, 0.3)",
                }}
                transition={{
                  boxShadow: { duration: 1, repeat: isSubmitting ? Infinity : 0 },
                }}
                style={{
                  width: "100%",
                  padding: window.innerWidth < 640 ? "1.2rem" : "1.5rem",
                  fontSize: window.innerWidth < 640 ? "1.1rem" : "1.3rem",
                  fontWeight: "700",
                  color: isSubmitting ? "rgba(255, 255, 255, 0.8)" : "black",
                  background: isSubmitting
                    ? "rgba(255, 69, 0, 0.7)"
                    : `linear-gradient(135deg, ${flashingOrange} 0%, #FF6500 100%)`,
                  border: "none",
                  borderRadius: "15px",
                  cursor: isSubmitting ? "not-allowed" : "pointer",
                  textTransform: "uppercase",
                  letterSpacing: "2px",
                  position: "relative",
                  overflow: "hidden",
                  marginTop: "1rem",
                }}
              >
                <motion.div
                  animate={{
                    x: isSubmitting ? ["-100%", "100%"] : "-100%",
                  }}
                  transition={{
                    duration: 1.5,
                    repeat: isSubmitting ? Infinity : 0,
                    ease: "linear",
                  }}
                  style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    width: "100%",
                    height: "100%",
                    background: "linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.3), transparent)",
                  }}
                />
                <span style={{ position: "relative", zIndex: 1 }}>
                  {isSubmitting ? "Creating Your Profile..." : "Begin Your Journey"}
                </span>
              </motion.button>
            </form>

            <motion.div
              variants={itemVariants}
              style={{
                textAlign: "center",
                marginTop: "2.5rem",
                padding: getResponsivePadding(),
                background: "rgba(255, 69, 0, 0.1)",
                borderRadius: "15px",
                border: `1px solid rgba(255, 69, 0, 0.2)`,
              }}
            >
              <p
                style={{
                  fontSize: window.innerWidth < 640 ? "1rem" : "1.1rem",
                  color: "rgba(255, 255, 255, 0.9)",
                  fontStyle: "italic",
                  lineHeight: "1.6",
                  margin: 0,
                }}
              >
                "Every artist was first an amateur. Every expert was once a beginner. Every icon was
                once an unknown."
              </p>
              <p
                style={{
                  fontSize: window.innerWidth < 640 ? "0.8rem" : "0.9rem",
                  color: flashingOrange,
                  marginTop: "1rem",
                  fontWeight: "600",
                }}
              >
                - SignSound Studios Family
              </p>
            </motion.div>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};

export default ArtistSignUpForm;