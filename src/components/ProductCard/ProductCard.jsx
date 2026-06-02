import { Link, useNavigate } from 'react-router-dom'
import { useCart } from '../../context/CartContext'
import { useState } from 'react'
import './ProductCard.css'

export default function ProductCard({ product }) {
  const { addToCart, toggleWishlist, wishlist } = useCart()
  const [isAdded, setIsAdded] = useState(false)
  const isWishlisted = wishlist.some(p => p.id === product.id)
  const navigate = useNavigate()

  const handleAddToCart = (e) => {
    e.preventDefault()
    e.stopPropagation()
    addToCart(product)
    setIsAdded(true)
    setTimeout(() => setIsAdded(false), 1500)
  }

  const handleBuyNow = (e) => {
    e.preventDefault()
    e.stopPropagation()
    addToCart(product)
    navigate('/checkout')
  }

  const handleWishlist = (e) => {
    e.preventDefault()
    e.stopPropagation()
    toggleWishlist(product)
  }

  const renderStars = (rating) => {
    const stars = Math.round(rating)
    return '★'.repeat(stars) + '☆'.repeat(5 - stars)
  }

  return (
    <div className="product-card">
      <Link to={`/product/${product.id}`}>
        <div className="product-image" style={{backgroundImage:`url(${product.images[0]})`}}>
          <div className="category-badge">{product.category}</div>
          <div className="price-badge">${product.price.toFixed(0)}</div>
          <button className={`wishlist-btn ${isWishlisted ? 'wishlisted' : ''}`} onClick={handleWishlist} aria-label="Add to wishlist">
            {isWishlisted ? '❤️' : '🤍'}
          </button>
        </div>
        <div className="product-info">
          <div className="title">{product.title}</div>
          <div className="rating">
            <span className="stars">{renderStars(product.rating)}</span>
            <span className="rating-text">{product.rating}</span>
          </div>
          <div className="description">{product.description}</div>
          <div className="price">${product.price.toFixed(2)}</div>
        </div>
      </Link>
      <div className="product-actions">
        <button onClick={handleAddToCart} className={`add-to-cart-btn ${isAdded ? 'added' : ''}`}>
          <span className="btn-text">{isAdded ? 'Added' : 'Add to Cart'}</span>
          {/* when the card is add added show count button in which we can increase the quantity */}
          {isAdded && <span className="btn-icon">✔️</span>}
          {/* {  <QuantityPicker value={item.qty||1} onChange={(q)=>updateQty(item.id,q)} />} */}
        </button>
        <button onClick={handleBuyNow} className="buy-now-btn">
          <span className="btn-text">Buy Now</span>
        </button>
      </div>
    </div>
  )
}
