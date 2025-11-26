// ========================================
// OCEAN PORTFOLIO - MAIN JAVASCRIPT
// ========================================

// THEME TOGGLE
const themeToggle = document.getElementById("themeToggle")

// Initialize theme from localStorage
const savedTheme = localStorage.getItem("theme") || "light"
if (savedTheme === "dark") {
  document.body.classList.add("dark-mode")
}

if (themeToggle) {
  themeToggle.addEventListener("click", () => {
    document.body.classList.toggle("dark-mode")
    const isNowDark = document.body.classList.contains("dark-mode")
    localStorage.setItem("theme", isNowDark ? "dark" : "light")
  })
}

// MOBILE MENU TOGGLE
const navToggle = document.querySelector(".nav-toggle")
const navMenu = document.getElementById("navMenu")

if (navToggle && navMenu) {
  navToggle.addEventListener("click", () => {
    navMenu.classList.toggle("active")
  })

  // Close menu when link is clicked
  document.querySelectorAll(".nav-link").forEach((link) => {
    link.addEventListener("click", () => {
      navMenu.classList.remove("active")
    })
  })
}

// NAVIGATION & ACTIVE LINK
const navLinks = document.querySelectorAll("[data-section]")

function updateActiveLink() {
  const scrollPosition = window.scrollY

  navLinks.forEach((link) => {
    const section = document.getElementById(link.dataset.section)
    if (section) {
      const sectionTop = section.offsetTop - 100
      const sectionHeight = section.clientHeight

      if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
        navLinks.forEach((l) => l.classList.remove("active"))
        link.classList.add("active")
      }
    }
  })
}

window.addEventListener("scroll", updateActiveLink)

// NAVIGATE TO SECTION
function navigateToSection(sectionId) {
  const section = document.getElementById(sectionId)
  if (section) {
    section.scrollIntoView({ behavior: "smooth" })
  }
}

// SCROLL ANIMATIONS - Trigger animations when elements enter viewport
const observerOptions = {
  threshold: 0.1,
  rootMargin: "0px 0px -50px 0px",
}

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = "1"
      entry.target.style.transform = "translateY(0)"
    }
  })
}, observerOptions)

// Observe skill progress bars for animation
document.querySelectorAll(".progress-fill").forEach((bar) => {
  observer.observe(bar)
  bar.style.opacity = "0"
  bar.style.transform = "translateY(10px)"
  bar.style.transition = "opacity 0.6s ease, transform 0.6s ease"
})

// SKILL PROGRESS ANIMATION
const progressBars = document.querySelectorAll(".progress-fill")

const progressObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const width = entry.target.style.width
        entry.target.style.animation = `fillProgress 1.5s ease forwards`
        progressObserver.unobserve(entry.target)
      }
    })
  },
  { threshold: 0.5 },
)

progressBars.forEach((bar) => {
  progressObserver.observe(bar)
})

// Add keyframe animation for progress bars
const style = document.createElement("style")
style.textContent = `
    @keyframes fillProgress {
        from {
            width: 0 !important;
        }
        to {
            width: var(--target-width);
        }
    }
`
document.head.appendChild(style)

// FORM VALIDATION & SUBMISSION
const contactForm = document.getElementById("contactForm")

if (contactForm) {
  contactForm.addEventListener("submit", (e) => {
    e.preventDefault()

    const name = document.getElementById("name").value.trim()
    const email = document.getElementById("email").value.trim()
    const message = document.getElementById("message").value.trim()

    // Validation
    if (!name || !email || !message) {
      alert("Please fill in all fields")
      return
    }

    if (!isValidEmail(email)) {
      alert("Please enter a valid email address")
      return
    }

    if (message.length < 10) {
      alert("Message must be at least 10 characters long")
      return
    }

    // Success message
    alert("Thank you for your message! I will get back to you soon.")
    contactForm.reset()
  })
}

// Email validation helper
function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

// SMOOTH SCROLL BEHAVIOR for browsers that don't support it natively
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault()
    const target = document.querySelector(this.getAttribute("href"))
    if (target) {
      target.scrollIntoView({ behavior: "smooth" })
    }
  })
})

// PARALLAX EFFECT for bubbles and particles
window.addEventListener("scroll", () => {
  const scrolled = window.pageYOffset
  const bubbles = document.querySelectorAll(".bubble")

  bubbles.forEach((bubble, index) => {
    const speed = 0.5 + index * 0.1
    bubble.style.transform = `translateY(${scrolled * speed}px)`
  })
})

// CONSOLE MESSAGE
console.log(
  "%c🌊 Welcome to Jonaly Joby's Ocean Portfolio 🌊",
  "font-size: 20px; color: #71C9CE; font-weight: bold; text-shadow: 2px 2px 4px rgba(13, 27, 42, 0.5);",
)
console.log(
  "%cDesigned & Developed with elegance and passion ✨",
  "font-size: 14px; color: #A6E3E9; font-style: italic;",
)
