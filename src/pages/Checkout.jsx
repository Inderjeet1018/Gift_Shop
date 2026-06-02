import { useCart } from '../context/CartContext'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './Checkout.css'

export default function Checkout(){
  const { cart, clearCart } = useCart()
  const navigate = useNavigate()
  const total = cart.reduce((s,p)=>s + p.price * (p.qty||1), 0)
  const [address, setAddress] = useState('')
  const [useTemp, setUseTemp] = useState(false)
  const [tempAddress, setTempAddress] = useState('')
  const [payment, setPayment] = useState('card')

  function placeOrder(e){
    e.preventDefault()
    const shipping = useTemp ? tempAddress : address
    if (!shipping) {
      window.alert('Please provide a shipping address.')
      return
    }

    // Save order to localStorage
    try {
      const order = {
      
        id: 'ORD-' + Math.floor(Math.random() * 1000000),
        date: new Date().toLocaleDateString(),
        items: cart.map(p => ({
          title: p.title,
          price: p.price,
          qty: p.qty || 1
        })),
        total: total,
        status: 'pending',
        payment: payment,
        shipping: shipping
      }

      const existingOrders = localStorage.getItem('orders')
      const orders = existingOrders ? JSON.parse(existingOrders) : []
      orders.push(order)
      localStorage.setItem('orders', JSON.stringify(orders))
    } catch (err) {
      console.error('Failed to save order:', err)
    }

    window.alert(`Order placed successfully!\nPayment: ${payment}\nShipping to: ${shipping}`)
    clearCart()
    setAddress('')
    setTempAddress('')
    setUseTemp(false)
    setPayment('card')
    navigate('/account')
  }

  return (
    <div className="page checkout-page">
      <div className="checkout-card">
        <h2 className="checkout-title">Checkout</h2>
        <div className="checkout-grid">
          <form onSubmit={placeOrder} className="checkout-form">
            <div className="field">
              <label className="label">Address</label>
             
                <textarea className="textarea" style={{resize: "none"}} value={address} onChange={e=>setAddress(e.target.value)} placeholder="Enter your shipping address" required />
            </div>

            <div className="field">
              <label className="label">Payment</label>
              <select className="select" value={payment} onChange={e=>setPayment(e.target.value)}>
                <option value="card">Card</option>
                <option value="cod">Cash on Delivery</option>
              </select>
            </div>

            <div className="actions">
              <button className="btn primary" type="submit">Place Order</button>
            </div>
          </form>

          <aside className="order-summary card">
            <h4>Order Summary</h4>
            <div className="summary-row"><span>Items</span><strong>{cart.length}</strong></div>
            <div className="summary-row"><span>Total</span><strong>${total.toFixed(2)}</strong></div>
          </aside>
        </div>
      </div>
    </div>
  )
}
