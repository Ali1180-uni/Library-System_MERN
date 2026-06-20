const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const {User, Book} = require('./schema/model.js');
const {validateUser, validateBook} = require('./validation.js');
const bcrypt = require('bcrypt');
const nanoid = require('nanoid');
const app = express();
const MONGO_URI = 'mongodb://localhost:27017/libraryDB';

const corsOptions = {
  origin: 'http://localhost:5173',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization']
};

app.use(cors(corsOptions));
app.use(express.json());

app.get('/', (req, res) => {
    res.send({ message: 'Welcome to the Library Management System API' });
});

app.post('/signup', async (req, res) => {
  const { error } = validateUser(req.body);
  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }

  try {
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    const user = new User({
      name: req.body.firstName,
      email: req.body.email,
      username: req.body.username,
      password: hashedPassword,
      StudentID: req.body.StudentID,
      role: 'Student'
    });
    await user.save();
    res.status(201).json({ message: 'User created successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

mongoose
  .connect(MONGO_URI)
  .then(() => {
    app.listen(3000, () => {
      console.log('Server is running on http://localhost:3000');
    });
  })
  .catch((err) => {
    console.error('Failed to connect to MongoDB:', err.message);
  });