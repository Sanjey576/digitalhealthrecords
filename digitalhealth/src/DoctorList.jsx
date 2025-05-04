// src/pages/DoctorList.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';

function DoctorList() {
  const [doctors, setDoctors] = useState([]);
const doctorsList= [
  {
    name: "Dr. Abinaya Ravi",
    specialization: "Cardiologist",
    available: true
  },
  {
    name: "Dr. Arun Velayutham",
    specialization: "Neurologist",
    available: false
  },
  {
    name: "Dr. Keerthana Senthilkumar",
    specialization: "Pediatrician",
    available: true
  },
  {
    name: "Dr. Murugesan Balaji",
    specialization: "Orthopedic Surgeon",
    available: true
  },
  {
    name: "Dr. Sanjay Krishnan",
    specialization: "General Physician",
    available: false
  },
  {
    name: "Dr. Swathi Ramesh",
    specialization: "Gynecologist",
    available: true
  },
  {
    name: "Dr. Aravind Raja",
    specialization: "Oncologist",
    available: false
  },
  {
    name: "Dr. Nandhini Vijayakumar",
    specialization: "Dermatologist",
    available: true
  },
  {
    name: "Dr. Mughilan Ramesh",
    specialization: "Psychiatrist",
    available: true
  },
  {
    name: "Dr. Snega Arun",
    specialization: "ENT Specialist",
    available: false
  }
];



    
  useEffect(() => {
    async function fetchDoctors() {
      const res = await axios.get('http://localhost:5000/api/doctors');
      setDoctors(res.data);
    }
    fetchDoctors();
  }, []);

  useEffect(async()=>{
    try{
    const response=await fetch("http://localhost:5000/api/doctors",
      {
        method:"POST",
        body:JSON.stringify({
          name:doctorsList.name,
          specialization:doctorsList.specialization,
          available:doctorsList.available
        }),
        headers:{
          "Content-Type":"application/json;charset=UTF-8",
        }
      }
    );
    const data=await response.json();
    console.log(data);
    }catch(err){
      console.log(err);
    }
  })
  return (
    <div className="doctor-list">
      <h2>Available Doctors</h2>
      {doctors.map((doc) => (
        <div className="doctor-card" key={doc._id}>
          <h3>{doc.name}</h3>
          <p>Specialization: {doc.specialization}</p>
          <button>Request Appointment</button>
        </div>
      ))}
    </div>
  );
}

export default DoctorList;
