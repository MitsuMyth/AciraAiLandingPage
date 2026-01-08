import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence, useScroll, useTransform, useSpring } from 'framer-motion'
import { AnimatedCounter } from './AnimatedCounter'
import './AciraLanding.css'

// ============================================
// WAITLIST API
// ============================================
const COUNTER_API_BASE = 'https://countapi.mileshilliard.com/api/v1'
const COUNTER_KEY = 'acira-ai-waitlist-counter'

// ============================================
// DATA
// ============================================
// Official brand logos with colors
const integrations = [
  {
    name: 'Zoom',
    icon: <svg viewBox="0 0 24 24" fill="none"><rect width="24" height="24" rx="4" fill="#2D8CFF"/><path d="M5 8.5v5a1.5 1.5 0 001.5 1.5h7a1.5 1.5 0 001.5-1.5v-5a1.5 1.5 0 00-1.5-1.5h-7A1.5 1.5 0 005 8.5z" fill="#fff"/><path d="M15 10l4-2v8l-4-2v-4z" fill="#fff"/></svg>
  },
  {
    name: 'Teams',
    icon: <svg viewBox="0 0 24 24" fill="none"><path d="M20.625 6.547h-5.11v8.828h5.422a.937.937 0 00.938-.937V7.797a1.25 1.25 0 00-1.25-1.25z" fill="#5059C9"/><circle cx="18.75" cy="4.219" r="1.875" fill="#5059C9"/><path d="M14.063 6.547H5.938a1.25 1.25 0 00-1.25 1.25v7.187a4.064 4.064 0 004.062 4.063h2.5a4.064 4.064 0 004.063-4.063V7.797a1.25 1.25 0 00-1.25-1.25z" fill="#7B83EB"/><circle cx="10" cy="4.219" r="2.5" fill="#7B83EB"/></svg>
  },
  {
    name: 'Google Meet',
    icon: <svg viewBox="0 0 24 24" fill="none"><path d="M14.5 10.25v3.5l4 3V7.25l-4 3z" fill="#00832D"/><path d="M5.5 6.5h6a2 2 0 012 2v7a2 2 0 01-2 2h-6a2 2 0 01-2-2v-7a2 2 0 012-2z" fill="#00AC47"/><path d="M14.5 10.25l4-3v2.25l-4 2.5v-1.75z" fill="#FFBC00"/><path d="M14.5 13.75v-1.75l4 2.5v2.25l-4-3z" fill="#0066DA"/><path d="M5.5 6.5h6a2 2 0 012 2v.5l-8 5.5V8.5a2 2 0 012-2z" fill="#00832D"/></svg>
  },
  {
    name: 'Discord',
    icon: <svg viewBox="0 0 24 24" fill="none"><rect width="24" height="24" rx="4" fill="#5865F2"/><path d="M17.23 7.15a12.27 12.27 0 00-3.02-.93.05.05 0 00-.05.02c-.13.23-.27.53-.37.77a11.36 11.36 0 00-3.58 0 8.2 8.2 0 00-.38-.77.05.05 0 00-.05-.02c-1.05.18-2.07.49-3.02.93a.04.04 0 00-.02.02C4.26 10.52 3.71 13.79 3.98 17.02c0 .01.01.03.02.04a12.3 12.3 0 003.7 1.87.05.05 0 00.05-.02c.29-.39.54-.8.76-1.23a.05.05 0 00-.03-.07 8.1 8.1 0 01-1.16-.55.05.05 0 010-.08c.08-.06.16-.12.23-.18a.05.05 0 01.05-.01c2.43 1.1 5.06 1.1 7.46 0a.05.05 0 01.05.01c.08.06.15.12.24.18a.05.05 0 01-.01.08c-.37.22-.76.4-1.16.55a.05.05 0 00-.02.07c.22.43.48.84.76 1.23a.05.05 0 00.05.02 12.26 12.26 0 003.7-1.87.05.05 0 00.02-.04c.32-3.33-.54-6.23-2.28-8.79a.04.04 0 00-.02-.02zM9.32 14.87c-.76 0-1.39-.7-1.39-1.56s.61-1.56 1.39-1.56c.78 0 1.4.7 1.38 1.56 0 .86-.61 1.56-1.38 1.56zm5.37 0c-.76 0-1.38-.7-1.38-1.56s.61-1.56 1.38-1.56c.79 0 1.4.7 1.39 1.56 0 .86-.6 1.56-1.39 1.56z" fill="#fff"/></svg>
  },
  {
    name: 'Slack',
    icon: <svg viewBox="0 0 24 24" fill="none"><path d="M6.77 14.33a1.79 1.79 0 11-1.79-1.79h1.79v1.79zm.9 0a1.79 1.79 0 113.57 0v4.47a1.79 1.79 0 11-3.58 0v-4.47z" fill="#E01E5A"/><path d="M9.67 6.77a1.79 1.79 0 111.79-1.79v1.79H9.67zm0 .9a1.79 1.79 0 110 3.57H5.2a1.79 1.79 0 110-3.58h4.47z" fill="#36C5F0"/><path d="M17.23 9.67a1.79 1.79 0 111.79 1.79h-1.79V9.67zm-.9 0a1.79 1.79 0 11-3.57 0V5.2a1.79 1.79 0 113.58 0v4.47z" fill="#2EB67D"/><path d="M14.33 17.23a1.79 1.79 0 11-1.79 1.79v-1.79h1.79zm0-.9a1.79 1.79 0 110-3.57h4.47a1.79 1.79 0 110 3.58h-4.47z" fill="#ECB22E"/></svg>
  },
  {
    name: 'Skype',
    icon: <svg viewBox="0 0 24 24" fill="none"><path d="M20.17 14.2a8.64 8.64 0 00.2-1.87 8.33 8.33 0 00-8.7-7.93 8.6 8.6 0 00-1.5.13 4.93 4.93 0 00-6.64 6.27 8.64 8.64 0 00-.2 1.87 8.33 8.33 0 008.7 7.93c.51 0 1.01-.04 1.5-.13a4.93 4.93 0 006.64-6.27z" fill="#00AFF0"/><path d="M15.4 14.62c-.18.47-.47.88-.84 1.2-.38.33-.85.58-1.4.75-.55.17-1.19.26-1.9.26-.85 0-1.57-.11-2.16-.33a4.1 4.1 0 01-1.5-.92 2.63 2.63 0 01-.73-1.1 1.04 1.04 0 01.27-.77c.2-.21.47-.32.81-.32.28 0 .51.08.7.23.18.15.34.37.48.66.16.34.34.62.53.85.19.22.44.4.75.54.31.14.73.21 1.25.21.52 0 .97-.1 1.35-.3.37-.2.56-.49.56-.86 0-.3-.1-.54-.29-.72-.2-.18-.47-.33-.8-.44-.34-.11-.79-.23-1.35-.35-.74-.16-1.37-.36-1.89-.6a2.87 2.87 0 01-1.17-.9c-.28-.38-.42-.86-.42-1.43 0-.54.15-1.02.46-1.43.31-.41.75-.73 1.33-.95a5.6 5.6 0 012.02-.33c.62 0 1.16.07 1.63.2.47.14.87.32 1.18.55.32.23.55.48.7.75.16.27.24.54.24.82 0 .28-.1.53-.3.75-.21.22-.47.33-.78.33-.27 0-.48-.06-.64-.19-.15-.13-.31-.33-.5-.6a2.33 2.33 0 00-.65-.73c-.24-.17-.6-.25-1.09-.25-.45 0-.83.08-1.13.25-.3.17-.45.38-.45.62 0 .16.05.3.14.42.1.12.23.22.4.32.17.1.36.17.55.23.2.06.5.14.9.24.52.11 1 .24 1.43.39.44.15.82.33 1.14.56.33.22.58.5.77.85.18.34.27.76.27 1.26 0 .58-.15 1.1-.45 1.57z" fill="#fff"/></svg>
  },
  {
    name: 'WebEx',
    icon: <svg viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="10" fill="#00B140"/><path d="M12 6.5a5.5 5.5 0 100 11 5.5 5.5 0 000-11zm0 9.5a4 4 0 110-8 4 4 0 010 8z" fill="#fff"/><circle cx="12" cy="12" r="2" fill="#fff"/></svg>
  },
  {
    name: 'FaceTime',
    icon: <svg viewBox="0 0 24 24" fill="none"><rect width="24" height="24" rx="5" fill="#34C759"/><path d="M6 8.5v7a1 1 0 001 1h7a1 1 0 001-1v-7a1 1 0 00-1-1H7a1 1 0 00-1 1z" fill="#fff"/><path d="M15 10.5l3.5-2v7l-3.5-2v-3z" fill="#fff"/></svg>
  },
]

