// backend/server.js
//require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const userRoutes = require('./routes/userRoutes');
const authRoutes = require('./routes/authRoutes'); // Add this line
//const protectedRoutes = require('./routes/protectedRoutes');
const cors = require('cors');


const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors({ origin: 'http://localhost:3000' })); // Configure CORS
app.use(bodyParser.json());


// Routes
app.use('/api/users', userRoutes);
app.use('/api/auth', authRoutes); // Add this line
//app.use('/api/protected', protectedRoutes);

// MongoDB Atlas connection
const mongoURI1 = 'mongodb+srv://2211CS010446:Pandu%401919@ad2-2.lyqqrtv.mongodb.net/smathakrisanDemo2?retryWrites=true&w=majority';
  //const mongoURI = 'mongodb://localhost:27017/mernapp';
  const mongoURI = process.env.MONGODB_URI || mongoURI1;
  mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(async () => {
    console.log('Connected to MongoDB Atlas');

    const db = mongoose.connection.useDb('smathakrisanDemo2');

    const userCollectionCount = await db.collection('users_details').estimatedDocumentCount();

    if (userCollectionCount === 0) {
      await db.createCollection('users_details');
      console.log('User collection created');
    } else {
      console.log('User collection already exists');
    }

    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.error('Error connecting to MongoDB Atlas:', error);
  });