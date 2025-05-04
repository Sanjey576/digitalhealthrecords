import React from 'react';
import { Routes, Route } from 'react-router-dom';
import HomePage from './HomePage';
import LoginPage from './LoginPage';
import RegisterPage from './RegisterPage';
import Dashboard from './Dashboard';
import PrivateRoute from './components/PrivateRoute';
import DoctorList from './DoctorList';
import PatientRequests from './PatientRequests'; 
import DoctorDashboard from './DoctorDashboard';

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
        <Route path="/patient-requests" element={<PatientRequests />} />
        <Route path="/doctors" element={<DoctorList />} />
        <Route path="/doctor-dashboard" element={<DoctorDashboard />} />

      <Route
        path="/dashboard"
        element={<PrivateRoute><Dashboard /></PrivateRoute>}
      />
    </Routes>
  );
}

export default App;
