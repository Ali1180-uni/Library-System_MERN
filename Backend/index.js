import express from 'express';
import cors from 'cors';
// const passport = require('passport');
import { rateLimit } from 'express-rate-limit';
import session from 'express-session';
import { User, Book } from './schema/model.js';
import { validateUser, validateBook } from './validation.js';
import bcrypt from 'bcrypt';
import dotenv from 'dotenv';
import {connectDB} from './schema/db.connect.js';
const app = express();
const MONGO_URI = process.env.MONGODB_URI;
dotenv.config({
  path: './.env'
});

app.set('trust proxy', 1);
app.use(express.json());

const corsOptions = {
  origin: 'http://localhost:5173',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true
};

app.use(cors(corsOptions));

// 2. Define the corrected rate-limiting rules
const limiter = rateLimit({
  windowMs: 10 * 1000, // 10 seconds
  limit: 5, // 5 requests per IP per 10-second window
  standardHeaders: 'draft-7', // Changed from draft-8 to standard stable specification
  legacyHeaders: false,
  ipv6Subnet: 56,
  message: { message: "Too many requests from this IP, please try again after 10 seconds." } // Helpful custom response
});

// Apply the rate limiting middleware to all requests.
app.use(limiter)

const SessionOptions = {
  // store,
  secret: process.env.SECRET,
  resave: false,
  saveUninitialized: true,
  cookie: {
    expires: Date.now() + 1000 * 60 * 60 * 24 * 7,
    maxAge: 1000 * 60 * 60 * 24 * 7,
    httpOnly: true
  }
};

app.use(session(SessionOptions));
// app.use(passport.initialize());
// app.use(passport.session());

// // Configure passport-local-mongoose strategy
// passport.use(User.createStrategy());

// passport.serializeUser(User.serializeUser());
// passport.deserializeUser(User.deserializeUser());



app.get('/', (req, res) => {
  res.send({ message: 'Welcome to the Library Management System API' });
});

app.get('/books/auth-check', (req, res) => {
  if (req.session.userId) {
    return res.json({
      IsAuthenticated: true,
      UserId: req.session.userId,
      Role: req.session.role,
      UserName: req.session.userName,
      StudentID: req.session.studentId,
      message: `Welcome back, ${req.session.userName}!`
    });
  } else {
    res.status(401).json({ IsAuthenticated: false, message: 'You are not authenticated' });
  }
});

app.get('/books/me', async (req, res) => {
  try {
    if (!req.session.userId) {
      return res.status(401).json({ error: 'Not authenticated', message: 'You are not authenticated' });
    }

    const user = await User.findById(req.session.userId).select('-password');
    if (!user) {
      return res.status(404).json({ error: 'User not found', message: 'User not found' });
    }

    res.json({
      _id: user._id,
      name: user.name,
      username: user.username,
      StudentID: user.StudentID,
      role: user.role,
      borrowedBooks: user.borrowedBooks
    });
  } catch (err) {
    res.status(500).json({ error: err.message, message: 'An error occurred while fetching user details' });
  }
});

app.get("/books/logout", (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      return res.status(500).json({ error: "Failed to log out", message: "Failed to log out" });
    }
    res.clearCookie("connect.sid");
    res.json({ message: "Logout successful" });
  });
});

app.post('/signup', async (req, res) => {
  const { error } = validateUser(req.body);
  if (error) {
    return res.status(400).json({ error: error.details[0].message, message: "Invalid input provided" });
  }

  try {
    const existingUser = await User.findOne({
      $or: [{ username: req.body.username }, { email: req.body.email }, { StudentID: req.body.StudentID }]
    });

    if (existingUser) {
      return res.status(409).json({ error: 'User already exists with the same username, email, or Student ID', message: 'User already exists with the same username, email, or Student ID' });
    }

    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    const user = new User({
      name: `${req.body.firstName}`.trim(),
      email: req.body.email,
      username: req.body.username,
      password: hashedPassword,
      StudentID: req.body.StudentID,
      role: 'Student'
    });
    await user.save();
    res.status(201).json({ message: 'User created successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message, message: 'An error occurred while creating the user' });
  }
});

app.post("/login", async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(400).json({ error: "Invalid username or password", message: "Invalid username or password" });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ error: "Invalid username or password", message: "Invalid username or password" });
    }
    req.session.userId = user._id;
    req.session.role = user.role;
    req.session.userName = user.name;
    req.session.studentId = user.StudentID;
    res.json({
      message: "Login successful",
      user: {
        id: user._id,
        name: user.name,
        username: user.username,
        role: user.role,
        studentId: user.StudentID
      }
    });
  } catch (err) {
    res.status(500).json({ error: err.message, message: 'An error occurred while logging in' });
  }
});

connectDB().then(() => {
  app.listen(3000, () => {
    console.log('Server is running on port 3000');
  })
}).catch((err) => {
    console.error('Failed to start server:', err);
});