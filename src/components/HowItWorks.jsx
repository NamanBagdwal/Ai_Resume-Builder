import React from 'react'

function HowItWorks() {
  const steps = [
    {
      number: 1,
      title: 'Create Account',
      description: 'Sign up in seconds with your email or social account',
      icon: '👤'
    },
    {
      number: 2,
      title: 'Fill Your Info',
      description: 'Add your work experience, education, and skills with our guided editor',
      icon: '📝'
    },
    {
      number: 3,
      title: 'Get AI Suggestions',
      description: 'Receive smart suggestions to improve bullet points and content',
      icon: '✨'
    },
    {
      number: 4,
      title: 'Optimize & Export',
      description: 'Check ATS score, match against jobs, and download as PDF',
      icon: '📊'
    }
  ]

  return (
    <section id="how-it-works" className="how-it-works">
      <div className="how-it-works-container">
        <div className="section-header">
          <h2>How ResumeAI Works</h2>
          <p>Four simple steps to your dream job</p>
        </div>

        <div className="steps-container">
          {steps.map((step, idx) => (
            <div key={step.number} className="step">
              <div className="step-number">{step.number}</div>
              <div className="step-content">
                <div className="step-icon">{step.icon}</div>
                <h3 className="step-title">{step.title}</h3>
                <p className="step-description">{step.description}</p>
              </div>
              {idx < steps.length - 1 && <div className="step-arrow">→</div>}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default HowItWorks
