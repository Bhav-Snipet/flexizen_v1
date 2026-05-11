import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'

export default function Login() {
  const [username, setUsername] = useState('admin')
  const [password, setPassword] = useState('admin')
  const [error, setError] = useState(null)
  const nav = useNavigate()
  const { login, loading } = useAuth()

  async function onSubmit(e) {
    e.preventDefault()
    setError(null)
    try {
      await login({ username, password })
      nav('/api/admin/dashboard')
    } catch (err) {
      setError('Login failed')
    }
  }

  return (
    <div style={{ maxWidth: 420, margin: '40px auto', fontFamily: 'sans-serif' }}>
      <h2>Admin Login</h2>
      <form onSubmit={onSubmit}>
        <div>
          <label>Username</label>
          <input value={username} onChange={(e) => setUsername(e.target.value)} />
        </div>
        <div>
          <label>Password</label>
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        </div>
        <button disabled={loading} type="submit">{loading ? 'Logging in...' : 'Login'}</button>
        {error && <p style={{ color: 'red' }}>{error}</p>}
      </form>
    </div>
  )
}

