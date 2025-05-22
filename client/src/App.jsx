// src/App.jsx
import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from './app/context/AuthContext';

import Login from './app/pages/Login';
import Register from './app/pages/Register';
import Products from './app/pages/Products';
import Checkout from './app/pages/Checkout';
import Success from './app/pages/Success';
import Cancel from './app/pages/Cancel';
import Navbar from './app/components/Navbar';
import ProtectedRoute from './app/routes/ProtectedRoute';

function App() {
  const { isAuth } = useAuth();

  return (
    <>
      <Navbar isAuth={isAuth} />
      <Routes>
        <Route path="/" element={<Navigate to={isAuth ? '/products' : '/login'} />} />
        <Route path="/login" element={isAuth ? <Navigate to="/products" /> : <Login />} />
        <Route path="/register" element={<Register />} />

        <Route path="/products" element={<ProtectedRoute><Products /></ProtectedRoute>} />
        <Route path="/checkout" element={<ProtectedRoute><Checkout /></ProtectedRoute>} />

        <Route path="/success" element={<Success />} />
        <Route path="/cancel" element={<Cancel />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </>
  );
}

export default App;
