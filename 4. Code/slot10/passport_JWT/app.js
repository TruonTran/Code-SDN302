require('dotenv').config(); // Load environment variables from .env 
file
const express = require('express');
const mongoose = require('mongoose');
const session = require('express-session');
const passport = require('passport');
const morgan = require('morgan'); // HTTP request logger middleware 
const helmet = require('helmet'); // Security middleware 
const cors = require('cors'); // Enable CORS 

// Import configuration and routes 
const connectDB = require('./config/db');
require('./config/passport'); // Configure Passport strategies 
const authRoutes = require('./routes/authRoutes');
const protectedRoutes = require('./routes/protectedRoutes');

const app = express();

// Connect to MongoDB 
connectDB();

// Middleware 
app.use(morgan('dev')); // Log HTTP requests to the console 
app.use(helmet()); // Set various HTTP headers for security 
app.use(cors({
    origin: 'http://localhost:3000', // Allow requests from this origin(adjust as needed for your frontend)
    credentials: true // Allow cookies to be sent 
}));
app.use(express.json()); // Parse JSON request bodies 
app.use(express.urlencoded({ extended: true })); // Parse URL-encoded request bodies

// Session middleware configuration 
app.use(session({
    secret: process.env.SESSION_SECRET, // Secret key for signing the session ID cookie 
    resave: false, // Don't save session if unmodified 
    saveUninitialized: false, // Don't create session until something is stored 
    cookie: {
        httpOnly: true, // Prevents client-side JS from accessing the cookie 
        secure: process.env.NODE_ENV === 'production', // Only send cookie over HTTPS in production 
        maxAge: 24 * 60 * 60 * 1000 // 1 day 
    }
}));

// Passport initialization 
app.use(passport.initialize());
app.use(passport.session()); // Enable session support for Passport 

// Basic route for testing 
app.get('/', (req, res) => {
    res.send('Welcome to the Auth System API!');
});

// Route handlers 
app.use('/api/auth', authRoutes); // Authentication routes (register, login, logout, login - jwt)
app.use('/api', protectedRoutes); // Protected routes 

// Global error handling middleware (should be the last middleware) 
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({
        error: 'Something went wrong!', details:
            err.message
    });
});

// Start the server 
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
    console.log(`Access the API at http://localhost:${PORT}`);
}); 