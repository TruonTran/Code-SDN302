const multer = require('multer');
const path = require('path');
const fs = require('fs'); // Import fs để tạo thư mục nếu chưa có 
// Định nghĩa đường dẫn lưu trữ file 
const uploadDir = 'public/uploads/';
// Tạo thư mục uploads nếu nó chưa tồn tại 
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
}
// Thiết lập nơi lưu trữ file và cách đặt tên file 
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        // Chỉ định thư mục đích để lưu file 
        cb(null, uploadDir);
    },
    filename: function (req, file, cb) {
        // Tạo một tên file duy nhất để tránh trùng lặp 
        // Kết hợp timestamp, số ngẫu nhiên và phần mở rộng gốc của file 
        const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1E9)}`;
        cb(null, file.fieldname + '-' + uniqueSuffix +
            path.extname(file.originalname));
    }
});

// Lọc loại file được phép upload 
const fileFilter = (req, file, cb) => {
    // Biểu thức chính quy cho các loại file cho phép (jpeg, jpg, png, pdf) 
    const allowedTypes = /jpeg|jpg|png|pdf/;
    // Kiểm tra phần mở rộng file (ví dụ: .jpg, .pdf) 
    const extname =
        allowedTypes.test(path.extname(file.originalname).toLowerCase());
    // Kiểm tra kiểu MIME của file (ví dụ: image/jpeg, application/pdf) 
    const mimetype = allowedTypes.test(file.mimetype);

    if (mimetype && extname) {
        // Nếu cả kiểu MIME và phần mở rộng đều hợp lệ, cho phép upload 
        return cb(null, true);
    } else {
        // Ngược lại, từ chối upload và trả về thông báo lỗi 
        cb(new Error('Chỉ hỗ trợ file hình ảnh (JPEG, JPG, PNG) và PDF!'));
    }
};

// Khởi tạo Multer với cấu hình đã định nghĩa 
const upload = multer({
    storage: storage, // Sử dụng cấu hình lưu trữ đã định nghĩa 
    limits: { fileSize: 1024 * 1024 * 5 }, // Giới hạn kích thước file là 5MB (5 * 1024 * 1024 bytes)
    fileFilter: fileFilter // Sử dụng hàm lọc file đã định nghĩa 
});

// Export đối tượng upload để có thể sử dụng trong các route khác 
module.exports = upload; 