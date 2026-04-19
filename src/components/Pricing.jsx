import React from 'react'

const Pricing = React.memo(() => {
  const plans = [
    {
      id: 1,
      name: 'Free',
      price: '0',
      description: 'Perfect for getting started',
      features: [
        '1 resume',
        'Basic templates',
        'Real-time preview',
        'PDF export',
        'Limited AI suggestions'
      ],
      cta: 'Get Started',
      popular: false
    },
    {
      id: 2,
      name: 'Pro',
      price: '9.99',
      description: 'Best for serious job seekers',
      features: [
        'Unlimited resumes',
        'All templates',
        'AI-powered suggestions',
        'ATS score checker',
        'Job matcher',
        'Version control',
        'Priority support'
      ],
      cta: 'Start Free Trial',
      popular: true
    },
    {
      id: 3,
      name: 'Team',
      price: '19.99',
      description: 'For recruitment teams',
      features: [
        'Everything in Pro',
        'Team collaboration',
        'Advanced analytics',
        'Bulk operations',
        'Custom branding',
        'API access',
        '24/7 support'
      ],
      cta: 'Contact Sales',
      popular: false
    }
  ]

  return (
    <section id="pricing" className="pricing">
      <div className="pricing-container">
        <div className="section-header">
          <h2>Simple, Transparent Pricing</h2>
          <p>Choose the plan that works best for you</p>
        </div>

        <div className="pricing-grid">
          {plans.map(plan => (
            <div
              key={plan.id}
              className={`pricing-card ${plan.popular ? 'popular' : ''}`}
            >
              {plan.popular && (
                <div className="popular-badge">Most Popular</div>
              )}

              <h3 className="plan-name">{plan.name}</h3>
              <p className="plan-description">{plan.description}</p>

              <div className="plan-price">
                <span className="currency">$</span>
                <span className="amount">{plan.price}</span>
                <span className="period">/month</span>
              </div>

              <button
                className={`btn ${
                  plan.popular ? 'btn-primary' : 'btn-secondary'
                } btn-block`}
                aria-label={`Select ${plan.name} plan`}
              >
                {plan.cta}
              </button>

              <div className="plan-features">
                {plan.features.map((feature, idx) => (
                  <div key={`${plan.id}-${idx}`} className="feature">
                    <span className="check">✓</span>
                    {feature}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
})

export default Pricing
