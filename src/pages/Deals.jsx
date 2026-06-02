import products from '../data/products'
import { Link } from 'react-router-dom'
import './Deals.css'

export default function Deals(){
  const deals = products.filter(p => p.deal)

  const calcPrice = (p) => {
    if (!p.discount) return p.price
    return (p.price * (1 - p.discount / 100)).toFixed(2)
  }

  return (
    <div className="page deals-page">
      <header className="deals-hero">
        <h1>Special Deals</h1>
        <p>Limited-time discounts on selected products</p>
      </header>

      <section className="deals-grid">
        {deals.length === 0 ? (
          <div className="no-deals">
            <p>No deals available right now.</p>
            <Link to="/" className="btn primary">Back to Home</Link>
          </div>
        ) : (
          <div className="product-grid">
            {deals.map(p => (
              <div key={p.id} className="deal-card">
                <div className="deal-image" style={{backgroundImage:`url(${p.images[0]})`}} />
                <div className="deal-info">
                  <div className="deal-title">{p.title}</div>
                  <div className="deal-category">{p.category}</div>
                  <div className="deal-prices">
                    <span className="old-price">${p.price.toFixed(2)}</span>
                    <span className="new-price">${calcPrice(p)}</span>
                    {p.discount && <span className="discount">-{p.discount}%</span>}
                  </div>
                  <Link to={`/product/${p.id}`} className="btn">View</Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  )
}
