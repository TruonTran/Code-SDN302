const express = require('express');
const mongoose = require('mongoose');
const session = require('express-session');

// Import cấu hình passport và các route
const passport = require('./config/passport');
const authRoutes = require('./routes/auth');

const app = express();

//  Kết nối Database
mongoose.connect('mongodb://127.0.0.1:27017/passport-demo');

// Middleware xử lý dữ liệu gửi lên (body parser)
app.use(express.json()); // Đọc JSON
app.use(express.urlencoded({ extended: false })); // Đọc dữ liệu form

// Cấu hình Session (Lưu phiên đăng nhập)
app.use(
  session({
    secret: 'keyboard cat', // Chuỗi bí mật để mã hóa session (nên để phức tạp hơn)
    resave: false,
    saveUninitialized: false
  })
);

// Khởi tạo Passport
app.use(passport.initialize());
app.use(passport.session()); // Cho phép passport dùng session để nhớ user

// Định nghĩa các Routes
app.use('/auth', authRoutes); // Các đường dẫn bắt đầu bằng /auth sẽ vào đây

// Route xử lý khi đăng nhập thất bại
app.get('/login-fail', (req, res) => {
  res.send('Login failed');
});

// Route trang thông tin cá nhân (Cần đăng nhập mới xem được)
app.get('/profile', (req, res) => {
  // Kiểm tra xem user đã đăng nhập chưa
  if (!req.isAuthenticated()) {
    return res.status(401).send('Chưa đăng nhập! (Not authenticated)');
  }
  // req.user chứa thông tin user lấy từ session ra
  res.send(`Xin chào ${req.user.username}`);
});

app.listen(3000, () => {
  console.log('Server running at http://localhost:3000');
});
