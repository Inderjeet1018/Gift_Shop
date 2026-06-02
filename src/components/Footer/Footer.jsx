import { Link } from 'react-router-dom'
import './Footer.css'

export default function Footer() {
  function handleSubmit(e) {
    e.preventDefault()
    const email = e.target.elements.email?.value
    if (email) {
      console.log('Subscribe:', email)
      e.target.reset()
      alert('✓ Thanks for subscribing! Check your email for exclusive offers.')
    }
  }

  return (
    <footer className="site-footer">
      <div className="footer-inner container">
        {/* Brand & About */}
        <div className="footer-brand">
          <h3>Memories</h3>
          <p className="text-muted">Hand-curated gifts, flowers and treats — delivered with love to make every moment special.</p>
          <div className="trust-badges">     
          </div>
        </div>

        {/* Quick Links */}
        <div className="footer-links">
          <h4>Shop</h4>
          <nav>
            <Link to="/categories">All Categories</Link>
            <Link to="/categories?cat=Birthday Gifts">Birthday Gifts</Link>
            <Link to="/categories?cat=Flowers">Flowers</Link>
            <Link to="/categories?cat=Chocolates">Chocolates</Link>
            <Link to="/categories?cat=Anniversary Gifts">Anniversary</Link>
          </nav>
        </div>

        {/* Company Links */}
        <div className="footer-links">
          <h4>Company</h4>
          <nav>
            <a href="#about">About Us</a>
            <Link to="/blog">Blog</Link>
            <a href="#press">Press</a>
            <a href="#careers">Careers</a>
            <Link to="/contact">Contact Us</Link>
          </nav>
        </div>

        {/* Support Links */}
        <div className="footer-links">
          <h4>Support</h4>
          <nav>
            <a href="#faq">FAQ</a>
            <a href="#shipping">Shipping Info</a>
            <a href="#returns">Returns & Refunds</a>
            <a href="#privacy">Privacy Policy</a>
            <a href="#terms">Terms of Service</a>
          </nav>
        </div>

        {/* Newsletter */}
        <div className="footer-newsletter">
          <h4>Exclusive Offers</h4>
          <p className="newsletter-subtitle">Get 15% off your first order + updates on new products</p>
          <form onSubmit={handleSubmit} className="newsletter-form">
            <input name="email" type="email" placeholder="Enter your email" required />
            <button className="btn primary" type="submit">Subscribe</button>
          </form>

          <div className="newsletter-trust">
            <p>✓ No spam, unsubscribe anytime</p>
          </div>

          <h4 className="socials-title">Follow Us</h4>
          <div className="socials">
            <a href="#instagram" aria-label="instagram" title="Instagram" rel="noopener noreferrer" className="social-link">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                <path d="M7 2h10a5 5 0 015 5v10a5 5 0 01-5 5H7a5 5 0 01-5-5V7a5 5 0 015-5z" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
                <circle cx="12" cy="12" r="3.5" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
                <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor"/>
              </svg>
            </a>
            <a href="#facebook" aria-label="facebook" title="Facebook" rel="noopener noreferrer" className="social-link">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                <path d="M22 12.07C22 6.48 17.52 2 11.93 2S2 6.48 2 12.07c0 4.99 3.66 9.12 8.44 9.93v-7.03H8.3v-2.9h2.14V9.41c0-2.12 1.26-3.29 3.18-3.29.92 0 1.88.16 1.88.16v2.07h-1.06c-1.04 0-1.36.64-1.36 1.3v1.56h2.32l-.37 2.9h-1.95V22c4.78-.81 8.44-4.94 8.44-9.93z"/>
              </svg>
            </a>
            <a href="#twitter" aria-label="twitter" title="Twitter" rel="noopener noreferrer" className="social-link">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                <path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z"/>
              </svg>
            </a>
            <a href="#pinterest" aria-label="pinterest" title="Pinterest" rel="noopener noreferrer" className="social-link">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="1.5" fill="none"/>
                <path d="M8 12c0 2.21 1.79 4 4 4s4-1.79 4-4" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round"/>
              </svg>
            </a>
          </div>
        </div>
      </div>

      <div className="footer-divider"></div>

      {/* Footer Bottom */}
      <div className="footer-bottom">
        <div className="container">
          <div className="footer-bottom-content">
            <p>&copy; {new Date().getFullYear()} Memories. All rights reserved. Made with ❤️</p>
            <div className="payment-methods">
              <span>We Accept:</span>
              <svg width="24" height="16" viewBox="0 0 24 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect x="1" y="1" width="6" height="14" rx="1" stroke="currentColor" strokeWidth="1"/>
              </svg>
              <span>Visa</span>
              <span>Mastercard</span>
              <span>PayPal</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
