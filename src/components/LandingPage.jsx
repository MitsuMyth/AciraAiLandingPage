import { useState, useEffect, useRef } from 'react'
import './LandingPage.css'
import AIProblemSolver from './AIProblemSolver'

const integrations = [
  { name: 'Zoom', logo: <svg viewBox="0 0 24 24" fill="currentColor" className="integration-logo"><path d="M4.58 4.58C2.33 6.84 2.33 10.46 2.33 17.69v.63c0 1.1.89 1.99 1.99 1.99h.63c7.23 0 10.84 0 13.1-2.26 2.26-2.26 2.26-5.87 2.26-13.1v-.63c0-1.1-.89-1.99-1.99-1.99h-.63c-7.23 0-10.84 0-13.1 2.26z"/></svg> },
  { name: 'Teams', logo: <svg viewBox="0 0 24 24" fill="currentColor" className="integration-logo"><path d="M20 7h-4V4c0-.55-.45-1-1-1H9c-.55 0-1 .45-1 1v3H4c-.55 0-1 .45-1 1v10c0 .55.45 1 1 1h16c.55 0 1-.45 1-1V8c0-.55-.45-1-1-1zM9 4h6v3H9V4zm10 13H5V8h14v9z"/><circle cx="17" cy="5" r="2.5"/></svg> },
  { name: 'Google Meet', logo: <svg viewBox="0 0 24 24" fill="currentColor" className="integration-logo"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/></svg> },
  { name: 'Discord', logo: <svg viewBox="0 0 24 24" fill="currentColor" className="integration-logo"><path d="M20.32 4.37a19.8 19.8 0 00-4.89-1.52.07.07 0 00-.08.04c-.21.37-.44.86-.61 1.25a18.27 18.27 0 00-5.49 0 12.64 12.64 0 00-.62-1.25.08.08 0 00-.08-.04 19.74 19.74 0 00-4.89 1.52.07.07 0 00-.03.03C.53 9.05-.32 13.58.1 18.06a.08.08 0 00.03.05 19.9 19.9 0 005.99 3.03.08.08 0 00.08-.03c.46-.63.87-1.3 1.23-1.99a.08.08 0 00-.04-.11 13.11 13.11 0 01-1.87-.89.08.08 0 01-.01-.13c.13-.1.25-.2.37-.29a.07.07 0 01.08-.01c3.93 1.79 8.18 1.79 12.06 0a.07.07 0 01.08.01c.12.1.25.2.37.29a.08.08 0 01-.01.13c-.6.35-1.22.65-1.87.89a.08.08 0 00-.04.11c.36.7.77 1.36 1.23 1.99a.08.08 0 00.08.03 19.84 19.84 0 006-3.03.08.08 0 00.03-.05c.5-5.18-.84-9.67-3.55-13.66a.06.06 0 00-.03-.03zM8.02 15.33c-1.18 0-2.16-1.08-2.16-2.42 0-1.33.96-2.42 2.16-2.42 1.21 0 2.18 1.1 2.16 2.42 0 1.34-.96 2.42-2.16 2.42zm7.97 0c-1.18 0-2.16-1.08-2.16-2.42 0-1.33.96-2.42 2.16-2.42 1.21 0 2.18 1.1 2.16 2.42 0 1.34-.95 2.42-2.16 2.42z"/></svg> },
  { name: 'Slack', logo: <svg viewBox="0 0 24 24" fill="currentColor" className="integration-logo"><path d="M5.04 15.17a2.53 2.53 0 01-2.52 2.52A2.53 2.53 0 010 15.17a2.53 2.53 0 012.52-2.52h2.52v2.52zm1.27 0a2.53 2.53 0 012.52-2.52 2.53 2.53 0 012.52 2.52v6.31A2.53 2.53 0 018.83 24a2.53 2.53 0 01-2.52-2.52v-6.31zM8.83 5.04a2.53 2.53 0 01-2.52-2.52A2.53 2.53 0 018.83 0a2.53 2.53 0 012.52 2.52v2.52H8.83zm0 1.27a2.53 2.53 0 012.52 2.52 2.53 2.53 0 01-2.52 2.52H2.52A2.53 2.53 0 010 8.83a2.53 2.53 0 012.52-2.52h6.31zm10.13 2.52a2.53 2.53 0 012.52-2.52A2.53 2.53 0 0124 8.83a2.53 2.53 0 01-2.52 2.52h-2.52V8.83zm-1.27 0a2.53 2.53 0 01-2.52 2.52 2.53 2.53 0 01-2.52-2.52V2.52A2.53 2.53 0 0115.17 0a2.53 2.53 0 012.52 2.52v6.31zm-2.52 10.13a2.53 2.53 0 012.52 2.52A2.53 2.53 0 0115.17 24a2.53 2.53 0 01-2.52-2.52v-2.52h2.52zm0-1.27a2.53 2.53 0 01-2.52-2.52 2.53 2.53 0 012.52-2.52h6.31A2.53 2.53 0 0124 15.17a2.53 2.53 0 01-2.52 2.52h-6.31z"/></svg> },
  { name: 'Skype', logo: <svg viewBox="0 0 24 24" fill="currentColor" className="integration-logo"><path d="M12.07 18.87c-4.02 0-5.82-1.98-5.82-3.46 0-.77.56-1.3 1.33-1.3 1.72 0 1.27 2.48 4.49 2.48 1.64 0 2.55-.9 2.55-1.81 0-.55-.27-1.16-1.35-1.43l-3.58-.9c-2.88-.72-3.4-2.28-3.4-3.75 0-3.05 2.86-4.19 5.55-4.19 2.47 0 5.39 1.37 5.39 3.2 0 .78-.69 1.24-1.45 1.24-1.47 0-1.2-2.04-4.16-2.04-1.47 0-2.3.66-2.3 1.62s1.15 1.26 2.16 1.49l2.64.59c2.89.65 3.62 2.35 3.62 3.94 0 2.48-1.9 4.32-5.72 4.32z"/></svg> },
  { name: 'WebEx', logo: <svg viewBox="0 0 24 24" fill="currentColor" className="integration-logo"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"/></svg> },
  { name: 'FaceTime', logo: <svg viewBox="0 0 24 24" fill="currentColor" className="integration-logo"><path d="M17 10.5V7c0-.55-.45-1-1-1H4c-.55 0-1 .45-1 1v10c0 .55.45 1 1 1h12c.55 0 1-.45 1-1v-3.5l4 4v-11l-4 4z"/></svg> },
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

const problems = [
  { title: 'Mic Not Detected', description: 'Your meeting starts and suddenly your mic disappears from the app.', iconType: 'mic' },
  { title: 'Camera Issues', description: 'Black screen or frozen video right when you need to present.', iconType: 'camera' },
  { title: 'Audio Glitches', description: 'Crackling, echoes, or complete audio dropouts mid-conversation.', iconType: 'audio' },
  { title: 'Permission Chaos', description: 'Apps have access but devices still don\'t work properly.', iconType: 'settings' },
  { title: 'Restart Roulette', description: 'Constantly restarting apps and devices hoping it\'ll fix itself.', iconType: 'refresh' },
  { title: 'Wasted Time', description: 'Minutes turning into hours troubleshooting instead of working.', iconType: 'clock' }
]

const ProblemIcon = ({ type }) => {
  const icons = {
    mic: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z"/><path d="M19 10v2a7 7 0 0 1-14 0v-2"/><line x1="12" x2="12" y1="19" y2="22"/><line x1="4" y1="4" x2="20" y2="20" stroke="#ef4444" strokeWidth="2"/></svg>,
    camera: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3l-2.5-3z"/><circle cx="12" cy="13" r="3"/><line x1="2" y1="2" x2="22" y2="22" stroke="#ef4444" strokeWidth="2"/></svg>,
    audio: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/><path d="M15.54 8.46a5 5 0 0 1 0 7.07" stroke="#ef4444"/><path d="M19.07 4.93a10 10 0 0 1 0 14.14" stroke="#ef4444" strokeDasharray="2 2"/></svg>,
    settings: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/></svg>,
    refresh: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M21 2v6h-6"/><path d="M3 12a9 9 0 0 1 15-6.7L21 8"/><path d="M3 22v-6h6"/><path d="M21 12a9 9 0 0 1-15 6.7L3 16"/></svg>,
    clock: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
  }
  return <div className="problem-icon">{icons[type]}</div>
}

const howItWorks = [
  { step: '01', title: 'Intelligent Detection', description: 'Acira monitors your system and apps for audio/video issues—detecting problems the moment they occur.', iconType: 'search' },
  { step: '02', title: 'Root Cause Analysis', description: 'Our AI identifies the exact cause, whether it\'s a driver conflict, permission problem, or app misconfiguration.', iconType: 'brain' },
  { step: '03', title: 'Autonomous Fix', description: 'Acira automatically applies the right fix—no manual intervention needed. You stay in your meeting.', iconType: 'zap' }
]

const StepIcon = ({ type }) => {
  const icons = {
    search: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>,
    brain: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M12 5a3 3 0 1 0-5.997.125 4 4 0 0 0-2.526 5.77 4 4 0 0 0 .556 6.588A4 4 0 1 0 12 18Z"/><path d="M12 5a3 3 0 1 1 5.997.125 4 4 0 0 1 2.526 5.77 4 4 0 0 1-.556 6.588A4 4 0 1 1 12 18Z"/></svg>,
    zap: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>
  }
  return <div className="step-icon">{icons[type]}</div>
}

const whyAcira = [
  { title: 'No Manual Troubleshooting', description: 'Stop Googling error messages. Acira handles everything automatically.', iconType: 'block' },
  { title: 'Works in Real-Time', description: 'Fixes happen while you\'re in your meeting—not after you\'ve missed the discussion.', iconType: 'zap' },
  { title: 'Learns Your System', description: 'Acira adapts to your hardware, software, and usage patterns.', iconType: 'brain' },
  { title: 'Zero Technical Knowledge', description: 'No need to understand drivers or permissions. Just install and forget.', iconType: 'sparkle' }
]

const WhyIcon = ({ type }) => {
  const icons = {
    block: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><circle cx="12" cy="12" r="10"/><path d="m4.9 4.9 14.2 14.2"/></svg>,
    zap: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>,
    brain: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M12 5a3 3 0 1 0-5.997.125 4 4 0 0 0-2.526 5.77 4 4 0 0 0 .556 6.588A4 4 0 1 0 12 18Z"/><path d="M12 5a3 3 0 1 1 5.997.125 4 4 0 0 1 2.526 5.77 4 4 0 0 1-.556 6.588A4 4 0 1 1 12 18Z"/></svg>,
    sparkle: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="m12 3-1.9 5.8a2 2 0 0 1-1.3 1.3L3 12l5.8 1.9a2 2 0 0 1 1.3 1.3L12 21l1.9-5.8a2 2 0 0 1 1.3-1.3L21 12l-5.8-1.9a2 2 0 0 1-1.3-1.3L12 3Z"/></svg>
  }
  return <div className="why-icon">{icons[type]}</div>
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
  
  const heroRef = useRef(null), featuresRef = useRef(null), faqsRef = useRef(null), contactRef = useRef(null)

  // Fetch real waitlist count from CountAPI
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
    
    // Refresh count every 30 seconds
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
      const sections = [{ id: 'features', ref: featuresRef }, { id: 'faqs', ref: faqsRef }, { id: 'contact', ref: contactRef }]
      for (const section of sections) {
        if (section.ref.current) {
          const rect = section.ref.current.getBoundingClientRect()
          if (rect.top <= 100 && rect.bottom >= 100) { setActiveNavItem(section.id); break }
        }
      }
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => entries.forEach((e) => { if (e.isIntersecting) e.target.classList.add('animate-in') }), { threshold: 0.1, rootMargin: '0px 0px -50px 0px' })
    document.querySelectorAll('.animate-on-scroll').forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [])

  const scrollToSection = (ref) => ref.current?.scrollIntoView({ behavior: 'smooth' })
  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' })
  const handleContactSubmit = (e) => { e.preventDefault(); setContactSubmitted(true); setTimeout(() => { setContactSubmitted(false); setContactForm({ name: '', email: '', message: '' }) }, 3000) }
  const toggleTheme = () => setIsDarkMode(!isDarkMode)
  const toggleFaq = (id) => setOpenFaq(openFaq === id ? null : id)

  return (
    <div className="landing-page">
      <nav className={`navbar ${isScrolled ? 'scrolled' : ''}`}>
        <div className="nav-container container">
          <a href="#" className="nav-logo" onClick={scrollToTop}>
            <img src="/logo.svg" alt="Acira Logo" className="logo-svg" />

            <span className="ai-label">Acira AI</span>
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
                  <path d="M12 2v2"/>
                  <path d="M12 20v2"/>
                  <path d="m4.93 4.93 1.41 1.41"/>
                  <path d="m17.66 17.66 1.41 1.41"/>
                  <path d="M2 12h2"/>
                  <path d="M20 12h2"/>
                  <path d="m6.34 17.66-1.41 1.41"/>
                  <path d="m19.07 4.93-1.41 1.41"/>
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

      <section className="hero" ref={heroRef}>
        <div className="hero-container">
          <div className="hero-left animate-on-scroll">
            <div className="hero-badge">
              <span className="badge-dot"></span>
              <span>Limited early access spots</span>
            </div>
            <h1 className="hero-title">Your computer fixes itself. <span className="gradient-text-animated">Automatically.</span></h1>
            <p className="hero-description">Just describe the problem in plain language. Acira runs on your computer, understands the issue across apps and the system, and fixes audio and video problems on its own. Broader system fixes are coming next!</p>
            <div className="hero-cta">
              <button className="btn-primary btn-large btn-glow" onClick={onJoinWaitlist}>
                <span className="btn-glow-bg"></span>
                <span className="btn-content">
                  Join Now
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M5 12h14M12 5l7 7-7 7"/>
                  </svg>
                </span>
              </button>
              <div className="waitlist-count">
                {isLoadingCount ? (
                  <span className="count-number count-loading">•••</span>
                ) : (
                  <span className="count-number">{waitlistCount.toLocaleString()}</span>
                )}
                <span className="count-label">professionals waiting</span>
              </div>
            </div>
          </div>
          
          <div className="hero-right animate-on-scroll">
            <AIProblemSolver />
          </div>
        </div>
      </section>

      <section className="integrations">
        <div className="container">
          <p className="integrations-label animate-on-scroll">Works with your favorite apps</p>
          <div className="integrations-track"><div className="integrations-slide">{[...integrations, ...integrations].map((i, idx) => <div key={idx} className="integration-item">{i.logo}<span className="integration-name">{i.name}</span></div>)}</div></div>
        </div>
      </section>

      <section className="problems">
        <div className="container">
          <div className="section-header animate-on-scroll"><span className="section-label gradient-text-animated">The Problem</span><h2 className="gradient-text-animated">Sound familiar?</h2><p>These issues cost professionals hours every week.</p></div>
          <div className="problems-grid">{problems.map((p, i) => <div key={i} className="problem-card animate-on-scroll" style={{ animationDelay: `${i * 0.1}s` }}><ProblemIcon type={p.iconType} /><h4>{p.title}</h4><p>{p.description}</p></div>)}</div>
        </div>
      </section>

      <section className="how-it-works" ref={featuresRef} id="features">
        <div className="container">
          <div className="section-header animate-on-scroll"><span className="section-label gradient-text-animated">How Acira Works</span><h2 className="gradient-text-animated">Intelligent fixes, zero effort</h2><p>Three steps to stress-free meetings</p></div>
          <div className="steps-container">{howItWorks.map((s, i) => <div key={i} className="step-card animate-on-scroll" style={{ animationDelay: `${i * 0.15}s` }}><div className="step-number">{s.step}</div><StepIcon type={s.iconType} /><h3>{s.title}</h3><p>{s.description}</p></div>)}</div>
        </div>
      </section>

      <section className="why-acira">
        <div className="container">
          <div className="section-header animate-on-scroll"><span className="section-label gradient-text-animated">Why Acira</span><h2 className="gradient-text-animated">What makes us different</h2><p>No one else does what we do</p></div>
          <div className="why-grid">{whyAcira.map((w, i) => <div key={i} className="why-card animate-on-scroll" style={{ animationDelay: `${i * 0.1}s` }}><WhyIcon type={w.iconType} /><div><h4>{w.title}</h4><p>{w.description}</p></div></div>)}</div>
        </div>
      </section>

      <section className="starting-scope">
        <div className="container">
          <div className="scope-content animate-on-scroll">
            <div className="scope-text">
              <span className="section-label gradient-text-animated">Our Vision</span>
              <h2 className="gradient-text-animated">Starting with audio & video. Building toward everything.</h2>
              <p>We're launching with mic, camera, and audio fixes—the issues that disrupt your most important moments. But our vision goes far beyond that.</p>
              <p>Acira is built to become your complete system health companion—automatically detecting and resolving issues across your entire computer.</p>
              <ul className="scope-list"><li><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="20 6 9 17 4 12"/></svg>Audio & video device management</li><li><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="20 6 9 17 4 12"/></svg>App-specific troubleshooting</li><li><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="20 6 9 17 4 12"/></svg>System performance optimization</li><li><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="20 6 9 17 4 12"/></svg>Proactive issue prevention</li></ul>
            </div>
            <div className="scope-visual"><div className="scope-circles"><div className="scope-ring scope-ring-3"><span>System</span></div><div className="scope-ring scope-ring-2"><span>Apps</span></div><div className="scope-ring scope-ring-1"><span>Audio/Video</span></div></div></div>
          </div>
        </div>
      </section>

      <section className="extra-cta">
        <div className="container">
          <div className="cta-card animate-on-scroll">
            <div className="cta-content">
              <div className="cta-text">
                <h2>Get Early Access</h2>
                <p>Join {waitlistCount > 0 ? `${waitlistCount.toLocaleString()}+ ` : ''}professionals who are ready to fix their tech problems forever.</p>
                <button className="btn-primary btn-large btn-glow" onClick={onJoinWaitlist}>
                  <span className="btn-glow-bg"></span>
                  <span className="btn-content">
                    Claim Your Spot
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M5 12h14M12 5l7 7-7 7"/>
                    </svg>
                  </span>
                </button>
              </div>
              <div className="cta-image">
                <img src="/laptopacirav2.png" alt="Acira" className="cta-logo" />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="faqs" ref={faqsRef} id="faqs">
        <div className="container">
          <div className="section-header animate-on-scroll"><span className="section-label gradient-text-animated">FAQs</span><h2 className="gradient-text-animated">Common questions</h2><p>Everything you need to know about Acira</p></div>
          <div className="faq-list">{faqs.map((f) => <div key={f.id} className={`faq-item ${openFaq === f.id ? 'open' : ''}`}><button className="faq-question" onClick={() => toggleFaq(f.id)}><span>{f.question}</span><svg className="faq-icon" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M6 9l6 6 6-6"/></svg></button><div className="faq-answer"><p>{f.answer}</p></div></div>)}</div>
        </div>
      </section>

      <section className="contact" ref={contactRef} id="contact">
        <div className="container">
          <div className="contact-wrapper">
            <div className="contact-info animate-on-scroll"><span className="section-label gradient-text-animated">Contact Us</span><h2 className="gradient-text-animated">Have questions? Let's talk.</h2><p>We'd love to hear from you. Whether you have a question about features, pricing, or anything else.</p><div className="contact-email"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="M22 6l-10 7L2 6"/></svg><span>hello@acira.ai</span></div></div>
            <div className="contact-form-wrapper animate-on-scroll">{contactSubmitted ? <div className="contact-success"><div className="success-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="20 6 9 17 4 12"/></svg></div><h3>Message sent!</h3><p>We'll get back to you soon.</p></div> : <form className="contact-form" onSubmit={handleContactSubmit}><div className="form-group"><label>Name</label><input type="text" value={contactForm.name} onChange={(e) => setContactForm({ ...contactForm, name: e.target.value })} required placeholder="Your name"/></div><div className="form-group"><label>Email</label><input type="email" value={contactForm.email} onChange={(e) => setContactForm({ ...contactForm, email: e.target.value })} required placeholder="you@example.com"/></div><div className="form-group"><label>Message</label><textarea value={contactForm.message} onChange={(e) => setContactForm({ ...contactForm, message: e.target.value })} required placeholder="How can we help?" rows="4"/></div><button type="submit" className="btn-primary">Send Message</button></form>}</div>
          </div>
        </div>
      </section>

      <footer className="footer">
        <div className="container">
          <div className="footer-content">
            <div className="footer-brand"><a href="#" className="nav-logo" onClick={scrollToTop}>
              <img src="/logo.svg" alt="Acira Logo" className="logo-svg" />

              <span className="logo-text gradient-text-animated">Acira</span>
            </a><p>Intelligent fixes for your tech problems.</p></div>
            <div className="footer-links"><div className="footer-column"><h4>Product</h4><a href="#features" onClick={(e) => { e.preventDefault(); scrollToSection(featuresRef) }}>Features</a><a href="#faqs" onClick={(e) => { e.preventDefault(); scrollToSection(faqsRef) }}>FAQs</a><a href="#" onClick={onJoinWaitlist}>Join Waitlist</a></div><div className="footer-column"><h4>Company</h4><a href="#contact" onClick={(e) => { e.preventDefault(); scrollToSection(contactRef) }}>Contact</a><a href="#">Privacy Policy</a><a href="#">Terms of Service</a></div></div>
          </div>
          <div className="footer-bottom"><p>© 2025 Acira AI. All rights reserved.</p><button className="back-to-top" onClick={scrollToTop}>Back to top<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 15l-6-6-6 6"/></svg></button></div>
        </div>
      </footer>
    </div>
  )
}

export default LandingPage