const express = require('express');
const bcrypt = require('bcrypt');
const User = require('../models/User');

const router = express.Router();

// POST route for user login
router.post('/login', async (req, res) => {
  const { identifier, password } = req.body;

  try {
    // Find user by email or mobile number
    const user = await User.findOne({ $or: [{ email: identifier }, { mobile: identifier }] });

    if (!user) {
      return res.status(404).json({ message: 'Invalid email or mobile number' });
    }

    // Compare entered password with stored hashed password
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Invalid password' });
    }

    // Successful login
    res.json({
      message: 'Login Successful',
      user: {
        firstName: user.firstName,
        lastName: user.surname, // Corrected to lastName as per your schema
        email: user.email,
      }
    });

  } catch (error) {
    console.error('Error during login:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

module.exports = router;
