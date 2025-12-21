import { useState, useEffect, useRef } from 'react'
import './LandingPage.css'
import AIProblemSolver from './AIProblemSolver'

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
    mic: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z"/><path d="M19 10v2a7 7 0 0 1-14 0v-2"/><line x1="12" x2="12" y1="19" y2="22"/></svg>,
    camera: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m23 7-7 5 7 5V7z"/><rect width="15" height="14" x="1" y="5" rx="2" ry="2"/></svg>,
    audio: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 18V5l12-2v13"/><circle cx="6" cy="18" r="3"/><circle cx="18" cy="16" r="3"/></svg>,
    settings: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z"/><circle cx="12" cy="12" r="3"/></svg>,
    refresh: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8"/><path d="M21 3v5h-5"/><path d="M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16"/><path d="M3 21v-5h5"/></svg>,
    clock: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
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
    search: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>,
    brain: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9.5 2A2.5 2.5 0 0 1 12 4.5v15a2.5 2.5 0 0 1-4.96.44 2.5 2.5 0 0 1-2.96-3.08 3 3 0 0 1-.34-5.58 2.5 2.5 0 0 1 1.32-4.24 2.5 2.5 0 0 1 1.98-3A2.5 2.5 0 0 1 9.5 2Z"/><path d="M14.5 2A2.5 2.5 0 0 0 12 4.5v15a2.5 2.5 0 0 0 4.96.44 2.5 2.5 0 0 0 2.96-3.08 3 3 0 0 0 .34-5.58 2.5 2.5 0 0 0-1.32-4.24 2.5 2.5 0 0 0-1.98-3A2.5 2.5 0 0 0 14.5 2Z"/></svg>,
    zap: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>
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
    block: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="m4.9 4.9 14.2 14.2"/></svg>,
    zap: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>,
    brain: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9.5 2A2.5 2.5 0 0 1 12 4.5v15a2.5 2.5 0 0 1-4.96.44 2.5 2.5 0 0 1-2.96-3.08 3 3 0 0 1-.34-5.58 2.5 2.5 0 0 1 1.32-4.24 2.5 2.5 0 0 1 1.98-3A2.5 2.5 0 0 1 9.5 2Z"/><path d="M14.5 2A2.5 2.5 0 0 0 12 4.5v15a2.5 2.5 0 0 0 4.96.44 2.5 2.5 0 0 0 2.96-3.08 3 3 0 0 0 .34-5.58 2.5 2.5 0 0 0-1.32-4.24 2.5 2.5 0 0 0-1.98-3A2.5 2.5 0 0 0 14.5 2Z"/></svg>,
    sparkle: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z"/><path d="M5 3v4"/><path d="M19 17v4"/><path d="M3 5h4"/><path d="M17 19h4"/></svg>
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
         <div className="faq-list-wide">{faqs.map((f) => <div key={f.id} className={`faq-item ${openFaq === f.id ? 'open' : ''}`}><button className="faq-question" onClick={() => toggleFaq(f.id)}><span>{f.question}</span><svg className="faq-icon" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M6 9l6 6 6-6"/></svg></button><div className="faq-answer"><p>{f.answer}</p></div></div>)}</div>
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