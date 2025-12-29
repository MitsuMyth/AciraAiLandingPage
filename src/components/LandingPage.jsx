import { useState, useEffect, useRef } from 'react'
import { motion, useScroll, useTransform, useInView } from 'framer-motion'
import './LandingPage.css'
import Earth from './Earth'
import { AnimatedCounter } from './AnimatedCounter'

const integrations = [
  { name: 'Zoom', logo: <svg viewBox="0 0 24 24" fill="currentColor" className="integration-logo"><path d="M2 8v7a1 1 0 001 1h12a1 1 0 001-1V8a1 1 0 00-1-1H3a1 1 0 00-1 1zm19.5 1.5l-4 2.5v-4l4 2.5z"/></svg> },
  { name: 'Teams', logo: <svg viewBox="0 0 24 24" fill="currentColor" className="integration-logo"><path d="M20 7h-4V4l-6 .01V7H6v13h14V7zM10 5h4v2h-4V5zm9 13H7V9h12v9z"/><circle cx="18.5" cy="4.5" r="2"/></svg> },
  { name: 'Google Meet', logo: <svg viewBox="0 0 24 24" fill="currentColor" className="integration-logo"><path d="M15 12.5v4c0 .28-.22.5-.5.5h-5a.5.5 0 01-.5-.5v-9c0-.28.22-.5.5-.5h5c.28 0 .5.22.5.5v4l4-3v10l-4-3z"/></svg> },
  { name: 'Discord', logo: <svg viewBox="0 0 24 24" fill="currentColor" className="integration-logo"><path d="M19.27 5.33C17.94 4.71 16.5 4.26 15 4a.09.09 0 00-.07.03c-.18.33-.39.76-.53 1.09-1.58-.24-3.14-.24-4.68 0-.14-.34-.35-.76-.54-1.09-.01-.02-.04-.03-.07-.03-1.5.26-2.93.71-4.27 1.33-.01 0-.02.01-.03.02-2.72 4.07-3.47 8.03-3.1 11.95 0 .02.01.04.03.05 1.8 1.32 3.53 2.12 5.24 2.65.03.01.06 0 .07-.02.4-.55.76-1.13 1.07-1.74.02-.04 0-.08-.04-.09-.57-.22-1.11-.48-1.64-.78-.04-.02-.04-.08-.01-.11.11-.08.22-.17.33-.25.02-.02.05-.02.07-.01 3.44 1.57 7.15 1.57 10.55 0 .02-.01.05-.01.07.01.11.09.22.17.33.26.04.03.04.09-.01.11-.52.31-1.07.56-1.64.78-.04.01-.05.06-.04.09.32.61.68 1.19 1.07 1.74.03.01.06.02.09.01 1.72-.53 3.45-1.33 5.25-2.65.02-.01.03-.03.03-.05.44-4.53-.73-8.46-3.1-11.95-.01-.01-.02-.02-.04-.02zM8.52 14.91c-1.03 0-1.89-.95-1.89-2.12s.84-2.12 1.89-2.12c1.06 0 1.9.96 1.89 2.12 0 1.17-.84 2.12-1.89 2.12zm6.97 0c-1.03 0-1.89-.95-1.89-2.12s.84-2.12 1.89-2.12c1.06 0 1.9.96 1.89 2.12 0 1.17-.83 2.12-1.89 2.12z"/></svg> },
  { name: 'Slack', logo: <svg viewBox="0 0 24 24" fill="currentColor" className="integration-logo"><path d="M6 15a2 2 0 11-4 0 2 2 0 014 0zm0-6a2 2 0 002 2 2 2 0 002-2V4a2 2 0 10-4 0v5zm3 0a2 2 0 012-2 2 2 0 012 2v5a2 2 0 11-4 0V9zm9 6a2 2 0 11-4 0 2 2 0 014 0zm0-11a2 2 0 002 2 2 2 0 002-2 2 2 0 10-4 0v2zm-3 0a2 2 0 012-2 2 2 0 012 2v5a2 2 0 11-4 0V4zm0 11a2 2 0 01-2 2 2 2 0 01-2-2v-2h4v2z"/></svg> },
  { name: 'Skype', logo: <svg viewBox="0 0 24 24" fill="currentColor" className="integration-logo"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 15c-2.76 0-5-2.24-5-5h2c0 1.66 1.34 3 3 3s3-1.34 3-3c0-.83-.34-1.58-.88-2.12L12 7.76 9.88 9.88A2.996 2.996 0 009 12H7c0-2.76 2.24-5 5-5s5 2.24 5 5-2.24 5-5 5z"/></svg> },
  { name: 'WebEx', logo: <svg viewBox="0 0 24 24" fill="currentColor" className="integration-logo"><circle cx="12" cy="12" r="2"/><path d="M20 12c0-4.42-3.58-8-8-8s-8 3.58-8 8c0 2.03.76 3.87 2 5.28V20h12v-2.72A7.95 7.95 0 0020 12zm-8-6c3.31 0 6 2.69 6 6 0 1.52-.57 2.9-1.5 3.94V14h-9v1.94A5.98 5.98 0 016 12c0-3.31 2.69-6 6-6z"/></svg> },
  { name: 'FaceTime', logo: <svg viewBox="0 0 24 24" fill="currentColor" className="integration-logo"><path d="M17 10.5V7a1 1 0 00-1-1H4a1 1 0 00-1 1v10a1 1 0 001 1h12a1 1 0 001-1v-3.5l4 4v-11l-4 4z"/></svg> },
]

const faqs = [
  { id: 1, question: 'What does Acira actually do?', answer: 'Acira fixes computer problems for you. You describe the issue in plain language, and Acira analyzes your system and applies the fix automatically. Today, it focuses on audio and video problems.' },
  { id: 2, question: 'Is Acira just giving instructions, or does it actually fix things?', answer: 'Acira actually fixes things. It runs a local agent on your computer that applies changes for you instead of telling you what to click or try.' },
  { id: 3, question: 'What kinds of problems does Acira support today?', answer: 'Acira currently supports audio and video issues such as microphones, cameras, device routing, and permissions across apps and the system. Broader system fixes are coming next.' },
  { id: 4, question: 'Is Acira like a chatbot or Copilot?', answer: 'No. Acira is not a general chat assistant. It analyzes real system and application data, finds the root cause of the problem, and applies the fix automatically through a local agent.' },
  { id: 5, question: 'Does Acira run on my computer or in the cloud?', answer: 'Both. Acira uses cloud based analysis to understand the problem and a local agent on your computer to apply the fix safely.' },
  { id: 6, question: 'Is it safe to let Acira change my system settings?', answer: 'Yes. Acira only applies targeted fixes related to the problem you describe. For sensitive or critical changes, Acira will ask before proceeding.' },
  { id: 7, question: 'What about privacy and my data?', answer: 'Acira only collects the data needed to diagnose and fix the problem you describe. It does not access personal files, messages, or unrelated apps.' },
  { id: 8, question: 'Which platforms does Acira support?', answer: 'Acira currently supports Windows. Support for additional platforms is planned.' },
  { id: 9, question: 'When can I try Acira?', answer: 'You can join the waitlist to get early access. We will invite users to try Acira as soon as it is available.' },
  { id: 10, question: 'Is Acira free?', answer: 'Early access details will be shared with waitlist users.' }
]

const WhyIcon = ({ type }) => {
  const icons = {
    block: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="m4.9 4.9 14.2 14.2"/></svg>,
    zap: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>,
    brain: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9.5 2A2.5 2.5 0 0 1 12 4.5v15a2.5 2.5 0 0 1-4.96.44 2.5 2.5 0 0 1-2.96-3.08 3 3 0 0 1-.34-5.58 2.5 2.5 0 0 1 1.32-4.24 2.5 2.5 0 0 1 1.98-3A2.5 2.5 0 0 1 9.5 2Z"/><path d="M14.5 2A2.5 2.5 0 0 0 12 4.5v15a2.5 2.5 0 0 0 4.96.44 2.5 2.5 0 0 0 2.96-3.08 3 3 0 0 0 .34-5.58 2.5 2.5 0 0 0-1.32-4.24 2.5 2.5 0 0 0-1.98-3A2.5 2.5 0 0 0 14.5 2Z"/></svg>,
    sparkle: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z"/><path d="M5 3v4"/><path d="M19 17v4"/><path d="M3 5h4"/><path d="M17 19h4"/></svg>,
    shield: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>,
    cpu: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="4" y="4" width="16" height="16" rx="2" ry="2"/><rect x="9" y="9" width="6" height="6"/><line x1="9" y1="1" x2="9" y2="4"/><line x1="15" y1="1" x2="15" y2="4"/><line x1="9" y1="20" x2="9" y2="23"/><line x1="15" y1="20" x2="15" y2="23"/><line x1="20" y1="9" x2="23" y2="9"/><line x1="20" y1="14" x2="23" y2="14"/><line x1="1" y1="9" x2="4" y2="9"/><line x1="1" y1="14" x2="4" y2="14"/></svg>
  }
  return <div className="why-icon">{icons[type]}</div>
}

// Animated text rotation component
const RotatingText = ({ words }) => {
  const [index, setIndex] = useState(0)
  
  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % words.length)
    }, 3000)
    return () => clearInterval(interval)
  }, [words.length])
  
  return (
    <motion.span
      key={index}
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      exit={{ y: -20, opacity: 0 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className="rotating-word"
    >
      {words[index]}
    </motion.span>
  )
}

function LandingPage({ onJoinWaitlist }) {
  const [waitlistCount, setWaitlistCount] = useState(0)
  const [isLoadingCount, setIsLoadingCount] = useState(true)
  const [activeNavItem, setActiveNavItem] = useState('')
  const [isScrolled, setIsScrolled] = useState(false)
  const [openFaq, setOpenFaq] = useState(null)
  const [contactForm, setContactForm] = useState({ name: '', email: '', message: '' })
  const [contactSubmitted, setContactSubmitted] = useState(false)
  const [isDarkMode, setIsDarkMode] = useState(false)
  
  const heroRef = useRef(null)
  const featuresRef = useRef(null)
  const faqsRef = useRef(null)
  const contactRef = useRef(null)

  useEffect(() => {
    const fetchWaitlistCount = async () => {
      try {
        const response = await fetch('https://api.countapi.xyz/get/acira-ai/waitlist')
        const data = await response.json()
        if (data.value !== undefined) {
          setWaitlistCount(data.value)
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
    if (isDarkMode) {
      document.documentElement.classList.add('dark-mode')
    } else {
      document.documentElement.classList.remove('dark-mode')
    }
  }, [isDarkMode])

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
      const sections = [
        { id: 'features', ref: featuresRef },
        { id: 'faqs', ref: faqsRef },
        { id: 'contact', ref: contactRef }
      ]
      for (const section of sections) {
        if (section.ref.current) {
          const rect = section.ref.current.getBoundingClientRect()
          if (rect.top <= 100 && rect.bottom >= 100) {
            setActiveNavItem(section.id)
            break
          }
        }
      }
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollToSection = (ref) => ref.current?.scrollIntoView({ behavior: 'smooth' })
  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' })
  const toggleTheme = () => setIsDarkMode(!isDarkMode)
  const toggleFaq = (id) => setOpenFaq(openFaq === id ? null : id)
  
  const handleContactSubmit = (e) => {
    e.preventDefault()
    setContactSubmitted(true)
    setTimeout(() => {
      setContactSubmitted(false)
      setContactForm({ name: '', email: '', message: '' })
    }, 3000)
  }

  return (
    <div className="landing-page">
      {/* NAVBAR */}
      <nav className={`navbar ${isScrolled ? 'scrolled' : ''}`}>
        <div className="nav-container container">
          <a href="#" className="nav-logo" onClick={scrollToTop}>
            <img src="/logo.svg" alt="Acira Logo" className="logo-svg" />
            <span className="ai-label">Acira</span>
          </a>
          <div className="nav-links">
            <a href="#features" className={activeNavItem === 'features' ? 'active' : ''} onClick={(e) => { e.preventDefault(); scrollToSection(featuresRef) }}>Features</a>
            <a href="#faqs" className={activeNavItem === 'faqs' ? 'active' : ''} onClick={(e) => { e.preventDefault(); scrollToSection(faqsRef) }}>FAQs</a>
            <a href="#contact" className={activeNavItem === 'contact' ? 'active' : ''} onClick={(e) => { e.preventDefault(); scrollToSection(contactRef) }}>Contact</a>
          </div>
          <div className="nav-actions">
            <button className="theme-toggle" onClick={toggleTheme} aria-label="Toggle theme">
              {isDarkMode ? (
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="theme-icon">
                  <circle cx="12" cy="12" r="4"/>
                  <path d="M12 2v2"/><path d="M12 20v2"/>
                  <path d="m4.93 4.93 1.41 1.41"/><path d="m17.66 17.66 1.41 1.41"/>
                  <path d="M2 12h2"/><path d="M20 12h2"/>
                  <path d="m6.34 17.66-1.41 1.41"/><path d="m19.07 4.93-1.41 1.41"/>
                </svg>
              ) : (
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="theme-icon">
                  <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
                </svg>
              )}
            </button>
            <button className="nav-cta nav-cta-glow" onClick={onJoinWaitlist}>
              <span>Get Early Access</span>
            </button>
          </div>
        </div>
      </nav>

      {/* HERO SECTION - BIRD.COM STYLE (Left-aligned) */}
      <section className="hero-bird" ref={heroRef}>
        <div className="hero-container">
          <motion.div 
            className="hero-content-bird"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
          >
            <motion.div 
              className="hero-badge-bird"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <span className="badge-dot-new"></span>
              <span>Limited early access spots</span>
            </motion.div>
            
            <motion.h1 
              className="hero-title-bird"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              Your computer fixes itself.{' '}
              <span className="gradient-word">
                <RotatingText words={['Automatically.', 'Instantly.', 'Intelligently.']} />
              </span>
            </motion.h1>
            
            <motion.p 
              className="hero-description-bird"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              Just describe the problem in plain language. Acira runs on your computer, 
              understands the issue across apps and the system, and fixes audio and video 
              problems on its own.
            </motion.p>
            
            <motion.div 
              className="hero-cta-bird"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
            >
              <motion.button 
                className="btn-primary-bird" 
                onClick={onJoinWaitlist}
                whileHover={{ scale: 1.05, boxShadow: '0 20px 40px rgba(13, 82, 255, 0.3)' }}
                whileTap={{ scale: 0.95 }}
              >
                <span className="btn-shimmer"></span>
                <span className="btn-text">Join Now</span>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M5 12h14M12 5l7 7-7 7"/>
                </svg>
              </motion.button>
              
              <motion.button 
                className="btn-secondary-bird"
                onClick={() => scrollToSection(featuresRef)}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <span>How it works</span>
              </motion.button>
            </motion.div>

            <motion.div 
              className="hero-stats-bird"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1 }}
            >
              <div className="stat-item-bird">
                {isLoadingCount ? (
                  <span className="stat-number-bird loading">•••</span>
                ) : (
                  <span className="stat-number-bird">
                    <AnimatedCounter value={waitlistCount} />+
                  </span>
                )}
                <span className="stat-label-bird">Professionals waiting</span>
              </div>
              <div className="stat-divider"></div>
              <div className="stat-item-bird">
                <span className="stat-number-bird">95%</span>
                <span className="stat-label-bird">Issues auto-resolved</span>
              </div>
              <div className="stat-divider"></div>
              <div className="stat-item-bird">
                <span className="stat-number-bird">&lt;30s</span>
                <span className="stat-label-bird">Average fix time</span>
              </div>
            </motion.div>
          </motion.div>

          <motion.div 
            className="hero-visual-bird"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, delay: 0.5 }}
          >
            <div className="hero-visual-wrapper">
              <div className="terminal-window">
                <div className="terminal-header">
                  <div className="terminal-dots">
                    <span></span><span></span><span></span>
                  </div>
                  <span className="terminal-title">Acira Agent</span>
                </div>
                <div className="terminal-body">
                  <div className="terminal-line">
                    <span className="terminal-prompt">$</span>
                    <span className="terminal-text typing">"My microphone isn't working in Zoom"</span>
                  </div>
                  <div className="terminal-line output">
                    <span className="terminal-status success">✓</span>
                    <span>Scanning audio devices...</span>
                  </div>
                  <div className="terminal-line output">
                    <span className="terminal-status success">✓</span>
                    <span>Found: Microphone access blocked</span>
                  </div>
                  <div className="terminal-line output">
                    <span className="terminal-status success">✓</span>
                    <span>Fixed: Enabled microphone permissions</span>
                  </div>
                  <div className="terminal-line result">
                    <span className="terminal-emoji">🎤</span>
                    <span>Your microphone is now working!</span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* INTEGRATIONS MARQUEE */}
      <section className="integrations-intelly">
        <motion.p 
          className="integrations-title"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          Works with your favorite apps
        </motion.p>
        
        <div className="marquee-container">
          <div className="marquee-track">
            {[...integrations, ...integrations, ...integrations].map((integration, idx) => (
              <motion.div 
                key={idx} 
                className="integration-card"
                whileHover={{ scale: 1.1, y: -5 }}
                transition={{ type: "spring", stiffness: 400, damping: 17 }}
              >
                {integration.logo}
                <span>{integration.name}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* PROBLEMS SECTION - Horizontal Scrolling Questions */}
      <section className="problems-section-intelly">
        <div className="container-intelly">
          <motion.div 
            className="section-header-intelly"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <span className="section-label-intelly">The Problem</span>
            <h2>Common roadblocks to <span className="gradient-word">productivity</span></h2>
            <p>Tech problems disrupt your flow and waste hours every week</p>
          </motion.div>
          
          <div className="questions-marquee">
            <div className="questions-track-scroll track-1">
              {['Why is my mic not working?', 'How do I fix my camera?', 'Why can\'t people hear me?', 'My headphones aren\'t detected', 'Audio is playing from wrong speaker'].map((q, i) => (
                <div key={i} className="question-pill">
                  <span className="question-mark">?</span>
                  <span>{q}</span>
                </div>
              ))}
              {['Why is my mic not working?', 'How do I fix my camera?', 'Why can\'t people hear me?', 'My headphones aren\'t detected', 'Audio is playing from wrong speaker'].map((q, i) => (
                <div key={`dup1-${i}`} className="question-pill">
                  <span className="question-mark">?</span>
                  <span>{q}</span>
                </div>
              ))}
            </div>
            
            <div className="questions-track-scroll track-2">
              {['My audio is crackling', 'Why is my video lagging?', 'Speakers aren\'t detected', 'Echo in my calls', 'Screen share has no audio'].map((q, i) => (
                <div key={i} className="question-pill">
                  <span className="question-mark">?</span>
                  <span>{q}</span>
                </div>
              ))}
              {['My audio is crackling', 'Why is my video lagging?', 'Speakers aren\'t detected', 'Echo in my calls', 'Screen share has no audio'].map((q, i) => (
                <div key={`dup2-${i}`} className="question-pill">
                  <span className="question-mark">?</span>
                  <span>{q}</span>
                </div>
              ))}
            </div>

            <div className="questions-track-scroll track-3">
              {['Zoom can\'t find my camera', 'Audio keeps cutting out', 'Wrong device selected', 'Permissions are confusing', 'Volume too low'].map((q, i) => (
                <div key={i} className="question-pill">
                  <span className="question-mark">?</span>
                  <span>{q}</span>
                </div>
              ))}
              {['Zoom can\'t find my camera', 'Audio keeps cutting out', 'Wrong device selected', 'Permissions are confusing', 'Volume too low'].map((q, i) => (
                <div key={`dup3-${i}`} className="question-pill">
                  <span className="question-mark">?</span>
                  <span>{q}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* FEATURES SECTION - Clean Intelly Style */}
      <section className="features-section" ref={featuresRef} id="features">
        <div className="container-intelly">
          <motion.div 
            className="section-header-intelly"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <span className="section-label-intelly">The features</span>
            <h2>Monitor and improve performance with <span className="gradient-word">real-time data</span></h2>
          </motion.div>

          <div className="features-bento">
            {/* Main Feature Card - Large */}
            <motion.div 
              className="feature-card feature-card-main"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <div className="feature-card-visual">
                <div className="feature-mockup">
                  <div className="mockup-window">
                    <div className="mockup-header">
                      <div className="mockup-dots"><span></span><span></span><span></span></div>
                    </div>
                    <div className="mockup-content">
                      <div className="mockup-sidebar">
                        <div className="sidebar-item active"></div>
                        <div className="sidebar-item"></div>
                        <div className="sidebar-item"></div>
                        <div className="sidebar-item"></div>
                      </div>
                      <div className="mockup-main">
                        <div className="mockup-stat-cards">
                          <div className="mockup-stat">
                            <span className="mockup-stat-value"><AnimatedCounter value={95} />%</span>
                            <span className="mockup-stat-label">Success Rate</span>
                          </div>
                          <div className="mockup-stat">
                            <span className="mockup-stat-value"><AnimatedCounter value={847} /></span>
                            <span className="mockup-stat-label">Issues Fixed</span>
                          </div>
                        </div>
                        <div className="mockup-chart">
                          <svg viewBox="0 0 200 60" className="chart-line">
                            <path d="M0,50 Q30,45 50,35 T100,25 T150,15 T200,10" fill="none" stroke="url(#chartGradient)" strokeWidth="2"/>
                            <defs>
                              <linearGradient id="chartGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                                <stop offset="0%" stopColor="#0D52FF" />
                                <stop offset="100%" stopColor="#00D4FF" />
                              </linearGradient>
                            </defs>
                          </svg>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="feature-card-content">
                <h3>Understand your system</h3>
                <p>Gain comprehensive insights into your audio and video configuration with AI-powered diagnostics.</p>
              </div>
            </motion.div>

            {/* Secondary Feature Card */}
            <motion.div 
              className="feature-card feature-card-secondary"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <div className="feature-card-visual">
                <div className="feature-icons-grid">
                  <div className="feature-icon-item">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                      <path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z"/>
                      <path d="M19 10v2a7 7 0 0 1-14 0v-2"/>
                    </svg>
                  </div>
                  <div className="feature-icon-item">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                      <polygon points="23 7 16 12 23 17 23 7"/>
                      <rect x="1" y="5" width="15" height="14" rx="2"/>
                    </svg>
                  </div>
                  <div className="feature-icon-item">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                      <path d="M3 18v-6a9 9 0 0 1 18 0v6"/>
                      <path d="M21 19a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3z"/>
                      <path d="M3 19a2 2 0 0 0 2 2h1a2 2 0 0 0 2-2v-3a2 2 0 0 0-2-2H3z"/>
                    </svg>
                  </div>
                  <div className="feature-icon-item">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                      <rect x="2" y="3" width="20" height="14" rx="2"/>
                      <path d="M8 21h8"/>
                      <path d="M12 17v4"/>
                    </svg>
                  </div>
                </div>
              </div>
              <div className="feature-card-content">
                <h3>24/7 Support</h3>
                <p>Our AI agent works around the clock to diagnose and fix your issues automatically.</p>
              </div>
            </motion.div>

            {/* AI Card */}
            <motion.div 
              className="feature-card feature-card-ai"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <div className="ai-badge-pill">AI Integrated</div>
              <div className="feature-card-visual">
                <div className="ai-glow-orb">
                  <div className="orb-core"></div>
                  <div className="orb-ring"></div>
                </div>
              </div>
              <div className="feature-card-content">
                <h3>Powered by Advanced AI</h3>
                <p>Machine learning that understands your unique system configuration.</p>
              </div>
            </motion.div>

            {/* Stats Row */}
            <motion.div 
              className="feature-card feature-card-stats"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <div className="stats-row">
                <div className="stat-block">
                  <span className="stat-value"><AnimatedCounter value={30} />s</span>
                  <span className="stat-label">Avg. Fix Time</span>
                </div>
                <div className="stat-divider-v"></div>
                <div className="stat-block">
                  <span className="stat-value"><AnimatedCounter value={4} />h+</span>
                  <span className="stat-label">Saved Monthly</span>
                </div>
                <div className="stat-divider-v"></div>
                <div className="stat-block">
                  <span className="stat-value"><AnimatedCounter value={waitlistCount || 1000} />+</span>
                  <span className="stat-label">Professionals</span>
                </div>
              </div>
            </motion.div>

            {/* Wide Feature Card */}
            <motion.div 
              className="feature-card feature-card-wide"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <div className="wide-content">
                <div className="wide-text">
                  <h3>Enhance Your Experience with AI Automation</h3>
                  <p>Transform your workflow by leveraging advanced AI technology. Our platform provides automated diagnostics and instant fixes for all your audio and video issues.</p>
                </div>
                <div className="wide-visual">
                  <div className="automation-flow">
                    <div className="flow-step">
                      <div className="flow-icon">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                          <circle cx="12" cy="12" r="10"/>
                          <path d="M12 6v6l4 2"/>
                        </svg>
                      </div>
                      <span>Detect</span>
                    </div>
                    <div className="flow-arrow">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                        <path d="M5 12h14M12 5l7 7-7 7"/>
                      </svg>
                    </div>
                    <div className="flow-step">
                      <div className="flow-icon">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                          <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/>
                        </svg>
                      </div>
                      <span>Analyze</span>
                    </div>
                    <div className="flow-arrow">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                        <path d="M5 12h14M12 5l7 7-7 7"/>
                      </svg>
                    </div>
                    <div className="flow-step">
                      <div className="flow-icon success">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                          <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
                          <polyline points="22 4 12 14.01 9 11.01"/>
                        </svg>
                      </div>
                      <span>Resolve</span>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* WHY ACIRA - Better Image Cards */}
      <section className="why-acira-intelly">
        <div className="container-intelly">
          <motion.div 
            className="section-header-intelly"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <span className="section-label-intelly">Why Acira</span>
            <h2>What makes us <span className="gradient-word">different</span></h2>
          </motion.div>
          
          <div className="features-grid-intelly">
            <motion.div 
              className="feature-card-intelly feature-large"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              whileHover={{ y: -8 }}
            >
              <div className="feature-image-wrapper">
                <img src="https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1200&q=80" alt="Real-time" />
                <div className="feature-image-overlay"></div>
              </div>
              <div className="feature-content-overlay">
                <WhyIcon type="zap" />
                <h3>Real-Time Fixes</h3>
                <p>Problems are detected and resolved instantly, without interrupting your workflow. No waiting, no restarts.</p>
              </div>
            </motion.div>

            <motion.div 
              className="feature-card-intelly"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.15 }}
              whileHover={{ y: -8 }}
            >
              <div className="feature-image-wrapper">
                <img src="https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=800&q=80" alt="AI-powered" />
                <div className="feature-image-overlay"></div>
              </div>
              <div className="feature-content-overlay">
                <WhyIcon type="brain" />
                <h3>AI-Powered Intelligence</h3>
                <p>Advanced machine learning understands your system's unique configuration and context.</p>
              </div>
            </motion.div>

            <motion.div 
              className="feature-card-intelly"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.3 }}
              whileHover={{ y: -8 }}
            >
              <div className="feature-image-wrapper">
                <img src="https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=800&q=80" alt="Secure" />
                <div className="feature-image-overlay"></div>
              </div>
              <div className="feature-content-overlay">
                <WhyIcon type="shield" />
                <h3>Privacy First</h3>
                <p>Your data stays on your machine. We only collect what's needed to diagnose and fix issues.</p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* FAQS */}
      <section className="faqs-intelly" ref={faqsRef} id="faqs">
        <div className="container-intelly">
          <motion.div 
            className="section-header-intelly"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <span className="section-label-intelly">FAQs</span>
            <h2>Common <span className="gradient-word">questions</span></h2>
            <p>Everything you need to know about Acira</p>
          </motion.div>
          
          <div className="faq-grid">
            {faqs.map((faq, i) => (
              <motion.div 
                key={faq.id} 
                className={`faq-item-intelly ${openFaq === faq.id ? 'open' : ''}`}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.05 }}
              >
                <button className="faq-question-intelly" onClick={() => toggleFaq(faq.id)}>
                  <span>{faq.question}</span>
                  <motion.svg 
                    className="faq-icon-intelly" 
                    width="20" 
                    height="20" 
                    viewBox="0 0 24 24" 
                    fill="none" 
                    stroke="currentColor" 
                    strokeWidth="2"
                    animate={{ rotate: openFaq === faq.id ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <path d="M6 9l6 6 6-6"/>
                  </motion.svg>
                </button>
                {openFaq === faq.id && (
                  <motion.div 
                    className="faq-answer-intelly"
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <p>{faq.answer}</p>
                  </motion.div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA SECTION */}
      <section className="cta-intelly">
        <motion.div 
          className="cta-card-intelly"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h2>Get <span className="gradient-word">Early Access</span></h2>
          <p>Join {waitlistCount > 0 ? `${waitlistCount.toLocaleString()}+ ` : ''}professionals who are ready to fix their tech problems forever.</p>
          <motion.button 
            className="btn-primary-intelly" 
            onClick={onJoinWaitlist}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <span className="btn-shimmer"></span>
            <span className="btn-text">Claim Your Spot</span>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M5 12h14M12 5l7 7-7 7"/>
            </svg>
          </motion.button>
        </motion.div>
      </section>

      {/* CONTACT */}
      <section className="contact-intelly" ref={contactRef} id="contact">
        <div className="container-intelly">
          <div className="contact-wrapper-intelly">
            <motion.div 
              className="contact-info-intelly"
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <span className="section-label-intelly">Contact Us</span>
              <h2>Have questions? <span className="gradient-word">Let's talk.</span></h2>
              <p>We'd love to hear from you. Whether you have a question about features, pricing, or anything else.</p>
              <div className="contact-email-intelly">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="2" y="4" width="20" height="16" rx="2"/>
                  <path d="M22 6l-10 7L2 6"/>
                </svg>
                <span>hello@acira.ai</span>
              </div>
            </motion.div>
            
            <motion.div 
              className="contact-form-intelly"
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              {contactSubmitted ? (
                <div className="success-message">
                  <div className="success-icon-intelly">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <polyline points="20 6 9 17 4 12"/>
                    </svg>
                  </div>
                  <h3>Message sent!</h3>
                  <p>We'll get back to you soon.</p>
                </div>
              ) : (
                <form onSubmit={handleContactSubmit}>
                  <div className="form-group-intelly">
                    <label>Name</label>
                    <input type="text" value={contactForm.name} onChange={(e) => setContactForm({ ...contactForm, name: e.target.value })} required placeholder="Your name" />
                  </div>
                  <div className="form-group-intelly">
                    <label>Email</label>
                    <input type="email" value={contactForm.email} onChange={(e) => setContactForm({ ...contactForm, email: e.target.value })} required placeholder="you@example.com" />
                  </div>
                  <div className="form-group-intelly">
                    <label>Message</label>
                    <textarea value={contactForm.message} onChange={(e) => setContactForm({ ...contactForm, message: e.target.value })} required placeholder="How can we help?" rows="4" />
                  </div>
                  <motion.button 
                    type="submit" 
                    className="btn-submit-intelly"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    Send Message
                  </motion.button>
                </form>
              )}
            </motion.div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="footer-intelly">
        <div className="container-intelly">
          <div className="footer-content-intelly">
            <div className="footer-brand-intelly">
              <a href="#" className="nav-logo" onClick={scrollToTop}>
                <img src="/logo.svg" alt="Acira Logo" className="logo-svg" />
                <span className="logo-text gradient-word">Acira</span>
              </a>
              <p>Intelligent fixes for your tech problems.</p>
            </div>
            <div className="footer-links-intelly">
              <div className="footer-column-intelly">
                <h4>Product</h4>
                <a href="#features" onClick={(e) => { e.preventDefault(); scrollToSection(featuresRef) }}>Features</a>
                <a href="#faqs" onClick={(e) => { e.preventDefault(); scrollToSection(faqsRef) }}>FAQs</a>
                <a href="#" onClick={onJoinWaitlist}>Join Waitlist</a>
              </div>
              <div className="footer-column-intelly">
                <h4>Company</h4>
                <a href="#contact" onClick={(e) => { e.preventDefault(); scrollToSection(contactRef) }}>Contact</a>
                <a href="#">Privacy Policy</a>
                <a href="#">Terms of Service</a>
              </div>
            </div>
          </div>
          <div className="footer-bottom-intelly">
            <p>© 2025 Acira AI. All rights reserved.</p>
            <button className="back-to-top-intelly" onClick={scrollToTop}>
              Back to top
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M18 15l-6-6-6 6"/>
              </svg>
            </button>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default LandingPage