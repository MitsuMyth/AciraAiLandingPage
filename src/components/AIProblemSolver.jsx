import { useState, useEffect, useRef } from 'react'
import './AIProblemSolver.css'

const AIProblemSolver = () => {
  const [phase, setPhase] = useState('scanning') // 'scanning' | 'analyzing' | 'fixing' | 'complete'
  const [progress, setProgress] = useState(0)
  const [currentIssue, setCurrentIssue] = useState(0)
  const [fixedIssues, setFixedIssues] = useState([])
  
  const issues = [
    { 
      id: 1, 
      name: 'Audio Driver Conflict', 
      status: 'Detected',
      icon: 'alert',
      color: '#ef4444'
    },
    { 
      id: 2, 
      name: 'Zoom Permissions', 
      status: 'Missing Access',
      icon: 'lock',
      color: '#f59e0b'
    },
    { 
      id: 3, 
      name: 'Default Device Mismatch', 
      status: 'Configuration Error',
      icon: 'settings',
      color: '#ef4444'
    }
  ]

  const systemStats = [
    { label: 'CPU', value: '23%' },
    { label: 'Memory', value: '4.2 GB' },
    { label: 'Network', value: 'Stable' }
  ]

  // Auto-play the demo sequence
  useEffect(() => {
    const sequence = async () => {
      // Phase 1: Scanning (0-25%)
      setPhase('scanning')
      await animateProgress(0, 25, 2000)
      
      // Phase 2: Analyzing (25-50%)
      setPhase('analyzing')
      await animateProgress(25, 50, 1500)
      
      // Phase 3: Fixing issues one by one (50-100%)
      setPhase('fixing')
      for (let i = 0; i < issues.length; i++) {
        setCurrentIssue(i)
        await animateProgress(50 + (i * 16), 50 + ((i + 1) * 16), 1200)
        setFixedIssues(prev => [...prev, issues[i].id])
        await delay(400)
      }
      
      // Complete
      await animateProgress(98, 100, 300)
      setPhase('complete')
      
      // Reset and loop after 4 seconds
      await delay(4000)
      resetDemo()
    }

    sequence()
  }, [])

  const animateProgress = (from, to, duration) => {
    return new Promise(resolve => {
      const startTime = Date.now()
      const animate = () => {
        const elapsed = Date.now() - startTime
        const progress = Math.min(elapsed / duration, 1)
        const eased = easeOutCubic(progress)
        const current = from + (to - from) * eased
        
        setProgress(current)
        
        if (progress < 1) {
          requestAnimationFrame(animate)
        } else {
          resolve()
        }
      }
      requestAnimationFrame(animate)
    })
  }

  const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms))

  const easeOutCubic = (t) => 1 - Math.pow(1 - t, 3)

  const resetDemo = () => {
    setPhase('scanning')
    setProgress(0)
    setCurrentIssue(0)
    setFixedIssues([])
  }

  const getPhaseText = () => {
    switch(phase) {
      case 'scanning': return 'Scanning system components...'
      case 'analyzing': return 'Analyzing detected issues...'
      case 'fixing': return `Fixing ${issues[currentIssue]?.name}...`
      case 'complete': return 'All issues resolved'
      default: return 'Initializing...'
    }
  }

  return (
    <div className="ai-problem-solver">
      <div className="solver-container">
        {/* Header */}
        <div className="solver-header">
          <div className="header-left">
            <div className="status-indicator">
              <div className={`status-dot ${phase === 'complete' ? 'complete' : 'active'}`}></div>
              <span className="status-text">
                {phase === 'complete' ? 'System Healthy' : 'Active Repair'}
              </span>
            </div>
          </div>
          <div className="header-right">
            <span className="progress-text">{Math.round(progress)}%</span>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="solver-progress">
          <div className="progress-track">
            <div 
              className="progress-fill" 
              style={{ width: `${progress}%` }}
            >
              <div className="progress-glow"></div>
            </div>
          </div>
          <p className="phase-text">{getPhaseText()}</p>
        </div>

        {/* Issues List */}
        <div className="issues-section">
          <div className="section-header">
            <h3>Detected Issues</h3>
            <span className="issue-count">{fixedIssues.length}/{issues.length}</span>
          </div>
          
          <div className="issues-list">
            {issues.map((issue, index) => (
              <div 
                key={issue.id} 
                className={`issue-item ${
                  fixedIssues.includes(issue.id) ? 'fixed' : 
                  currentIssue === index && phase === 'fixing' ? 'fixing' : 
                  ''
                }`}
              >
                <div className="issue-icon">
                  {fixedIssues.includes(issue.id) ? (
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                      <polyline points="20 6 9 17 4 12"/>
                    </svg>
                  ) : currentIssue === index && phase === 'fixing' ? (
                    <div className="spinner-small"></div>
                  ) : (
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <circle cx="12" cy="12" r="10"/>
                      <line x1="12" y1="8" x2="12" y2="12"/>
                      <line x1="12" y1="16" x2="12.01" y2="16"/>
                    </svg>
                  )}
                </div>
                
                <div className="issue-details">
                  <div className="issue-name">{issue.name}</div>
                  <div className="issue-status">
                    {fixedIssues.includes(issue.id) ? 'Resolved' : 
                     currentIssue === index && phase === 'fixing' ? 'Fixing...' : 
                     issue.status}
                  </div>
                </div>

                {currentIssue === index && phase === 'fixing' && (
                  <div className="issue-progress">
                    <div className="issue-progress-bar"></div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* System Stats */}
        <div className="stats-section">
          <div className="stats-grid">
            {systemStats.map((stat, index) => (
              <div key={index} className="stat-item">
                <div className="stat-label">{stat.label}</div>
                <div className="stat-value">{stat.value}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Complete State */}
        {phase === 'complete' && (
          <div className="complete-banner">
            <div className="complete-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
                <polyline points="22 4 12 14.01 9 11.01"/>
              </svg>
            </div>
            <div className="complete-text">
              <div className="complete-title">System Optimized</div>
              <div className="complete-subtitle">All issues resolved automatically</div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default AIProblemSolver