const problems = [
  ['Why is my mic not working?', 'How do I fix my camera?', "Why can't people hear me?", 'My headphones aren\'t detected', 'Audio is playing from wrong speaker'],
  ['My audio is crackling', 'Why is my video lagging?', "Speakers aren't detected", 'Echo in my calls', 'Screen share has no audio'],
  ["Zoom can't find my camera", 'Audio keeps cutting out', 'Wrong device selected', 'Permissions are confusing', 'Volume too low']
]

const faqs = [
  { id: 1, question: 'What does Acira actually do?', answer: 'Acira fixes computer problems for you. You describe the issue in plain language, and Acira analyzes your system and applies the fix automatically. Today, it focuses on audio and video problems.' },
  { id: 2, question: 'Is Acira just giving instructions, or does it actually fix things?', answer: 'Acira actually fixes things. It runs a local agent on your computer that applies changes for you instead of telling you what to click or try.' },
  { id: 3, question: 'What kinds of problems does Acira support today?', answer: 'Acira currently supports audio and video issues such as microphones, cameras, device routing, and permissions across apps and the system. Broader system fixes are coming next.' },
  { id: 4, question: 'Is Acira like a chatbot or Copilot?', answer: 'No. Acira is not a general chat assistant. It analyzes real system and application data, finds the root cause of the problem, and applies the fix automatically through a local agent.' },
  { id: 5, question: 'Does Acira run on my computer or in the cloud?', answer: 'Both. Acira uses cloud-based analysis to understand the problem and a local agent on your computer to apply the fix safely.' },
  { id: 6, question: 'Is it safe to let Acira change my system settings?', answer: 'Yes. Acira only applies targeted fixes related to the problem you describe. For sensitive or critical changes, Acira will ask before proceeding.' },
  { id: 7, question: 'What about privacy and my data?', answer: 'Acira only collects the data needed to diagnose and fix the problem you describe. It does not access personal files, messages, or unrelated apps.' },
  { id: 8, question: 'Which platforms does Acira support?', answer: 'Acira currently supports Windows. Support for additional platforms is planned.' },
]

// ============================================
// FRAMER-STYLE ANIMATION CONFIGS - Elegant & Slow
// ============================================
// Smooth, elegant easing for professional feel
const elegantEase = [0.25, 0.1, 0.25, 1]
const smoothEase = [0.43, 0.13, 0.23, 0.96]

// Spring configs - slower and more refined
const springConfig = { type: "spring", stiffness: 120, damping: 25 }
const springBouncy = { type: "spring", stiffness: 100, damping: 18 }
const springSmooth = { type: "spring", stiffness: 50, damping: 15 }
const springElegant = { type: "spring", stiffness: 60, damping: 20 }

// Smooth, professional fade-in animation for hero elements
const fadeInUp = {
  initial: { opacity: 0, y: 40 },
  animate: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 1.2,
      ease: smoothEase
    }
  }
}

// Stagger container for sequential reveals - slower stagger
const staggerContainer = {
  initial: {},
  animate: {
    transition: {
      staggerChildren: 0.18,
      delayChildren: 0.3
    }
  }
}

// Elegant transition preset for whileInView elements
const elegantTransition = {
  duration: 0.8,
  ease: smoothEase
}

// ============================================
// COMPONENTS
// ============================================

// Framer-style rotating text with elegant, slow animation
const RotatingText = ({ words }) => {
  const [index, setIndex] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % words.length)
    }, 4500) // Elegant slower rotation
    return () => clearInterval(interval)
  }, [words.length])

  return (
    <span className="acira-rotating-wrapper">
      <AnimatePresence mode="wait">
        <motion.span
          key={index}
          initial={{ y: 25, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -25, opacity: 0 }}
          transition={{
            duration: 0.9,
            ease: smoothEase
          }}
          className="acira-rotating-word"
        >
          {words[index]}
        </motion.span>
      </AnimatePresence>
    </span>
  )
}

