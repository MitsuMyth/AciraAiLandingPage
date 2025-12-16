import { useState, useEffect } from 'react'
import './JoinWaitlist.css'

const questions = [
  {
    id: 'troubleApps',
    question: 'Which app(s) give you the most trouble?',
    type: 'multi-select',
    options: [
      { value: 'zoom', label: 'Zoom', icon: '🎥' },
      { value: 'teams', label: 'Microsoft Teams', icon: '💼' },
      { value: 'meet', label: 'Google Meet', icon: '📹' },
      { value: 'discord', label: 'Discord', icon: '🎮' },
    ],
    hasOther: true
  },
  {
    id: 'issues',
    question: 'What usually goes wrong?',
    type: 'multi-select',
    options: [
      { value: 'mic-not-detected', label: 'Mic not detected', icon: '🎤' },
      { value: 'camera-not-detected', label: 'Camera not detected', icon: '📷' },
      { value: 'access-but-no-work', label: 'App has access but mic/camera don\'t work', icon: '⚠️' },
    ],
    hasOther: true
  },
  {
    id: 'frequency',
    question: 'How often does this happen?',
    type: 'single-select',
    options: [
      { value: 'daily', label: 'Almost every day' },
      { value: 'weekly', label: 'A few times per week' },
      { value: 'monthly', label: 'A few times per month' },
      { value: 'rarely', label: 'Rarely' },
    ]
  },
  {
    id: 'timeWasted',
    question: 'How much time do you usually waste fixing it?',
    type: 'single-select',
    options: [
      { value: 'under-5', label: '<5 minutes' },
      { value: '5-15', label: '5–15 minutes' },
      { value: '15-30', label: '15–30 minutes' },
      { value: 'over-30', label: 'More than 30 minutes' },
    ]
  },
  {
    id: 'interest',
    question: 'If Acira fixed this automatically, would you use it?',
    type: 'single-select',
    options: [
      { value: 'yes-immediately', label: 'Yes, immediately', highlight: true },
      { value: 'try-it', label: 'I\'d try it' },
      { value: 'maybe', label: 'Maybe' },
      { value: 'probably-not', label: 'Probably not' },
    ]
  },
  {
    id: 'contact',
    question: 'Almost there! Where should we reach you?',
    type: 'contact-form'
  }
]

