
const express = require('express');
const router = express.Router();
const User = require('../models/User');
const bcrypt = require('bcrypt');


router.post('/signup', async (req, res) => {
  const { firstName, surname, email, mobile, password, dateOfBirth, country } = req.body;

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({
      firstName,
      surname,
      email,
      mobile,
      password: hashedPassword,
      dateOfBirth,
      country
    });

    await newUser.save();
    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    console.error('Error during signup:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});


router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Invalid password' });
    }

    res.status(200).json({ message: 'Login successful', user });
  } catch (error) {
    console.error('Error during login:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

router.get('/:identifier', async (req, res) => {
  try {
    const { identifier } = req.params;

    const user = await User.findOne({
      $or: [{ email: identifier }, { mobile: identifier }]
    });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json({
      firstName: user.firstName,
      surname: user.surname,
      dateOfBirth: user.dateOfBirth,
      country: user.country,
      mobile: user.mobile,
      email: user.email
    });
  } catch (error) {
    console.error('Error fetching user data:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});


router.get('/profile/:userId', async (req, res) => {
  try {
    const userId = req.params.userId;
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json(user);
  } catch (error) {
    console.error('Error fetching user profile:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

module.exports = router;