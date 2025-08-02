import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

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
  const [submitError, setSubmitError] = useState("");

  const navigate = useNavigate();

  const flashingOrange = "#FF4500";
  const black = "#000000";
  const darkGray = "#1a1a1a";

  // Load EmailJS
  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://cdn.jsdelivr.net/npm/@emailjs/browser@3/dist/email.min.js';
    script.async = true;
    script.onload = () => {
      // Initialize EmailJS with your public key
      window.emailjs.init("YOUR_PUBLIC_KEY"); // You'll replace this
    };
    document.head.appendChild(script);

    return () => {
      document.head.removeChild(script);
    };
  }, []);

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

  const sendEmailDirectly = async (formData) => {
    // Using a public email service API (FormSubmit)
    const form = new FormData();
    form.append('_to', 'sounddotsign@gmail.com');
    form.append('_subject', `New Artist Signup - ${formData.signName}`);
    form.append('_captcha', 'false');
    form.append('_template', 'table');
    form.append('Artist Name', formData.signName);
    form.append('Email', formData.email);
    form.append('X Username', formData.xUsername || 'Not provided');
    form.append('Telegram Username', formData.tgUsername || 'Not provided');
    form.append('WhatsApp Number', formData.whatsappNo || 'Not provided');
    form.append('Submission Time', new Date().toLocaleString());

    try {
      const response = await fetch('https://formsubmit.co/sounddotsign@gmail.com', {
        method: 'POST',
        body: form
      });
      
      if (response.ok) {
        return { success: true };
      } else {
        throw new Error('Failed to send email');
      }
    } catch (error) {
      console.error('FormSubmit failed:', error);
      throw error;
    }
  };

  const sendViaWebhook = async (formData) => {
    // Using Webhook.site or similar service as backup
    try {
      const webhookData = {
        to_email: 'sounddotsign@gmail.com',
        subject: `New Artist Signup - ${formData.signName}`,
        artist_name: formData.signName,
        email: formData.email,
        x_username: formData.xUsername || 'Not provided',
        telegram_username: formData.tgUsername || 'Not provided',
        whatsapp_number: formData.whatsappNo || 'Not provided',
        submission_time: new Date().toLocaleString(),
        message: `
New Artist Registration:

Artist Name: ${formData.signName}
Email: ${formData.email}
X Username: ${formData.xUsername || 'Not provided'}
Telegram Username: ${formData.tgUsername || 'Not provided'}
WhatsApp Number: ${formData.whatsappNo || 'Not provided'}

Submitted at: ${new Date().toLocaleString()}
        `
      };

      // You can replace this URL with a webhook service like Zapier, Make.com, or n8n
      const response = await fetch('https://hook.integromat.com/YOUR_WEBHOOK_URL', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(webhookData)
      });

      if (response.ok) {
        return { success: true };
      } else {
        throw new Error('Webhook failed');
      }
    } catch (error) {
      console.error('Webhook failed:', error);
      throw error;
    }
  };

  const sendViaGoogleForms = async (formData) => {
    // Alternative: Send to Google Forms (which can email you)
    const googleFormData = new FormData();
    
    // These entry IDs need to be replaced with your actual Google Form field IDs
    googleFormData.append('entry.123456789', formData.signName); // Artist Name field
    googleFormData.append('entry.987654321', formData.email); // Email field
    googleFormData.append('entry.111111111', formData.xUsername || ''); // X Username field
    googleFormData.append('entry.222222222', formData.tgUsername || ''); // Telegram field
    googleFormData.append('entry.333333333', formData.whatsappNo || ''); // WhatsApp field

    try {
      // Replace with your actual Google Form URL
      const response = await fetch('https://docs.google.com/forms/d/e/YOUR_FORM_ID/formResponse', {
        method: 'POST',
        mode: 'no-cors',
        body: googleFormData
      });
      
      return { success: true };
    } catch (error) {
      console.error('Google Forms failed:', error);
      throw error;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    
    setIsSubmitting(true);
    setSubmitError("");

    try {
      // Try FormSubmit first (most reliable)
      await sendEmailDirectly(formData);
      
      // Small delay for better UX
      await new Promise((resolve) => setTimeout(resolve, 1500));
      
      setIsSubmitted(true);
    } catch (error) {
      console.error('Primary submission failed:', error);
      
      try {
        // Try webhook as backup
        await sendViaWebhook(formData);
        setIsSubmitted(true);
      } catch (backupError) {
        console.error('Backup submission failed:', backupError);
        
        try {
          // Try Google Forms as final backup
          await sendViaGoogleForms(formData);
          setIsSubmitted(true);
        } catch (finalError) {
          console.error('All submission methods failed:', finalError);
          setSubmitError("Submission failed. Please try the manual method below or contact us directly.");
          setIsSubmitting(false);
        }
      }
    }
  };

  const sendManualEmail = () => {
    const emailBody = `
New Artist Registration:

Artist Name: ${formData.signName}
Email: ${formData.email}
X Username: ${formData.xUsername || 'Not provided'}
Telegram Username: ${formData.tgUsername || 'Not provided'}
WhatsApp Number: ${formData.whatsappNo || 'Not provided'}

Submitted at: ${new Date().toLocaleString()}

Please add me to SignSound Studios!
    `;

    const subject = `New Artist Signup - ${formData.signName}`;
    const mailtoLink = `mailto:sounddotsign@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(emailBody)}`;
    
    window.open(mailtoLink, '_blank');
  };

  const copyDetailsToClipboard = async () => {
    const details = `
Artist Registration Details:

Artist Name: ${formData.signName}
Email: ${formData.email}
X Username: ${formData.xUsername || 'Not provided'}
Telegram Username: ${formData.tgUsername || 'Not provided'}
WhatsApp Number: ${formData.whatsappNo || 'Not provided'}
Submitted at: ${new Date().toLocaleString()}

Please send this to: sounddotsign@gmail.com
    `;

    try {
      await navigator.clipboard.writeText(details);
      alert('Details copied! Please paste and send to sounddotsign@gmail.com');
    } catch (err) {
      // Fallback for older browsers
      const textArea = document.createElement('textarea');
      textArea.value = details;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand('copy');
      document.body.removeChild(textArea);
      alert('Details copied! Please paste and send to sounddotsign@gmail.com');
    }
  };

  const ManualSubmissionOptions = () => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      style={{
        marginTop: "2rem",
        padding: "1.5rem",
        background: "rgba(255, 69, 0, 0.1)",
        borderRadius: "15px",
        border: "1px solid rgba(255, 69, 0, 0.3)",
      }}
    >
      <h3 style={{ 
        color: flashingOrange, 
        marginBottom: "1rem", 
        fontSize: "1.2rem",
        textAlign: "center" 
      }}>
        📧 Manual Submission Options
      </h3>
      
      <div style={{ 
        display: "grid", 
        gap: "1rem",
        gridTemplateColumns: window.innerWidth < 640 ? "1fr" : "1fr 1fr"
      }}>
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={sendManualEmail}
          style={{
            padding: "1rem",
            background: "rgba(255, 69, 0, 0.2)",
            border: `1px solid ${flashingOrange}`,
            borderRadius: "10px",
            color: "white",
            cursor: "pointer",
            fontSize: "0.9rem",
            fontWeight: "600",
          }}
        >
          📤 Open Email Client
        </motion.button>
        
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={copyDetailsToClipboard}
          style={{
            padding: "1rem",
            background: "rgba(255, 69, 0, 0.2)",
            border: `1px solid ${flashingOrange}`,
            borderRadius: "10px",
            color: "white",
            cursor: "pointer",
            fontSize: "0.9rem",
            fontWeight: "600",
          }}
        >
          📋 Copy Details
        </motion.button>
      </div>
      
      <div style={{
        marginTop: "1.5rem",
        textAlign: "center",
        padding: "1rem",
        background: "rgba(0, 0, 0, 0.3)",
        borderRadius: "10px",
      }}>
        <p style={{ 
          fontSize: "0.9rem", 
          color: "rgba(255, 255, 255, 0.8)", 
          margin: "0 0 0.5rem 0" 
        }}>
          Or send your details directly to:
        </p>
        <p style={{ 
          fontSize: "1.1rem", 
          color: flashingOrange, 
          fontWeight: "bold",
          margin: 0,
          wordBreak: "break-all"
        }}>
          sounddotsign@gmail.com
        </p>
      </div>
    </motion.div>
  );

  const getResponsivePadding = () => {
    if (typeof window === 'undefined') return "2rem";
    const width = window.innerWidth;
    if (width < 375) return "1rem";
    if (width < 640) return "1.5rem";
    if (width < 768) return "2rem";
    return "3rem";
  };

  const formFields = [
    {
      id: "signName",
      label: "SignName",
      placeholder: "What should we call you?",
      type: "text",
      icon: "🎭",
      description: "Your creative identity - the name that represents your artistry",
      required: true,
    },
    {
      id: "email",
      label: "Email Address",
      placeholder: "your.creative.email@domain.com",
      type: "email",
      icon: "📧",
      description: "Your professional gateway to endless possibilities",
      required: true,
    },
    {
      id: "xUsername",
      label: "X (Twitter) Username or Link",
      placeholder: "@yourusername or full profile link",
      type: "text",
      icon: "🐦",
      description: "Connect with us on X - where conversations spark creativity",
      required: false,
    },
    {
      id: "tgUsername",
      label: "Telegram Username",
      placeholder: "@yourusername",
      type: "text",
      icon: "✈️",
      description: "Join our creative community for instant updates and collaboration",
      required: false,
    },
    {
      id: "whatsappNo",
      label: "WhatsApp Number",
      placeholder: "+1234567890",
      type: "tel",
      icon: "📱",
      description: "For direct communication and exclusive opportunities",
      required: false,
    },
  ];

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

  if (isSubmitted) {
    return (
      <div
        style={{
          minHeight: "100vh",
          width: "100vw",
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
            maxWidth: "600px",
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
              marginBottom: "1rem",
            }}
          >
            Your registration has been submitted successfully! 
          </p>

          <p
            style={{
              fontSize: "1.1rem",
              color: "rgba(255, 255, 255, 0.7)",
              lineHeight: "1.6",
              marginBottom: "2rem",
            }}
          >
            We've sent your details to <strong style={{ color: flashingOrange }}>sounddotsign@gmail.com</strong>. 
            You'll hear from us soon with exclusive opportunities and collaborations.
          </p>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate("/")}
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
        width: "100vw",
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
          width: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: getResponsivePadding(),
          boxSizing: "border-box",
        }}
      >
        <div
          style={{
            width: "100%",
            maxWidth: "900px",
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
                fontSize: typeof window !== 'undefined' && window.innerWidth < 640 ? "2.5rem" : "3.5rem",
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
                fontSize: typeof window !== 'undefined' && window.innerWidth < 640 ? "1rem" : "1.3rem",
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
              width: "100%",
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
                        fontSize: typeof window !== 'undefined' && window.innerWidth < 640 ? "1.2rem" : "1.5rem",
                        marginRight: "0.8rem",
                      }}
                    >
                      {field.icon}
                    </span>
                    <label
                      style={{
                        fontSize: typeof window !== 'undefined' && window.innerWidth < 640 ? "1rem" : "1.1rem",
                        fontWeight: "600",
                        color: focusedField === field.id ? flashingOrange : "white",
                        transition: "color 0.3s ease",
                      }}
                    >
                      {field.label} {field.required && <span style={{ color: flashingOrange }}>*</span>}
                    </label>
                  </div>

                  <p
                    style={{
                      fontSize: typeof window !== 'undefined' && window.innerWidth < 640 ? "0.8rem" : "0.9rem",
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
                      required={field.required}
                      style={{
                        width: "100%",
                        padding: typeof window !== 'undefined' && window.innerWidth < 640 ? "1rem" : "1.2rem 1.5rem",
                        fontSize: typeof window !== 'undefined' && window.innerWidth < 640 ? "1rem" : "1.1rem",
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

              {submitError && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  style={{
                    padding: "1rem",
                    background: "rgba(255, 0, 0, 0.1)",
                    border: "1px solid rgba(255, 0, 0, 0.3)",
                    borderRadius: "10px",
                    color: "#ff6b6b",
                    marginBottom: "1rem",
                    textAlign: "center",
                  }}
                >
                  {submitError}
                </motion.div>
              )}

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
                  padding: typeof window !== 'undefined' && window.innerWidth < 640 ? "1.2rem" : "1.5rem",
                  fontSize: typeof window !== 'undefined' && window.innerWidth < 640 ? "1.1rem" : "1.3rem",
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
                  {isSubmitting ? "Sending Your Details..." : "Begin Your Journey"}
                </span>
              </motion.button>
            </form>

            {submitError && <ManualSubmissionOptions />}

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
                  fontSize: typeof window !== 'undefined' && window.innerWidth < 640 ? "0.8rem" : "0.9rem",
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