import { useParams } from 'react-router-dom'
import products from '../data/products'
import ImageSlider from '../components/ImageSlider'
import { useCart } from '../context/CartContext'
import QuantityPicker from '../components/QuantityPicker'
import { useState } from 'react'

export default function ProductPage(){
  const { id } = useParams()
  const product = products.find(p => p.id === id)
  const { addToCart, toggleWishlist } = useCart()
  const [qty, setQty] = useState(1)
  if(!product) return <div className="page">Product not found</div>

  return (
    <div className="page product-page">
      <div className="product-grid">
        <div>
          <ImageSlider images={product.images} />
        </div>
        <div className="product-details">
          <h1>{product.title}</h1>
          <div className="price">${product.price.toFixed(2)}</div>
          <div className="rating">⭐ {product.rating}</div>
          <p className="desc">{product.description}</p>
          <div className="actions">
            <QuantityPicker value={qty} onChange={setQty} />
            <button className="btn primary" onClick={() => addToCart(product, qty)}>Add To Cart</button>
            <button className="btn" onClick={() => toggleWishlist(product)}>Add to Wishlist</button>
          </div>
        </div>
      </div>
    </div>
  )
}
