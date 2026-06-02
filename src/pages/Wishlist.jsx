import { useCart } from '../context/CartContext'
import ProductCard from '../components/ProductCard'
import { Link } from 'react-router-dom'
import './Wishlist.css'

export default function Wishlist() {
  const { wishlist, moveToCart } = useCart()

  return (
    <div className="page wishlist-page">
      <div className="wishlist-header">
        <h1>My Wishlist</h1>
        {wishlist.length > 0 && (
          <p>{wishlist.length} item{wishlist.length !== 1 ? 's' : ''} in your wishlist</p>
        )}
      </div>

      {wishlist.length === 0 ? (
        <div className="empty-wishlist">
          <div className="empty-wishlist-icon">♡</div>
          <h3>Your wishlist is empty</h3>
          <p>Add your favorite products to your wishlist!</p>
          <Link to="/categories" className="btn primary">View  Products</Link>
        </div>
      ) : (
        <section className="wishlist-products">
          <div className="product-grid">
            {wishlist.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </section>
      )}
    </div>
  )
}
