// Wait for DOM and external libraries to load
document.addEventListener("DOMContentLoaded", () => {
  // Initialize external libraries with error handling
  setTimeout(() => {
    initializeLibraries()
    initializeMobileMenu()
    initializeSmoothScrolling()
    initializeBackToTop()
    initializeContactForm()
    initializeAnimations()
    initializeScrollEffects()
  }, 100)
})

let emailjs
let lucide

function initializeLibraries() {
  // Initialize EmailJS
  if (typeof window.emailjs !== "undefined") {
    emailjs = window.emailjs
    emailjs.init("zVPwf0iB7KetEYc6s")
    console.log("[v0] EmailJS initialized successfully")
  } else {
    console.error("[v0] EmailJS library not loaded")
  }

  // Initialize Lucide icons
  if (typeof window.lucide !== "undefined" && window.lucide.createIcons) {
    lucide = window.lucide
    lucide.createIcons()
    console.log("[v0] Lucide icons initialized successfully")
  } else {
    setTimeout(() => {
      if (typeof window.lucide !== "undefined" && window.lucide.createIcons) {
        lucide = window.lucide
        lucide.createIcons()
        console.log("[v0] Lucide icons initialized successfully (retry)")
      } else {
        console.error("[v0] Lucide library not loaded after retry")
        addSocialLinkFallbacks()
      }
    }, 500)
  }
}

function addSocialLinkFallbacks() {
  const socialLinks = document.querySelectorAll(".social-link")
  socialLinks.forEach((link) => {
    const icon = link.querySelector("i")
    if (icon) {
      const iconType = icon.getAttribute("data-lucide")
      let fallbackText = ""

      switch (iconType) {
        case "github":
          fallbackText = "GitHub"
          break
        case "linkedin":
          fallbackText = "LinkedIn"
          break
        case "mail":
          fallbackText = "Email"
          break
        default:
          fallbackText = iconType
      }

      icon.textContent = fallbackText
      icon.style.fontSize = "14px"
    }
  })
}

function initializeMobileMenu() {
  const mobileMenuBtn = document.getElementById("mobileMenuBtn")
  const mobileMenu = document.getElementById("mobileMenu")

  if (!mobileMenuBtn || !mobileMenu) {
    console.error("[v0] Mobile menu elements not found")
    return
  }

  const menuIcon = mobileMenuBtn.querySelector(".menu-icon")
  const closeIcon = mobileMenuBtn.querySelector(".close-icon")
  let isMenuOpen = false

  mobileMenuBtn.addEventListener("click", () => {
    isMenuOpen = !isMenuOpen

    if (isMenuOpen) {
      mobileMenu.classList.add("active")
      if (menuIcon) menuIcon.classList.add("hidden")
      if (closeIcon) closeIcon.classList.remove("hidden")
    } else {
      mobileMenu.classList.remove("active")
      if (menuIcon) menuIcon.classList.remove("hidden")
      if (closeIcon) closeIcon.classList.add("hidden")
    }
  })

  // Close mobile menu when clicking on links
  const mobileNavLinks = document.querySelectorAll(".nav-link-mobile")
  mobileNavLinks.forEach((link) => {
    link.addEventListener("click", () => {
      isMenuOpen = false
      mobileMenu.classList.remove("active")
      if (menuIcon) menuIcon.classList.remove("hidden")
      if (closeIcon) closeIcon.classList.add("hidden")
    })
  })
}

function initializeSmoothScrolling() {
  const navLinks = document.querySelectorAll('a[href^="#"]')
  navLinks.forEach((link) => {
    link.addEventListener("click", (e) => {
      e.preventDefault()
      const targetId = link.getAttribute("href")
      const targetSection = document.querySelector(targetId)

      if (targetSection) {
        const header = document.querySelector(".header")
        const headerHeight = header ? header.offsetHeight : 0
        const targetPosition = targetSection.offsetTop - headerHeight

        window.scrollTo({
          top: targetPosition,
          behavior: "smooth",
        })
      }
    })
  })
}

function initializeBackToTop() {
  const backToTopBtn = document.getElementById("backToTop")
  if (!backToTopBtn) {
    console.error("[v0] Back to top button not found")
    return
  }

  backToTopBtn.addEventListener("click", () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    })
  })
}

function initializeContactForm() {
  const contactForm = document.getElementById("contactForm")
  const submitBtn = document.getElementById("submitBtn")
  const formStatus = document.getElementById("formStatus")

  if (!contactForm || !submitBtn || !formStatus) {
    console.error("[v0] Contact form elements not found")
    return
  }

  contactForm.addEventListener("submit", async (e) => {
    e.preventDefault()

    // Check if EmailJS is available
    if (typeof emailjs === "undefined") {
      formStatus.textContent = "Email service not available. Please try again later."
      formStatus.className = "form-status error"
      return
    }

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
      console.error("[v0] EmailJS error:", error)

      // Error
      formStatus.textContent = "Failed to send message. Please try again."
      formStatus.className = "form-status error"
    } finally {
      // Reset button
      submitBtn.textContent = "Send Message"
      submitBtn.disabled = false
    }
  })
}

function initializeAnimations() {
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

  // Add fade-in class to sections
  const sections = document.querySelectorAll("section:not(#hero)")
  sections.forEach((section) => {
    section.classList.add("fade-in")
    observer.observe(section)
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
}

function initializeScrollEffects() {
  window.addEventListener("scroll", () => {
    const header = document.querySelector(".header")
    if (header) {
      if (window.scrollY > 100) {
        header.style.background = "rgba(255, 255, 255, 0.95)"
      } else {
        header.style.background = "rgba(255, 255, 255, 0.8)"
      }
    }
  })
}
