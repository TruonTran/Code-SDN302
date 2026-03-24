const jwt = require('jsonwebtoken'); // Import jsonwebtoken library 

/** 
 * Generates a JSON Web Token (JWT) for the given user. 
 * The token contains user's ID, email, and role, and expires in 1 
hour. 
 * @param {Object} user - The user object from which to create the 
token payload. 
 * @returns {string} The generated JWT. 
 */
exports.generateToken = (user) => {
    // Payload for the JWT. Includes sensitive user data that should be minimal.
    // Ensure you only include necessary identifying information. 
    const payload = {
        id: user._id, // User ID from MongoDB 
        email: user.email,
        role: user.role
    };

    // Sign the token with the secret key from environment variables 
    // and set an expiration time. 
    return jwt.sign(
        payload,
        process.env.JWT_SECRET, // Secret key from .env file 
        { expiresIn: '1h' } // Token expires in 1 hour 
    );
};