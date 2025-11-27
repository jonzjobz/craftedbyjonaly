"use client"

import type React from "react"

import { useEffect, useState } from "react"

export default function Home() {
  const [theme, setTheme] = useState("light")
  const [mounted, setMounted] = useState(false)
  // Add state for form data and notification
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  })
  const [notification, setNotification] = useState<{ show: boolean; message: string }>({
    show: false,
    message: "",
  })

  useEffect(() => {
    setMounted(true)
    const savedTheme = localStorage.getItem("theme") || "light"
    if (savedTheme === "dark") {
      document.body.classList.add("dark-mode")
      setTheme("dark")
    }
  }, [])

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light"
    setTheme(newTheme)
    if (newTheme === "dark") {
      document.body.classList.add("dark-mode")
    } else {
      document.body.classList.remove("dark-mode")
    }
    localStorage.setItem("theme", newTheme)
  }

  const navigateToSection = (sectionId: string) => {
    const section = document.getElementById(sectionId)
    if (section) {
      section.scrollIntoView({ behavior: "smooth" })
    }
  }

  const handleContactSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const form = e.currentTarget

    // Validate email
    const email = (form.querySelector("input[type='email']") as HTMLInputElement)?.value || ""
    if (!email.includes("@")) {
      alert("Please enter a valid email address")
      return
    }

    setNotification({
      show: true,
      message: "Message sent successfully! I'll get back to you soon.",
    })

    // Reset form
    form.reset()
    setFormData({ name: "", email: "", message: "" })

    setTimeout(() => {
      setNotification({ show: false, message: "" })
    }, 3000)
  }

  // For theme toggle, check if mounted to avoid SSR issues
  const isDarkMode = typeof window !== "undefined" ? document.body.classList.contains("dark-mode") : false

  if (!mounted) return null

  const journalImageStyle = {
    width: "100%",
    height: "250px",
    objectFit: "cover",
    borderRadius: "12px",
    marginBottom: "1.5rem",
  }

  const styles = `
  .social-link {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 44px;
    height: 44px;
    border-radius: 50%;
    background: linear-gradient(135deg, var(--aqua-mint), var(--seafoam));
    color: var(--ocean-dark);
    text-decoration: none;
    transition: all 0.3s ease;
    flex-shrink: 0;
  }

  .social-link svg {
    width: 22px;
    height: 22px;
    fill: currentColor;
    stroke: currentColor;
  }

  .social-link:hover {
    transform: translateY(-3px);
    box-shadow: 0 12px 24px rgba(113, 201, 206, 0.4);
    background: linear-gradient(135deg, var(--seafoam), var(--aqua-mint));
  }

  .dark .social-link {
    color: var(--soft-white);
    background: linear-gradient(135deg, rgba(113, 201, 206, 0.2), rgba(166, 227, 233, 0.2));
    border: 1.5px solid var(--aqua-mint);
  }

  .dark .social-link:hover {
    background: linear-gradient(135deg, rgba(113, 201, 206, 0.3), rgba(166, 227, 233, 0.3));
    box-shadow: 0 12px 24px rgba(113, 201, 206, 0.6);
  }
`

  return (
    <div className={`portfolio-container ${theme}`}>
      {notification.show && (
        <div className="notification-toast">
          <div className="notification-content">
            <div className="notification-waves">
              <div className="wave wave-1"></div>
              <div className="wave wave-2"></div>
              <div className="wave wave-3"></div>
            </div>
            <div className="notification-text">
              <span className="notification-icon">✓</span>
              <p>{notification.message}</p>
            </div>
          </div>
        </div>
      )}

      <style>{`
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }

        :root {
          --primary-ocean: #0d1b2a;
          --secondary-ocean: #1a3a52;
          --accent-aqua: #71c9ce;
          --mint-green: #a6e3e9;
          --seafoam: #c8f0f5;
          --soft-white: #f2f9fc;
          --coral-accent: #ffaa5a;
          --dark-blue: #0a0f1a;
          --bg-light: #f2f9fc;
          --text-light: #0d1b2a;
          --card-light: rgba(255, 255, 255, 0.7);
          --bg-dark: #0d1b2a;
          --text-dark: #f2f9fc;
          --card-dark: rgba(113, 201, 206, 0.05);
          --bg: var(--bg-light);
          --text: var(--text-light);
          --card-bg: var(--card-light);
          /* New variables for social links */
          --aqua-mint: #71c9ce;
          --seafoam: #c8f0f5;
          --ocean-dark: #0d1b2a;
        }

        body.dark-mode {
          --bg: var(--bg-dark);
          --text: var(--text-dark);
          --card-bg: var(--card-dark);
        }

        html {
          scroll-behavior: smooth;
        }

        body {
          font-family: "Poppins", -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
          background-color: var(--bg);
          color: var(--text);
          line-height: 1.6;
          transition: background-color 0.3s ease, color 0.3s ease;
          overflow-x: hidden;
        }

        .animated-bg {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: linear-gradient(135deg, var(--bg) 0%, var(--bg) 100%);
          z-index: -1;
          overflow: hidden;
        }

        .wave {
          position: absolute;
          bottom: 0;
          left: 0;
          width: 200%;
          height: 100px;
          background: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120"><path d="M0,50 Q300,0 600,50 T1200,50 L1200,120 L0,120 Z" fill="%230D1B2A" opacity="0.1"/></svg>') repeat-x;
          animation: wave 15s linear infinite;
        }

        .wave2 { animation-delay: 2s; opacity: 0.5; }
        .wave3 { animation-delay: 4s; opacity: 0.3; }

        @keyframes wave {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        } 
          
        .bubble {
          position: absolute;
          border-radius: 50%;
          background: radial-gradient(circle at 30% 30%, rgba(113, 201, 206, 0.3), rgba(113, 201, 206, 0.05));
          border: 2px solid rgba(113, 201, 206, 0.1);
          animation: float 20s infinite;
        }

        .bubble-1 { width: 80px; height: 80px; bottom: 20%; left: 10%; animation-duration: 20s; }
        .bubble-2 { width: 120px; height: 120px; bottom: 40%; right: 15%; animation-duration: 25s; animation-delay: 2s; }
        .bubble-3 { width: 60px; height: 60px; bottom: 10%; left: 50%; animation-duration: 18s; animation-delay: 4s; }
        .bubble-4 { width: 100px; height: 100px; bottom: 30%; right: 20%; animation-duration: 22s; animation-delay: 1s; }
        .bubble-5 { width: 70px; height: 70px; bottom: 50%; left: 30%; animation-duration: 24s; animation-delay: 3s; }
        .bubble-6 { width: 90px; height: 90px; bottom: 15%; right: 40%; animation-duration: 26s; animation-delay: 5s; }
        .bubble-7 { width: 65px; height: 65px; bottom: 60%; left: 15%; animation-duration: 21s; animation-delay: 2.5s; }
        .bubble-8 { width: 110px; height: 110px; bottom: 25%; left: 70%; animation-duration: 28s; animation-delay: 1.5s; }
        .bubble-9 { width: 75px; height: 75px; bottom: 45%; right: 5%; animation-duration: 23s; animation-delay: 3.5s; }
        .bubble-10 { width: 85px; height: 85px; bottom: 35%; left: 5%; animation-duration: 27s; animation-delay: 4.5s; }

        @keyframes float {
          0% { transform: translateY(0) translateX(0); opacity: 0.3; }
          50% { opacity: 0.6; }
          100% { transform: translateY(-100vh) translateX(50px); opacity: 0; }
        }

        .floating-particle {
          position: absolute;
          width: 4px;
          height: 4px;
          background: var(--accent-aqua);
          border-radius: 50%;
          opacity: 0.3;
          animation: particle-float 30s infinite;
        }

        .particle-1 { top: 20%; left: 20%; animation-duration: 28s; }
        .particle-2 { top: 40%; right: 15%; animation-duration: 32s; animation-delay: 5s; }
        .particle-3 { top: 60%; left: 40%; animation-duration: 35s; animation-delay: 10s; }
        .particle-4 { top: 80%; right: 30%; animation-duration: 30s; animation-delay: 15s; }

        @keyframes particle-float {
          0%, 100% { transform: translate(0, 0); }
          25% { transform: translate(100px, -100px); }
          50% { transform: translate(-100px, -150px); }
          75% { transform: translate(50px, -50px); }
        }

        .navbar {
          position: sticky;
          top: 0;
          z-index: 1000;
          background: rgba(242, 249, 252, 0.8);
          backdrop-filter: blur(10px);
          border-bottom: 1px solid rgba(113, 201, 206, 0.1);
          transition: background 0.3s ease;
        }

        body.dark-mode .navbar {
          background: rgba(13, 27, 42, 0.9);
          border-bottom: 1px solid rgba(113, 201, 206, 0.05);
        }

        .nav-container {
          max-width: 1200px;
          margin: 0 auto;
          padding: 1.5rem 2rem;
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .nav-logo {
          font-size: 1.5rem;
          font-weight: 700;
          color: var(--primary-ocean);
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }

        body.dark-mode .nav-logo {
          color: var(--accent-aqua);
        }

        .logo-icon {
          font-size: 1.8rem;
          color: var(--accent-aqua);
        }

        .nav-menu {
          display: flex;
          list-style: none;
          gap: 2rem;
          align-items: center;
        }

        .nav-link {
          text-decoration: none;
          color: var(--text);
          font-weight: 500;
          position: relative;
          transition: color 0.3s ease;
          cursor: pointer;
        }

        .nav-link:hover {
          color: var(--accent-aqua);
        }

        .nav-link.active {
          color: var(--accent-aqua);
        }

        .nav-link.active::after {
          content: "";
          position: absolute;
          bottom: -5px;
          left: 0;
          right: 0;
          height: 2px;
          background: linear-gradient(90deg, var(--accent-aqua), var(--coral-accent));
          border-radius: 1px;
        }

        .theme-toggle {
          background: none;
          border: none;
          cursor: pointer;
          width: 24px;
          height: 24px;
          display: flex;
          align-items: center;
          justify-content: center;
          color: var(--text);
          transition: color 0.3s ease;
        }

        .theme-toggle:hover {
          color: var(--accent-aqua);
        }

        .theme-toggle svg {
          width: 100%;
          height: 100%;
          stroke-width: 2;
        }

        .sun-icon { display: block; }
        .moon-icon { display: none; }

        body.dark-mode .sun-icon { display: none; }
        body.dark-mode .moon-icon { display: block; }

        .page-section {
          min-height: 100vh;
          padding: 4rem 2rem;
          max-width: 1200px;
          margin: 0 auto;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .home-section {
          min-height: 100vh;
        }

        .home-content {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 4rem;
          align-items: center;
          width: 100%;
        }

        .hero-text {
          animation: fadeInUp 0.8s ease;
        }

        .hero-title {
          font-size: 3.5rem;
          font-weight: 800;
          line-height: 1.2;
          margin-bottom: 1.5rem;
          background: linear-gradient(135deg, var(--text), var(--accent-aqua));
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .gradient-text {
          background: linear-gradient(135deg, var(--accent-aqua), var(--coral-accent));
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .hero-subtitle {
          font-size: 1.25rem;
          background: linear-gradient(135deg, var(--accent-aqua), var(--mint-green));
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          margin-bottom: 3rem;
          font-weight: 500;
        }

        .hero-buttons {
          display: flex;
          gap: 1.5rem;
          flex-wrap: wrap;
        }

        .btn {
          padding: 0.75rem 2rem;
          border: none;
          border-radius: 50px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
          font-size: 1rem;
          font-family: "Poppins", sans-serif;
        }

        .btn-primary {
          background: linear-gradient(135deg, var(--accent-aqua), var(--mint-green));
          color: var(--primary-ocean);
          box-shadow: 0 8px 25px rgba(113, 201, 206, 0.3);
        }

        .btn-primary:hover {
          transform: translateY(-3px);
          box-shadow: 0 12px 35px rgba(113, 201, 206, 0.4);
        }

        .btn-secondary {
          background: transparent;
          color: var(--accent-aqua);
          border: 2px solid var(--accent-aqua);
        }

        .btn-secondary:hover {
          background: var(--accent-aqua);
          color: var(--primary-ocean);
          transform: translateY(-3px);
        }

        .btn-submit {
          width: 100%;
        }

        .hero-image {
          animation: fadeInDown 0.8s ease;
          display: flex;
          justify-content: center;
        }

        /* Add animated wave border around profile circle */
        .profile-frame.wave-border {
          position: relative;
          width: 380px;
          height: 380px;
          border-radius: 50%;
          overflow: hidden;
          box-shadow: 0 20px 60px rgba(113, 201, 206, 0.3);
          animation: floatProfile 6s ease-in-out infinite;
        }

        .profile-frame.wave-border img {
          position: relative; /* Ensure img is on top */
          z-index: 2;
        }

        .profile-frame.wave-border .wave-animation {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          z-index: 1;
          opacity: 0.6;
        }

        .profile-frame.wave-border .wave-animation path {
          animation: animateWave 10s linear infinite;
        }

        .profile-frame.wave-border .wave-animation path:nth-child(2) {
          animation-delay: -5s; /* Offset the second wave */
        }

        @keyframes animateWave {
          from { transform: translateX(-50%); }
          to { transform: translateX(0%); }
        }

        @keyframes floatProfile {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
        }

        .profile-placeholder {
          width: 100%;
          height: 100%;
          background: linear-gradient(135deg, var(--accent-aqua), var(--mint-green));
        }

        .section-header {
          text-align: center;
          margin-bottom: 4rem;
        }

        .section-title {
          font-size: 2.5rem;
          font-weight: 800;
          margin-bottom: 1.5rem;
          color: var(--text);
        }

        .title-underline {
          width: 100px;
          height: 4px;
          background: linear-gradient(90deg, var(--accent-aqua), var(--coral-accent));
          border-radius: 2px;
          margin: 0 auto;
        }

        .about-section {
          display: block;
        }

        /* Enhance About section with better typography and animations */
        .about-content {
          display: flex;
          flex-direction: column;
          gap: 3rem;
        }

        .about-bio {
          animation: fadeInUp 0.6s ease;
        }

        .about-subtitle {
          font-size: 1.8rem; /* Increased size */
          color: var(--accent-aqua);
          margin-bottom: 1.5rem;
          font-weight: 700;
          letter-spacing: 0.5px; /* Added letter spacing */
        }

        .about-text {
          font-size: 1.1rem; /* Increased size */
          margin-bottom: 1.5rem;
          opacity: 0.9;
          line-height: 1.8;
          animation: fadeInUp 0.8s ease; /* Added animation */
        }

        .highlight-text {
          background: linear-gradient(135deg, rgba(113, 201, 206, 0.1), rgba(255, 170, 90, 0.1));
          padding: 1.5rem;
          border-radius: 10px;
          border-left: 4px solid var(--accent-aqua);
          animation: fadeInUp 0.9s ease; /* Added animation */
        }

        .about-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
          gap: 2rem;
          margin: 3rem 0;
        }

        .about-card {
          padding: 2rem;
          border-radius: 20px;
          transition: all 0.3s ease;
        }

        .card-glass {
          background: var(--card-bg);
          backdrop-filter: blur(10px);
          border: 1px solid rgba(113, 201, 206, 0.1);
        }

        .about-card:hover {
          transform: translateY(-10px);
          border-color: rgba(113, 201, 206, 0.3);
        }

        .card-icon {
          width: 50px;
          height: 50px;
          background: linear-gradient(135deg, var(--accent-aqua), var(--mint-green));
          border-radius: 15px;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 1.5rem;
          color: var(--primary-ocean);
        }

        .card-icon svg {
          width: 28px;
          height: 28px;
        }

        .about-card h4 {
          font-size: 1.4rem; /* Increased size */
          margin-bottom: 1rem;
          color: var(--text);
        }

        .about-card p {
          font-size: 1rem; /* Increased size */
          opacity: 0.8;
          line-height: 1.6;
        }

        /* New styles for About Features */
        .about-features {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: 2rem;
          margin-top: 3rem;
        }

        .feature-card {
          padding: 2.5rem; /* Increased padding */
          border-radius: 20px;
          transition: all 0.3s ease;
          text-align: center; /* Center align text */
        }

        .feature-card:hover {
          transform: translateY(-10px);
          border-color: rgba(113, 201, 206, 0.3);
        }

        .feature-title {
          font-size: 1.5rem; /* Adjusted title size */
          color: var(--accent-aqua);
          margin-bottom: 1.2rem; /* Adjusted margin */
          font-weight: 700;
          letter-spacing: 0.5px;
        }

        .feature-text {
          font-size: 1rem; /* Adjusted text size */
          opacity: 0.9;
          line-height: 1.7;
        }

        /* Enhance timeline with better typography and animations */
        .timeline-section {
          margin-top: 5rem; /* Increased margin-top */
          animation: fadeInUp 1s ease; /* Added animation */
        }

        .timeline-title {
          font-size: 2rem; /* Increased size */
          margin-bottom: 3rem;
          color: var(--text);
          font-weight: 800;
        }

        .timeline-container {
          display: flex;
          flex-direction: column;
          gap: 2rem;
        }

        .timeline-item {
          display: flex;
          gap: 2rem;
          animation: fadeInLeft 0.6s ease;
        }

        .timeline-marker {
          width: 30px;
          height: 30px;
          background: linear-gradient(135deg, var(--accent-aqua), var(--coral-accent));
          border-radius: 50%;
          position: relative;
          flex-shrink: 0;
          margin-top: 0.5rem;
        }

        .timeline-marker::before {
          content: "";
          position: absolute;
          left: 50%;
          top: 100%;
          width: 2px;
          height: 100px;
          background: var(--accent-aqua);
          opacity: 0.3;
          transform: translateX(-50%);
        }

        .timeline-item:last-child .timeline-marker::before {
          display: none;
        }

        .timeline-content {
          flex: 1;
          padding: 1.5rem;
          border-radius: 15px;
        }

        .timeline-content h4 {
          color: var(--text);
          margin-bottom: 1rem;
          font-size: 1.2rem; /* Increased size */
        }

        .timeline-content p {
          opacity: 0.8;
          font-size: 1rem; /* Increased size */
        }

        .timeline-date {
          font-size: 0.9rem; /* Increased size */
          color: var(--accent-aqua);
          font-weight: 600;
          margin-top: 1rem;
        }

        .skills-section {
          display: block;
        }

        .skills-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: 3rem;
        }

        .skill-category {
          animation: fadeInUp 0.6s ease;
        }

        .category-title {
          font-size: 1.3rem;
          color: var(--accent-aqua);
          margin-bottom: 2rem;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 1px;
        }

        .skill-item {
          margin-bottom: 2rem;
        }

        .skill-header {
          display: flex;
          justify-content: space-between;
          margin-bottom: 1rem;
          font-weight: 600;
        }

        .skill-name {
          color: var(--text);
        }

        .skill-percent {
          color: var(--accent-aqua);
        }

        .progress-bar {
          height: 10px; /* Increased height */
          background: rgba(113, 201, 206, 0.1);
          border-radius: 10px;
          overflow: hidden;
        }

        /* Enhance skills with animated progress bars */
        .progress-fill {
          height: 100%;
          background: linear-gradient(90deg, var(--accent-aqua), var(--coral-accent));
          border-radius: 10px;
          transition: width 1.5s cubic-bezier(0.25, 0.46, 0.45, 0.94); /* Increased transition duration */
          transform-origin: left; /* Ensure animation starts from left */
          /* Use the CSS variable for width */
          width: var(--percent);
        }

        .journal-section {
          display: block;
        }

        .journal-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: 2rem;
        }

        .journal-card {
          padding: 2rem;
          border-radius: 20px;
          text-align: center;
          transition: all 0.3s ease;
          position: relative;
          overflow: hidden;
        }

        .journal-card::before {
          content: "";
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(90deg, transparent, rgba(113, 201, 206, 0.1), transparent);
          transition: left 0.6s ease;
        }

        .journal-card:hover::before {
          left: 100%;
        }

        .journal-card:hover {
          transform: translateY(-15px);
          border-color: rgba(113, 201, 206, 0.3);
        }

        .card-badge {
          display: inline-block;
          background: linear-gradient(135deg, var(--accent-aqua), var(--mint-green));
          color: var(--primary-ocean);
          padding: 0.35rem 1rem;
          border-radius: 20px;
          font-size: 0.8rem;
          font-weight: 700;
          margin-bottom: 1.5rem;
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }

        .card-icon {
          font-size: 3rem;
          margin-bottom: 1.5rem;
        }

        /* Add card animations and improved styling */
        .journal-card.card-animate {
          opacity: 0;
          transform: translateY(30px);
          animation: fadeInUp 0.8s ease forwards;
        }

        .journal-card.card-animate:nth-child(1) { animation-delay: 0.2s; }
        .journal-card.card-animate:nth-child(2) { animation-delay: 0.4s; }
        .journal-card.card-animate:nth-child(3) { animation-delay: 0.6s; }
        .journal-card.card-animate:nth-child(4) { animation-delay: 0.8s; }
        .journal-card.card-animate:nth-child(5) { animation-delay: 1.0s; }


        .journal-card h3 {
          color: var(--text);
          margin-bottom: 1rem;
          font-size: 1.3rem; /* Increased size */
        }

        .journal-card p {
          color: var(--text);
          opacity: 0.8;
          line-height: 1.6;
          margin-bottom: 1rem;
          font-size: 1rem; /* Increased size */
        }

        .card-meta {
          font-size: 0.85rem;
          color: var(--accent-aqua);
          font-weight: 600;
          margin-top: 1.5rem;
        }

        .contact-section {
          display: block;
        }

        .contact-content {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 3rem;
          align-items: start;
        }

        .contact-form-wrapper {
          animation: fadeInLeft 0.6s ease;
        }

        .contact-form {
          padding: 3rem;
          border-radius: 20px;
        }

        .form-group {
          margin-bottom: 2rem;
        }

        .form-group label {
          display: block;
          margin-bottom: 1rem;
          font-weight: 600;
          color: var(--text);
        }

        .form-group input,
        .form-group textarea {
          width: 100%;
          padding: 0.75rem 1rem;
          border: 2px solid rgba(113, 201, 206, 0.2);
          border-radius: 10px;
          font-family: "Poppins", sans-serif;
          background: transparent;
          color: var(--text);
          font-size: 1rem;
          transition: all 0.3s ease;
        }

        .form-group input:focus,
        .form-group textarea:focus {
          outline: none;
          border-color: var(--accent-aqua);
          box-shadow: 0 0 15px rgba(113, 201, 206, 0.2);
        }

        .form-group textarea {
          resize: vertical;
        }

        .contact-info {
          display: flex;
          flex-direction: column;
          gap: 2rem;
          animation: fadeInRight 0.6s ease;
        }

        .contact-card {
          padding: 2rem;
          border-radius: 20px;
        }

        .contact-card h3 {
          color: var(--text);
          margin-bottom: 1.5rem;
          font-size: 1.3rem;
        }

        .social-links {
          display: flex;
          gap: 1.5rem;
          margin: 1.5rem 0;
        }

        .social-link {
          width: 45px;
          height: 45px;
          display: flex;
          align-items: center;
          justify-content: center;
          background: linear-gradient(135deg, var(--accent-aqua), var(--mint-green));
          border-radius: 50%;
          color: var(--primary-ocean);
          text-decoration: none;
          transition: all 0.3s ease;
        }

        .social-link:hover {
          transform: translateY(-5px) scale(1.1);
          box-shadow: 0 10px 25px rgba(113, 201, 206, 0.4);
        }

        .social-link svg {
          width: 22px;
          height: 22px;
        }

        .contact-card p {
          margin-bottom: 1rem;
          opacity: 0.9;
        }

        /* Style for notification toast */
        .notification-toast {
          position: fixed;
          bottom: 20px;
          left: 50%;
          transform: translateX(-50%);
          background-color: #4CAF50; /* Green */
          color: white;
          padding: 15px 25px;
          border-radius: 8px;
          box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
          z-index: 1001;
          font-weight: 500;
          display: flex;
          align-items: center;
          gap: 10px;
          animation: fadeInUpNotification 0.5s ease forwards, fadeOutDownNotification 0.5s ease 2.5s forwards;
        }

        @keyframes fadeInUpNotification {
          from { opacity: 0; transform: translate(-50%, 30px); }
          to { opacity: 1; transform: translate(-50%, 0); }
        }

        @keyframes fadeOutDownNotification {
          from { opacity: 1; transform: translate(-50%, 0); }
          to { opacity: 0; transform: translate(-50%, 30px); }
        }

        /* New styles for notification waves */
        .notification-content {
          position: relative;
          overflow: hidden;
          border-radius: 8px;
          z-index: 1;
        }

        .notification-waves {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          z-index: 0;
        }

        .notification-waves .wave {
          position: absolute;
          left: -100%; /* Start off-screen */
          width: 100%;
          height: 100%;
          background: rgba(255, 255, 255, 0.1); /* Semi-transparent white */
          border-radius: 50%;
          animation: animateNotificationWave 3s linear infinite;
        }

        .notification-waves .wave-2 {
          animation-delay: -1s;
        }

        .notification-waves .wave-3 {
          animation-delay: -2s;
        }

        @keyframes animateNotificationWave {
          from { transform: translateX(0); opacity: 0.5; }
          to { transform: translateX(100%); opacity: 0; }
        }

        .notification-text {
          position: relative;
          z-index: 2;
          display: flex;
          align-items: center;
          gap: 10px;
        }

        .notification-icon {
          font-size: 1.2rem;
          font-weight: bold;
        }

        .footer {
          background: var(--primary-ocean);
          color: var(--soft-white);
          text-align: center;
          padding: 3rem 2rem;
          margin-top: 4rem;
        }

        body.dark-mode .footer {
          background: var(--dark-blue);
        }

        .footer-content p {
          margin: 0.5rem 0;
          opacity: 0.9;
        }

        .heart {
          animation: heartbeat 1.5s ease-in-out infinite;
        }

        @keyframes heartbeat {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.2); }
        }

        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes fadeInDown {
          from {
            opacity: 0;
            transform: translateY(-30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes fadeInLeft {
          from {
            opacity: 0;
            transform: translateX(-30px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes fadeInRight {
          from {
            opacity: 0;
            transform: translateX(30px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @media (max-width: 768px) {
          .nav-menu {
            gap: 1.5rem;
          }

          .hero-title {
            font-size: 2.5rem;
          }

          .home-content {
            grid-template-columns: 1fr;
            gap: 2rem;
          }

          .profile-frame {
            width: 200px;
            height: 200px;
          }

          .hero-buttons {
            flex-direction: column;
          }

          .btn {
            width: 100%;
          }

          .contact-content {
            grid-template-columns: 1fr;
          }

          .page-section {
            min-height: auto;
            padding: 3rem 1.5rem;
          }

          .section-title {
            font-size: 2rem;
          }

          .skills-grid {
            grid-template-columns: 1fr;
          }

          .journal-grid {
            grid-template-columns: 1fr;
          }
        }

        @media (max-width: 480px) {
          .hero-title {
            font-size: 1.8rem;
          }

          .hero-subtitle {
            font-size: 1rem;
          }

          .nav-logo {
            font-size: 1.2rem;
          }

          .section-title {
            font-size: 1.5rem;
          }

          .about-grid {
            grid-template-columns: 1fr;
          }

          .timeline-item {
            gap: 1.5rem;
          }

          .social-links {
            gap: 1rem;
          }

          .social-link {
            width: 40px;
            height: 40px;
          }
        }
      `}</style>

      <div className="animated-bg">
        <div className="wave"></div>
        <div className="wave wave2"></div>
        <div className="wave wave3"></div>
        <div className="bubble bubble-1"></div>
        <div className="bubble bubble-2"></div>
        <div className="bubble bubble-3"></div>
        <div className="bubble bubble-4"></div>
        <div className="bubble bubble-5"></div>
        <div className="bubble bubble-6"></div>
        <div className="bubble bubble-7"></div>
        <div className="bubble bubble-8"></div>
        <div className="bubble bubble-9"></div>
        <div className="bubble bubble-10"></div>
        <div className="floating-particle particle-1"></div>
        <div className="floating-particle particle-2"></div>
        <div className="floating-particle particle-3"></div>
        <div className="floating-particle particle-4"></div>
      </div>

      <nav className="navbar">
        <div className="nav-container">
          <div className="nav-logo">
            <span className="logo-icon">✦</span>
            <span>Jonaly Joby</span>
          </div>
          <ul className="nav-menu">
            <li>
              <a href="#home" className="nav-link active" onClick={() => navigateToSection("home")}>
                Home
              </a>
            </li>
            <li>
              <a href="#about" className="nav-link" onClick={() => navigateToSection("about")}>
                About
              </a>
            </li>
            <li>
              <a href="#skills" className="nav-link" onClick={() => navigateToSection("skills")}>
                Skills
              </a>
            </li>
            <li>
              <a href="#journal" className="nav-link" onClick={() => navigateToSection("journal")}>
                Journal
              </a>
            </li>
            <li>
              <a href="#contact" className="nav-link" onClick={() => navigateToSection("contact")}>
                Contact
              </a>
            </li>
            <li>
              <button className="theme-toggle" onClick={toggleTheme} aria-label="Toggle theme">
                <svg className="sun-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <circle cx="12" cy="12" r="5"></circle>
                  <line x1="12" y1="1" x2="12" y2="3"></line>
                  <line x1="12" y1="21" x2="12" y2="23"></line>
                  <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
                  <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
                  <line x1="1" y1="12" x2="3" y2="12"></line>
                  <line x1="21" y1="12" x2="23" y2="12"></line>
                  <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
                  <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
                </svg>
                <svg className="moon-icon" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
                </svg>
              </button>
            </li>
          </ul>
        </div>
      </nav>

      <section id="home" className="page-section home-section">
        <div className="home-content">
          <div className="hero-text">
            <h1 className="hero-title">
              Hi, I'm <span className="gradient-text">Jonaly Joby</span>
            </h1>
            <p className="hero-subtitle">Designing with Code, Developing with Vision</p>
            <div className="hero-buttons">
              <button className="btn btn-primary" onClick={() => navigateToSection("skills")}>
                View Skills
              </button>
              <button className="btn btn-secondary" onClick={() => navigateToSection("contact")}>
                Contact Me
              </button>
            </div>
          </div>
          <div className="hero-image">
            <div className="profile-frame wave-border">
              <svg className="wave-animation" viewBox="0 0 200 200" preserveAspectRatio="none">
                <path
                  d="M10,100 Q30,80 50,100 T90,100 T130,100 T170,100 T210,100"
                  fill="none"
                  stroke="url(#waveGradient)"
                  strokeWidth="2"
                  opacity="0.6"
                />
                <path
                  d="M10,110 Q30,95 50,110 T90,110 T130,110 T170,110 T210,110"
                  fill="none"
                  stroke="url(#waveGradient)"
                  strokeWidth="2"
                  opacity="0.4"
                />
                <defs>
                  <linearGradient id="waveGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#71c9ce" />
                    <stop offset="100%" stopColor="#a6e3e9" />
                  </linearGradient>
                </defs>
              </svg>
              <img
                src="/images/img-20251115-235018.jpg"
                alt="Jonaly Joby"
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  objectPosition: "center",
                }}
              />
            </div>
          </div>
        </div>
      </section>

      <section id="about" className="page-section about-section">
        <div style={{ width: "100%" }}>
          <div className="section-header">
            <h2 className="section-title">About Me</h2>
            <div className="title-underline"></div>
          </div>
          <div className="about-content">
            <div className="about-bio">
              <h3 className="about-subtitle">Who I Am</h3>
              <p className="about-text">
                I'm Jonaly Joby, a design-focused web developer and student of computer engineering. For me, development
                is more than just functionality it's an act of creation. I am dedicated to crafting beautiful,
                intuitive, and accessible digital experiences that users love to interact with. My process is rooted in
                a dual passion: the artistry of designing elegant interfaces and the engineering discipline of writing
                clean, scalable code. This unique blend allows me to seamlessly bridge the gap between a stunning visual
                concept and its robust technical implementation. I'm not just building websites; I'm designing and
                engineering cohesive digital solutions.
              </p>
              <p className="about-text highlight-text">
                Currently studying at <strong>Fr. Conceicao Rodrigues College of Engineering.</strong>
              </p>
            </div>

            {/* New styles for About Features */}
            <div className="about-features">
              <div className="feature-card card-glass">
                <h4 className="feature-title">What I Do</h4>
                <p className="feature-text">
                  I transform ideas into elegant, functional websites. As a passionate student, I blend creative design
                  with clean code to build engaging user experiences.
                </p>
              </div>
              <div className="feature-card card-glass">
                <h4 className="feature-title">My Passion</h4>
                <p className="feature-text">
                  I'm passionate about designing intuitive interfaces where creative solutions meet functional code,
                  turning complex challenges into elegant digital experiences.
                </p>
              </div>
            </div>

            <div className="timeline-section">
              <h3 className="timeline-title">My Journey</h3>
              <div className="timeline">
                <div className="timeline-item">
                  <div className="timeline-marker"></div>
                  <div className="timeline-content card-glass">
                    <h4>Education</h4>
                    <p>
                      <strong>Fr. Conceicao Rodrigues College of Engineering</strong>
                    </p>
                    <p className="timeline-date">Ongoing</p>
                  </div>
                </div>
                <div className="timeline-item">
                  <div className="timeline-marker"></div>
                  <div className="timeline-content card-glass">
                    <h4>Web Design Journey</h4>
                    <p>Started exploring design and development with passion for creating beautiful web experiences.</p>
                    <p className="timeline-date">2020 - Present</p>
                  </div>
                </div>
                <div className="timeline-item">
                  <div className="timeline-marker"></div>
                  <div className="timeline-content card-glass">
                    <h4>Interests</h4>
                    <p>UI/UX Design, Modern Web Technologies, Digital Innovation, Creative Problem Solving</p>
                    <p className="timeline-date">Current Focus</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="skills" className="page-section skills-section">
        <div style={{ width: "100%" }}>
          <div className="section-header">
            <h2 className="section-title">Skills & Expertise</h2>
            <div className="title-underline"></div>
          </div>
          <div className="skills-content">
            <div className="skills-grid">
              <div className="skill-category">
                <h3 className="category-title">Frontend</h3>
                {[
                  { name: "HTML", percent: 95 },
                  { name: "CSS", percent: 90 },
                  { name: "JavaScript", percent: 85 },
                ].map((skill) => (
                  <div key={skill.name} className="skill-item">
                    <div className="skill-header">
                      <span className="skill-name">{skill.name}</span>
                      <span className="skill-percent">{skill.percent}%</span>
                    </div>
                    <div className="progress-bar">
                      <div
                        className="progress-fill"
                        style={
                          {
                            "--percent": `${skill.percent}%`,
                          } as React.CSSProperties
                        }
                      ></div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="skill-category">
                <h3 className="category-title">Backend</h3>
                {[
                  { name: "Python", percent: 80 },
                  { name: "Java", percent: 75 },
                  { name: "SQL", percent: 65 },
                ].map((skill) => (
                  <div key={skill.name} className="skill-item">
                    <div className="skill-header">
                      <span className="skill-name">{skill.name}</span>
                      <span className="skill-percent">{skill.percent}%</span>
                    </div>
                    <div className="progress-bar">
                      <div
                        className="progress-fill"
                        style={
                          {
                            "--percent": `${skill.percent}%`,
                          } as React.CSSProperties
                        }
                      ></div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="skill-category">
                <h3 className="category-title">Other</h3>
                {[
                  { name: "C", percent: 70 },
                  { name: "UI/UX Design", percent: 88 },
                  { name: "Problem Solving", percent: 92 },
                ].map((skill) => (
                  <div key={skill.name} className="skill-item">
                    <div className="skill-header">
                      <span className="skill-name">{skill.name}</span>
                      <span className="skill-percent">{skill.percent}%</span>
                    </div>
                    <div className="progress-bar">
                      <div
                        className="progress-fill"
                        style={
                          {
                            "--percent": `${skill.percent}%`,
                          } as React.CSSProperties
                        }
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="journal" className="page-section journal-section">
        <div style={{ width: "100%" }}>
          <div className="section-header">
            <h2 className="section-title">Journal</h2>
            <div className="title-underline"></div>
          </div>
          <div className="journal-content">
            <div className="journal-grid">
              {[
                {
                  badge: "Achievement",
                  icon: "🎨",
                  title: "Design",
                  desc: "This portrait is a dialogue between the internal self and the natural world, using the ephemeral beauty of blossoms to map the landscape of human emotion onto the human form.",
                  meta: "2025",
                  image: "/images/img-20250703-144643.jpg",
                },
                {
                  badge: "Certification",
                  icon: "🌅",
                  title: "Art",
                  desc: "I painted this sunset to capture the fiery moment when day surrenders to the silent promise of night.",
                  meta: "2025",
                  image: "/images/download.jpeg",
                },
                {
                  badge: "Experience",
                  icon: "💼",
                  title: "Internship",
                  desc: "Worked at QARAZIEN SOFTWARE PVT. LTD as an intern for 3 months as web developer.",
                  meta: "2025",
                  image: "/images/certificate-j.jpeg",
                },
                {
                  badge: "Project",
                  icon: "🚀",
                  title: "LoreLink",
                  desc: "Designed a web page for people to have fun with the internet, find their tribe and connect to their fandom.",
                  meta: "2024",
                  image: "/images/lorelink.png",
                  link: "https://v0-lore-link-platform-expansion.vercel.app/",
                },
                {
                  badge: "Event",
                  icon: "🎯",
                  title: "Bit n Build Hackathon",
                  desc: "Participated in the Bit n Build Hackathon organized by gdsc, had lots of fun and learnt many new things.",
                  meta: "2025",
                  image: "/images/brainicas.jpeg",
                },
              ].map((item, idx) => (
                <div key={idx} className="journal-card card-glass card-animate">
                  <div className="card-badge">{item.badge}</div>
                  <div className="card-icon">{item.icon}</div>
                  {item.image && <img src={item.image || "/placeholder.svg"} alt={item.title} className="card-image" />}
                  <h3 className="card-title">{item.title}</h3>
                  <p className="card-description">{item.desc}</p>
                  <div className="card-footer">
                    <span className="card-date">{item.meta}</span>
                    {item.link && (
                      <a
                        href={item.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn btn-small btn-primary"
                      >
                        Check Out
                      </a>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section id="contact" className="page-section contact-section">
        <div style={{ width: "100%" }}>
          <div className="section-header">
            <h2 className="section-title">Get In Touch</h2>
            <div className="title-underline"></div>
          </div>
          <div className="contact-content">
            <div className="contact-form-wrapper">
              <form onSubmit={handleContactSubmit} className="contact-form card-glass">
                <div className="form-group">
                  <label htmlFor="name">Name</label>
                  <input type="text" id="name" name="name" placeholder="Your name" required />
                </div>
                <div className="form-group">
                  <label htmlFor="email">Email</label>
                  <input type="email" id="email" name="email" placeholder="your@email.com" required />
                </div>
                <div className="form-group">
                  <label htmlFor="message">Message</label>
                  <textarea id="message" name="message" rows={5} placeholder="Your message..." required></textarea>
                </div>
                <button type="submit" className="btn btn-primary btn-submit">
                  Send Message
                </button>
              </form>
            </div>

            <div className="contact-info">
              <div className="contact-card card-glass">
                <h3>Connect With Me</h3>
                <div className="social-links">
                  <a
                    href="mailto:jonaly.2023.calibrant@gmail.com"
                    className="social-link"
                    target="_blank"
                    rel="noopener noreferrer"
                    title="Gmail"
                  >
                    <svg viewBox="0 0 24 24" fill="currentColor">
                      <path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" />
                    </svg>
                  </a>
                  <a
                    href="https://github.com/jonzjobz"
                    className="social-link"
                    target="_blank"
                    rel="noopener noreferrer"
                    title="GitHub"
                  >
                    <svg viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                    </svg>
                  </a>
                  <a
                    href="https://www.linkedin.com/in/jonaly-joby"
                    className="social-link"
                    target="_blank"
                    rel="noopener noreferrer"
                    title="LinkedIn"
                  >
                    <svg viewBox="0 0 24 24" fill="currentColor">
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.475-2.236-1.986-2.236-1.081 0-1.722.722-2.004 1.418-.103.249-.129.597-.129.946v5.441h-3.554s.047-8.842 0-9.769h3.554v1.383c.43-.664 1.199-1.61 2.92-1.61 2.135 0 3.753 1.395 3.753 4.402v5.594zM5.337 8.855c-1.144 0-1.915-.758-1.915-1.708 0-.955.77-1.708 1.963-1.708 1.192 0 1.915.753 1.938 1.708 0 .95-.746 1.708-1.986 1.708zm1.581 11.597H3.772V9.539h3.146v10.913zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.225 0z" />
                    </svg>
                  </a>
                  <a
                    href="https://www.instagram.com/jonz_joby"
                    className="social-link"
                    target="_blank"
                    rel="noopener noreferrer"
                    title="Instagram"
                  >
                    <svg viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c0 0 0 0 0 0" />
                    </svg>
                  </a>
                </div>
              </div>

              <div className="contact-card card-glass contact-links-card">
                <h3>Direct Links</h3>
                <div className="links-list">
                  <p>
                    <strong>Email:</strong> jonaly.2023.calibrant@gmail.com
                  </p>
                  <p>
                    <strong>GitHub:</strong>{" "}
                    <a href="https://github.com/jonzjobz" target="_blank" rel="noopener noreferrer">
                      https://github.com/jonzjobz
                    </a>
                  </p>
                  <p>
                    <strong>LinkedIn:</strong>{" "}
                    <a href="https://www.linkedin.com/in/jonaly-joby" target="_blank" rel="noopener noreferrer">
                      www.linkedin.com/in/jonaly-joby
                    </a>
                  </p>
                  <p>
                    <strong>Instagram:</strong>{" "}
                    <a href="https://www.instagram.com/jonz_joby" target="_blank" rel="noopener noreferrer">
                      www.instagram.com/jonz_joby
                    </a>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <footer className="footer">
        <div className="footer-content">
          <p>&copy; 2024 Jonaly Joby. All Rights Reserved.</p>
          <p>
            Made with <span className="heart">❤</span> by Jonaly Joby
          </p>
        </div>
      </footer>
    </div>
  )
}
