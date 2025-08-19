// Import EmailJS and Lucide icons
const emailjs = window.emailjs
const lucide = window.lucide

// Initialize EmailJS
emailjs.init("zVPwf0iB7KetEYc6s")

// Initialize Lucide icons
lucide.createIcons()

// Mobile menu functionality
const mobileMenuBtn = document.getElementById("mobileMenuBtn")
const mobileMenu = document.getElementById("mobileMenu")
const menuIcon = mobileMenuBtn.querySelector(".menu-icon")
const closeIcon = mobileMenuBtn.querySelector(".close-icon")

let isMenuOpen = false

mobileMenuBtn.addEventListener("click", () => {
  isMenuOpen = !isMenuOpen

  if (isMenuOpen) {
    mobileMenu.classList.add("active")
    menuIcon.classList.add("hidden")
    closeIcon.classList.remove("hidden")
  } else {
    mobileMenu.classList.remove("active")
    menuIcon.classList.remove("hidden")
    closeIcon.classList.add("hidden")
  }
})

// Close mobile menu when clicking on links
const mobileNavLinks = document.querySelectorAll(".nav-link-mobile")
mobileNavLinks.forEach((link) => {
  link.addEventListener("click", () => {
    isMenuOpen = false
    mobileMenu.classList.remove("active")
    menuIcon.classList.remove("hidden")
    closeIcon.classList.add("hidden")
  })
})

// Smooth scrolling for navigation links
const navLinks = document.querySelectorAll('a[href^="#"]')
navLinks.forEach((link) => {
  link.addEventListener("click", (e) => {
    e.preventDefault()
    const targetId = link.getAttribute("href")
    const targetSection = document.querySelector(targetId)

    if (targetSection) {
      const headerHeight = document.querySelector(".header").offsetHeight
      const targetPosition = targetSection.offsetTop - headerHeight

      window.scrollTo({
        top: targetPosition,
        behavior: "smooth",
      })
    }
  })
})

// Back to top functionality
const backToTopBtn = document.getElementById("backToTop")
backToTopBtn.addEventListener("click", () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  })
})

// Contact form functionality
const contactForm = document.getElementById("contactForm")
const submitBtn = document.getElementById("submitBtn")
const formStatus = document.getElementById("formStatus")

contactForm.addEventListener("submit", async (e) => {
  e.preventDefault()

  // Update button and status
  submitBtn.textContent = "Sending..."
  submitBtn.disabled = true
  formStatus.textContent = "Sending..."
  formStatus.className = "form-status sending"

  // Get form data
  const formData = new FormData(contactForm)
  const templateParams = {
    from_name: formData.get("name"),
    reply_to: formData.get("email"),
    message: formData.get("message"),
  }

  try {
    await emailjs.send("service_sczdk2c", "template_a0i60e8", templateParams)

    // Success
    formStatus.textContent = "Message sent successfully!"
    formStatus.className = "form-status success"
    contactForm.reset()
  } catch (error) {
    console.error("EmailJS error:", error)

    // Error
    formStatus.textContent = "Failed to send message. Please try again."
    formStatus.className = "form-status error"
  } finally {
    // Reset button
    submitBtn.textContent = "Send Message"
    submitBtn.disabled = false
  }
})

// Intersection Observer for animations
const observerOptions = {
  threshold: 0.1,
  rootMargin: "0px 0px -50px 0px",
}

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible")
    }
  })
}, observerOptions)

// Observe elements for animation
const animateElements = document.querySelectorAll(".fade-in")
animateElements.forEach((el) => observer.observe(el))

// Add fade-in class to sections
document.addEventListener("DOMContentLoaded", () => {
  const sections = document.querySelectorAll("section:not(#hero)")
  sections.forEach((section) => {
    section.classList.add("fade-in")
  })

  // Add stagger animation to skills and project cards
  const skillTags = document.querySelectorAll(".skill-tag")
  const projectCards = document.querySelectorAll(".project-card")
  const educationItems = document.querySelectorAll(".education-item")
  ;[...skillTags, ...projectCards, ...educationItems].forEach((item, index) => {
    item.classList.add("stagger-item")
    item.style.transitionDelay = `${index * 0.1}s`
  })

  // Observe stagger items
  const staggerObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible")
      }
    })
  }, observerOptions)

  document.querySelectorAll(".stagger-item").forEach((el) => {
    staggerObserver.observe(el)
  })
})

// Header background on scroll
window.addEventListener("scroll", () => {
  const header = document.querySelector(".header")
  if (window.scrollY > 100) {
    header.style.background = "rgba(255, 255, 255, 0.95)"
  } else {
    header.style.background = "rgba(255, 255, 255, 0.8)"
  }
})

// Add images to public folder
