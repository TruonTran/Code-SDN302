const express = require('express');
const app = express();
const path = require('path'); // Import module path để xử lý đường dẫn 

// Import các route đã định nghĩa 
const uploadRoute = require('./routes/upload.route');
const downloadRoute = require('./routes/download.route');

// Middleware để phân tích cú pháp JSON từ body của request 
// Cho phép Express đọc dữ liệu JSON gửi từ client 
app.use(express.json());

// Middleware để phân tích cú pháp URL-encoded data từ body của request 
// `extended: true` cho phép phân tích cú pháp các đối tượng lồng nhau 
app.use(express.urlencoded({ extended: true }));

// Cấu hình Express để phục vụ các file tĩnh (static files) từ thư mục 'public' 
// Điều này cho phép client truy cập trực tiếp các file trong thư mục public 
// Ví dụ: http://localhost:3000/uploads/my-image.jpg 
app.use(express.static(path.join(__dirname, 'public')));

// Sử dụng các route đã import 
// Mọi request đến '/' sẽ được xử lý bởi uploadRoute và downloadRoute 
// Điều này có nghĩa là các path như '/upload', '/files/list', '/download/:filename' sẽ hoạt động
app.use('/', uploadRoute);
app.use('/', downloadRoute);

// Export đối tượng app để server.js có thể import và khởi động server 
module.exports = app;