// Magnetic button effect (Framer-style) - Elegant version
const MagneticButton = ({ children, className, onClick, ...props }) => {
  const ref = useRef(null)
  const [position, setPosition] = useState({ x: 0, y: 0 })

  const handleMouse = (e) => {
    if (!ref.current) return
    const { clientX, clientY } = e
    const { left, top, width, height } = ref.current.getBoundingClientRect()
    const x = (clientX - left - width / 2) * 0.12
    const y = (clientY - top - height / 2) * 0.12
    setPosition({ x, y })
  }

  const handleMouseLeave = () => {
    setPosition({ x: 0, y: 0 })
  }

  const springX = useSpring(position.x, springElegant)
  const springY = useSpring(position.y, springElegant)

  return (
    <motion.button
      ref={ref}
      className={className}
      onClick={onClick}
      onMouseMove={handleMouse}
      onMouseLeave={handleMouseLeave}
      style={{ x: springX, y: springY }}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      transition={{ duration: 0.4, ease: smoothEase }}
      {...props}
    >
      {children}
    </motion.button>
  )
}

// Scroll Progress Indicator
const ScrollProgress = () => {
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 })

  return (
    <motion.div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        height: '2px',
        background: 'linear-gradient(90deg, #0D52FF, #00D4FF)',
        transformOrigin: '0%',
        scaleX,
        zIndex: 1000
      }}
    />
  )
}

