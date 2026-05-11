import { createContext, useContext, useMemo, useState } from 'react'
import axios from 'axios'

const AuthContext = createContext(null)

export function useAuth() {
  const ctx = useContext(AuthContext)
  return ctx
}

export default function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(false)

  const api = useMemo(() => {
    return axios.create({
      baseURL: '/api',
      withCredentials: true
    })
  }, [])

  async function login({ username, password }) {
    setLoading(true)
    try {
      // Spring Security form login is POST to /login
      // We send it via normal form submission semantics.
      const res = await axios.post(
        'http://localhost:8080/login',
        new URLSearchParams({ username, password }),
        {
          headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
          withCredentials: true
        }
      )

      // if login is successful, session cookie exists; user will be determined lazily
      setUser({ username, role: 'ADMIN' })
      return res
    } finally {
      setLoading(false)
    }
  }

  function logout() {
    return axios
      .post('http://localhost:8080/logout', null, { withCredentials: true })
      .catch(() => {})
      .finally(() => setUser(null))
  }

  const value = { user, loading, login, logout, api }
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

