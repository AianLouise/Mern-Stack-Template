import express from 'express';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import path from 'path';
import mongoose from 'mongoose';
import cors from 'cors';

import authRoutes from './routes/auth.route.js';
import userRoutes from './routes/user.route.js';

// Load environment variables from .env file
dotenv.config();

const __dirname = path.resolve();
const app = express();

// Log the client URL value
console.log('Client URL:', process.env.CLIENT_URL);

// Apply CORS middleware
const corsConfig = {
  origin: process.env.CLIENT_URL,
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE"],
};

app.options('*', cors(corsConfig));
app.use(cors(corsConfig));

// Middleware to parse JSON and URL-encoded data
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb" }));
app.use(cookieParser());

// Serve static files from the client/dist directory
app.use(express.static(path.join(__dirname, '/client/dist')));

// Root route
app.get("/", (req, res) => {
  res.send("Welcome to the MERN application!");
});

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/user', userRoutes);

// Catch-all route to serve index.html for any other routes
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'client', 'dist', 'index.html'));
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