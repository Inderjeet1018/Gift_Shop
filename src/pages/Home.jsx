import products from '../data/products'
import ProductCard from '../components/ProductCard'
import { Link } from 'react-router-dom'
import './Home.css'
export default function Home() {
  const top = products.slice(0,3)
  const trending = products.filter(p => p.trending)
  return (
    <div className="page home-page">
      <section className="hero" >
        <div className="hero-content">
          <h1  style={{color:"black"}}>Beautiful Gifts for Every Occasion</h1>
          <p>Hand-curated sets, flowers, chocolates and more.</p>
          <div className="hero-cta">
            <Link to="/categories" className="btn primary">Shop Now</Link>
            <Link to="/deals" className="btn">View Deals</Link>
          </div>
        </div>
        <div className="hero-images">
          <div className="blocks">
            {top.map((p) => (
              <img key={p.id} src={p.images[0]} alt={p.title} />
            ))}
         
          </div>
        </div>
      </section>
      <br/>
      <section className="categories">
        <h2>Categories</h2>
        <div className="cat-grid">
          <div className="cat"><Link to="/categories?cat=Birthday Gifts"><p>Birthday Gifts</p></Link></div>
          <div className="cat"><Link to="/categories?cat=Anniversary Gifts"><p>Anniversary Gifts</p></Link></div>
          <div className="cat"><Link to="/categories?cat=Flowers"><p>Flowers</p></Link></div>
          <div className="cat"><Link to="/categories?cat=Chocolates"><p>Chocolates</p></Link></div>
          <div className="cat"><Link to="/categories?cat=Custom Gifts"><p>All Categories</p></Link></div>
        </div>
      </section>
    <br/><br/>
      <section className="best-sellers">
        <h2>Best Sellers</h2>
        <div className="product-grid">
          {top.map((p) => <ProductCard key={p.id} product={p} />)}
        </div>
      </section>
    <br/><br/>
      <section className="trending">
        <h2>Trending Now</h2>
        <div className="product-grid">
          {trending.map((p) => <ProductCard key={p.id} product={p} />)}
        </div>
      </section>

      <section className="deals">
        <div className="deals-box" >
          <h3 style={{color:"white"}}>Special Deals</h3>
          <p>Up to 30% off selected items</p>
          <Link to="/deals" className="btn primary">View Deals</Link>
        </div>
      </section>

      <section className="reviews-section">
        <h2>What Our Customers Say</h2>
        <div className="reviews-grid">
          <div className="review-card">
            <div className="review-stars">★★★★★</div>
            <p className="review-text">"The Elegant Pink Gift Box was absolutely stunning! Perfect for my wife's birthday. The packaging was premium and arrived on time."</p>
            <div className="review-author">
              <div className="author-avatar">SA</div>
              <div className="author-info">
                <p className="author-name">Sarah Anderson</p>
                <p className="author-product">Verified Purchase: Pink Gift Box</p>
              </div>
            </div>
          </div>

          <div className="review-card">
            <div className="review-stars">★★★★★</div>
            <p className="review-text">"Fresh Flower Bouquet exceeded my expectations! The flowers were vibrant and fresh. Highly recommend for any special occasion!"</p>
            <div className="review-author">
              <div className="author-avatar">JD</div>
              <div className="author-info">
                <p className="author-name">John Davidson</p>
                <p className="author-product">Verified Purchase: Flower Bouquet</p>
              </div>
            </div>
          </div>

          <div className="review-card">
            <div className="review-stars">★★★★★</div>
            <p className="review-text">"The Premium Chocolate Truffles were delicious and beautifully presented. My partner loved them. Great customer service too!"</p>
            <div className="review-author">
              <div className="author-avatar">EM</div>
              <div className="author-info">
                <p className="author-name">Emma Martinez</p>
                <p className="author-product">Verified Purchase: Chocolate Truffles</p>
              </div>
            </div>
          </div>

          <div className="review-card">
            <div className="review-stars">★★★★★</div>
            <p className="review-text">"The Anniversary Gift Hamper was perfect! It felt luxurious and was delivered beautifully. Worth every penny!"</p>
            <div className="review-author">
              <div className="author-avatar">RC</div>
              <div className="author-info">
                <p className="author-name">Robert Chen</p>
                <p className="author-product">Verified Purchase: Anniversary Hamper</p>
              </div>
            </div>
          </div>

          <div className="review-card">
            <div className="review-stars">★★★★★</div>
            <p className="review-text">"Red Roses Bundle arrived fresh and gorgeous! Perfect for expressing my love. The delivery was fast and packaging was excellent."</p>
            <div className="review-author">
              <div className="author-avatar">LP</div>
              <div className="author-info">
                <p className="author-name">Lisa Patel</p>
                <p className="author-product">Verified Purchase: Red Roses Bundle</p>
              </div>
            </div>
          </div>

          <div className="review-card">
            <div className="review-stars">★★★★★</div>
            <p className="review-text">"I created a custom gift basket and it was amazing! The team was so helpful in selecting items. Highly satisfied with the service!"</p>
            <div className="review-author">
              <div className="author-avatar">MK</div>
              <div className="author-info">
                <p className="author-name">Michelle Khan</p>
                <p className="author-product">Verified Purchase: Custom Basket</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
