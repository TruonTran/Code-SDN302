module.exports = (err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: 'Đang lỗi nè cha! Kiểm tra lại' });
}; 