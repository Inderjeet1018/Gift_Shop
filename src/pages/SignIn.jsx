import { useState, useEffect } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import './SignIn.css'
import './Auth.css'

export default function SignIn() {
  const [form, setForm] = useState({ email: '', password: '' })
  const [error, setError] = useState('')
  const navigate = useNavigate()

  useEffect(() => {
    try {
      const active = sessionStorage.getItem('session')
      if (active) navigate('/account')
    } catch (err) {
      // ignore
    }
  }, [])

  const update = (e) => setForm(prev => ({ ...prev, [e.target.name]: e.target.value }))

  const submit = (e) => {
    e.preventDefault()
    try {
      const raw = localStorage.getItem('account')
      if (!raw) {
        setError('No account found. Please register first.')
        return
      }
      const account = JSON.parse(raw)
      if (account.email === form.email && account.password === form.password) {
        sessionStorage.setItem('session', JSON.stringify({ email: account.email }))
        navigate('/account')
      } else {
        setError('Invalid email or password.')
      }
    } catch (err) {
      console.error(err)
      setError('Login failed. Please try again.')
    }
  }

  return (
    <div className="auth-page">
      <form className="auth-card signin-card" onSubmit={submit}>
        <h1 style={{ margin: 0, color: "black" }}>Sign In</h1>
        <p>Enter your email and password to access your account.</p>

        <div style={{ marginTop: 16 }}>
          <label style={{ fontWeight: 700, fontSize: 13 }}>Email</label>
          <input name="email" type="email" required value={form.email} onChange={update} className="auth-input" />
        </div>

        <div style={{ marginTop: 12 }}>
          <label style={{ fontWeight: 700, fontSize: 13 }}>Password</label>
          <input name="password" type="password" required value={form.password} onChange={update} className="auth-input" />
        </div>

        {error && <div style={{ color: 'var(--red)', marginTop: 12 }}>{error}</div>}

        <div className="auth-actions">
          <button type="submit" className="btn primary">Sign In</button>
          <Link to="/register" className="btn">Register</Link>
        </div>

        <p style={{ marginTop: 12, color: 'var(--text-secondary)' }}>
          Forgot password? Contact support at <a href="memoriessupport@gmail.com">memoriessupport@gmail.com</a>
        </p>
      </form>
    </div>
  )
}
