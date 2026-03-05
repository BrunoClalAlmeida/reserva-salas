import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { AuthProvider } from './context/AuthContext';
import Navbar from './components/Navbar';
import PrivateRoute from './components/PrivateRoute';
import Login from './pages/Login';
import Register from './pages/Register';
import Rooms from './pages/Rooms';
import ReserveRoom from './pages/ReserveRoom';
import MyReservations from './pages/MyReservations';
import AdminRooms from './pages/AdminRooms';
import AdminReservations from './pages/AdminReservations';

function App() {
  return (
    <AuthProvider>
      <Router>
        <div style={{ backgroundColor: '#1a1a2e', minHeight: '100vh' }}>
          <Navbar />
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/rooms" element={
              <PrivateRoute><Rooms /></PrivateRoute>
            } />
            <Route path="/reserve/:id" element={
              <PrivateRoute><ReserveRoom /></PrivateRoute>
            } />
            <Route path="/my-reservations" element={
              <PrivateRoute><MyReservations /></PrivateRoute>
            } />
            <Route path="/admin/rooms" element={
              <PrivateRoute adminOnly><AdminRooms /></PrivateRoute>
            } />
            <Route path="/admin/reservations" element={
              <PrivateRoute adminOnly><AdminReservations /></PrivateRoute>
            } />
            <Route path="*" element={<Navigate to="/rooms" />} />
          </Routes>
          <ToastContainer position="top-right" theme="dark" />
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
