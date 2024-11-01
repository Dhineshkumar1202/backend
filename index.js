// index.js
const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const cors = require('cors');
const authRoutes = require('./routes/authRoute');
const protectedRoutes = require('./routes/protected');
const studentRoutes = require('./routes/studentRoute');
const applicationRoutes = require('./routes/applicationRoute');
const { authMiddleware } = require('./middleware/auth'); // Ensure this middleware exists if using protected routes

dotenv.config();
connectDB();

const app = express();

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.send('API is running...');
});

// Define routes
app.use('/api/auth', authRoutes);
app.use('/api/students', studentRoutes);
app.use('/api/applications', applicationRoutes);

// Use authMiddleware to protect these routes if required
app.use('/api/protected', authMiddleware, protectedRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send({ message: "Server error", error: err.message });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
