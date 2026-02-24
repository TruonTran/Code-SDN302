/**
 * @file errorHandler.js
 * @author Trương Ngọc Trân - CE180829 
 * @date 3/2/2026
 * @description Middleware xử lý lỗi chung
 * */

module.exports = (err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: 'Đang lỗi nè bạn ơi! Kiểm tra lại' });
}; 