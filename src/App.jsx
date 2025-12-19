import { useState } from 'react'
import LandingPage from './components/LandingPage'
import JoinWaitlist from './components/JoinWaitlist'
import './index.css'

function App() {
  const [currentPage, setCurrentPage] = useState('landing') // 'landing' | 'waitlist'

  const handleJoinWaitlist = () => {
    setCurrentPage('waitlist')
    window.scrollTo(0, 0)
  }

  const handleWaitlistComplete = () => {
    setCurrentPage('landing')
    window.scrollTo(0, 0)
  }

  if (currentPage === 'waitlist') {
    return <JoinWaitlist onComplete={handleWaitlistComplete} />
  }

  return <LandingPage onJoinWaitlist={handleJoinWaitlist} />
}

export default App