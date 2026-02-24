// routes/protectedRoutes.js 
const express = require('express');
const router = express.Router();
const { ensureAuthenticated, ensureAdmin } =
    require('../middleware/authMiddleware'); // For session-based 
protection
const { authenticateJwt } = require('../middleware/jwtMiddleware'); // For JWT - based protection
const userController = require('../controllers/userController'); // Import user controller

// Example route protected by session authentication 
// GET /api/profile - Get user profile (requires session login) 
router.get('/profile', ensureAuthenticated, (req, res) => {
    // req.user is available here due to passport.session() 
    res.json({
        message: 'Bạn đã đăng nhập bằng session.',
        user: {
            id: req.user._id,
            email: req.user.email,
            role: req.user.role
        }
    });
});

// Example route protected by session and role check 
// GET /api/admin - Admin-only route (requires session login and admin role)
router.get('/admin', ensureAdmin, (req, res) => {
    res.json({
        message: 'Chào mừng Admin! Đây là thông tin chỉ dành cho Admin.'
    });
});

// Example route protected by JWT authentication 
// GET /api/jwt-profile - Get user profile (requires valid JWT token) 
router.get('/jwt-profile', authenticateJwt, (req, res) => {
    // req.user is available here due to jwtMiddleware 
    res.json({
        message: 'Bạn đã xác thực bằng JWT.',
        user: {
            id: req.user.id, // ID from JWT payload 
            email: req.user.email, // Email from JWT payload 
            role: req.user.role // Role from JWT payload 
        }
    });
});

// Example route protected by JWT and role check 
// GET /api/jwt-admin - Admin-only route (requires valid JWT token and admin role)
router.get('/jwt-admin', authenticateJwt, (req, res) => {
    if (req.user.role !== 'admin') {
        return res.status(403).json({
            error: 'Truy cập bị từ chối: Không có quyền Admin.'
        });
    }
    res.json({
        message: 'Chào mừng Admin! Đây là thông tin chỉ dành cho Admin(qua JWT).'
    });
});

// Get all users (for admin - demonstrating userController usage) 
router.get('/users', authenticateJwt, ensureAdmin,
    userController.getAllUsers);

module.exports = router; 