function JoinWaitlist({ onClose }) {
  const [currentStep, setCurrentStep] = useState(0)
  const [answers, setAnswers] = useState({})
  const [otherText, setOtherText] = useState({})
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [feedback, setFeedback] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isComplete, setIsComplete] = useState(false)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    setTimeout(() => setIsVisible(true), 10)
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = ''
    }
  }, [])

  const currentQuestion = questions[currentStep]
  const totalSteps = questions.length
  const progress = ((currentStep + 1) / totalSteps) * 100

  const handleOptionSelect = (value) => {
    if (currentQuestion.type === 'single-select') {
      setAnswers({ ...answers, [currentQuestion.id]: value })
      setTimeout(() => {
        if (currentStep < totalSteps - 1) {
          setCurrentStep(currentStep + 1)
        }
      }, 300)
    } else if (currentQuestion.type === 'multi-select') {
      const currentAnswers = answers[currentQuestion.id] || []
      if (currentAnswers.includes(value)) {
        setAnswers({
          ...answers,
          [currentQuestion.id]: currentAnswers.filter(v => v !== value)
        })
      } else {
        setAnswers({
          ...answers,
          [currentQuestion.id]: [...currentAnswers, value]
        })
      }
    }
  }

  const handleOtherToggle = () => {
    const key = `${currentQuestion.id}-other`
    if (otherText[key] !== undefined) {
      const newOtherText = { ...otherText }
      delete newOtherText[key]
      setOtherText(newOtherText)
    } else {
      setOtherText({ ...otherText, [key]: '' })
    }
  }

  const canProceed = () => {
    if (currentQuestion.type === 'contact-form') {
      return email.trim() !== '' && email.includes('@')
    }
    const answer = answers[currentQuestion.id]
    if (currentQuestion.type === 'multi-select') {
      const hasSelection = answer && answer.length > 0
      const hasOther = otherText[`${currentQuestion.id}-other`]?.trim()
      return hasSelection || hasOther
    }
    return answer !== undefined
  }

  const handleNext = () => {
    if (currentStep < totalSteps - 1) {
      setCurrentStep(currentStep + 1)
    }
  }

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1)
    }
  }

  const handleSubmit = async () => {
    if (!canProceed()) return
    
    setIsSubmitting(true)
    
    const submissionData = {
      ...answers,
      otherResponses: otherText,
      email,
      phone: phone || null,
      feedback: feedback || null,
      submittedAt: new Date().toISOString()
    }
    
    console.log('Waitlist submission:', submissionData)
    
    await new Promise(resolve => setTimeout(resolve, 1500))
    
    setIsSubmitting(false)
    setIsComplete(true)
  }

  const handleClose = () => {
    setIsVisible(false)
    setTimeout(onClose, 300)
  }

  const isSelected = (value) => {
    const answer = answers[currentQuestion.id]
    if (currentQuestion.type === 'multi-select') {
      return answer && answer.includes(value)
    }
    return answer === value
  }

  if (isComplete) {
    return (
      <div className={`waitlist-overlay ${isVisible ? 'visible' : ''}`}>
        <div className="waitlist-modal success-modal">
          <button className="modal-close" onClick={handleClose}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M18 6L6 18M6 6l12 12"/>
            </svg>
          </button>
          
          <div className="success-content">
            <div className="success-icon">
              <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
                <polyline points="22 4 12 14.01 9 11.01"/>
              </svg>
            </div>
            <h2>You're on the list!</h2>
            <p>Thanks for joining the Acira waitlist. We'll reach out soon with early access details.</p>
            <div className="success-details">
              <span className="detail-badge">📧 Confirmation sent to {email}</span>
            </div>
            <button className="btn-primary" onClick={handleClose}>
              Done
            </button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className={`waitlist-overlay ${isVisible ? 'visible' : ''}`}>
      <div className="waitlist-modal">
        <button className="modal-close" onClick={handleClose}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M18 6L6 18M6 6l12 12"/>
          </svg>
        </button>

        <div className="modal-header">
          <div className="progress-container">
            <div className="progress-bar-bg">
              <div 
                className="progress-bar-fill" 
                style={{ width: `${progress}%` }}
              />
            </div>
            <span className="progress-text">{currentStep + 1} of {totalSteps}</span>
          </div>
        </div>

        <div className="modal-content">
          <div className="question-container" key={currentStep}>
            <h2 className="question-text">{currentQuestion.question}</h2>

            {currentQuestion.type === 'single-select' && (
              <div className="options-grid single">
                {currentQuestion.options.map((option) => (
                  <button
                    key={option.value}
                    className={`option-button ${isSelected(option.value) ? 'selected' : ''} ${option.highlight ? 'highlight' : ''}`}
                    onClick={() => handleOptionSelect(option.value)}
                  >
                    {option.icon && <span className="option-icon">{option.icon}</span>}
                    <span className="option-label">{option.label}</span>
                    <div className="option-check">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                        <polyline points="20 6 9 17 4 12"/>
                      </svg>
                    </div>
                  </button>
                ))}
              </div>
            )}

            {currentQuestion.type === 'multi-select' && (
              <>
                <p className="question-hint">Select all that apply</p>
                <div className="options-grid multi">
                  {currentQuestion.options.map((option) => (
                    <button
                      key={option.value}
                      className={`option-button ${isSelected(option.value) ? 'selected' : ''}`}
                      onClick={() => handleOptionSelect(option.value)}
                    >
                      {option.icon && <span className="option-icon">{option.icon}</span>}
                      <span className="option-label">{option.label}</span>
                      <div className="option-checkbox">
                        {isSelected(option.value) && (
                          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                            <polyline points="20 6 9 17 4 12"/>
                          </svg>
                        )}
                      </div>
                    </button>
                  ))}
                  
                  {currentQuestion.hasOther && (
                    <div className="other-option">
                      <button
                        className={`option-button other-button ${otherText[`${currentQuestion.id}-other`] !== undefined ? 'selected' : ''}`}
                        onClick={handleOtherToggle}
                      >
                        <span className="option-icon">✏️</span>
                        <span className="option-label">Other</span>
                        <div className="option-checkbox">
                          {otherText[`${currentQuestion.id}-other`] !== undefined && (
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                              <polyline points="20 6 9 17 4 12"/>
                            </svg>
                          )}
                        </div>
                      </button>
                      {otherText[`${currentQuestion.id}-other`] !== undefined && (
                        <input
                          type="text"
                          className="other-input"
                          placeholder="Please specify..."
                          value={otherText[`${currentQuestion.id}-other`]}
                          onChange={(e) => setOtherText({
                            ...otherText,
                            [`${currentQuestion.id}-other`]: e.target.value
                          })}
                          autoFocus
                        />
                      )}
                    </div>
                  )}
                </div>
              </>
            )}

            {currentQuestion.type === 'contact-form' && (
              <div className="contact-form-section">
                <div className="form-field">
                  <label htmlFor="waitlist-email">Email *</label>
                  <input
                    type="email"
                    id="waitlist-email"
                    placeholder="you@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    autoFocus
                  />
                </div>
                
                <div className="form-field">
                  <label htmlFor="waitlist-phone">
                    Phone <span className="optional">(optional)</span>
                  </label>
                  <input
                    type="tel"
                    id="waitlist-phone"
                    placeholder="+1 (555) 000-0000"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                  />
                </div>
                
                <div className="form-field">
                  <label htmlFor="waitlist-feedback">
                    Additional feedback <span className="optional">(optional)</span>
                  </label>
                  <textarea
                    id="waitlist-feedback"
                    placeholder="Would you like to provide any additional feedback?"
                    value={feedback}
                    onChange={(e) => setFeedback(e.target.value)}
                    rows="3"
                  />
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="modal-footer">
          {currentStep > 0 && (
            <button className="btn-back" onClick={handleBack}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M19 12H5M12 19l-7-7 7-7"/>
              </svg>
              Back
            </button>
          )}
          
          <div className="footer-spacer" />
          
          {currentQuestion.type === 'multi-select' && (
            <button 
              className="btn-next" 
              onClick={handleNext}
              disabled={!canProceed()}
            >
              Continue
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M5 12h14M12 5l7 7-7 7"/>
              </svg>
            </button>
          )}
          
          {currentQuestion.type === 'contact-form' && (
            <button 
              className="btn-submit" 
              onClick={handleSubmit}
              disabled={!canProceed() || isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <span className="spinner"></span>
                  Joining...
                </>
              ) : (
                <>
                  Join Waitlist
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M5 12h14M12 5l7 7-7 7"/>
                  </svg>
                </>
              )}
            </button>
          )}
        </div>
      </div>
    </div>
  )
}

export default JoinWaitlist
