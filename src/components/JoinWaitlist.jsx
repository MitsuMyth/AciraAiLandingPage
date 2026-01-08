import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import './JoinWaitlist.css'

// Counter API configuration - using Miles Hilliard's free CountAPI alternative
const COUNTER_API_BASE = 'https://countapi.mileshilliard.com/api/v1'
const COUNTER_KEY = 'acira-ai-waitlist-counter' // Use a unique key for your app

const questions = [
  {
    id: 'troubleApps',
    question: 'Which applications do you use most frequently?',
    description: 'Select all that apply',
    type: 'multi-select',
    options: [
      { value: 'zoom', label: 'Zoom' },
      { value: 'teams', label: 'Microsoft Teams' },
      { value: 'meet', label: 'Google Meet' },
      { value: 'discord', label: 'Discord' },
      { value: 'slack', label: 'Slack' },
      { value: 'webex', label: 'WebEx' },
    ],
    hasOther: true
  },
  {
    id: 'issues',
    question: 'What technical issues do you encounter?',
    description: 'Select all that apply',
    type: 'multi-select',
    options: [
      { value: 'mic-not-detected', label: 'Microphone not detected' },
      { value: 'camera-not-detected', label: 'Camera not detected' },
      { value: 'audio-quality', label: 'Audio quality issues' },
      { value: 'permissions', label: 'Permission conflicts' },
      { value: 'device-switching', label: 'Device switching problems' },
    ],
    hasOther: true
  },
  {
    id: 'frequency',
    question: 'How often do these issues occur?',
    type: 'single-select',
    options: [
      { value: 'daily', label: 'Daily' },
      { value: 'weekly', label: 'Several times per week' },
      { value: 'monthly', label: 'A few times per month' },
      { value: 'rarely', label: 'Occasionally' },
    ]
  },
  {
    id: 'timeWasted',
    question: 'Average time spent troubleshooting per incident?',
    type: 'single-select',
    options: [
      { value: 'under-5', label: 'Under 5 minutes' },
      { value: '5-15', label: '5-15 minutes' },
      { value: '15-30', label: '15-30 minutes' },
      { value: 'over-30', label: 'Over 30 minutes' },
    ]
  },
  {
    id: 'interest',
    question: 'Would you use an automated solution?',
    type: 'single-select',
    options: [
      { value: 'yes-immediately', label: 'Definitely interested', highlight: true },
      { value: 'try-it', label: 'Would consider trying' },
      { value: 'maybe', label: 'Need more information' },
      { value: 'probably-not', label: 'Not interested currently' },
    ]
  },
  {
    id: 'contact',
    question: 'Contact information',
    description: 'Where should we send early access details?',
    type: 'contact-form'
  }
]

