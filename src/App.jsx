import { useState } from 'react'
import LandingPage from './components/LandingPage'
import JoinWaitlist from './components/JoinWaitlist'

function App() {
  const [showWaitlist, setShowWaitlist] = useState(false)

  const openWaitlist = () => setShowWaitlist(true)
  const closeWaitlist = () => setShowWaitlist(false)

  return (
    <>
      <LandingPage onJoinWaitlist={openWaitlist} />
      {showWaitlist && <JoinWaitlist onClose={closeWaitlist} />}
    </>
  )
}

export default App
