import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './Account.css'

export default function Account() {
  const [account, setAccount] = useState(null)
  const [orders, setOrders] = useState([])
  const [editing, setEditing] = useState(false)
  const [formData, setFormData] = useState({})
  const [saved, setSaved] = useState(false)
  const [activeTab, setActiveTab] = useState('profile') // 'profile' or 'orders'
  const navigate = useNavigate()

  // Load account and orders on mount
  useEffect(() => {
    try {
      const raw = localStorage.getItem('account')
      if (raw) {
        const data = JSON.parse(raw)
        setAccount(data)
        setFormData(data)
      }
      const rawOrders = localStorage.getItem('orders')
      if (rawOrders) {
        setOrders(JSON.parse(rawOrders))
      }
    } catch (err) {
      console.error('Failed to load account:', err)
    }
  }, [])

  if (!account) {
    return (
      <div className="account-page">
        <h1>Account</h1>
        <p className="subtitle">Please sign in to view your account</p>
        <div style={{ textAlign: 'center', marginTop: 32 }}>
          <button className="btn primary" onClick={() => navigate('/login')} style={{ padding: '12px 24px' }}>
            Sign In
          </button>
        </div>
      </div>
    )
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSave = (e) => {
    e.preventDefault()
    try {
      localStorage.setItem('account', JSON.stringify(formData))
      setAccount(formData)
      setSaved(true)
      setEditing(false)
      setTimeout(() => setSaved(false), 3000)
    } catch (err) {
      console.error('Failed to save:', err)
    }
  }

  const handleLogout = () => {
    localStorage.removeItem('session')
    navigate('/login')
  }

  return (
    <div className="account-page">
      <h1>My Account</h1>
      <p className="subtitle">Manage your profile and view your orders</p>

      {/* Tab Navigation */}
      <div className="account-tabs">
        <button
          className={`tab-btn ${activeTab === 'profile' ? 'active' : ''}`}
          onClick={() => setActiveTab('profile')}
        >
          📋 Profile
        </button>
        <button
          className={`tab-btn ${activeTab === 'orders' ? 'active' : ''}`}
          onClick={() => setActiveTab('orders')}
        >
          📦 Orders
        </button>
      </div>

      <div className="account-container">
        {/* Profile Section */}
        {activeTab === 'profile' && (
        <div className="profile-section">
          <h2>Profile Information</h2>
          
          {saved && (
            <div style={{
              padding: 12,
              background: 'rgba(76, 175, 80, 0.1)',
              border: '1px solid rgba(76, 175, 80, 0.3)',
              borderRadius: 8,
              color: '#4caf50',
              fontSize: 14,
              marginBottom: 16
            }}>
              ✓ Profile updated successfully
            </div>
          )}

          <div className="profile-info">
            <div className="info-field">
              <label>Email</label>
              <div className="value">{account.email || '—'}</div>
            </div>
            <div className="info-field">
              <label>Full Name</label>
              <div className="value">{account.fullName || '—'}</div>
            </div>
            <div className="info-field">
              <label>Phone</label>
              <div className="value">{account.phone || '—'}</div>
            </div>
            <div className="info-field">
              <label>Address</label>
              <div className="value">{account.address || '—'}</div>
            </div>
            <div className="info-field">
              <label>City</label>
              <div className="value">{account.city || '—'}</div>
            </div>
            <div className="info-field">
              <label>State</label>
              <div className="value">{account.state || '—'}</div>
            </div>
            <div className="info-field">
              <label>ZIP</label>
              <div className="value">{account.zip || '—'}</div>
            </div>
          </div>

          <button className="edit-btn" onClick={() => setEditing(true)}>
            Edit Profile
          </button>
          <button className="logout-btn" onClick={handleLogout}>
            Logout
          </button>
        </div>
        )}

        {/* Orders Section */}
        {activeTab === 'orders' && (
        <div className="orders-section">
          <h2>Order History</h2>
          
          {orders.length === 0 ? (
            <div className="no-orders">
              <p>No orders yet</p>
              <button className="btn primary" onClick={() => navigate('/categories')} style={{ padding: '10px 20px' }}>
                Start Shopping
              </button>
            </div>
          ) : (
            <div className="orders-list">
              {orders.map((order, idx) => (
                <div key={idx} className="order-card">
                  <div className="order-header">
                    <div>
                      <div className="order-id">{order.id || idx + 1}</div>
                      <div className="order-date">{order.date || new Date().toLocaleDateString()}</div>
                    </div>
                    <span className={`order-status ${order.status || 'pending'}`}>
                      {order.status || 'Pending'}
                    </span>
                  </div>

                  <div className="order-items">
                    {order.items && order.items.length > 0 ? (
                      order.items.map((item, i) => (
                        <div key={i} className="order-item">
                          <span>{item.title || 'Product'} x {item.qty || 1}</span>
                          <span>${((item.price || 0) * (item.qty || 1)).toFixed(2)}</span>
                        </div>
                      ))
                    ) : (
                      <div className="order-item">
                        <span>No items</span>
                      </div>
                    )}
                  </div>

                  <div className="order-total">
                    <span>Total:</span>
                    <span>${(order.total || 0).toFixed(2)}</span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
        )}
      </div>

      {/* Edit Form Modal */}
      {editing && (
        <div className="edit-form-overlay" onClick={() => setEditing(false)}>
          <div className="edit-form-card" onClick={e => e.stopPropagation()}>
            <h3>Edit Profile</h3>
            <form onSubmit={handleSave}>
              <div className="form-group">
                <label>Full Name</label>
                <input
                  name="fullName"
                  type="text"
                  placeholder="John Doe"
                  value={formData.fullName || ''}
                  onChange={handleInputChange}
                />
              </div>

              <div className="form-group">
                <label>Phone</label>
                <input
                  name="phone"
                  type="tel"
                  placeholder="+91 555 123 4567"
                  value={formData.phone || ''}
                  onChange={handleInputChange}
                />
              </div>

              <div className="form-group">
                <label>Address</label>
                <input
                  name="address"
                  type="text"
                  placeholder="Your Address"
                  value={formData.address || ''}
                  onChange={handleInputChange}
                />
              </div>

              <div className="form-group">
                <label>City</label>
                <input
                  name="city"
                  type="text"
                  placeholder="City"
                  value={formData.city || ''}
                  onChange={handleInputChange}
                />
              </div>

              <div className="form-group">
                <label>State</label>
                <input
                  name="state"
                  type="text"
                  placeholder="State"
                  value={formData.state || ''}
                  onChange={handleInputChange}
                />
              </div>

              <div className="form-group">
                <label>ZIP</label>
                <input
                  name="zip"
                  type="text"
                  placeholder="00000"
                  value={formData.zip || ''}
                  onChange={handleInputChange}
                />
              </div>

              <div className="edit-form-actions">
                <button type="submit" className="save-btn">Save Changes</button>
                <button type="button" className="cancel-btn" onClick={() => setEditing(false)}>Cancel</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}
