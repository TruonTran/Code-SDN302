/**
 * @file server.js
 * @author Trương Ngọc Trân - CE180829
 * @date 3/2/2026
 * @description server cho Simple Quiz API
 */

const express = require("express");
const connectDB = require("./config/db");
const dotenv = require('dotenv');
const cors = require('cors');

const errorHandler = require("./middleware/errorHandler");

// Tạo ứng dụng Express
const app = express();

// Load biến môi trường từ file .env
dotenv.config();
// Kết nối đến cơ sở dữ liệu MongoDB
connectDB();
// Middleware
app.use(cors());
// Phân tích JSON trong body của yêu cầu
app.use(express.json());
// Định tuyến cho các câu hỏi trắc nghiệm
app.use('/quizzes', require('./routes/quizRoutes'));
// Middleware xử lý lỗi
app.use(errorHandler);
// Khởi động server bằng cổng từ biến môi trường hoặc 3000
const PORT = process.env.PORT || 3000;
// Lắng nghe kết nối và in ra thông báo ở console
app.listen(PORT, () => console.log(`Server running on port ${PORT}`)); 