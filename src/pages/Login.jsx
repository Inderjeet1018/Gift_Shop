import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import './Login.css'

export default function Login() {
  const [form, setForm] = useState({
    fullName: '',
    email: '',
    phone: '',
    password: '',
    address: '',
    city: '',
    state: '',
    zip: ''
  })
  const [saved, setSaved] = useState(false)
  const navigate = useNavigate()

  // Load from localStorage for demo purposes
  useEffect(() => {
    try {
      const raw = localStorage.getItem('account')
      if (raw) {
        const data = JSON.parse(raw)
        setForm(prev => ({ ...prev, ...data }))
      }
    } catch {}
  }, [])

  const update = (e) => {
    const { name, value } = e.target
    setForm(prev => ({ ...prev, [name]: value }))
    setSaved(false)
  }

  const save = (e) => {
    e.preventDefault()
    const { password, ...publicData } = form
    try {
      // Preserve any existing stored account (including password) and merge updated public data
      const raw = localStorage.getItem('account')
      const existing = raw ? JSON.parse(raw) : {}
      const accountToSave = { ...existing, ...publicData }
      // mark profileComplete if user filled any personal info
      accountToSave.profileComplete = Boolean(accountToSave.fullName || accountToSave.phone || accountToSave.address)
      // keep password if it exists in memory or existing storage
      if (password) accountToSave.password = password
      localStorage.setItem('account', JSON.stringify(accountToSave))
      setSaved(true)
      // After saving details, send the user to the home page
      navigate('/')
    } catch {
      setSaved(false)
    }
  }

  

  const profileFields = ['fullName', 'phone', 'address', 'city', 'state', 'zip']
  const completedCount = profileFields.filter(k => form[k] && form[k].toString().trim() !== '').length
  const profileProgress = Math.round((completedCount / profileFields.length) * 100)

  return (
    <div className="account-page">
      <h1>YOUR DETAILS</h1>
      <p className="description">You can register with just an email & password and complete your profile here later.</p>

      <div className="account-grid">
        {/* Form */}
        <form onSubmit={save} className="login-card">
          <h2>Details</h2>

          <div style={{ display: 'grid', gap: 12 }}>
            <div>
              <label className="form-label" htmlFor="email">Email</label>
              <input id="email" name="email" type="email" required placeholder="you@example.com" value={form.email} onChange={update} className="form-input" />
            </div>
            <div>
              <label className="form-label" htmlFor="password">Password</label>
              <input id="password" name="password" type="password" required placeholder="••••••••" value={form.password} onChange={update} className="form-input" />
            </div>

            <div className="form-row">
              <div>
                <label className="form-label" htmlFor="fullName">Full name</label>
                <input id="fullName" name="fullName" type="text" placeholder="John Doe" value={form.fullName} onChange={update} className="form-input" />
              </div>
              <div>
                <label className="form-label" htmlFor="phone">Phone</label>
                <input id="phone" name="phone" type="tel" placeholder="+91 555 123 4567" value={form.phone} onChange={update} className="form-input" />
              </div>
            </div>

            <div>
              <label className="form-label" htmlFor="address">Address</label>
              <input id="address" name="address" type="text" placeholder="Your Address" value={form.address} onChange={update} className="form-input" />
            </div>

            <div className="form-row">
              <div>
                <label className="form-label" htmlFor="city">City</label>
                <input id="city" name="city" type="text" placeholder="City" value={form.city} onChange={update} className="form-input" />
              </div>
              <div>
                <label className="form-label" htmlFor="state">State</label>
                <input id="state" name="state" type="text" placeholder="State" value={form.state} onChange={update} className="form-input" />
              </div>
            </div>

            <div className="form-actions">
              <div>
                <label className="form-label" htmlFor="zip">ZIP</label>
                <input id="zip" name="zip" type="text" placeholder="00000" value={form.zip} onChange={update} className="form-input" />
              </div>
              <button type="submit" className="btn primary">Save</button>
            </div>

            {saved && (
              <div className="saved-message">Details saved locally.</div>
            )}

            <div style={{ textAlign: 'center', marginTop: 16 }}>
              <p style={{ margin: 0, fontSize: 14 }}>
                Don't have an account? <Link to="/register">Register</Link>
              </p>
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}

function Detail({ label, value }) {
  return (
    <div style={{ display: 'grid', gap: 4 }}>
      <div style={{ color: 'var(--text-secondary)', fontWeight: 700, fontSize: 12 }}>{label}</div>
      <div style={{ color: 'var(--text-primary)', fontWeight: 700 }}>{value || '—'}</div>
    </div>
  )
}
