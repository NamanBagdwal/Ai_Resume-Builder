import React from 'react'

function Testimonials() {
  const testimonials = [
    {
      id: 1,
      quote: "ResumeAI helped me land interviews at Google and Microsoft. The ATS optimization features are game-changing!",
      author: 'Sarah Chen',
      role: 'Software Engineer',
      avatar: '👩‍💻'
    },
    {
      id: 2,
      quote: "I used the job matcher to tailor my resume for 5 different positions and got callbacks from all of them. Incredible!",
      author: 'James Mitchell',
      role: 'Product Manager',
      avatar: '👨‍💼'
    },
    {
      id: 3,
      quote: "The AI suggestions completely transformed my weak bullet points. This tool paid for itself on my first day at my new job.",
      author: 'Emily Rodriguez',
      role: 'Data Scientist',
      avatar: '👩‍🔬'
    }
  ]

  return (
    <section id="testimonials" className="testimonials">
      <div className="testimonials-container">
        <div className="section-header">
          <h2>Loved by Job Seekers</h2>
          <p>See what users are saying about ResumeAI</p>
        </div>

        <div className="testimonials-grid">
          {testimonials.map(testimonial => (
            <div key={testimonial.id} className="testimonial-card">
              <div className="testimonial-rating">
                ⭐⭐⭐⭐⭐
              </div>
              <p className="testimonial-quote">"{testimonial.quote}"</p>
              <div className="testimonial-author">
                <div className="author-avatar">{testimonial.avatar}</div>
                <div className="author-info">
                  <p className="author-name">{testimonial.author}</p>
                  <p className="author-role">{testimonial.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Testimonials
