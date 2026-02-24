// middleware/authMiddleware.js 

/** 
 * Middleware to ensure the user is authenticated (logged in via 
session). 
 * If authenticated, proceeds to the next middleware/route handler. 
 * Otherwise, sends a 401 Unauthorized response. 
 */
exports.ensureAuthenticated = (req, res, next) => {
    if (req.isAuthenticated()) {
        // req.isAuthenticated() is a Passport method that returns true if the user is authenticated
        return next();
    }
    res.status(401).json({
        error: 'Bạn chưa đăng nhập. Vui lòng đăng nhập để truy cập.'
    });
};

/** 
 * Middleware to ensure the user has 'admin' role (for session-based 
authentication). 
 * Requires the user to be authenticated first. 
 * If the user is an admin, proceeds. Otherwise, sends a 403 Forbidden 
response. 
 */
exports.ensureAdmin = (req, res, next) => {
    // First, ensure the user is authenticated 
    if (!req.isAuthenticated()) {
        return res.status(401).json({ error: 'Bạn chưa đăng nhập.' });
    }
    // Then, check if the user has the 'admin' role 
    if (req.user && req.user.role === 'admin') {
        return next();
    }
    res.status(403).json({
        error: 'Truy cập bị từ chối: Bạn không có quyền quản trị.'
    });
};