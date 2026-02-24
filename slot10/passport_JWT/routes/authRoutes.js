// routes/authRoutes.js 
const express = require('express');
const router = express.Router();
const passport = require('passport');

const authController = require('../controllers/authController'); // Import auth controller 

// POST /api/auth/register - Register a new user 
router.post('/register', authController.register);

// POST /api/auth/login - Login using session-based authentication 
// passport.authenticate('local') middleware handles authentication 
router.post('/login',
    passport.authenticate('local', {
        failureFlash: false // Set to true if you use connect-flash for flash messages 
    }),
    authController.login // If authentication succeeds, this controller handles the response 
);

// POST /api/auth/login-jwt - Login using JWT-based authentication (no session) 
// passport.authenticate('local', { session: false }) ensures no session is created 
router.post('/login-jwt',
    passport.authenticate('local', { session: false }),
    authController.loginJwt // If authentication succeeds, this controller generates and sends JWT 
);

// GET /api/auth/logout - Logout the user (for session-based logout) 
router.get('/logout', authController.logout);

module.exports = router; 