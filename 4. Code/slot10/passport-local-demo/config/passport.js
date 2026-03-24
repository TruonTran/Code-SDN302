const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const User = require('../models/user');

// Cấu hình chiến thuật "Local" (đăng nhập bằng user/pass nội bộ)
// Hàm User.authenticate() do plugin tạo ra, giúp so sánh password hash
passport.use(new LocalStrategy(User.authenticate()));

// Serialize: Khi đăng nhập thành công, passport lấy thông tin gì lưu vào session?
// -> Lưu ID của user (giúp session nhẹ)
passport.serializeUser(User.serializeUser());

// Deserialize: Khi user có cookie gửi lên, passport lấy ID đó tìm ra user đầy đủ
// -> Gán ngược lại vào req.user
passport.deserializeUser(User.deserializeUser());

module.exports = passport;
