import React from 'react';
import { useAuth } from './context/AuthContext';
import Appointments from './components/Appointments';
import UploadRecords from './components/UploadRecords';
import Notifications from './components/Notifications';
import DoctorList from './DoctorList';
import DoctorDashboard from './DoctorDashboard';
import { Link } from 'react-router-dom'; 

function Dashboard() {
  const { user } = useAuth();

  return (
    <div className="dashboard">
      <h2>Welcome, {user?.name}</h2>
      <p>Role: {user?.role}</p>

      {/* === Navigation Buttons === */}
      <div className="dashboard-links" style={{ marginBottom: '1.5rem' }}>
        {user?.role === 'patient' && (
          <Link to="/doctors" className="dashboard-btn">👨‍⚕️ View Doctors</Link>
        )}
        {user?.role === 'doctor' && (
          <Link to="/doctor-dashboard" className="dashboard-btn">📋 Doctor Dashboard</Link>
        )}
      </div>

      {/* === Role-Based Content === */}
      {user?.role === 'admin' && (
        <div className="dashboard-section">
          <h3>Admin Panel</h3>
          <p>You have admin access.</p>
        </div>
      )}

      {user?.role === 'patient' && (
        <>
          <Appointments />
          <UploadRecords />
        </>
      )}

      {user?.role === 'doctor' && (
        <>
          <Appointments />
          <UploadRecords />
          <Notifications />
        </>
      )}
    </div>
  );
}

export default Dashboard;
