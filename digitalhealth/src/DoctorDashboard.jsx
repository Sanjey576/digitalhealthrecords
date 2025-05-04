import React, { useEffect, useState } from 'react';
import axios from 'axios';

function DoctorDashboard() {
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    async function fetchAppointments() {
      try {
        const res = await axios.get('http://localhost:5000/api/doctor-appointments');
        setAppointments(res.data);
      } catch (err) {
        console.error('Error fetching appointments:', err);
      }
    }
    fetchAppointments();
  }, []);

  const handleResponse = async (appointmentId, status) => {
    try {
      await axios.post('http://localhost:5000/api/doctor-response', {
        appointmentId,
        status,
      });
      // Refresh list after accepting/rejecting
      setAppointments((prev) =>
        prev.map((appt) =>
          appt._id === appointmentId ? { ...appt, status } : appt
        )
      );
    } catch (err) {
      console.error('Error updating appointment status:', err);
    }
  };

  return (
    <div className="doctor-dashboard">
      <h2>Appointment Requests</h2>
      {appointments.length === 0 ? (
        <p>No appointments found.</p>
      ) : (
        <ul className="appointment-list">
          {appointments.map((appt) => (
            <li key={appt._id} className="appointment-item">
              <strong>Patient:</strong> {appt.patientName} <br />
              <strong>Status:</strong> {appt.status}
              <br />
              {appt.status === 'pending' && (
                <>
                  <button
                    className="accept-btn"
                    onClick={() => handleResponse(appt._id, 'accepted')}
                  >
                    Accept
                  </button>
                  <button
                    className="reject-btn"
                    onClick={() => handleResponse(appt._id, 'rejected')}
                  >
                    Reject
                  </button>
                </>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default DoctorDashboard;
