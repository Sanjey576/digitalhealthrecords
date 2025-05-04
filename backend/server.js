const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();
const appointmentRoutes = require('./routes/appointmentRoutes');
const notificationRoutes = require('./routes/notificationRoutes');
const app = express();

app.use('/api', appointmentRoutes);
app.use('/api', notificationRoutes);

const authRoutes = require('./routes/authRoutes');
const doctorRoutes = require('./routes/doctorRoutes');


const port = process.env.PORT || 5000; 


app.use(cors());
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api', doctorRoutes);


mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('✅ Connected to MongoDB Atlas'))
  .catch(err => console.error('❌ MongoDB connection failed:', err.message));


app.listen(port, () => {
  console.log(`🚀 Server running on port ${port}`);
});