function JoinWaitlist({ onComplete }) {
  const [currentStep, setCurrentStep] = useState(0)
  const [answers, setAnswers] = useState({})
  const [otherText, setOtherText] = useState({})
  const [email, setEmail] = useState('')
  const [name, setName] = useState('')
  const [company, setCompany] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isComplete, setIsComplete] = useState(false)
  const [submitError, setSubmitError] = useState(null)
  const [fieldErrors, setFieldErrors] = useState({})
  const [direction, setDirection] = useState(1) // 1 for forward, -1 for back

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [currentStep])

  const currentQuestion = questions[currentStep]
  const totalSteps = questions.length
  const progress = ((currentStep + 1) / totalSteps) * 100

  const handleOptionSelect = (value) => {
    if (currentQuestion.type === 'single-select') {
      setAnswers({ ...answers, [currentQuestion.id]: value })
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
    const currentAnswers = answers[currentQuestion.id] || []
    
    if (currentAnswers.includes('other')) {
      setAnswers({
        ...answers,
        [currentQuestion.id]: currentAnswers.filter(v => v !== 'other')
      })
      const newOtherText = { ...otherText }
      delete newOtherText[key]
      setOtherText(newOtherText)
    } else {
      setAnswers({
        ...answers,
        [currentQuestion.id]: [...currentAnswers, 'other']
      })
      setOtherText({ ...otherText, [key]: '' })
    }
  }

  const canProceed = () => {
    if (currentQuestion.type === 'contact-form') {
      return email.trim() !== '' && email.includes('@') && email.includes('.') && name.trim().length >= 2
    }
    const answer = answers[currentQuestion.id]
    if (currentQuestion.type === 'multi-select') {
      if (!answer || answer.length === 0) return false
      // If "other" is selected, ensure they've specified what it is
      if (answer.includes('other')) {
        const otherValue = otherText[`${currentQuestion.id}-other`]
        if (!otherValue || otherValue.trim() === '') return false
      }
      return true
    }
    if (currentQuestion.type === 'single-select') {
      return answer !== undefined && answer !== null
    }
    return answer !== undefined
  }

  const handleNext = () => {
    if (canProceed() && currentStep < totalSteps - 1) {
      setDirection(1)
      setShowValidation(false)
      setCurrentStep(currentStep + 1)
    }
  }

  const handleBack = () => {
    if (currentStep > 0) {
      setDirection(-1)
      setShowValidation(false)
      setCurrentStep(currentStep - 1)
    }
  }

  const validateEmail = (emailValue) => {
    if (!emailValue.trim()) return 'Email is required'
    if (!emailValue.includes('@')) return 'Please enter a valid email'
    if (!emailValue.includes('.')) return 'Please enter a valid email'
    return null
  }

  const validateName = (nameValue) => {
    if (!nameValue.trim()) return 'Name is required'
    if (nameValue.trim().length < 2) return 'Name is too short'
    return null
  }

  const handleEmailChange = (e) => {
    const value = e.target.value
    setEmail(value)
    if (fieldErrors.email) {
      setFieldErrors({ ...fieldErrors, email: validateEmail(value) })
    }
  }

  const handleNameChange = (e) => {
    const value = e.target.value
    setName(value)
    if (fieldErrors.name) {
      setFieldErrors({ ...fieldErrors, name: validateName(value) })
    }
  }

  const handleFieldBlur = (field) => {
    if (field === 'email') {
      setFieldErrors({ ...fieldErrors, email: validateEmail(email) })
    } else if (field === 'name') {
      setFieldErrors({ ...fieldErrors, name: validateName(name) })
    }
  }

  // Get validation message for current step
  const getValidationMessage = () => {
    if (currentQuestion.type === 'single-select') {
      const answer = answers[currentQuestion.id]
      if (!answer) return 'Please select an option to continue'
      return null
    }
    if (currentQuestion.type === 'multi-select') {
      const answer = answers[currentQuestion.id]
      if (!answer || answer.length === 0) return 'Please select at least one option'
      if (answer.includes('other')) {
        const otherValue = otherText[`${currentQuestion.id}-other`]
        if (!otherValue || otherValue.trim() === '') return 'Please specify your "Other" selection'
      }
      return null
    }
    if (currentQuestion.type === 'contact-form') {
      if (!name.trim()) return 'Please enter your name'
      if (name.trim().length < 2) return 'Name must be at least 2 characters'
      if (!email.trim()) return 'Please enter your email address'
      if (!email.includes('@') || !email.includes('.')) return 'Please enter a valid email address'
      return null
    }
    return null
  }

  const [showValidation, setShowValidation] = useState(false)

  const handleContinueClick = () => {
    if (!canProceed()) {
      setShowValidation(true)
      return
    }
    setShowValidation(false)
    handleNext()
  }

  const handleSubmitClick = () => {
    if (!canProceed()) {
      setShowValidation(true)
      return
    }
    setShowValidation(false)
    handleSubmit()
  }

  // Animation variants
  const slideVariants = {
    enter: (dir) => ({
      x: dir > 0 ? 100 : -100,
      opacity: 0
    }),
    center: {
      x: 0,
      opacity: 1
    },
    exit: (dir) => ({
      x: dir > 0 ? -100 : 100,
      opacity: 0
    })
  }

  const formatAnswersForEmail = () => {
    let formattedAnswers = `
=================================
ACIRA WAITLIST SUBMISSION
=================================

CONTACT INFORMATION:
Name: ${name}
Email: ${email}
Company: ${company || 'Not provided'}

=================================
SURVEY RESPONSES:
=================================

`

    questions.forEach(q => {
      if (q.type === 'contact-form') return
      
      formattedAnswers += `\n${q.question}\n`
      formattedAnswers += '-'.repeat(50) + '\n'
      
      const answer = answers[q.id]
      if (q.type === 'single-select') {
        const option = q.options.find(opt => opt.value === answer)
        formattedAnswers += `• ${option?.label || answer}\n`
      } else if (q.type === 'multi-select') {
        if (answer && answer.length > 0) {
          answer.forEach(val => {
            if (val === 'other') {
              const otherValue = otherText[`${q.id}-other`]
              formattedAnswers += `• Other: ${otherValue || 'Not specified'}\n`
            } else {
              const option = q.options.find(opt => opt.value === val)
              formattedAnswers += `• ${option?.label || val}\n`
            }
          })
        }
      }
      formattedAnswers += '\n'
    })

    formattedAnswers += `
=================================
Submitted: ${new Date().toLocaleString()}
=================================
`

    return formattedAnswers
  }

  const handleSubmit = async () => {
    if (!canProceed()) return
    
    setIsSubmitting(true)
    setSubmitError(null)
    
    try {
      // Format data for Web3Forms
      const formData = {
        access_key: "f09d058e-268b-42d5-9f30-5ca1a9364445",
        name: name,
        email: email,
        company: company || 'Not provided',
        subject: `New Acira Waitlist Submission - ${name}`,
        message: formatAnswersForEmail(),
        from_name: "Acira Waitlist",
        replyto: email,
      }

      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify(formData)
      })

      const result = await response.json()

      if (result.success) {
        console.log('Waitlist submission successful:', result)
        
        // Increment the waitlist counter using Miles Hilliard's CountAPI
        try {
          await fetch(`${COUNTER_API_BASE}/hit/${COUNTER_KEY}`)
          console.log('Waitlist counter incremented')
        } catch (countError) {
          console.error('Failed to increment counter:', countError)
          // Don't fail the submission if counter increment fails
        }
        
        setIsComplete(true)
      } else {
        throw new Error(result.message || 'Submission failed')
      }
    } catch (error) {
      console.error('Submission error:', error)
      setSubmitError('Failed to submit. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
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
      <div className="waitlist-page">
        <div className="waitlist-header">
          <div className="waitlist-header-content">
            <button onClick={onComplete} className="header-logo">
              <img src="/logo.svg" alt="Acira Logo" className="logo-svg" />
              <span className="logo-text">Acira</span>
            </button>
          </div>
        </div>

        <div className="waitlist-container">
          <div className="waitlist-content-wrapper">
            <div className="success-content">
              <div className="success-icon">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
                  <polyline points="22 4 12 14.01 9 11.01"/>
                </svg>
              </div>
              <h1>Welcome to the waitlist</h1>
              <p className="success-description">
                Thank you for your interest in Acira. We've sent a confirmation email to <strong>{email}</strong>. You'll be notified when early access becomes available.
              </p>
              <div className="success-actions">
                <button className="btn-wishlist" onClick={onComplete}>
                  Return to Home
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="waitlist-page">
      <div className="waitlist-header">
        <div className="waitlist-header-content">
          <button onClick={onComplete} className="header-logo">
            <img src="/logo.svg" alt="Acira Logo" className="logo-svg" />
            <span className="logo-text">Acira</span>
          </button>
          <button onClick={onComplete} className="header-back">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M19 12H5M12 19l-7-7 7-7"/>
            </svg>
            Back
          </button>
        </div>
      </div>

      <div className="waitlist-container">
        <div className="waitlist-content-wrapper">
          <div className="progress-section">
            <div className="progress-bar-bg">
              <div 
                className="progress-bar-fill" 
                style={{ width: `${progress}%` }}
              />
            </div>
            <span className="progress-text">Step {currentStep + 1} of {totalSteps}</span>
          </div>

          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={currentStep}
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
              className="question-section"
            >
              <div className="question-header">
                <h1 className="question-title">{currentQuestion.question}</h1>
                {currentQuestion.description && (
                  <p className="question-description">{currentQuestion.description}</p>
                )}
              </div>

              <div className="question-content">
                {currentQuestion.type === 'single-select' && (
                  <div className="options-grid">
                    {currentQuestion.options.map((option, index) => (
                      <motion.button
                        key={option.value}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.05, duration: 0.3 }}
                        className={`option-card ${isSelected(option.value) ? 'selected' : ''} ${option.highlight ? 'highlight' : ''}`}
                        onClick={() => handleOptionSelect(option.value)}
                      >
                        <span className="option-label">{option.label}</span>
                        <div className="option-indicator">
                          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                            <polyline points="20 6 9 17 4 12"/>
                          </svg>
                        </div>
                      </motion.button>
                    ))}
                  </div>
                )}

                {currentQuestion.type === 'multi-select' && (
                  <div className="options-grid">
                    {currentQuestion.options.map((option, index) => (
                      <motion.button
                        key={option.value}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.05, duration: 0.3 }}
                        className={`option-card ${isSelected(option.value) ? 'selected' : ''}`}
                        onClick={() => handleOptionSelect(option.value)}
                      >
                        <span className="option-label">{option.label}</span>
                        <div className="option-checkbox">
                          {isSelected(option.value) && (
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                              <polyline points="20 6 9 17 4 12"/>
                            </svg>
                          )}
                        </div>
                      </motion.button>
                    ))}

                    {currentQuestion.hasOther && (
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: currentQuestion.options.length * 0.05, duration: 0.3 }}
                        className="other-option"
                      >
                        <button
                          className={`option-card ${isSelected('other') ? 'selected' : ''}`}
                          onClick={handleOtherToggle}
                        >
                          <span className="option-label">Other</span>
                          <div className="option-checkbox">
                            {isSelected('other') && (
                              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                                <polyline points="20 6 9 17 4 12"/>
                              </svg>
                            )}
                          </div>
                        </button>
                        <AnimatePresence>
                          {isSelected('other') && (
                            <motion.input
                              initial={{ opacity: 0, height: 0 }}
                              animate={{ opacity: 1, height: 'auto' }}
                              exit={{ opacity: 0, height: 0 }}
                              transition={{ duration: 0.2 }}
                              type="text"
                              className="other-input"
                              placeholder="Please specify"
                              value={otherText[`${currentQuestion.id}-other`] || ''}
                              onChange={(e) => setOtherText({
                                ...otherText,
                                [`${currentQuestion.id}-other`]: e.target.value
                              })}
                              autoFocus
                            />
                          )}
                        </AnimatePresence>
                      </motion.div>
                    )}
                  </div>
                )}

                {currentQuestion.type === 'contact-form' && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                    className="contact-form"
                  >
                    <div className="form-row">
                      <div className={`form-field ${fieldErrors.name ? 'has-error' : ''}`}>
                        <label htmlFor="name">Full name *</label>
                        <input
                          type="text"
                          id="name"
                          placeholder="John Doe"
                          value={name}
                          onChange={handleNameChange}
                          onBlur={() => handleFieldBlur('name')}
                          autoFocus
                        />
                        <AnimatePresence>
                          {fieldErrors.name && (
                            <motion.span
                              initial={{ opacity: 0, y: -10 }}
                              animate={{ opacity: 1, y: 0 }}
                              exit={{ opacity: 0, y: -10 }}
                              className="field-error"
                            >
                              {fieldErrors.name}
                            </motion.span>
                          )}
                        </AnimatePresence>
                      </div>

                      <div className={`form-field ${fieldErrors.email ? 'has-error' : ''}`}>
                        <label htmlFor="email">Email address *</label>
                        <input
                          type="email"
                          id="email"
                          placeholder="john@company.com"
                          value={email}
                          onChange={handleEmailChange}
                          onBlur={() => handleFieldBlur('email')}
                        />
                        <AnimatePresence>
                          {fieldErrors.email && (
                            <motion.span
                              initial={{ opacity: 0, y: -10 }}
                              animate={{ opacity: 1, y: 0 }}
                              exit={{ opacity: 0, y: -10 }}
                              className="field-error"
                            >
                              {fieldErrors.email}
                            </motion.span>
                          )}
                        </AnimatePresence>
                      </div>
                    </div>

                    <div className="form-field">
                      <label htmlFor="company">
                        Company <span className="optional">(optional)</span>
                      </label>
                      <input
                        type="text"
                        id="company"
                        placeholder="Your company name"
                        value={company}
                        onChange={(e) => setCompany(e.target.value)}
                      />
                    </div>

                    <AnimatePresence>
                      {submitError && (
                        <motion.div
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -10 }}
                          className="error-message"
                        >
                          {submitError}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                )}
              </div>
            </motion.div>
          </AnimatePresence>

          <div className="question-actions-wrapper">
            <AnimatePresence>
              {showValidation && getValidationMessage() && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="validation-message"
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <circle cx="12" cy="12" r="10"/>
                    <line x1="12" y1="8" x2="12" y2="12"/>
                    <line x1="12" y1="16" x2="12.01" y2="16"/>
                  </svg>
                  {getValidationMessage()}
                </motion.div>
              )}
            </AnimatePresence>

            <div className="question-actions">
              {currentStep > 0 && (
                <button className="btn-back" onClick={handleBack}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M19 12H5M12 19l-7-7 7-7"/>
                  </svg>
                  Back
                </button>
              )}

              <div className="actions-spacer" />

              {(currentQuestion.type === 'single-select' || currentQuestion.type === 'multi-select') && (
                <button
                  className="btn-wishlist"
                  onClick={handleContinueClick}
                >
                  Continue
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M5 12h14M12 5l7 7-7 7"/>
                  </svg>
                </button>
              )}

              {currentQuestion.type === 'contact-form' && (
                <button
                  className="btn-wishlist btn-submit"
                  onClick={handleSubmitClick}
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <>
                      <span className="spinner"></span>
                      Submitting...
                    </>
                  ) : (
                    <>
                      Join Waitlist
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <polyline points="20 6 9 17 4 12"/>
                      </svg>
                    </>
                  )}
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default JoinWaitlist