import { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence, useScroll, useTransform, useSpring } from 'framer-motion'
import './WhyAciraDetail.css'

// ============================================
// CONTENT DATA
// ============================================
const whyContent = {
  'real-time-fixes': {
    title: 'Real-Time Fixes',
    subtitle: 'Problems resolved instantly, without interrupting your workflow.',
    heroImage: 'https://framerusercontent.com/images/qw5i7oWkaryHAWzlESHgFYJEs.png',
    sections: [
      {
        title: 'Instant Problem Detection',
        content: 'Acira continuously monitors your system in the background, identifying issues the moment they occur. Our advanced detection algorithms work silently, ensuring you\'re never caught off guard by technical problems. The system analyzes patterns, recognizes anomalies, and flags potential issues before they escalate into major disruptions.'
      },
      {
        title: 'Automated Resolution',
        content: 'Once a problem is detected, Acira doesn\'t just notify you—it takes action. Our AI-powered resolution engine applies fixes automatically, drawing from a vast knowledge base of solutions. Whether it\'s a memory leak, a conflicting process, or a network configuration issue, Acira resolves it without requiring your intervention.'
      },
      {
        title: 'Zero Workflow Interruption',
        content: 'Traditional troubleshooting forces you to stop what you\'re doing, research the problem, and manually implement solutions. With Acira, fixes happen in the background while you continue working. You receive a brief notification that an issue was detected and resolved, allowing you to maintain your productivity flow.'
      },
      {
        title: 'Learning From Every Fix',
        content: 'Each resolution teaches Acira something new about your system. Over time, the AI becomes increasingly adept at preventing issues specific to your setup. This continuous learning means fewer problems overall, and faster resolutions when they do occur.'
      }
    ]
  },
  'ai-intelligence': {
    title: 'AI Intelligence',
    subtitle: 'Machine learning that understands your unique system.',
    heroImage: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=1400&q=80',
    sections: [
      {
        title: 'Personalized Understanding',
        content: 'Every computer system is unique—different hardware configurations, software installations, usage patterns, and preferences. Acira\'s AI doesn\'t apply generic solutions; it learns the specifics of your system. Within days of installation, the AI develops a comprehensive understanding of how your machine operates at its best.'
      },
      {
        title: 'Predictive Analysis',
        content: 'Our machine learning models don\'t just react to problems—they anticipate them. By analyzing historical data and recognizing patterns, Acira can predict when issues are likely to occur and take preventive action. This proactive approach means many problems are resolved before you even notice them.'
      },
      {
        title: 'Context-Aware Solutions',
        content: 'The same symptom can have different causes depending on context. Acira\'s AI considers the full picture: what applications are running, recent changes to your system, time of day, network conditions, and more. This contextual awareness ensures that solutions are precisely targeted and effective.'
      },
      {
        title: 'Continuous Evolution',
        content: 'Machine learning never stops improving. As you use your computer and as Acira encounters new scenarios, the AI refines its models. Updates to the intelligence are pushed seamlessly, ensuring you always have access to the most advanced problem-solving capabilities available.'
      }
    ]
  },
  'privacy-first': {
    title: 'Privacy First',
    subtitle: 'Your data stays on your machine. We only collect what\'s needed.',
    heroImage: 'https://images.unsplash.com/photo-1510915228340-29c85a43dcfe?w=1400&q=80',
    sections: [
      {
        title: 'Local Processing',
        content: 'Unlike many AI solutions that send your data to cloud servers for processing, Acira performs all analysis directly on your machine. Your files, your browsing history, your personal documents—none of it ever leaves your computer. The AI model runs locally, ensuring complete data sovereignty.'
      },
      {
        title: 'Minimal Data Collection',
        content: 'We collect only the absolute minimum data required to improve our service: anonymous usage statistics and error reports that contain no personally identifiable information. You have full control over what, if anything, is shared. Our default settings prioritize your privacy above all else.'
      },
      {
        title: 'Transparent Operations',
        content: 'We believe you should always know what\'s happening on your system. Acira provides detailed logs of every action it takes, every piece of data it accesses, and every communication it makes. Nothing happens in the shadows—you\'re always in control and always informed.'
      },
      {
        title: 'Security by Design',
        content: 'Privacy and security go hand in hand. Acira is built with security at its core: encrypted communications, secure update mechanisms, and regular security audits. We don\'t just protect your data from unauthorized access—we ensure that even we can\'t access what isn\'t ours to see.'
      }
    ]
  }
}

// ============================================
// ANIMATION VARIANTS
// ============================================
const smoothEase = [0.43, 0.13, 0.23, 0.96]

const fadeInUp = {
  initial: { opacity: 0, y: 40 },
  animate: { opacity: 1, y: 0 }
}

