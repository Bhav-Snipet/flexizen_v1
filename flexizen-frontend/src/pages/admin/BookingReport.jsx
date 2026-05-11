import { useState } from 'react'
import axios from 'axios'

function toIsoDateTimeLocal(dateStr) {
  // dateStr: YYYY-MM-DD
  // convert to ISO string with time 00:00:00
  if (!dateStr) return null
  return `${dateStr}T00:00:00`
}

export default function BookingReport() {
  const [from, setFrom] = useState('')
  const [to, setTo] = useState('')
  const [rows, setRows] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  async function run() {
    setLoading(true)
    setError(null)
    setRows([])
    try {
      const fromVal = toIsoDateTimeLocal(from)
      const toVal = toIsoDateTimeLocal(to)

      const res = await axios.get('http://localhost:8080/api/admin/bookings/report', {
        params: {
          from: fromVal,
          to: toVal
        },
        withCredentials: true
      })
      setRows(res.data || [])
    } catch (e) {
      setError('Failed to fetch report')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div style={{ fontFamily: 'sans-serif', maxWidth: 1000, margin: '20px auto' }}>
      <h2>Booking Report</h2>

      <div style={{ display: 'flex', gap: 12, alignItems: 'flex-end', flexWrap: 'wrap' }}>
        <div>
          <label style={{ display: 'block', marginBottom: 6 }}>From</label>
          <input type="date" value={from} onChange={(e) => setFrom(e.target.value)} />
        </div>
        <div>
          <label style={{ display: 'block', marginBottom: 6 }}>To</label>
          <input type="date" value={to} onChange={(e) => setTo(e.target.value)} />
        </div>
        <button
          type="button"
          onClick={run}
          disabled={loading || !from || !to}
          style={{ padding: '10px 16px', borderRadius: 8, border: '1px solid #ddd', cursor: 'pointer' }}
        >
          {loading ? 'Generating...' : 'Generate'}
        </button>
      </div>

      {error ? <p style={{ color: 'red', marginTop: 12 }}>{error}</p> : null}

      <div style={{ marginTop: 16, border: '1px solid #e5e7eb', borderRadius: 10, overflow: 'hidden' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ background: '#f9fafb' }}>
              <th style={{ textAlign: 'left', padding: 10, borderBottom: '1px solid #e5e7eb' }}>Booking No</th>
              <th style={{ textAlign: 'left', padding: 10, borderBottom: '1px solid #e5e7eb' }}>Status</th>
              <th style={{ textAlign: 'left', padding: 10, borderBottom: '1px solid #e5e7eb' }}>Created At</th>
              <th style={{ textAlign: 'left', padding: 10, borderBottom: '1px solid #e5e7eb' }}>User</th>
              <th style={{ textAlign: 'left', padding: 10, borderBottom: '1px solid #e5e7eb' }}>Class</th>
            </tr>
          </thead>
          <tbody>
            {rows.length === 0 ? (
              <tr>
                <td colSpan={5} style={{ padding: 14, color: '#6b7280' }}>
                  No results.
                </td>
              </tr>
            ) : (
              rows.map((b) => (
                <tr key={b.id}>
                  <td style={{ padding: 10, borderBottom: '1px solid #f3f4f6' }}>{b.bookingNo || b.booking_no || '-'}</td>
                  <td style={{ padding: 10, borderBottom: '1px solid #f3f4f6' }}>{b.status || '-'}</td>
                  <td style={{ padding: 10, borderBottom: '1px solid #f3f4f6' }}>{b.createdAt || '-'}</td>
                  <td style={{ padding: 10, borderBottom: '1px solid #f3f4f6' }}>{b.user?.name || '-'}</td>
                  <td style={{ padding: 10, borderBottom: '1px solid #f3f4f6' }}>{b.class?.title || '-'}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}

