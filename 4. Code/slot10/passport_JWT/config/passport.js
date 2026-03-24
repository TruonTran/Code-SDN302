// config/passport.js 
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const User = require('../models/User'); // Import the User model 

// Use the local strategy provided by passport-local-mongoose 
// passport-local-mongoose adds `authenticate` method to User model 
passport.use(new LocalStrategy({
    usernameField: 'email', // Specify 'email' as the field for username 
    passwordField: 'password' // Specify 'password' as the field for password
}, User.authenticate()));

// Serialize user into the session 
// passport-local-mongoose adds `serializeUser` method to User model 
passport.serializeUser(User.serializeUser());

// Deserialize user from the session 
// passport-local-mongoose adds `deserializeUser` method to User model 
passport.deserializeUser(User.deserializeUser());

console.log('✅ Passport configured successfully'); 