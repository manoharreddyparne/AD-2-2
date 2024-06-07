// backend/server.js
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
const corsOptions = {
  origin: ['http://localhost:3000', 'https://glowing-eureka-979pwprjprwrcxrw6-3000.app.github.dev'],
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true,
  optionsSuccessStatus: 204
};
app.use(cors(corsOptions));
app.use(bodyParser.json());

// MongoDB Atlas connection
const mongoURI = 'mongodb+srv://2211CS010446:Pandu%401919@ad2-2.lyqqrtv.mongodb.net/smathakrisanDemo2?retryWrites=true&w=majority&appName=ad2-2';
mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(async () => {
    console.log('Connected to MongoDB Atlas');

    // Define schema for agricultural data
    const agriculturalDataSchema = new mongoose.Schema({
      question: String,
      answer: String,
    });

    // Create model for agricultural data
    const AgriculturalData = mongoose.model('AgriculturalData', agriculturalDataSchema);

    // Route to add agricultural data
    app.post('/api/add-agricultural-data', async (req, res) => {
      const { question, answer } = req.body;
      try {
        const newData = new AgriculturalData({ question, answer });
        await newData.save();
        res.status(201).json({ message: 'Agricultural data added successfully' });
      } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
      }
    });

    // Route to get agricultural data by question
    app.get('/api/get-agricultural-data', async (req, res) => {
      const { question } = req.query;
      try {
        const data = await AgriculturalData.findOne({ question });
        if (data) {
          res.json({ answer: data.answer });
        } else {
          res.status(404).json({ error: 'Question not found' });
        }
      } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
      }
    });

    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.error('Error connecting to MongoDB Atlas:', error);
  });