// ============================================
// MAIN COMPONENT
// ============================================
function WhyAciraDetail({ topicId, onBack, onGetEarlyAccess }) {
  const content = whyContent[topicId] || whyContent['real-time-fixes']
  const [isDarkMode, setIsDarkMode] = useState(false)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [isScrolled, setIsScrolled] = useState(false)
  const [navVisible, setNavVisible] = useState(true)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const lastScrollY = useRef(0)
  const containerRef = useRef(null)

  // Scroll animations
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  })

  const heroImageY = useTransform(scrollYProgress, [0, 1], [0, 150])
  const heroOpacity = useTransform(scrollYProgress, [0, 0.3], [1, 0.6])
  const smoothHeroY = useSpring(heroImageY, { stiffness: 100, damping: 30 })

  useEffect(() => {
    window.scrollTo(0, 0)
    setIsDarkMode(document.documentElement.classList.contains('dark-mode'))

    const observer = new MutationObserver(() => {
      setIsDarkMode(document.documentElement.classList.contains('dark-mode'))
    })
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] })
    return () => observer.disconnect()
  }, [])

  // Mouse tracking for cursor gradient effect
  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
    }
    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  // Nav hide/show on scroll - same as AciraLanding
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY

      if (currentScrollY > lastScrollY.current && currentScrollY > 100) {
        setNavVisible(false)
      } else {
        setNavVisible(true)
      }

      lastScrollY.current = currentScrollY
      setIsScrolled(currentScrollY > 20)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const toggleDarkMode = () => {
    document.documentElement.classList.toggle('dark-mode')
    const newMode = document.documentElement.classList.contains('dark-mode')
    setIsDarkMode(newMode)
    localStorage.setItem('acira-theme', newMode ? 'dark' : 'light')
  }

  return (
    <div className="why-detail" ref={containerRef}>
      {/* Cursor gradient follow effect */}
      <div
        className="why-detail-cursor-gradient"
        style={{
          background: isDarkMode
            ? `radial-gradient(900px circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(13, 82, 255, 0.045) 0%, transparent 70%)`
            : `radial-gradient(1000px circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(13, 82, 255, 0.12) 0%, rgba(0, 180, 216, 0.06) 30%, rgba(0, 180, 216, 0.025) 50%, transparent 70%)`
        }}
      />

      {/* ========== NAVBAR - Same as AciraLanding ========== */}
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
              onClick={(e) => { e.preventDefault(); onGetEarlyAccess(); }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              transition={{ duration: 0.3, ease: smoothEase }}
            >
              <div className="acira-logo-mark">
                <img src="/logo.svg" alt="" className="acira-logo-icon" />
              </div>
              <span className="acira-logo-text">Acira</span>
            </motion.a>

            {/* Center Navigation - Same as Landing */}
            <div className="acira-nav-center">
              <div className="acira-nav-links">
                {[
                  { id: 'features', label: 'Features' },
                  { id: 'why-us', label: 'Why Us' },
                  { id: 'faq', label: 'FAQ' },
                  { id: 'contact', label: 'Contact' }
                ].map((item) => (
                  <motion.a
                    key={item.id}
                    href={`#${item.id}`}
                    className="acira-nav-link"
                    onClick={(e) => {
                      e.preventDefault();
                      // Navigate back to landing and scroll to section
                      window.history.pushState({ page: 'landing', section: item.id }, '', `#${item.id}`);
                      onBack();
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
                onClick={toggleDarkMode}
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
                onClick={onGetEarlyAccess}
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
                  { id: 'features', label: 'Features' },
                  { id: 'why-us', label: 'Why Us' },
                  { id: 'faq', label: 'FAQ' },
                  { id: 'contact', label: 'Contact' }
                ].map((item) => (
                  <motion.button
                    key={item.id}
                    className="acira-mobile-menu-link"
                    onClick={() => {
                      window.history.pushState({ page: 'landing', section: item.id }, '', `#${item.id}`);
                      onBack(item.id);
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
                  onClick={toggleDarkMode}
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
                    onGetEarlyAccess();
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

      {/* Hero Section */}
      <section className="why-detail-hero">
        <motion.div
          className="why-detail-hero-image"
          style={{ y: smoothHeroY, opacity: heroOpacity }}
        >
          <img src={content.heroImage} alt={content.title} />
          <div className="why-detail-hero-overlay"></div>
        </motion.div>

        <div className="why-detail-hero-content">
          <motion.span
            className="why-detail-label"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1, ease: smoothEase }}
          >
            Why Acira
          </motion.span>
          <motion.h1
            className="why-detail-title"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: smoothEase }}
          >
            {content.title}
          </motion.h1>
          <motion.p
            className="why-detail-subtitle"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3, ease: smoothEase }}
          >
            {content.subtitle}
          </motion.p>
        </div>
      </section>

      {/* Content Sections */}
      <section className="why-detail-content">
        <div className="why-detail-container">
          {content.sections.map((section, i) => (
            <motion.article
              key={section.title}
              className="why-detail-section"
              initial="initial"
              whileInView="animate"
              viewport={{ once: false, amount: 0.3 }}
              variants={fadeInUp}
              transition={{ duration: 0.8, delay: i * 0.1, ease: smoothEase }}
            >
              <span className="why-detail-section-number">0{i + 1}</span>
              <h2 className="why-detail-section-title">{section.title}</h2>
              <p className="why-detail-section-content">{section.content}</p>
            </motion.article>
          ))}
        </div>
      </section>

      {/* Footer CTA */}
      <section className="why-detail-cta">
        <motion.div
          className="why-detail-cta-content"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.3 }}
          transition={{ duration: 0.8, ease: smoothEase }}
        >
          <h2>Ready to experience the difference?</h2>
          <p>Join our waitlist and be among the first to try Acira.</p>
          <motion.button
            className="why-detail-cta-btn"
            onClick={onGetEarlyAccess}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            transition={{ duration: 0.2 }}
          >
            Get Early Access
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M5 12h14M12 5l7 7-7 7"/>
            </svg>
          </motion.button>
        </motion.div>
      </section>
    </div>
  )
}

export default WhyAciraDetail
