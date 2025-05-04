
const Appointment = require('./models/Appointment');
const Notification = require('./models/Notification');
const User = require('./models/User');


exports.requestAppointment = async (req, res) => {
  const { patientName, doctorId } = req.body;

  try {
    const appointment = await Appointment.create({
      patientName,
      doctorId
    });

    res.status(201).json(appointment);
  } catch (err) {
    console.error('Error requesting appointment:', err);
    res.status(500).json({ message: 'Appointment creation failed' });
  }
};


exports.getDoctorAppointments = async (req, res) => {
  try {
    const appointments = await Appointment.find()
      .populate('doctorId');
    res.json(appointments);
  } catch (err) {
    console.error('Error fetching appointments:', err);
    res.status(500).json({ message: 'Failed to load appointments' });
  }
};


exports.respondToAppointment = async (req, res) => {
  const { appointmentId, status } = req.body;

  try {
    const appointment = await Appointment.findByIdAndUpdate(
      appointmentId,
      { status },
      { new: true }
    );


    const user = await User.findOne({ name: appointment.patientName }); 

    if (user) {
      await Notification.create({
        userId: user._id,
        message: `Your appointment was ${status} by the doctor.`
      });
    }

    res.json(appointment);
  } catch (err) {
    console.error('Error updating appointment:', err);
    res.status(500).json({ message: 'Failed to update appointment' });
  }
};
