import { Routes, Route } from 'react-router-dom';
import Home from './pages/user/Home';
import Classes from './pages/user/Classes';
import Login from './pages/admin/Login';
import Dashboard from './pages/admin/Dashboard';
import ManageClasses from './pages/admin/ManageClasses';
import PrivateRoute from './routes/PrivateRoute';
import AdminRoute from './routes/AdminRoute';

function App() {
  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/" element={<Home />} />
      <Route path="/classes" element={<Classes />} />
      
      {/* Auth */}
      <Route path="/login" element={<Login />} />

      {/* Protected Admin Routes */}
      <Route element={<PrivateRoute />}>
        <Route element={<AdminRoute />}>
          <Route path="/admin/dashboard" element={<Dashboard />} />
          <Route path="/admin/classes" element={<ManageClasses />} />
          {/* Add more admin routes here in future phases */}
        </Route>
      </Route>
    </Routes>
  );
}

export default App;
