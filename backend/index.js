const dns = require('dns');
dns.setServers(['1.1.1.1', '8.8.8.8']);
const { exec } = require('child_process');
const util = require('util');
const execPromise = util.promisify(exec);

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const authRoutes = require('./routes/auth');
const analyticsRoutes = require('./routes/analytics');
const tutorRoutes = require('./routes/tutor');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Request logging middleware
app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
  next();
});

// Routes
app.get('/', (req, res) => {
  res.json({
    message: "Welcome to Study Tracker API",
    status: "Running",
    endpoints: ["/api/health", "/api/auth", "/api/tutor", "/api/analytics"]
  });
});

app.get('/api', (req, res) => {
  res.json({ message: "Study Tracker API Root", version: "1.0.0" });
});

app.get('/api/test-network', async (req, res) => {
  try {
    const response = await fetch('https://generativelanguage.googleapis.com');
    res.json({
      status: 'success',
      message: 'Can reach Google AI servers',
      httpStatus: response.status
    });
  } catch (err) {
    res.status(500).json({
      status: 'error',
      message: 'Cannot reach Google AI servers',
      error: err.message
    });
  }
});

app.use('/api/auth', authRoutes);
app.use('/api/tutor', tutorRoutes);
app.use('/api', analyticsRoutes);

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', database: mongoose.connection.readyState === 1 ? 'connected' : 'mock-mode' });
});

// Database Connection
const connectDB = async () => {
  const mongoUri = process.env.MONGO_URI;
  const isDefaultUri = !mongoUri || mongoUri.includes('[') || mongoUri.includes('username');

  // 1. Try Atlas
  if (!isDefaultUri) {
    try {
      await mongoose.connect(mongoUri, { serverSelectionTimeoutMS: 5000 });
      console.log('✅ MongoDB Connected (Atlas)');
      return;
    } catch (err) {
      console.error('❌ MongoDB Atlas Connection Error:', err.message);

      try {
        const { stdout } = await execPromise('curl -s https://api.ipify.org');
        console.log(`\n💡 DIAGNOSTIC: Your current public IP is: ${stdout.trim()}`);
        console.log(`👉 Make sure this IP is whitelisted in your MongoDB Atlas "Network Access" settings.`);
        console.log(`🔗 https://www.mongodb.com/docs/atlas/security-whitelist/\n`);
      } catch (ipErr) {
        // Fallback if curl fails
      }

      console.log('🔄 Attempting fallback to Local Memory Server...');
    }
  }

  // 2. Try Local Memory Server (MongoMemoryServer)
  try {
    const { MongoMemoryServer } = require('mongodb-memory-server');
    const mongoServer = await MongoMemoryServer.create();
    const uri = mongoServer.getUri();
    await mongoose.connect(uri);
    console.log('✅ MongoDB Connected (Local Memory Server)');
    return;
  } catch (err) {
    console.error('❌ Local Memory Server Error:', err.message);
    if (err.message.includes('3221225781')) {
      console.log('💡 Note: This error usually means Visual C++ Redistributable is missing on Windows.');
    }
    console.log('⚠️ FINAL FALLBACK: Entering "Zero-DB" Mock Mode.');
    console.log('⚠️ All data will be stored in system RAM and lost on restart.');
    global.isMockMode = true;
  }
};

connectDB();

// Start Server
// app.listen(PORT, '127.0.0.1', () => {
//   console.log(`🚀 Server active on http://127.0.0.1:${PORT}`);
//   console.log(`📡 API endpoints at http://127.0.0.1:${PORT}/api`);
// });

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server active on port ${PORT}`);
});

// Catch-all for undefined routes - Always return JSON
app.use((req, res) => {
  console.log(`[404] No route for ${req.method} ${req.url}`);
  res.status(404).json({ error: `Route ${req.originalUrl} not found on this server.` });
});

// Global error handler - Always return JSON
app.use((err, req, res, next) => {
  console.error('[Global Error]', err.stack);
  res.status(500).json({ error: 'Internal server error. Check backend logs for details.' });
});
