import { Routes, Route } from 'react-router-dom';
import Home from './pages/user/Home';
import Classes from './pages/user/Classes';
import BookingForm from './pages/user/BookingForm';
import AboutUs from './pages/user/AboutUs';
import ContactUs from './pages/user/ContactUs';
import Login from './pages/admin/Login';
import Dashboard from './pages/admin/Dashboard';
import ManageClasses from './pages/admin/ManageClasses';
import ManageBookings from './pages/admin/ManageBookings';
import ManagePages from './pages/admin/ManagePages';
import Enquiry from './pages/admin/Enquiry';
import Reports from './pages/admin/Reports';
import SearchBooking from './pages/admin/SearchBooking';
import AdminProfile from './pages/admin/AdminProfile';
import PrivateRoute from './routes/PrivateRoute';
import AdminRoute from './routes/AdminRoute';

function App() {
  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/" element={<Home />} />
      <Route path="/classes" element={<Classes />} />
      <Route path="/book" element={<BookingForm />} />
      <Route path="/book/:classId" element={<BookingForm />} />
      <Route path="/enquiry" element={<BookingForm />} />
      <Route path="/enquiry/:classId" element={<BookingForm />} />
      <Route path="/about" element={<AboutUs />} />
      <Route path="/contact" element={<ContactUs />} />

      {/* Auth */}
      <Route path="/login" element={<Login />} />

      {/* Protected Admin Routes */}
      <Route element={<PrivateRoute />}>
        <Route element={<AdminRoute />}>
          <Route path="/admin/dashboard" element={<Dashboard />} />
          <Route path="/admin/classes" element={<ManageClasses />} />
          <Route path="/admin/bookings" element={<ManageBookings />} />
          <Route path="/admin/pages" element={<ManagePages />} />
          <Route path="/admin/enquiries" element={<Enquiry />} />
          <Route path="/admin/reports" element={<Reports />} />
          <Route path="/admin/search" element={<SearchBooking />} />
          <Route path="/admin/profile" element={<AdminProfile />} />
        </Route>
      </Route>
    </Routes>
  );
}

export default App;
