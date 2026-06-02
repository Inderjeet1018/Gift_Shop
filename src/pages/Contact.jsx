import { useState } from 'react'
import './Contact.css'

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  })
  const [submitted, setSubmitted] = useState(false)

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    // In a real app you'd POST to an API. For demo we just show success.
    console.log('Contact form submitted:', formData)
    setSubmitted(true)
    setFormData({ name: '', email: '', subject: '', message: '' })
    setTimeout(() => setSubmitted(false), 5000)
  }

  return (
    <div className="page contact-page">
      <section className="contact-hero enhanced-hero">
        <div className="contact-hero-inner container">
          <div className="hero-text">
            <h1>CONTACT</h1>
            <p className="lead">Send a heartfelt gift — we'll handle the rest. Reach out for custom orders, corporate gifting, or delivery requests.</p>
            <div className="hero-cta">
              <a href="#contact-form" className="btn primary">Send a Message</a>
              <a href="#locations" className="btn">Our Locations</a>
            </div>
          </div>
          <div className="hero-illustration" aria-hidden>
            <div className="gift-blob">🎁</div>
          </div>
        </div>
      </section>

      <section className="contact-content">
        <div className="container">
          <div className="contact-grid">
            <div className="left-pane">
              <div id="locations" className="cards">
                <div className="info-card">
                  <div className="info-icon">📍</div>
                  <div>
                    <h3>Visit Us</h3>
                    <p>New  Street<br/>Ajmer<br/>Rajasthan, </p>
                  </div>
                </div>

                <div className="info-card">
                  <div className="info-icon">📞</div>
                  <div>
                    <h3>Call Us</h3>
                    <p>+91 123 456 7890<br/>Mon–Fri: 9AM–6PM</p>
                  </div>
                </div>

                <div className="info-card">
                  <div className="info-icon">✉️</div>
                  <div>
                    <h3>Email</h3>
                    <p>mememoriessupport@gmail.com<br/>memories01@gmail.com</p>
                  </div>
                </div>

                <div className="social-card">
                  <h4>Follow Us</h4>
                  <div className="social-links">
                    <a href="#" aria-label="Instagram" className="social instagram">Instagram</a>
                    <a href="#" aria-label="Facebook" className="social facebook">Facebook</a>
                    <a href="#" aria-label="X" className="social x">X</a>
                  </div>
                </div>
              </div>

              <div className="map-wrap">
                <iframe
                  title="Our location"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d24156.123456789!2d-74.0060!3d40.7128!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMzTCsDQyJzQ2LjAiTiA3NMKwMDAnMDAuMCJX!5e0!3m2!1sen!2sus!4v0000000000000"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
            </div>

            <aside className="right-pane">
              <div className="contact-form-wrapper">
                <h2 id="contact-form">Send us a Message</h2>

                {submitted && (
                  <div className="success-message">
                    ✓ Thank you — we'll get back to you shortly.
                  </div>
                )}

                <form onSubmit={handleSubmit} className="contact-form" aria-label="Contact form">
                  <div className="form-row">
                    <div className="form-group">
                      <label htmlFor="name">Full Name</label>
                      <input id="name" name="name" value={formData.name} onChange={handleChange} placeholder="Jane Doe" required />
                    </div>
                    <div className="form-group">
                      <label htmlFor="email">Email</label>
                      <input id="email" name="email" type="email" value={formData.email} onChange={handleChange} placeholder="jane@example.com" required />
                    </div>
                  </div>

                  <div className="form-group">
                    <label htmlFor="subject">Subject</label>
                    <input id="subject" name="subject" value={formData.subject} onChange={handleChange} placeholder="How can we help?" />
                  </div>

                  <div className="form-group">
                    <label htmlFor="message">Message</label>
                    <textarea id="message"  name="message" style={{resize: "none"}} rows="6" value={formData.message} onChange={handleChange} placeholder="Tell us more..." required />
                  </div>

                  <button type="submit" className="btn primary">Send Message</button>
                </form>
              </div>
            </aside>
          </div>
        </div>
      </section>

      <section className="faq-section">
        <div className="container">
          <h2>Frequently Asked Questions</h2>
          <div className="faq-grid">
            <div className="faq-card">
              <h4>How long does delivery take?</h4>
              <p>Standard delivery takes 3-5 business days. Express delivery is available for 1-2 day shipping.</p>
            </div>
            <div className="faq-card">
              <h4>Can I track my order?</h4>
              <p>Yes! Once your order ships, you'll receive a tracking number via email to monitor your delivery.</p>
            </div>
            <div className="faq-card">
              <h4>What's your return policy?</h4>
              <p>We offer 30-day returns on most items. Perishable items have a 7-day window.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
