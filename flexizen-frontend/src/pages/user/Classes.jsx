import { useEffect, useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

export default function Classes() {
  const [classes, setClasses] = useState([])
  const nav = useNavigate()

  useEffect(() => {
    axios
      .get('http://localhost:8080/api/classes', { withCredentials: true })
      .then((res) => setClasses(res.data || []))
      .catch(() => setClasses([]))
  }, [])

  return (
    <div style={{ fontFamily: 'sans-serif', maxWidth: 900, margin: '20px auto' }}>
      <h2>Available Yoga Classes</h2>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 12 }}>
        {classes.map((c) => (
          <div key={c.id} style={{ border: '1px solid #ddd', padding: 14, borderRadius: 8 }}>
            <h3>{c.title}</h3>
            <p>{c.description}</p>
            <p><b>Schedule:</b> {c.schedule}</p>
            <p><b>Capacity:</b> {c.capacity}</p>
            <button onClick={() => nav(`/book?classId=${c.id}`)}>Book</button>
          </div>
        ))}
      </div>
    </div>
  )
}

