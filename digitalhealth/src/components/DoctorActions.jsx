import React, { useEffect, useState } from 'react';
import axios from 'axios';

function DoctorActions() {
  const [appointments, setAppointments] = useState([]);

  // Fetch all appointments
  const fetchAppointments = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/doctor-appointments');
      setAppointments(res.data);
    } catch (err) {
      console.error("Error fetching appointments:", err);
    }
  };

  // Handle accept or reject
  const handleResponse = async (appointmentId, status) => {
    try {
      await axios.post('http://localhost:5000/api/doctor-response', {
        appointmentId,
        status,
      });
      fetchAppointments(); // refresh list
    } catch (err) {
      console.error("Failed to update status", err);
    }
  };

  useEffect(() => {
    fetchAppointments();
  }, []);

  return (
    <div className="dashboard-section">
      <h3>Pending Appointment Requests</h3>
      {appointments.length === 0 && <p>No appointments found.</p>}

      {appointments.map((appt) => (
        <div key={appt._id} className="appointment-card" style={styles.card}>
          <p><strong>Patient:</strong> {appt.patientName}</p>
          <p><strong>Specialization:</strong> {appt.doctorId?.specialization || 'N/A'}</p>
          <p><strong>Status:</strong> {appt.status}</p>

          {appt.status === 'pending' && (
            <div style={styles.btnGroup}>
              <button style={styles.accept} onClick={() => handleResponse(appt._id, 'accepted')}>
                ✅ Accept
              </button>
              <button style={styles.reject} onClick={() => handleResponse(appt._id, 'rejected')}>
                ❌ Reject
              </button>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

const styles = {
  card: {
    border: '1px solid #ccc',
    borderRadius: '10px',
    padding: '1rem',
    marginBottom: '1rem',
    backgroundColor: '#f9f9f9',
  },
  btnGroup: {
    marginTop: '0.5rem',
    display: 'flex',
    gap: '0.75rem',
  },
  accept: {
    padding: '0.5rem 1rem',
    backgroundColor: '#4caf50',
    color: 'white',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer',
  },
  reject: {
    padding: '0.5rem 1rem',
    backgroundColor: '#f44336',
    color: 'white',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer',
  },
};

export default DoctorActions;
