// middleware/jwtMiddleware.js 
const jwt = require('jsonwebtoken'); // Import jsonwebtoken library

exports.authenticateJwt = (req, res, next) => {
    // Get the Authorization header 
    const authHeader = req.headers['authorization'];

    // Check if the header exists and starts with 'Bearer ' 
    // Example: Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
    const token = authHeader && authHeader.split(' ')[1];

    // If no token is provided, return 401 Unauthorized 
    if (!token) {
        return res.status(401).json({
            error: 'Không có token xác thực được cung cấp.'
        });
    }

    // Verify the token using the JWT_SECRET 
    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if (err) {
            // If verification fails (e.g., token expired, invalid signature), return 403 Forbidden
            console.error('Lỗi xác thực JWT:', err.message);
            return res.status(403).json({
                error: 'Token không hợp lệ hoặc đã hết hạn.'
            });
        }
        // If the token is valid, attach the decoded user payload to 
        req.user
        // The 'user' here is the payload we signed into the token 
        req.user = user;
        next(); // Proceed to the next middleware or route handler 
    });
}; 