const express = require('express');
const bcrypt = require('bcrypt');
//const jwt = require('jsonwebtoken');
const User = require('../models/User');
//require('dotenv').config();

const router = express.Router();

router.post('/login', async (req, res) => {
  try {
    const { identifier, password } = req.body;

    // Find user by mobile or email
    const user = await User.findOne({
      $or: [{ email: identifier }, { mobile: identifier }]
    });

    if (!user) {
      return res.status(404).json({ message: 'Invalid email or mobile number' });
    }

     // Check if password is correct
     const isPasswordValid = await bcrypt.compare(password, user.password);
     if (!isPasswordValid) {
       return res.status(401).json({ message: 'Invalid password' });
     }
        // Generate JWT token with the secret key
        //const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    
        res.json({
          message: 'Login Successful',
          user: {
            firstName: user.firstName,
            lastName: user.surname,
            email: user.email,
          }
        });
    
      } catch (error) {
        console.error('Login error:', error);
        res.status(500).json({ message: 'Internal server error' });
      }
    });
    
    module.exports = router;