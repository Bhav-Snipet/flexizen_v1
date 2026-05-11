import { useEffect, useMemo, useState } from 'react'
import axios from 'axios'
import { useLocation } from 'react-router-dom'

function useQuery() {
  return new URLSearchParams(useLocation().search)
}

export default function BookingForm() {
  const q = useQuery()
  const classId = q.get('classId')

  const [classes, setClasses] = useState([])
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [email, setEmail] = useState('')
  const [result, setResult] = useState(null)

  useEffect(() => {
    axios
      .get('http://localhost:8080/api/classes', { withCredentials: true })
      .then((res) => setClasses(res.data || []))
      .catch(() => setClasses([]))
  }, [])

  const selectedClassId = useMemo(() => {
    const parsed = classId ? Number(classId) : null
    return parsed && !Number.isNaN(parsed) ? parsed : ''
  }, [classId])

  async function onSubmit(e) {
    e.preventDefault()
    const payload = {
      classId: selectedClassId,
      name,
      phone,
      email
    }

    const res = await axios.post('http://localhost:8080/api/bookings', payload, { withCredentials: true })
    setResult(res.data)
  }

  return (
    <div style={{ maxWidth: 520, margin: '20px auto', fontFamily: 'sans-serif' }}>
      <h2>Book a Yoga Session</h2>
      <form onSubmit={onSubmit}>
        <div>
          <label>Name</label>
          <input value={name} onChange={(e) => setName(e.target.value)} required />
        </div>
        <div>
          <label>Phone</label>
          <input value={phone} onChange={(e) => setPhone(e.target.value)} required />
        </div>
        <div>
          <label>Email</label>
          <input value={email} onChange={(e) => setEmail(e.target.value)} />
        </div>
        <div>
          <label>Class</label>
          <select value={selectedClassId} readOnly>
            <option value={selectedClassId}>{classes.find((c) => String(c.id) === String(selectedClassId))?.title || 'Selected class'}</option>
          </select>
          <p style={{ fontSize: 12, color: '#666' }}>(Selected from Classes page)</p>
        </div>
        <button type="submit">Submit Booking</button>
      </form>

      {result && (
        <div style={{ marginTop: 16, padding: 12, border: '1px solid #ddd' }}>
          <h3>Booking Created</h3>
          <pre>{JSON.stringify(result, null, 2)}</pre>
        </div>
      )}
    </div>
  )
}

