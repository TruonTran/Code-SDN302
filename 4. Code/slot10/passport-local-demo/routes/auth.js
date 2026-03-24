const express = require('express');
const passport = require('passport');
const User = require('../models/user');

const router = express.Router();


//  Đăng ký tài khoản
router.post('/register', async (req, res) => {
  try {
    // Hàm register giúp tạo user mới và tự động băm (hash) mật khẩu
    await User.register(
      new User({ username: req.body.username }), // Thông tin user
      req.body.password // Mật khẩu (sẽ được hash)
    );
    res.send('Đăng ký thành công (Register success)');
  } catch (err) {
    res.status(400).send(err.message);
  }
});


// Đăng nhập
router.post(
  '/login',
  // Middleware passport.authenticate sẽ tự động kiểm tra username/password
  passport.authenticate('local', {
    failureRedirect: '/login-fail' // Nếu sai thì chuyển hướng về đây
  }),
  // Nếu đúng thì chạy hàm dưới
  (req, res) => {
    res.send('Đăng nhập thành công (Login success)');
  }
);


//  Đăng xuất
router.get('/logout', (req, res) => {
  // Hàm logout xóa session của user
  req.logout(() => {
    res.send('Đã đăng xuất (Logged out)');
  });
});

module.exports = router;
