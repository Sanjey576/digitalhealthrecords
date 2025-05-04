

const express = require('express');
const router = express.Router();
const Appointment = require('../models/Appointment');

router.post('/request-appointment', async (req, res) => {
  try {
    const { patientName, doctorId } = req.body;
    const appointment = await Appointment.create({
      patientName,
      doctorId
    });
    res.status(201).json(appointment);
  } catch (err) {
    console.error('Error creating appointment:', err);
    res.status(500).json({ error: 'Failed to create appointment' });
  }
});

// ✅ Get all appointments (for admin/testing/debug)
router.get('/appointments', async (req, res) => {
  try {
    const appointments = await Appointment.find().populate('doctorId');
    res.json(appointments);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch appointments' });
  }
});

module.exports = router;
