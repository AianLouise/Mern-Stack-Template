import express from 'express';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import path from 'path';
import mongoose from 'mongoose';
import cors from 'cors';
import fs from 'fs';

import authRoutes from './routes/auth.route.js';
import userRoutes from './routes/user.route.js';

dotenv.config();

const __dirname = path.resolve();
const app = express();

// Log the client URL value
console.log('Client URL:', process.env.CLIENT_URL);

// CORS configuration
const corsOptions = {
  origin: process.env.CLIENT_URL, // Read from .env file
  credentials: true, // Allow credentials like cookies
};

// Apply middleware
app.use(cors(corsOptions));
app.use(express.json());
app.use(cookieParser());

// Serve static files only if the directory exists
const clientDistPath = path.join(__dirname, 'client', 'dist');
if (fs.existsSync(clientDistPath)) {
  app.use(express.static(clientDistPath));
}

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/user', userRoutes);

// Serve the UI view for the API
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

// Catch-all route to serve index.html if it exists
app.get('*', (req, res) => {
  if (fs.existsSync(clientDistPath)) {
    res.sendFile(path.join(clientDistPath, 'index.html'));
  } else {
    res.status(404).json({
      success: false,
      message: 'index.html not found',
      statusCode: 404,
    });
  }
});

// Error handling middleware
app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || 'Internal Server Error';
  res.status(statusCode).json({
    success: false,
    message,
    statusCode,
  });
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});