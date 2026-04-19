import React from 'react'

function Hero() {
  return (
    <section className="hero">
      <div className="hero-content">
        <h1 className="hero-title">
          Create Your Perfect Resume in Minutes
        </h1>
        <p className="hero-subtitle">
          Powered by AI. Optimized for ATS. Loved by job seekers.
        </p>
        <p className="hero-description">
          Build a professional resume with AI-powered suggestions, real-time ATS scoring, and job-specific tailoring. Land more interviews, not rejections.
        </p>
        
        <div className="hero-cta">
          <button className="btn btn-primary btn-large">
            Start Building Free
          </button>
          <button className="btn btn-secondary btn-large">
            Watch Demo →
          </button>
        </div>

        <div className="hero-stats">
          <div className="stat">
            <span className="stat-number">50K+</span>
            <span className="stat-label">Resumes Created</span>
          </div>
          <div className="stat">
            <span className="stat-number">92%</span>
            <span className="stat-label">ATS Pass Rate</span>
          </div>
          <div className="stat">
            <span className="stat-number">4.9★</span>
            <span className="stat-label">User Rating</span>
          </div>
        </div>
      </div>

      <div className="hero-visual">
        <div className="resume-preview">
          <div className="preview-header">
            <div className="preview-line" style={{width: '60%'}}></div>
            <div className="preview-line" style={{width: '70%'}}></div>
          </div>
          <div className="preview-body">
            <div className="preview-line" style={{width: '80%'}}></div>
            <div className="preview-line" style={{width: '90%'}}></div>
            <div className="preview-line" style={{width: '75%'}}></div>
            <div className="preview-line" style={{width: '85%'}}></div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Hero
