const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const passportLocalMongoose = require('passport-local-mongoose');

// Định nghĩa khung dữ liệu (Schema) cho User
const UserSchema = new Schema({
    // Bạn có thể thêm các trường khác như email, fullname, age...
    // Riêng username và password (hash) sẽ do plugin tự thêm
});

// Plugin này làm 3 việc magic:
// 1. Thêm trường 'username' vào Schema
// 2. Thêm trường 'hash' và 'salt' để lưu mật khẩu bảo mật (Không lưu pass thô)
// 3. Cung cấp các hàm tiện ích: User.register, User.authenticate, serializeUser...
UserSchema.plugin(passportLocalMongoose.default);

module.exports = mongoose.model('User', UserSchema);
