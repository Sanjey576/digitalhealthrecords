import React, { useEffect, useState } from 'react';
import axios from 'axios';

function PatientRequests() {
  const [requests, setRequests] = useState([]);

  useEffect(() => {
    async function fetchRequests() {
      try {
        const res = await axios.get('http://localhost:5000/api/patient-requests');
        setRequests(res.data);
      } catch (err) {
        console.error('Error fetching patient requests:', err);
      }
    }
    fetchRequests();
  }, []);

  return (
    <div className="patient-requests">
      <h2>Your Appointment Requests</h2>

      {requests.length === 0 ? (
        <p>No requests found.</p>
      ) : (
        <ul className="request-list">
          {requests.map((req) => (
            <li key={req._id} className="request-item">
              <strong>Doctor:</strong> {req.doctorName} <br />
              <strong>Status:</strong> {req.status}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default PatientRequests;
