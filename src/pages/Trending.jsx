import products from '../data/products'
import ProductCard from '../components/ProductCard'
import { Link } from 'react-router-dom'
import './Trending.css'

export default function Trending() {
  const trendingProducts = products.filter(p => p.trending)

  return (
    <div className="page trending-page">
      <section className="trending-header">
        <h1>Trending Products</h1>
        <p>Check out our most popular items right now</p>
      </section>

      {trendingProducts.length > 0 ? (
        <section className="trending-products">
          <div className="product-grid">
            {trendingProducts.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </section>
      ) : (
        <section className="no-products">
          <p>No trending products at the moment.</p>
          <Link to="/" className="btn primary">Back to Home</Link>
        </section>
      )}
    </div>
  )
}
