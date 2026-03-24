const express = require('express');
const router = express.Router();
const upload = require('../config/multer.config'); // Import cấu hình Multer 

// Định nghĩa route POST cho việc upload file 
// upload.single('file') là middleware của Multer để xử lý upload một file
// 'file' là tên trường (field name) trong form mà client sẽ gửi file lên 
router.post('/upload', upload.single('file'), (req, res) => {
    // Kiểm tra xem có file nào được upload hay không 
    if (!req.file) {
        // Nếu không có file, trả về lỗi 400 (Bad Request) 
        return res.status(400).json({
            error: 'Không có file nào được chọn hoặc file không hợp lệ.'
        });
    }

    // Nếu file được upload thành công, trả về thông báo thành công và tên file 
    res.json({
        message: 'File đã được tải lên thành công!',
        filename: req.file.filename // Tên file đã được lưu trên server (do Multer đặt tên) 
    });
}, (error, req, res, next) => {
    // Middleware xử lý lỗi của Multer (nếu fileFilter trả về lỗi) 
    // Multer sẽ tự động gọi middleware này nếu có lỗi trong quá trình upload (ví dụ: sai loại file)
    if (error instanceof multer.MulterError) {
        // Xử lý các lỗi cụ thể của Multer (ví dụ: FILE_TOO_LARGE) 
        return res.status(400).json({ error: error.message });
    } else if (error) {
        // Xử lý các lỗi khác (ví dụ: lỗi từ fileFilter của chúng ta) 
        return res.status(400).json({ error: error.message });
    }
    // Chuyển tiếp lỗi nếu không phải lỗi do Multer xử lý 
    next(error);
});

module.exports = router; 