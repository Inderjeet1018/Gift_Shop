import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import './Auth.css'

export default function Register() {
  const [form, setForm] = useState({
    fullName: '',
    email: '',
    password: ''
  })
  const [error, setError] = useState('')
  const navigate = useNavigate()

  const update = (e) => {
    const { name, value } = e.target
    setForm(prev => ({ ...prev, [name]: value }))
  }

  const save = (e) => {
    e.preventDefault()
    // Require only email and password at signup; other details can be completed later
    if (!form.email || !form.password) {
      setError('Please provide an email and password to create an account.')
      return
    }
    try {
      // Save minimal account information locally for demo purposes
      const account = {
        email: form.email,
        password: form.password,
        fullName: form.fullName || '',
        phone: '',
        address: '',
        city: '',
        state: '',
        zip: '',
        profileComplete: false
      }
      localStorage.setItem('account', JSON.stringify(account))
      // Navigate to account page where user can complete details
      navigate('/account')
    } catch {
      setError('Failed to create account. Please try again.')
    }
  }

  const label = {
    fontWeight: 700,
    fontSize: 13,
    color: 'var(--text-secondary)'
  }

  return (
    <div className="auth-page">
      <form onSubmit={save} className="auth-card">
        <h1 style={{ marginTop: 0, marginBottom: 12, textAlign: 'center' }}>Create Account</h1>

        <div style={{ display: 'grid', gap: 16 }}>
          <div>
            <label style={label} htmlFor="fullName">Full Name <small style={{ fontWeight: 400, opacity: 0.8 }}>(optional)</small></label>
            <input id="fullName" name="fullName" type="text" placeholder="John Doe" value={form.fullName} onChange={update} className="auth-input" />
          </div>
          <div>
            <label style={label} htmlFor="email">Email</label>
            <input id="email" name="email" type="email" required placeholder="you@example.com" value={form.email} onChange={update} className="auth-input" />
          </div>
          <div>
            <label style={label} htmlFor="password">Password</label>
            <input id="password" name="password" type="password" required placeholder="••••••••" value={form.password} onChange={update} className="auth-input" />
          </div>

          {error && (
            <div style={{ color: 'var(--red)', fontSize: 14, textAlign: 'center' }}>
              {error}
            </div>
          )}

          <button type="submit" className="btn primary" style={{ padding: '12px 18px', width: '100%' }}>Register</button>

          <div style={{ textAlign: 'center', marginTop: 16 }}>
            <p style={{ margin: 0, fontSize: 14 }}>
              Already have an account? <Link to="/login">Login</Link>
            </p>
          </div>
        </div>
      </form>
    </div>
  )
}
