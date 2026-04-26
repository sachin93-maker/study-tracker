const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const User = require('../models/User');

// Temporary in-memory storage for Mock Mode
let mockUsers = [];

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET || 'secret_key_123', {
    expiresIn: '7d',
  });
};

// @route   POST /api/auth/register
router.post('/register', async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ error: 'Please provide all required fields.' });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Case 1: Database is connected
    if (mongoose.connection.readyState === 1) {
      const existingUser = await User.findOne({ email });
      if (existingUser) return res.status(400).json({ error: 'Account already exists with this email.' });

      const user = await User.create({ name, email, password: hashedPassword });
      return res.status(201).json({
        _id: user._id,
        name: user.name,
        email: user.email,
        token: generateToken(user._id),
      });
    } 
    
    // Case 2: Mock Mode Fallback
    const existingMockUser = mockUsers.find(u => u.email === email);
    if (existingMockUser) return res.status(400).json({ error: 'Account already exists in mock session.' });

    const newUser = { _id: `mock_${Date.now()}`, name, email, password: hashedPassword };
    mockUsers.push(newUser);
    
    console.log(`[Mock Auth] Registered user: ${email}`);
    
    return res.status(201).json({
      _id: newUser._id,
      name: newUser.name,
      email: newUser.email,
      token: generateToken(newUser._id),
    });

  } catch (err) {
    console.error('Registration Error:', err.message);
    res.status(500).json({ error: 'Internal server error during registration.' });
  }
});

// @route   POST /api/auth/login
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password are required.' });
    }

    let user;
    if (mongoose.connection.readyState === 1) {
      user = await User.findOne({ email });
    } else {
      user = mockUsers.find(u => u.email === email);
    }

    if (user && (await bcrypt.compare(password, user.password))) {
      return res.json({
        _id: user._id,
        name: user.name,
        email: user.email,
        token: generateToken(user._id),
      });
    } 
    
    return res.status(401).json({ error: 'Invalid credentials. Please try again.' });

  } catch (err) {
    console.error('Login Error:', err.message);
    res.status(500).json({ error: 'Internal server error during login.' });
  }
});

module.exports = router;
