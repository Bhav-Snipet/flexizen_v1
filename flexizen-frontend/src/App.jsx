
import { Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/admin/Login';
import Dashboard from './pages/admin/Dashboard';
import PrivateRoute from './routes/PrivateRoute';
import AdminRoute from './routes/AdminRoute';
import './App.css';

function App() {
  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/" element={<Navigate to="/login" replace />} />
      <Route path="/login" element={<Login />} />

      {/* Protected Admin Routes */}
      <Route element={<PrivateRoute />}>
        <Route element={<AdminRoute />}>
          <Route path="/admin/dashboard" element={<Dashboard />} />
          {/* Add more admin routes here in future phases */}
        </Route>
      </Route>
    </Routes>
  );
}

export default App;
