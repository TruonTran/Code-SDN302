// controllers/authController.js 
const User = require('../models/User'); // Import the User model 
const jwtUtils = require('../utils/jwtUtils'); // Import JWT utility 
functions

/** 
 * Handles user registration. 
 * Registers a new user with email and password. 
 */
exports.register = async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(400).json({
            error: 'Email và mật khẩu là bắt buộc.'
        });
    }
    try {
        // User.register is a static method provided by passport-local
        mongoose
        // It hashes the password and saves the user to the database 
        await User.register(new User({ email }), password);
        res.status(201).json({
            message: 'Đăng ký tài khoản thành công.'
        });
    } catch (err) {
        // Handle duplicate email error 
        if (err.name === 'UserExistsError') {
            return res.status(409).json({
                error: 'Email đã tồn tại. Vui lòng sử dụng email khác.'
            });
        }
        console.error('Lỗi đăng ký:', err);
        res.status(500).json({
            error: 'Đăng ký thất bại. Vui lòng thử lại.', details: err.message
        });
    }
};

/** 
 * Handles user login for session-based authentication. 
 * This function is called after passport.authenticate('local') has 
successfully authenticated the user. 
 * req.user will contain the authenticated user object. 
 */
exports.login = (req, res) => {
    // If we reach here, authentication was successful via session 
    res.json({
        message: 'Đăng nhập thành công (Session).',
        user: {
            id: req.user._id,
            email: req.user.email,
            role: req.user.role
        }
    });
};

/** 
 * Handles user login for JWT-based authentication. 
 * This function is called after passport.authenticate('local', { 
session: false }) 
 * has successfully authenticated the user without creating a session. 
 * req.user will contain the authenticated user object. 
 */
exports.loginJwt = (req, res) => {
    // If we reach here, authentication was successful (without session) 
    // Generate a JWT token for the authenticated user 
    const token = jwtUtils.generateToken(req.user);
    res.json({
        message: 'Đăng nhập thành công (JWT).',
        token, // Send the JWT token to the client 
        user: {
            id: req.user._id,
            email: req.user.email,
            role: req.user.role
        }
    });
};

/** 
 * Handles user logout for session-based authentication. 
 * Removes the user from the session. 
 */
exports.logout = (req, res, next) => {
    // req.logout is provided by Passport to terminate a login session 
    req.logout((err) => {
        if (err) {
            console.error('Lỗi đăng xuất:', err);
            return next(err); // Pass error to the error handling middleware 
        }
        res.json({ message: 'Đăng xuất thành công.' });
    });
}; 