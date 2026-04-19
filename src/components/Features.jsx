import React from 'react'

function Features() {
  const features = [
    {
      id: 1,
      icon: '✨',
      title: 'Smart Resume Builder',
      description: 'Drag-and-drop section editor with real-time preview and multiple professional templates.',
      points: ['Drag-and-drop editing', 'Live preview', 'Professional templates']
    },
    {
      id: 2,
      icon: '🤖',
      title: 'AI-Powered Enhancements',
      description: 'Get intelligent suggestions to improve your resume content.',
      points: ['Bullet point optimizer', 'Content rewriting', 'Action-verb suggestions']
    },
    {
      id: 3,
      icon: '🎯',
      title: 'Job Matcher',
      description: 'Compare your resume against job descriptions and get a match score.',
      points: ['Match percentage', 'Missing keywords', 'Suggested edits']
    },
    {
      id: 4,
      icon: '📊',
      title: 'ATS Score Checker',
      description: 'Simulate ATS scoring to ensure your resume passes automated screening.',
      points: ['ATS simulation', 'Score suggestions', 'Format optimization']
    },
    {
      id: 5,
      icon: '🔄',
      title: 'Version Control',
      description: 'Save and manage multiple resume versions for different job applications.',
      points: ['Save versions', 'Track changes', 'One-click export']
    },
    {
      id: 6,
      icon: '📥',
      title: 'Easy Export',
      description: 'Download as PDF or get a shareable link to showcase your resume.',
      points: ['PDF download', 'Shareable links', 'Multiple formats']
    }
  ]

  return (
    <section id="features" className="features">
      <div className="features-container">
        <div className="section-header">
          <h2>Powerful Features</h2>
          <p>Everything you need to build a resume that gets interviews</p>
        </div>

        <div className="features-grid">
          {features.map(feature => (
            <div key={feature.id} className="feature-card">
              <div className="feature-icon">{feature.icon}</div>
              <h3 className="feature-title">{feature.title}</h3>
              <p className="feature-description">{feature.description}</p>
              <ul className="feature-points">
                {feature.points.map((point, idx) => (
                  <li key={idx}>
                    <span className="check">✓</span>
                    {point}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Features
