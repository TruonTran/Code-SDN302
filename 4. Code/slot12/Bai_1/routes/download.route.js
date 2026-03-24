const express = require('express');
const router = express.Router();
const fs = require('fs'); // Module để làm việc với hệ thống file 
const path = require('path'); // Module để làm việc với đường dẫn file 

// Định nghĩa đường dẫn đến thư mục uploads 
const uploadsDir = path.join(__dirname, '../public/uploads');
// Route để lấy danh sách tất cả các file đã upload 
router.get('/files/list', (req, res) => {
    // Đọc nội dung thư mục uploads 
    fs.readdir(uploadsDir, (err, files) => {
        if (err) {
            // Nếu có lỗi khi đọc thư mục, trả về lỗi 500 (Internal Server Error) 
            console.error('Lỗi khi đọc thư mục uploads:', err);
            return res.status(500).json({
                error: 'Không thể lấy danh sách file.'
            });
        }
    // Lọc ra các file hợp lệ (không phải thư mục) và trả về dưới dạng JSON 
    // Trong trường hợp này, vì uploadsDir chỉ chứa file, chúng ta chỉ cần trả về mảng files
        res.json(files);
    });
});

// Route để tải file về 
// :filename là một tham số động trong URL, đại diện cho tên file muốn tải 
router.get('/download/:filename', (req, res) => {
    const filename = req.params.filename; // Lấy tên file từ tham số URL 
    const filePath = path.join(uploadsDir, filename); // Tạo đường dẫn đầy đủ đến file

    // Kiểm tra xem file có tồn tại trên server hay không 
    if (!fs.existsSync(filePath)) {
        // Nếu file không tồn tại, trả về lỗi 404 (Not Found) 
        return res.status(404).send('File không tồn tại trên server.');
    }

  // Sử dụng res.download() để gửi file về client 
  // Hàm này sẽ tự động đặt header Content-Disposition để trình duyệt tải file xuống
    res.download(filePath, (err) => {
        if (err) {
      // Xử lý lỗi nếu có vấn đề trong quá trình tải file (ví dụ: file bị khóa)
    console.error('Lỗi khi tải file:', err);
    // Kiểm tra lỗi có phải là lỗi đã gửi response rồi không 
    if (!res.headersSent) {
        res.status(500).send('Không thể tải file do lỗi máy chủ.');
    }
} 
  }); 
});

module.exports = router;