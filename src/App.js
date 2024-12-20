import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Signup from './pages/Signup';
import VerifyOTP from './pages/VerifyOTP';
import Home from './pages/Home';
import SectionDetail from './pages/SectionDetail';
import RestaurantSections from './pages/RestaurantSections';

function App() {
  return (
    <div className="min-h-screen bg-gray-100">
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/verify-otp" element={<VerifyOTP />} />
        <Route path="/home" element={<Home />} />
        <Route path="/restaurant_sections" element={<RestaurantSections />} />
        <Route path="/sections" element={<SectionDetail />} />
        <Route path="/" element={<Navigate to="/login" replace />} />
      </Routes>
    </div>
  );
}

export default App;
