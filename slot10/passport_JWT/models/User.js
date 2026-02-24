// models/User.js 
const mongoose = require('mongoose');
const passportLocalMongoose = require('passport-local-mongoose');

// Define the User schema 
const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true, // Ensure email is unique 
        lowercase: true, // Store emails in lowercase 
        trim: true // Remove whitespace from both ends 
    },
    role: {
        type: String,
        enum: ['user', 'admin'], // Role can only be 'user' or 'admin' 
        default: 'user' // Default role is 'user' 
    },
    createdAt: {
        type: Date,
        default: Date.now // Automatically set creation date 
    }
});

// Apply the passport-local-mongoose plugin to the user schema 
// This plugin handles password hashing and adds methods for 
authentication
userSchema.plugin(passportLocalMongoose, {
    usernameField: 'email' // Tell passport-local-mongoose to use email' as the username field
});

// Export the User model 
module.exports = mongoose.model('User', userSchema);