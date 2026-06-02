import { useCart } from '../context/CartContext'
import QuantityPicker from '../components/QuantityPicker'
import { Link } from 'react-router-dom'
import './Cart.css'

export default function Cart(){
  const { cart, updateQty, removeFromCart, clearCart } = useCart()
  const total = cart.reduce((s,p)=>s + p.price * (p.qty||1), 0)
  const itemCount = cart.reduce((s,p)=>s + (p.qty||1), 0)

  return (
    <div className="page cart-page">
      <div className="cart-header">
        <h1>Your Shopping Cart</h1>
        {cart.length > 0 && (
          <p>{itemCount} item{itemCount !== 1 ? 's' : ''} in your cart</p>
        )}
      </div>

      {cart.length === 0 ? (
        <div className="empty-cart">
          <div className="empty-cart-icon">🛒</div>
          <h3>Your cart is empty</h3>
          <p>Add some products to get started!</p>
          <Link to="/categories" className="btn primary">Continue Shopping</Link>
        </div>
      ) : (
        <>
          <div className="cart-items">
            {cart.map(item => (
              <div key={item.id} className="cart-item">
                <div className="cart-item-image">
                  <img src={item.images?.[0]} alt={item.title} />
                </div>
                <div className="cart-item-details">
                  <h3>{item.title}</h3>
                  <p className="cart-item-category">{item.category}</p>
                  <div className="cart-item-price">${(item.price).toFixed(2)}</div>
                </div>
                <div className="cart-item-controls">
                  <QuantityPicker value={item.qty||1} onChange={(q)=>updateQty(item.id,q)} />
                  <button className="btn link remove-btn" onClick={()=>removeFromCart(item.id)}>
                    <span>🗑️  </span> Remove
                  </button>
                </div>
                <div className="cart-item-total">
                  ${(item.price * (item.qty||1)).toFixed(2)}
                </div>
              </div>
            ))}
          </div>

          <div className="cart-summary">
            <h3 style={{color:"black"}}>Order Summary</h3>
            <div className="cart-summary-row">
              <span>Items ({itemCount})</span>
              <span>${total.toFixed(2)}</span>
            </div>
            <div className="cart-summary-row">
              <span>Shipping</span>
              <span>Free</span>
            </div>
            <div className="cart-summary-total">
              <span>Total</span>
              <span>${total.toFixed(2)}</span>
            </div>
            <div className="cart-actions">
              <Link to="/checkout" className="btn primary full-width">Proceed to Buy</Link>
              <button className="btn secondary full-width" onClick={clearCart}>Clear Cart</button>
              <Link to="/categories" className="btn link full-width">Continue Shopping</Link>
            </div>
          </div>
        </>
      )}
    </div>
  )
}
