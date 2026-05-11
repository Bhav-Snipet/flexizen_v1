import { useState } from 'react'
import axios from 'axios'

export default function BookingSearch() {
  const [bookingNo, setBookingNo] = useState('')
  const [result, setResult] = useState(null)
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(false)

  async function search() {
    setLoading(true)
    setError(null)
    setResult(null)
    try {
      const res = await axios.get(`http://localhost:8080/api/bookings/search`, {
        params: { bookingNo },
        withCredentials: true
      })
      setResult(res.data)
    } catch (e) {
      setError('Booking not found')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div style={{ fontFamily: 'sans-serif', maxWidth: 900, margin: '20px auto' }}>
      <h2>Search Booking</h2>

      <div style={{ display: 'flex', gap: 8 }}>
        <input
          value={bookingNo}
          onChange={(e) => setBookingNo(e.target.value)}
          placeholder="Enter booking number"
          style={{ flex: 1, padding: 10, borderRadius: 8, border: '1px solid #ddd' }}
        />
        <button
          type="button"
          onClick={search}
          disabled={loading || !bookingNo}
          style={{ padding: '10px 16px', borderRadius: 8, border: '1px solid #ddd', cursor: 'pointer' }}
        >
          {loading ? 'Searching...' : 'Search'}
        </button>
      </div>

      {error ? <p style={{ color: 'red', marginTop: 12 }}>{error}</p> : null}

      {result ? (
        <div style={{ marginTop: 16, padding: 12, border: '1px solid #e5e7eb', borderRadius: 10 }}>
          <h3>Result</h3>
          <pre style={{ whiteSpace: 'pre-wrap' }}>{JSON.stringify(result, null, 2)}</pre>
        </div>
      ) : null}
    </div>
  )
}

