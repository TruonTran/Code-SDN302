/**
 * @file server.js
 * @author Trương Ngọc Trân - CE180829
 * @date 3/2/2026
 * @description server cho Simple Quiz API
 */
const dotenv = require('dotenv');
// Load biến môi trường từ file .env
dotenv.config();

const https = require("https");
const fs = require("fs");

const express = require("express");
const connectDB = require("./config/db");
const cors = require('cors');

const errorHandler = require("./middleware/errorHandler");

// Tạo ứng dụng Express
const app = express();

// HTTPS config
const sslServer = https.createServer(
    {
        key: fs.readFileSync("./cert/key.pem"),
        cert: fs.readFileSync("./cert/cert.pem"),
    },
    app
);


// Kết nối đến cơ sở dữ liệu MongoDB
connectDB();
// Middleware
app.use(cors());
// Phân tích JSON trong body của yêu cầu
app.use(express.json());
// Định tuyến cho các câu hỏi trắc nghiệm
app.use('/quizzes', require('./routes/quizRoutes'));
app.use("/questions", require('./routes/questionRoutes'));
// Middleware xử lý lỗi
app.use(errorHandler);
// Khởi động server bằng cổng từ biến môi trường hoặc 3000
const PORT = process.env.PORT || 3000;
// Lắng nghe kết nối và in ra thông báo ở console
// app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

// Start server
sslServer.listen(process.env.PORT, () => {
    console.log(`HTTPS API running at https://localhost:${process.env.PORT}`);
});