// ============================================
// MAIN COMPONENT
// ============================================
function AciraLanding({ onJoinWaitlist, onNavigateToWhyDetail, scrollTarget }) {
  const [isScrolled, setIsScrolled] = useState(false)
  const [navVisible, setNavVisible] = useState(true)
  const lastScrollY = useRef(0)
  const [activeNav, setActiveNav] = useState('')
  const [openFaq, setOpenFaq] = useState(null)
  const [isDarkMode, setIsDarkMode] = useState(() => {
    // Check localStorage first
    const saved = localStorage.getItem('acira-theme')
    if (saved !== null) {
      return saved === 'dark'
    }
    // Fall back to device preference
    return window.matchMedia('(prefers-color-scheme: dark)').matches
  })
  const [contactForm, setContactForm] = useState({ name: '', email: '', message: '' })
  const [contactSubmitted, setContactSubmitted] = useState(false)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [waitlistCount, setWaitlistCount] = useState(0)
  const [isLoadingCount, setIsLoadingCount] = useState(true)
  const [pageKey, setPageKey] = useState(0) // For re-triggering animations on tab return
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const featuresRef = useRef(null)
  const faqRef = useRef(null)
  const contactRef = useRef(null)
  const heroRef = useRef(null)
  const whyRef = useRef(null)
  const laptopSectionRef = useRef(null)

  // Parallax for hero
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"]
  })
  const heroY = useTransform(scrollYProgress, [0, 1], [0, 150])
  const heroOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0])

  // Scroll-based laptop tilt animation
  const { scrollYProgress: laptopScrollProgress } = useScroll({
    target: laptopSectionRef,
    offset: ["start 0.95", "center center"]
  })
  const laptopRotateX = useTransform(laptopScrollProgress, [0, 1], [20, 0])
  const laptopScale = useTransform(laptopScrollProgress, [0, 1], [0.92, 1])
  const laptopY = useTransform(laptopScrollProgress, [0, 1], [20, 0])
  const laptopOpacity = useTransform(laptopScrollProgress, [0, 1], [0.9, 1])

  // Track mouse for gradient effect
  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
    }
    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  // Save scroll position on scroll (for page refresh restoration)
  useEffect(() => {
    const saveScrollPosition = () => {
      sessionStorage.setItem('acira-scroll-position', window.scrollY.toString())
    }

    // Debounce scroll save
    let timeout
    const handleScroll = () => {
      clearTimeout(timeout)
      timeout = setTimeout(saveScrollPosition, 100)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => {
      window.removeEventListener('scroll', handleScroll)
      clearTimeout(timeout)
    }
  }, [])

  // Scroll to section on mount (e.g., when returning from detail page or via hash)
  useEffect(() => {
    const scrollToTarget = (target) => {
      const refs = {
        'why-acira': whyRef,
        'about': whyRef,
        'why-us': whyRef,
        'features': featuresRef,
        'faq': faqRef,
        'contact': contactRef
      }
      const ref = refs[target]
      if (ref?.current) {
        setTimeout(() => {
          ref.current.scrollIntoView({ behavior: 'smooth', block: 'start' })
        }, 100)
      }
    }

    // Handle scrollTarget prop (from navigation - takes priority)
    if (scrollTarget) {
      // Clear saved position since we're navigating to a specific section
      sessionStorage.removeItem('acira-scroll-position')
      scrollToTarget(scrollTarget)
    }
    // On page load/refresh, restore saved scroll position
    else {
      const savedPosition = sessionStorage.getItem('acira-scroll-position')
      if (savedPosition) {
        // Use instant scroll to avoid jarring animation on refresh
        setTimeout(() => {
          window.scrollTo(0, parseInt(savedPosition, 10))
        }, 50)
      }
    }
  }, [scrollTarget])

  // Fetch waitlist count from API
  useEffect(() => {
    const fetchWaitlistCount = async () => {
      try {
        const response = await fetch(`${COUNTER_API_BASE}/get/${COUNTER_KEY}`)
        const data = await response.json()
        if (data.value !== undefined) {
          setWaitlistCount(parseInt(data.value, 10) || 0)
        }
        setIsLoadingCount(false)
      } catch (error) {
        console.error('Failed to fetch waitlist count:', error)
        setWaitlistCount(0)
        setIsLoadingCount(false)
      }
    }
    fetchWaitlistCount()
    const interval = setInterval(fetchWaitlistCount, 30000)
    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY

      // Determine scroll direction
      if (currentScrollY > lastScrollY.current && currentScrollY > 100) {
        // Scrolling down & past threshold - hide nav
        setNavVisible(false)
      } else {
        // Scrolling up or at top - show nav
        setNavVisible(true)
      }

      lastScrollY.current = currentScrollY
      setIsScrolled(currentScrollY > 20)

      const sections = [
        { id: 'features', ref: featuresRef },
        { id: 'faq', ref: faqRef },
        { id: 'contact', ref: contactRef }
      ]
      for (const section of sections) {
        if (section.ref.current) {
          const rect = section.ref.current.getBoundingClientRect()
          if (rect.top <= 100 && rect.bottom >= 100) {
            setActiveNav(section.id)
            break
          }
        }
      }
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Page visibility - trigger elegant re-entry animation when returning to tab
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.visibilityState === 'visible') {
        // Increment key to trigger re-animation
        setPageKey(prev => prev + 1)
      }
    }
    document.addEventListener('visibilitychange', handleVisibilityChange)
    return () => document.removeEventListener('visibilitychange', handleVisibilityChange)
  }, [])

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark-mode')
    } else {
      document.documentElement.classList.remove('dark-mode')
    }
    // Save preference to localStorage
    localStorage.setItem('acira-theme', isDarkMode ? 'dark' : 'light')
  }, [isDarkMode])

  const scrollToSection = (ref, sectionId) => {
    if (sectionId) {
      window.history.pushState({ page: 'landing', section: sectionId }, '', `#${sectionId}`)
    }
    ref.current?.scrollIntoView({ behavior: 'smooth' })
  }
  const scrollToTop = () => {
    window.history.pushState({ page: 'landing' }, '', window.location.pathname)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const handleContactSubmit = (e) => {
    e.preventDefault()
    setContactSubmitted(true)
    setTimeout(() => {
      setContactSubmitted(false)
      setContactForm({ name: '', email: '', message: '' })
    }, 3000)
  }

  return (
    <div className="acira-page">
      {/* Scroll Progress Indicator */}
      <ScrollProgress />

      {/* Cursor gradient follow effect */}
      <div
        className="acira-cursor-gradient"
        style={{
          background: isDarkMode
            ? `radial-gradient(900px circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(13, 82, 255, 0.045) 0%, transparent 70%)`
            : `radial-gradient(1000px circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(13, 82, 255, 0.12) 0%, rgba(0, 180, 216, 0.06) 30%, rgba(0, 180, 216, 0.025) 50%, transparent 70%)`
        }}
      />

      {/* ========== 1. NAVBAR - Professional Framer-Level ========== */}
      <motion.nav
        className={`acira-nav ${isScrolled ? 'scrolled' : ''} ${!navVisible ? 'nav-hidden' : ''}`}
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: navVisible ? 0 : -100, opacity: navVisible ? 1 : 0 }}
        transition={{ duration: 0.4, ease: smoothEase }}
      >
        <div className="acira-nav-wrapper">
          <div className="acira-nav-inner">
            {/* Logo */}
            <motion.a
              href="#"
              className="acira-logo"
              onClick={(e) => { e.preventDefault(); scrollToTop(); }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              transition={{ duration: 0.3, ease: smoothEase }}
            >
              <div className="acira-logo-mark">
                <img src="/logo.svg" alt="" className="acira-logo-icon" />
              </div>
              <span className="acira-logo-text">Acira</span>
            </motion.a>

            {/* Center Navigation */}
            <div className="acira-nav-center">
              <div className="acira-nav-links">
                {[
                  { id: 'features', label: 'Features', ref: featuresRef },
                  { id: 'why-us', label: 'Why Us', ref: whyRef },
                  { id: 'faq', label: 'FAQ', ref: faqRef },
                  { id: 'contact', label: 'Contact', ref: contactRef }
                ].map((item) => (
                  <motion.a
                    key={item.id}
                    href={`#${item.id}`}
                    className="acira-nav-link"
                    onClick={(e) => {
                      e.preventDefault();
                      scrollToSection(item.ref, item.id);
                    }}
                  >
                    <span className="acira-nav-link-text">{item.label}</span>
                    <span className="acira-nav-link-indicator" />
                  </motion.a>
                ))}
              </div>
            </div>

            {/* Actions */}
            <div className="acira-nav-actions">
              {/* Desktop theme toggle - hidden on mobile */}
              <motion.button
                className="acira-theme-toggle acira-desktop-only"
                onClick={() => setIsDarkMode(!isDarkMode)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                transition={{ duration: 0.3, ease: smoothEase }}
                aria-label={isDarkMode ? 'Switch to light mode' : 'Switch to dark mode'}
              >
                <AnimatePresence mode="wait">
                  {isDarkMode ? (
                    <motion.svg
                      key="sun"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      initial={{ rotate: -90, opacity: 0 }}
                      animate={{ rotate: 0, opacity: 1 }}
                      exit={{ rotate: 90, opacity: 0 }}
                      transition={{ duration: 0.3, ease: smoothEase }}
                    >
                      <circle cx="12" cy="12" r="4"/>
                      <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41"/>
                    </motion.svg>
                  ) : (
                    <motion.svg
                      key="moon"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      initial={{ rotate: 90, opacity: 0 }}
                      animate={{ rotate: 0, opacity: 1 }}
                      exit={{ rotate: -90, opacity: 0 }}
                      transition={{ duration: 0.3, ease: smoothEase }}
                    >
                      <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
                    </motion.svg>
                  )}
                </AnimatePresence>
              </motion.button>

              {/* Desktop CTA - hidden on mobile */}
              <motion.button
                className="acira-nav-cta acira-desktop-only"
                onClick={onJoinWaitlist}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                transition={{ duration: 0.25, ease: smoothEase }}
              >
                <span>Get Early Access</span>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M5 12h14M12 5l7 7-7 7"/>
                </svg>
              </motion.button>

              {/* Mobile hamburger menu button */}
              <motion.button
                className={`acira-mobile-menu-btn ${mobileMenuOpen ? 'open' : ''}`}
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                whileTap={{ scale: 0.95 }}
                aria-label="Toggle menu"
              >
                <div className="acira-hamburger">
                  <span></span>
                  <span></span>
                  <span></span>
                </div>
              </motion.button>
            </div>
          </div>
        </div>
      </motion.nav>

      {/* ========== MOBILE MENU ========== */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <>
            {/* Overlay */}
            <motion.div
              className="acira-mobile-menu-overlay"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.15 }}
              onClick={() => setMobileMenuOpen(false)}
            />

            {/* Menu Panel */}
            <motion.div
              className="acira-mobile-menu"
              initial={{ opacity: 0, scale: 0.95, y: -10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: -10 }}
              transition={{ duration: 0.15, ease: [0.4, 0, 0.2, 1] }}
            >
              <div className="acira-mobile-menu-links">
                {[
                  { id: 'features', label: 'Features', ref: featuresRef },
                  { id: 'why-us', label: 'Why Us', ref: whyRef },
                  { id: 'faq', label: 'FAQ', ref: faqRef },
                  { id: 'contact', label: 'Contact', ref: contactRef }
                ].map((item) => (
                  <motion.button
                    key={item.id}
                    className="acira-mobile-menu-link"
                    onClick={() => {
                      scrollToSection(item.ref, item.id);
                      setMobileMenuOpen(false);
                    }}
                    whileHover={{ x: 4 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    {item.label}
                  </motion.button>
                ))}
              </div>

              <div className="acira-mobile-menu-divider" />

              <div className="acira-mobile-menu-footer">
                {/* Theme Toggle */}
                <button
                  className="acira-mobile-theme-toggle"
                  onClick={() => setIsDarkMode(!isDarkMode)}
                >
                  <span>{isDarkMode ? 'Light Mode' : 'Dark Mode'}</span>
                  {isDarkMode ? (
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                      <circle cx="12" cy="12" r="4"/>
                      <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41"/>
                    </svg>
                  ) : (
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                      <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
                    </svg>
                  )}
                </button>

                {/* CTA Button */}
                <motion.button
                  className="acira-mobile-cta"
                  onClick={() => {
                    onJoinWaitlist();
                    setMobileMenuOpen(false);
                  }}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <span>Get Early Access</span>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M5 12h14M12 5l7 7-7 7"/>
                  </svg>
                </motion.button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* ========== 2. HERO ========== */}
      <section className="acira-hero" ref={heroRef}>
        <motion.div
          className="acira-container acira-hero-grid"
          style={{ y: heroY, opacity: heroOpacity }}
        >
          <motion.div
            className="acira-hero-content"
            initial="initial"
            animate="animate"
            variants={staggerContainer}
          >
            <motion.div
              className="acira-hero-badge"
              variants={fadeInUp}
              whileHover={{ scale: 1.05, y: -2 }}
              transition={springBouncy}
            >
              <span className="acira-badge-dot"></span>
              <span>Limited Early Access</span>
            </motion.div>

            <motion.h1 className="acira-hero-title" variants={fadeInUp}>
              Your computer fixes itself.{' '}
              <RotatingText words={['Automatically.', 'Instantly.', 'Intelligently.']} />
            </motion.h1>

            <motion.p className="acira-hero-description" variants={fadeInUp}>
              Describe your problem in plain language. Acira analyzes your system across apps
              and applies the fix automatically. No searching, no troubleshooting.
            </motion.p>

            <motion.div className="acira-hero-cta" variants={fadeInUp}>
              <MagneticButton className="acira-btn-primary" onClick={onJoinWaitlist}>
                <span>Join Waitlist</span>
                <motion.svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  initial={{ x: 0 }}
                  whileHover={{ x: 4 }}
                  transition={{ duration: 0.4, ease: smoothEase }}
                >
                  <path d="M5 12h14M12 5l7 7-7 7"/>
                </motion.svg>
              </MagneticButton>
            </motion.div>

            <motion.div className="acira-hero-stats" variants={fadeInUp}>
              <div className="acira-stat">
                <span className="acira-stat-value">
                  {isLoadingCount ? (
                    <span className="acira-loading">...</span>
                  ) : (
                    <AnimatedCounter value={waitlistCount} suffix="+" />
                  )}
                </span>
                <span className="acira-stat-label">Professionals waiting</span>
              </div>
            </motion.div>
          </motion.div>
        </motion.div>
      </section>

      {/* ========== SCROLL-ANIMATED LAPTOP SECTION ========== */}
      <section className="acira-laptop-showcase" ref={laptopSectionRef}>
        <div className="acira-laptop-showcase-inner">
          <motion.div
            className="acira-showcase-macbook"
            style={{
              rotateX: laptopRotateX,
              scale: laptopScale,
              y: laptopY,
              opacity: laptopOpacity,
              transformPerspective: 1200,
            }}
          >
            {/* Screen */}
            <div className="acira-showcase-screen">
              <div className="acira-showcase-notch">
                <div className="acira-showcase-camera"></div>
              </div>
              <div className="acira-showcase-display">
                {/* Rotating Problem Text */}
                <div className="acira-demo">
                  <div className="acira-demo-text acira-demo-problem-1">
                    <h3>Microphone not working?</h3>
                  </div>
                  <div className="acira-demo-text acira-demo-problem-2">
                    <h3>Camera won't turn on?</h3>
                  </div>
                  <div className="acira-demo-text acira-demo-problem-3">
                    <h3>WiFi keeps disconnecting?</h3>
                  </div>
                  <div className="acira-demo-text acira-demo-problem-4">
                    <h3>Bluetooth not pairing?</h3>
                  </div>
                  <div className="acira-demo-text acira-demo-solution">
                    <h3>Acira fixes them all.</h3>
                    <p>Automatically.</p>
                  </div>
                  <div className="acira-demo-text acira-demo-final">
                    <h3>Your AI tech assistant.</h3>
                    <p>Always watching. Always fixing.</p>
                  </div>
                </div>
                <div className="acira-showcase-reflection"></div>
              </div>
            </div>

            {/* Base/Keyboard */}
            <div className="acira-showcase-base">
              <div className="acira-showcase-hinge"></div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ========== 3. INTEGRATIONS MARQUEE ========== */}
      <motion.section
        className="acira-integrations"
        key={`integrations-${pageKey}`}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, ease: smoothEase }}
      >
        <motion.p
          className="acira-integrations-label"
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.5 }}
          transition={{ duration: 0.8, ease: smoothEase }}
        >
          Works with your favorite apps
        </motion.p>
        <div className="acira-marquee">
          <motion.div
            className="acira-marquee-track"
            animate={{ x: [0, -1200] }}
            transition={{ duration: 35, repeat: Infinity, ease: "linear" }}
          >
            {[...integrations, ...integrations, ...integrations, ...integrations].map((item, idx) => (
              <div
                key={`${item.name}-${idx}`}
                className="acira-integration-item"
              >
                {item.icon}
                <span>{item.name}</span>
              </div>
            ))}
          </motion.div>
        </div>
      </motion.section>

      {/* ========== 4. PROBLEMS SECTION ========== */}
      <section className="acira-problems">
        <div className="acira-container">
          <motion.div
            className="acira-section-header"
            initial={{ opacity: 0, y: 35 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.3 }}
            transition={{ duration: 0.9, ease: smoothEase }}
          >
            <span className="acira-section-label">The Problem</span>
            <h2 className="acira-section-title">Sound familiar?</h2>
            <p className="acira-section-description">
              Tech problems waste hours of your week. Acira solves them instantly.
            </p>
          </motion.div>
        </div>

        <motion.div
          className="acira-problems-scroll"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: false, amount: 0.2 }}
          transition={{ duration: 0.9, ease: smoothEase }}
        >
          {problems.map((row, rowIdx) => (
            <motion.div
              key={rowIdx}
              className={`acira-problems-track ${rowIdx % 2 === 1 ? 'reverse' : ''}`}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, amount: 0.3 }}
              transition={{ delay: rowIdx * 0.15, duration: 0.8, ease: smoothEase }}
            >
              <motion.div
                className="acira-problems-track-inner"
                animate={{ x: rowIdx % 2 === 0 ? [0, -1000] : [-1000, 0] }}
                transition={{ duration: 25 + rowIdx * 5, repeat: Infinity, ease: "linear" }}
                style={{ display: 'flex', gap: 'var(--acira-space-3)' }}
              >
                {[...row, ...row, ...row].map((problem, idx) => (
                  <motion.div
                    key={idx}
                    className="acira-problem-pill"
                    whileHover={{ scale: 1.04, y: -2 }}
                    transition={{ duration: 0.4, ease: smoothEase }}
                  >
                    <span className="question-mark">?</span>
                    <span>{problem}</span>
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* ========== 5. FEATURES BENTO ========== */}
      <section className="acira-features" ref={featuresRef} id="features">
        <div className="acira-container">
          <motion.div
            className="acira-section-header"
            initial={{ opacity: 0, y: 35 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.3 }}
            transition={{ duration: 0.9, ease: smoothEase }}
          >
            <span className="acira-section-label">Features</span>
            <h2 className="acira-section-title">Everything you need</h2>
            <p className="acira-section-description">
              Powerful diagnostics and automatic fixes, all in one place.
            </p>
          </motion.div>

          <motion.div
            className="acira-bento"
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: false, amount: 0.2 }}
          >
            {/* Main Card */}
            <motion.div
              className="acira-bento-card large"
              variants={fadeInUp}
            >
              <div className="acira-bento-visual">
                {/* MacBook-style Laptop Mockup */}
                <div className="acira-bento-macbook">
                  {/* Screen */}
                  <div className="acira-bento-macbook-screen">
                    <div className="acira-bento-macbook-notch">
                      <div className="acira-bento-macbook-camera"></div>
                    </div>
                    <div className="acira-bento-macbook-display">
                      {/* Dashboard Content */}
                      <div className="acira-bento-dashboard">
                        <div className="acira-bento-dashboard-header">
                          <span className="acira-mock-dot red"></span>
                          <span className="acira-mock-dot yellow"></span>
                          <span className="acira-mock-dot green"></span>
                        </div>
                        <div className="acira-bento-dashboard-stats">
                          <div className="acira-bento-dashboard-stat">
                            <div className="acira-bento-stat-value"><AnimatedCounter value={95} suffix="%" /></div>
                            <div className="acira-bento-stat-label">Success</div>
                          </div>
                          <div className="acira-bento-dashboard-stat">
                            <div className="acira-bento-stat-value"><AnimatedCounter value={847} /></div>
                            <div className="acira-bento-stat-label">Fixed</div>
                          </div>
                        </div>
                        <div className="acira-bento-dashboard-chart">
                          <svg viewBox="0 0 200 40" style={{ width: '100%', height: '100%' }}>
                            <motion.path
                              d="M0,35 Q30,30 50,25 T100,18 T150,12 T200,8"
                              fill="none"
                              stroke="url(#bentoChartGradient)"
                              strokeWidth="2"
                              initial={{ pathLength: 0 }}
                              whileInView={{ pathLength: 1 }}
                              viewport={{ once: false, amount: 0.5 }}
                              transition={{ duration: 1.5, ease: "easeOut" }}
                            />
                            <defs>
                              <linearGradient id="bentoChartGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                                <stop offset="0%" stopColor="#0D52FF" />
                                <stop offset="100%" stopColor="#00D4FF" />
                              </linearGradient>
                            </defs>
                          </svg>
                        </div>
                      </div>
                      <div className="acira-bento-macbook-reflection"></div>
                    </div>
                  </div>
                  {/* Base/Hinge */}
                  <div className="acira-bento-macbook-base">
                    <div className="acira-bento-macbook-hinge"></div>
                  </div>
                </div>
              </div>
              <div className="acira-bento-header">
                <span className="acira-bento-number">01</span>
                <div className="acira-bento-content">
                  <h3 className="acira-bento-title">Real-time Diagnostics</h3>
                  <p className="acira-bento-description">
                    Monitor your system health and get insights into potential issues before they become problems.
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Device Support Card */}
            <motion.div
              className="acira-bento-card"
              variants={fadeInUp}
            >
              <div className="acira-bento-visual">
                <div className="acira-icon-grid">
                  {[
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z"/><path d="M19 10v2a7 7 0 0 1-14 0v-2"/></svg>,
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><polygon points="23 7 16 12 23 17 23 7"/><rect x="1" y="5" width="15" height="14" rx="2"/></svg>,
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M3 18v-6a9 9 0 0 1 18 0v6"/><path d="M21 19a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3z"/><path d="M3 19a2 2 0 0 0 2 2h1a2 2 0 0 0 2-2v-3a2 2 0 0 0-2-2H3z"/></svg>,
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><rect x="2" y="3" width="20" height="14" rx="2"/><path d="M8 21h8M12 17v4"/></svg>
                  ].map((icon, i) => (
                    <motion.div
                      key={i}
                      className="acira-icon-item"
                      initial={{ opacity: 0, y: 10 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: false, amount: 0.5 }}
                      transition={{ delay: i * 0.08, duration: 0.4, ease: smoothEase }}
                    >
                      {icon}
                    </motion.div>
                  ))}
                </div>
              </div>
              <div className="acira-bento-header">
                <span className="acira-bento-number">02</span>
                <div className="acira-bento-content">
                  <h3 className="acira-bento-title">All Devices</h3>
                  <p className="acira-bento-description">
                    Microphones, cameras, speakers, headphones, and displays. All supported.
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Stats Card */}
            <motion.div
              className="acira-bento-card"
              variants={fadeInUp}
            >
              <div className="acira-bento-visual">
                <div className="acira-stats-row">
                  <div className="acira-stat-block">
                    <span className="acira-stat-block-value"><AnimatedCounter value={30} suffix="s" /></span>
                    <span className="acira-stat-block-label">Avg Fix</span>
                  </div>
                  <div className="acira-stat-block">
                    <span className="acira-stat-block-value"><AnimatedCounter value={4} suffix="h+" /></span>
                    <span className="acira-stat-block-label">Saved/Mo</span>
                  </div>
                </div>
              </div>
              <div className="acira-bento-header">
                <span className="acira-bento-number">03</span>
                <div className="acira-bento-content">
                  <h3 className="acira-bento-title">Time Saved</h3>
                  <p className="acira-bento-description">
                    No more hours lost to troubleshooting. Acira works in seconds.
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Flow Card */}
            <motion.div
              className="acira-bento-card large"
              variants={fadeInUp}
            >
              <div className="acira-bento-visual">
                <div className="acira-flow">
                  {['Detect', 'Analyze', 'Resolve'].map((step, i) => (
                    <motion.div
                      key={step}
                      className="acira-flow-step"
                      initial={{ opacity: 0, y: 15 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: false, amount: 0.5 }}
                      transition={{ delay: i * 0.15, duration: 0.5, ease: smoothEase }}
                    >
                      <div className={`acira-flow-icon ${step === 'Resolve' ? 'success' : ''}`}>
                        {step === 'Detect' && <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></svg>}
                        {step === 'Analyze' && <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/></svg>}
                        {step === 'Resolve' && <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>}
                      </div>
                      <span className="acira-flow-label">{step}</span>
                    </motion.div>
                  ))}
                </div>
              </div>
              <div className="acira-bento-header">
                <span className="acira-bento-number">04</span>
                <div className="acira-bento-content">
                  <h3 className="acira-bento-title">Automatic Resolution</h3>
                  <p className="acira-bento-description">
                    From detection to fix, Acira handles everything automatically. Just describe your problem.
                  </p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ========== 6. WHY ACIRA ========== */}
      <section className="acira-why" ref={whyRef}>
        <div className="acira-container">
          <motion.div
            className="acira-section-header"
            initial={{ opacity: 0, y: 35 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.3 }}
            transition={{ duration: 0.9, ease: smoothEase }}
          >
            <span className="acira-section-label">Why Acira</span>
            <h2 className="acira-section-title">What makes us different</h2>
          </motion.div>

          <div className="acira-why-grid">
            {[
              {
                id: 'real-time-fixes',
                img: "https://framerusercontent.com/images/qw5i7oWkaryHAWzlESHgFYJEs.png",
                title: "Real-Time Fixes",
                desc: "Problems resolved instantly, without interrupting your workflow."
              },
              {
                id: 'ai-intelligence',
                img: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=800&q=80",
                title: "AI Intelligence",
                desc: "Machine learning that understands your unique system."
              },
              {
                id: 'privacy-first',
                img: "https://images.unsplash.com/photo-1510915228340-29c85a43dcfe?w=800&q=80",
                title: "Privacy First",
                desc: "Your data stays on your machine. We only collect what's needed."
              }
            ].map((card, i) => (
              <motion.div
                key={card.title}
                className="acira-why-card"
                initial={{ opacity: 0, y: 35 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: false, amount: 0.3 }}
                transition={{ delay: i * 0.15, duration: 0.8, ease: smoothEase }}
              >
                <div className="acira-why-image">
                  <img src={card.img} alt={card.title} />
                </div>
                <div className="acira-why-content">
                  <h3 className="acira-why-title">{card.title}</h3>
                  <p className="acira-why-description">{card.desc}</p>
                  <motion.button
                    className="acira-why-readmore"
                    onClick={() => onNavigateToWhyDetail && onNavigateToWhyDetail(card.id)}
                    whileHover={{ x: 4 }}
                    transition={{ duration: 0.2, ease: smoothEase }}
                  >
                    Read more
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M5 12h14M12 5l7 7-7 7"/>
                    </svg>
                  </motion.button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ========== 7. FAQ ========== */}
      <section className="acira-faq" ref={faqRef} id="faq">
        <div className="acira-container">
          <motion.div
            className="acira-section-header"
            initial={{ opacity: 0, y: 35 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.3 }}
            transition={{ duration: 0.9, ease: smoothEase }}
          >
            <span className="acira-section-label">FAQ</span>
            <h2 className="acira-section-title">Common questions</h2>
          </motion.div>

          <div className="acira-faq-list">
            {faqs.map((faq, i) => (
              <motion.div
                key={faq.id}
                className={`acira-faq-item ${openFaq === faq.id ? 'open' : ''}`}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: false, amount: 0.3 }}
                transition={{ delay: i * 0.08, duration: 0.7, ease: smoothEase }}
              >
                <motion.button
                  className="acira-faq-question"
                  onClick={() => setOpenFaq(openFaq === faq.id ? null : faq.id)}
                  whileHover={{ x: 4 }}
                  transition={{ duration: 0.3, ease: smoothEase }}
                >
                  <span>{faq.question}</span>
                  <motion.svg
                    className="acira-faq-chevron"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    animate={{ rotate: openFaq === faq.id ? 180 : 0 }}
                    transition={{ duration: 0.5, ease: smoothEase }}
                  >
                    <path d="M6 9l6 6 6-6"/>
                  </motion.svg>
                </motion.button>
                <AnimatePresence>
                  {openFaq === faq.id && (
                    <motion.div
                      className="acira-faq-answer"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.5, ease: smoothEase }}
                    >
                      <p>{faq.answer}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ========== 8. CTA ========== */}
      <section className="acira-cta">
        <div className="acira-container">
          <motion.div
            className="acira-cta-card"
            initial={{ opacity: 0, y: 40, scale: 0.96 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: false, amount: 0.3 }}
            transition={{ duration: 1, ease: smoothEase }}
            whileHover={{ scale: 1.01 }}
          >
            <motion.h2
              className="acira-cta-title"
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, amount: 0.5 }}
              transition={{ delay: 0.15, duration: 0.8, ease: smoothEase }}
            >
              Ready to fix your tech problems forever?
            </motion.h2>
            <motion.p
              className="acira-cta-description"
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, amount: 0.5 }}
              transition={{ delay: 0.25, duration: 0.8, ease: smoothEase }}
            >
              Join thousands of professionals on the waitlist for early access.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, amount: 0.5 }}
              transition={{ delay: 0.35, duration: 0.8, ease: smoothEase }}
            >
              <MagneticButton className="acira-btn-primary gradient" onClick={onJoinWaitlist}>
                <span>Get Early Access</span>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M5 12h14M12 5l7 7-7 7"/>
                </svg>
              </MagneticButton>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ========== 9. CONTACT ========== */}
      <section className="acira-contact" ref={contactRef} id="contact">
        <div className="acira-container">
          <div className="acira-contact-grid">
            <motion.div
              className="acira-contact-info"
              initial={{ opacity: 0, x: -35 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: false, amount: 0.3 }}
              transition={{ duration: 0.9, ease: smoothEase }}
            >
              <span className="acira-section-label">Contact</span>
              <h2>Have questions? Let's talk.</h2>
              <p>
                We'd love to hear from you. Whether you have a question about
                features, pricing, or anything else.
              </p>
              <motion.div
                className="acira-contact-email"
                whileHover={{ x: 4 }}
                transition={{ duration: 0.3, ease: smoothEase }}
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="2" y="4" width="20" height="16" rx="2"/>
                  <path d="M22 6l-10 7L2 6"/>
                </svg>
                <span>hello@acira.ai</span>
              </motion.div>
            </motion.div>

            <motion.div
              className="acira-contact-form"
              initial={{ opacity: 0, x: 35 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: false, amount: 0.3 }}
              transition={{ delay: 0.15, duration: 0.9, ease: smoothEase }}
            >
              <AnimatePresence mode="wait">
                {contactSubmitted ? (
                  <motion.div
                    className="acira-form-success"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={springBouncy}
                  >
                    <motion.svg
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: 0.2, ...springBouncy }}
                    >
                      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
                      <polyline points="22 4 12 14.01 9 11.01"/>
                    </motion.svg>
                    <h3>Message sent!</h3>
                    <p>We'll get back to you soon.</p>
                  </motion.div>
                ) : (
                  <motion.form
                    onSubmit={handleContactSubmit}
                    initial={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                  >
                    {['name', 'email', 'message'].map((field, i) => (
                      <motion.div
                        key={field}
                        className="acira-form-group"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: false, amount: 0.3 }}
                        transition={{ delay: i * 0.12, duration: 0.7, ease: smoothEase }}
                      >
                        <label>{field.charAt(0).toUpperCase() + field.slice(1)}</label>
                        {field === 'message' ? (
                          <textarea
                            value={contactForm[field]}
                            onChange={(e) => setContactForm({ ...contactForm, [field]: e.target.value })}
                            placeholder="How can we help?"
                            rows="4"
                            required
                          />
                        ) : (
                          <input
                            type={field === 'email' ? 'email' : 'text'}
                            value={contactForm[field]}
                            onChange={(e) => setContactForm({ ...contactForm, [field]: e.target.value })}
                            placeholder={field === 'name' ? 'Your name' : 'you@example.com'}
                            required
                          />
                        )}
                      </motion.div>
                    ))}
                    <motion.button
                      type="submit"
                      className="acira-form-submit"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      transition={{ duration: 0.4, ease: smoothEase }}
                    >
                      Send Message
                    </motion.button>
                  </motion.form>
                )}
              </AnimatePresence>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ========== 10. FOOTER ========== */}
      <footer className="acira-footer">
        <div className="acira-container">
          <div className="acira-footer-grid">
            <div className="acira-footer-brand">
              <motion.a
                href="#"
                className="acira-logo"
                onClick={(e) => { e.preventDefault(); scrollToTop(); }}
                whileHover={{ scale: 1.05 }}
              >
                <div className="acira-logo-mark">
                  <img src="/logo.svg" alt="" className="acira-logo-icon" />
                </div>
                <span className="acira-logo-text">Acira</span>
              </motion.a>
              <p>Intelligent fixes for your tech problems.</p>
            </div>

            <div className="acira-footer-column">
              <h4>Product</h4>
              {['Features', 'FAQ', 'Waitlist'].map((link) => (
                <motion.a
                  key={link}
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    if (link === 'Features') scrollToSection(featuresRef);
                    else if (link === 'FAQ') scrollToSection(faqRef);
                    else onJoinWaitlist();
                  }}
                  whileHover={{ x: 4 }}
                  transition={{ duration: 0.3, ease: smoothEase }}
                >
                  {link}
                </motion.a>
              ))}
            </div>

            <div className="acira-footer-column">
              <h4>Company</h4>
              {['Contact', 'Privacy Policy', 'Terms of Service'].map((link) => (
                <motion.a
                  key={link}
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    if (link === 'Contact') scrollToSection(contactRef);
                  }}
                  whileHover={{ x: 4 }}
                  transition={{ duration: 0.3, ease: smoothEase }}
                >
                  {link}
                </motion.a>
              ))}
            </div>
          </div>

          <div className="acira-footer-bottom">
            <p>&copy; 2025 Acira AI. All rights reserved.</p>
            <motion.button
              className="acira-back-to-top"
              onClick={scrollToTop}
              whileHover={{ y: -3 }}
              transition={{ duration: 0.4, ease: smoothEase }}
            >
              Back to top
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M18 15l-6-6-6 6"/>
              </svg>
            </motion.button>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default AciraLanding
