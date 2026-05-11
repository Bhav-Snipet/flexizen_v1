import { useEffect, useState } from 'react'
import axios from 'axios'

function Tabs({ value, onChange }) {
  return (
    <div style={{ display: 'flex', gap: 8, marginBottom: 12 }}>
      {['NEW', 'APPROVED', 'CANCELLED'].map((s) => (
        <button
          key={s}
          type="button"
          onClick={() => onChange(s)}
          style={{
            padding: '8px 12px',
            borderRadius: 6,
            border: '1px solid #ddd',
            background: value === s ? '#111827' : 'white',
            color: value === s ? 'white' : '#111827',
            cursor: 'pointer'
          }}
        >
          {s}
        </button>
      ))}
    </div>
  )
}

export default function ManageBookings() {
  const [status, setStatus] = useState('NEW')
  const [bookings, setBookings] = useState([])
  const [loading, setLoading] = useState(false)

  async function load() {
    setLoading(true)
    try {
      const res = await axios.get(`http://localhost:8080/api/admin/bookings`, {
        params: { status },
        withCredentials: true
      })
      setBookings(res.data || [])
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    load()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [status])

  async function approve(id) {
    await axios.put(`http://localhost:8080/api/admin/bookings/${id}/approve`, null, {
      withCredentials: true
    })
    await load()
  }

  async function cancel(id) {
    await axios.put(`http://localhost:8080/api/admin/bookings/${id}/cancel`, null, {
      withCredentials: true
    })
    await load()
  }

  async function saveRemark(id, remark) {
    await axios.put(
      `http://localhost:8080/api/admin/bookings/${id}/remark`,
      { remark },
      { withCredentials: true }
    )
    await load()
  }

  return (
    <div style={{ fontFamily: 'sans-serif', maxWidth: 1000, margin: '20px auto' }}>
      <h2>Manage Bookings</h2>

      <Tabs value={status} onChange={setStatus} />

      {loading ? <p>Loading...</p> : null}

      <div style={{ border: '1px solid #e5e7eb', borderRadius: 10, overflow: 'hidden' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ background: '#f9fafb' }}>
              <th style={{ textAlign: 'left', padding: 10, borderBottom: '1px solid #e5e7eb' }}>Booking No</th>
              <th style={{ textAlign: 'left', padding: 10, borderBottom: '1px solid #e5e7eb' }}>User</th>
              <th style={{ textAlign: 'left', padding: 10, borderBottom: '1px solid #e5e7eb' }}>Class</th>
              <th style={{ textAlign: 'left', padding: 10, borderBottom: '1px solid #e5e7eb' }}>Status</th>
              <th style={{ textAlign: 'left', padding: 10, borderBottom: '1px solid #e5e7eb' }}>Remark</th>
              <th style={{ textAlign: 'left', padding: 10, borderBottom: '1px solid #e5e7eb' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {bookings.length === 0 ? (
              <tr>
                <td colSpan={6} style={{ padding: 14, color: '#6b7280' }}>
                  No bookings found.
                </td>
              </tr>
            ) : (
              bookings.map((b) => (
                <tr key={b.id}>
                  <td style={{ padding: 10, borderBottom: '1px solid #f3f4f6' }}>{b.bookingNo || b.booking_no || '-'}</td>
                  <td style={{ padding: 10, borderBottom: '1px solid #f3f4f6' }}>{b.user?.name || '-'}</td>
                  <td style={{ padding: 10, borderBottom: '1px solid #f3f4f6' }}>{b.class?.title || '-'}</td>
                  <td style={{ padding: 10, borderBottom: '1px solid #f3f4f6' }}>{b.status || status}</td>
                  <td style={{ padding: 10, borderBottom: '1px solid #f3f4f6' }}>
                    <RemarkCell booking={b} onSave={saveRemark} />
                  </td>
                  <td style={{ padding: 10, borderBottom: '1px solid #f3f4f6' }}>
                    {status === 'NEW' ? (
                      <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                        <button
                          type="button"
                          onClick={() => approve(b.id)}
                          style={{ padding: '6px 10px', borderRadius: 6, border: '1px solid #ddd', cursor: 'pointer' }}
                        >
                          Approve
                        </button>
                        <button
                          type="button"
                          onClick={() => cancel(b.id)}
                          style={{ padding: '6px 10px', borderRadius: 6, border: '1px solid #ddd', cursor: 'pointer' }}
                        >
                          Cancel
                        </button>
                      </div>
                    ) : (
                      <span style={{ color: '#6b7280' }}>—</span>
                    )}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}

function RemarkCell({ booking, onSave }) {
  const [remark, setRemark] = useState(booking.remark || '')

  async function handleSave() {
    await onSave(booking.id, remark)
  }

  return (
    <div>
      <input
        value={remark}
        onChange={(e) => setRemark(e.target.value)}
        style={{ width: '100%', padding: 8, borderRadius: 8, border: '1px solid #ddd' }}
        placeholder="Add remark..."
      />
      <button
        type="button"
        onClick={handleSave}
        style={{ marginTop: 8, padding: '6px 10px', borderRadius: 6, border: '1px solid #ddd', cursor: 'pointer' }}
      >
        Save
      </button>
    </div>
  )
}

