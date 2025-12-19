import { useState, useEffect, useRef } from 'react'
import './AIProblemSolver.css'

const AIProblemSolver = () => {
  const [phase, setPhase] = useState('initial') // 'initial' | 'thinking' | 'responding' | 'complete'
  const [displayedText, setDisplayedText] = useState('')
  const [showCursor, setShowCursor] = useState(true)
  const cursorBlinkInterval = useRef(null)

  // Mock AI response with rich formatting
  const aiResponse = `I've identified **3 potential causes** for your microphone issue:

**1. Audio driver conflict** — Your system has multiple audio drivers competing for the same device. I can reset the priority settings.

**2. App permissions** — Zoom doesn't have full microphone access. I'll update the system permissions.

**3. Default device mismatch** — Windows is routing audio to a different device than Zoom expects.

I can fix all of these automatically. Would you like me to proceed?`

  // Typewriter animation with variable speed and pauses
  useEffect(() => {
    if (phase !== 'responding') return

    let index = 0
    const text = aiResponse
    
    const typeCharacter = () => {
      if (index >= text.length) {
        setPhase('complete')
        return
      }

      const char = text[index]
      
      // Strategic pauses for intelligence illusion
      let delay = 50 // base speed
      
      // Slower for punctuation (thinking pause)
      if (char === '.' || char === ',' || char === '?') {
        delay = 300
      }
      // Slower for asterisks (emphasis)
      else if (char === '*') {
        delay = 100
      }
      // Faster for spaces
      else if (char === ' ') {
        delay = 30
      }
      // Variable speed for letters
      else {
        delay = 40 + Math.random() * 40
      }

      // Pause before important words
      const nextWord = text.slice(index + 1, index + 15).toLowerCase()
      if (nextWord.includes('driver') || nextWord.includes('permission') || nextWord.includes('fix')) {
        delay += 200
      }

      setTimeout(() => {
        setDisplayedText(text.slice(0, index + 1))
        index++
        typeCharacter()
      }, delay)
    }

    typeCharacter()
  }, [phase])

  // Cursor blink animation
  useEffect(() => {
    if (phase === 'responding' || phase === 'complete') {
      cursorBlinkInterval.current = setInterval(() => {
        setShowCursor(prev => !prev)
      }, 530)
    }
    
    return () => {
      if (cursorBlinkInterval.current) {
        clearInterval(cursorBlinkInterval.current)
      }
    }
  }, [phase])

  const handleDemo = () => {
    setPhase('thinking')
    setDisplayedText('')
    
    setTimeout(() => {
      setPhase('responding')
    }, 1800)
  }

  const handleReset = () => {
    setPhase('initial')
    setDisplayedText('')
  }

  // Format text with bold support
  const formatText = (text) => {
    const parts = text.split(/(\*\*.*?\*\*)/)
    return parts.map((part, i) => {
      if (part.startsWith('**') && part.endsWith('**')) {
        return <strong key={i}>{part.slice(2, -2)}</strong>
      }
      return part
    })
  }

  return (
    <div className="ai-problem-solver">
      {phase === 'initial' && (
        <div className="demo-prompt">
          <div className="demo-mockup">
            <div className="mockup-header">
              <div className="mockup-dots">
                <span></span>
                <span></span>
                <span></span>
              </div>
              <span className="mockup-title">Acira Dashboard</span>
            </div>
            <div className="mockup-content">
              <div className="mockup-input">
                <span className="mockup-placeholder">My microphone isn't working in Zoom...</span>
              </div>
              <div className="mockup-status">
                <div className="status-dot"></div>
                <span>AI analyzing system</span>
              </div>
            </div>
          </div>
          
          <button onClick={handleDemo} className="demo-btn">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <polygon points="5 3 19 12 5 21 5 3"/>
            </svg>
            See AI in Action
          </button>
          
          <p className="demo-hint">Watch how Acira diagnoses and fixes problems automatically</p>
        </div>
      )}

      {phase === 'thinking' && (
        <div className="ai-thinking">
          <div className="thinking-dots">
            <span className="dot" style={{ animationDelay: '0s' }} />
            <span className="dot" style={{ animationDelay: '0.2s' }} />
            <span className="dot" style={{ animationDelay: '0.4s' }} />
          </div>
          <p className="thinking-text">Analyzing system configuration...</p>
        </div>
      )}

      {(phase === 'responding' || phase === 'complete') && (
        <div className="ai-response">
          <div className="response-header">
            <div className="ai-avatar">
              <img src="/logo.svg" alt="Acira Logo" className="logo-svg" />

            </div>
            <span className="ai-label">Acira AI</span>
          </div>
          
          <div className="response-content">
            {formatText(displayedText)}
            {phase === 'responding' && showCursor && <span className="cursor">|</span>}
          </div>

          {phase === 'complete' && (
            <button onClick={handleReset} className="reset-btn">
              Try another demo
            </button>
          )}
        </div>
      )}
    </div>
  )
}

export default AIProblemSolver