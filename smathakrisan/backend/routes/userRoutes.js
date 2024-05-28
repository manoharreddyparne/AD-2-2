// backend/routes/userRoutes.js
const express = require('express');
const router = express.Router();
const User = require('../models/User');
const bcrypt = require('bcrypt');

// Route for user signup
router.post('/signup', async (req, res) => {
  try {
    // Extract user data from request body
    const { firstName, surname, dateOfBirth, country, mobile, email, password } = req.body;
    console.log("Received signup request with data:", req.body);

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10); // 10 is the salt rounds

    // Create a new user document with hashed password
    const newUser = new User({
      firstName,
      surname,
      dateOfBirth,
      country,
      mobile,
      email,
      password: hashedPassword // Store hashed password in the database
    });

    // Save the new user document to the database
    await newUser.save();

    // Respond with success message
    res.status(201).json({ message: 'User signed up successfully' });
  } catch (error) {
    // Respond with error message if there's an issue
    res.status(400).json({ message: error.message });
  }
});

module.exports = router;
