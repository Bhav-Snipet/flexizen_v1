import { useEffect, useState } from 'react'
import axios from 'axios'

export default function Dashboard() {
  const [items, setItems] = useState(null)

  useEffect(() => {
    axios
      .get('http://localhost:8080/api/admin/dashboard', { withCredentials: true })
      .then((res) => setItems(res.data))
      .catch(() => setItems({ note: 'Dashboard endpoint not implemented yet.' }))
  }, [])

  return (
    <div style={{ fontFamily: 'sans-serif' }}>
      <h2>Admin Dashboard</h2>
      <pre>{JSON.stringify(items, null, 2)}</pre>
    </div>
  )
}

