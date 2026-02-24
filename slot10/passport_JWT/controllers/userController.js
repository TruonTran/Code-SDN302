// // controllers/userController.js 
const User = require('../models/User'); // Import the User model 

/** 
 * Get all users (Admin only) 
 */
exports.getAllUsers = async (req, res) => {
    try {
        const users = await User.find({}, '-hash -salt'); // Exclude password hash and salt
        res.status(200).json({
            message: 'Danh sách tất cả người dùng.',
            users: users.map(user => ({
                id: user._id,
                email: user.email,
                role: user.role,
                createdAt: user.createdAt
            }))
        });
    } catch (err) {
        console.error('Lỗi khi lấy danh sách người dùng:', err);
        res.status(500).json({
            error: 'Không thể lấy danh sách người dùng.',
            details: err.message
        });
    }
}; 