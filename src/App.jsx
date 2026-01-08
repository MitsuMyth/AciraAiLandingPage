import { useState, useEffect } from 'react'
import AciraLanding from './components/AciraLanding'
import JoinWaitlist from './components/JoinWaitlist'
import WhyAciraDetail from './components/WhyAciraDetail'
import './index.css'

function App() {
  const [currentPage, setCurrentPage] = useState('landing')
  const [whyDetailTopic, setWhyDetailTopic] = useState(null)
  const [scrollToSection, setScrollToSection] = useState(null)

  // Handle browser back/forward buttons
  useEffect(() => {
    const handlePopState = (event) => {
      if (event.state) {
        setCurrentPage(event.state.page || 'landing')
        setWhyDetailTopic(event.state.topic || null)
        setScrollToSection(event.state.scrollTo || null)
      } else {
        setCurrentPage('landing')
        setWhyDetailTopic(null)
        setScrollToSection(null)
      }
    }

    window.addEventListener('popstate', handlePopState)

    // Set initial state
    if (!window.history.state) {
      window.history.replaceState({ page: 'landing' }, '', window.location.pathname)
    }

    return () => window.removeEventListener('popstate', handlePopState)
  }, [])

  const handleJoinWaitlist = () => {
    window.history.pushState({ page: 'waitlist' }, '', '#waitlist')
    setCurrentPage('waitlist')
    setScrollToSection(null)
    window.scrollTo(0, 0)
  }

  const handleWaitlistComplete = () => {
    window.history.pushState({ page: 'landing' }, '', window.location.pathname)
    setCurrentPage('landing')
    setScrollToSection(null)
    window.scrollTo(0, 0)
  }

  const handleNavigateToWhyDetail = (topicId) => {
    window.history.pushState({ page: 'why-detail', topic: topicId }, '', `#${topicId}`)
    setWhyDetailTopic(topicId)
    setCurrentPage('why-detail')
    window.scrollTo(0, 0)
  }

  const handleBackFromWhyDetail = (targetSection = null) => {
    // Check if there's a target section from URL hash or passed parameter
    const section = targetSection || (window.location.hash ? window.location.hash.slice(1) : 'why-us')
    window.history.pushState({ page: 'landing', scrollTo: section }, '', `#${section}`)
    setScrollToSection(section)
    setCurrentPage('landing')
    setWhyDetailTopic(null)
  }

  const handleGetEarlyAccess = () => {
    window.history.pushState({ page: 'landing' }, '', window.location.pathname)
    // Clear saved scroll position so it goes to top
    sessionStorage.removeItem('acira-scroll-position')
    setScrollToSection(null)
    setCurrentPage('landing')
    setWhyDetailTopic(null)
    window.scrollTo(0, 0)
  }

  if (currentPage === 'waitlist') {
    return <JoinWaitlist onComplete={handleWaitlistComplete} />
  }

  if (currentPage === 'why-detail' && whyDetailTopic) {
    return <WhyAciraDetail topicId={whyDetailTopic} onBack={handleBackFromWhyDetail} onGetEarlyAccess={handleGetEarlyAccess} />
  }

  return (
    <AciraLanding
      onJoinWaitlist={handleJoinWaitlist}
      onNavigateToWhyDetail={handleNavigateToWhyDetail}
      scrollTarget={scrollToSection}
    />
  )
}

export default App
