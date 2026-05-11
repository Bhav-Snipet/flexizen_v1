import { Navigate, Route, Routes } from 'react-router-dom'
import { AdminRoute } from './routes/AdminRoute'
import Login from './pages/admin/Login'
import Dashboard from './pages/admin/Dashboard'
import Classes from './pages/user/Classes'
import BookingForm from './pages/user/BookingForm'

export default function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/" element={<Navigate to="/classes" replace />} />
      <Route path="/classes" element={<Classes />} />
      <Route path="/book" element={<BookingForm />} />

      <Route
        path="/admin/dashboard"
        element={
          <AdminRoute>
            <Dashboard />
          </AdminRoute>
        }
      />
    </Routes>
  )
}


