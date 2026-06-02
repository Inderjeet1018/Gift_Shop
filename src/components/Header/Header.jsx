import { Link } from 'react-router-dom'
import { useCart } from '../../context/CartContext'
import { useState } from 'react'
import './Header.css'


export default function Header() {
  const { cart, wishlist } = useCart()
  const totalItems = cart.reduce((s, p) => s + (p.qty || 1), 0)
  const wishCount = wishlist.length
  const [open, setOpen] = useState(false)

  return (
    <header className="site-header">
      <div className="site-inner">
        <div className="brand">
            <Link to="/" className="logo">
              <img src="/logo.png" alt="Memories" className="logo-image" />
            </Link>
        </div>

        <div className="header-center">
        
        {/* home */}
          <nav className="nav desktop-nav">
            <Link to="/" className="nav-item">Home</Link>
            <div className="nav-item dropdown">
              <button className="nav-button">Categories</button>
              <div className="dropdown-menu">
                <Link to="/categories?cat=">All Categories</Link>
                <Link to="/categories?cat=Birthday Gifts">Birthday Gifts</Link>
                <Link to="/categories?cat=Anniversary Gifts">Anniversary Gifts</Link>
                <Link to="/categories?cat=Flowers">Flowers</Link>
                <Link to="/categories?cat=Chocolates">Chocolates</Link>
                <Link to="/categories?cat=Custom Gifts">Custom Gifts</Link>
              </div>
            </div>
            <Link to="/trending" className="nav-item">Trending</Link>
            <Link to="/deals" className="nav-item">Deals</Link>
            <Link to="/blog" className="nav-item">Blog</Link>
            <Link to="/contact" className="nav-item">Contact</Link>
          </nav>
        </div>

        <div className="header-actions">
          <Link to="/login" className="login-link" title="Login">
            <svg className="icon-user" aria-hidden focusable="false" width="24" height="24" viewBox="0 0 24 24">
              <circle cx="12" cy="8" r="4" stroke="currentColor" strokeWidth="2" fill="none" />
              <path d="M4 20c0-4 4-6 8-6s8 2 8 6" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" />
            </svg>
          </Link>

          <Link to="/wishlist" className="wish-link">
            <svg className="icon-heart" aria-hidden focusable="false" width="24" height="24" viewBox="0 0 24 24">
              <path d="M12 21c-4.97-3.58-8-6.58-8-10 0-2.21 1.79-4 4-4 1.67 0 3.13.99 3.7 2.43C12.87 7.99 14.33 7 16 7c2.21 0 4 1.79 4 4 0 3.42-3.03 6.42-8 10z" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            <span className="badge">{wishCount}</span>
          </Link>
          <Link to="/cart" className="cart-link">
            <svg className="icon-cart" aria-hidden focusable="false" width="24" height="24" viewBox="0 0 24 24">
              <path d="M3 4h2l.4 2M7 13h9l2-7H6.4" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
              <circle cx="9" cy="19" r="1.6" stroke="currentColor" strokeWidth="2" fill="none"/>
              <circle cx="17" cy="19" r="1.6" stroke="currentColor" strokeWidth="2" fill="none"/>
            </svg>
            <span className="badge">{totalItems}</span>
          </Link>

          <button className="hamburger" aria-label="Menu" aria-expanded={open} onClick={() => setOpen(v => !v)}>
            <span className="line" />
            <span className="line" />
            <span className="line" />
          </button>
        </div>
      </div>

      <div className={` mobile-menu ${open ? 'open' : ''}`}>
        <nav className="nav-mobile">
          <Link to="/" onClick={() => setOpen(false)}>Home</Link>
          <Link to="/categories" onClick={() => setOpen(false)}>Categories</Link>
          <Link to="/trending" onClick={() => setOpen(false)}>Trending</Link>
          <Link to="/deals" onClick={() => setOpen(false)}>Deals</Link>
          <Link to="/blog" onClick={() => setOpen(false)}>Blog</Link>
          <Link to="/contact" onClick={() => setOpen(false)}>Contact</Link>
        </nav>
      </div>
    </header>
  )
}
