// models/Post.js
const mongoose = require('mongoose');
const PostSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true // Loại bỏ khoảng trắng ở đầu và cuối
    },
    author: {
        type: String,
        required: true,
        trim: true
    },
    content: {
        type: String,
        required: true
    },
    description: { // Mô tả ngắn cho card bài viết
        type: String,
        required: true,
        maxlength: 200 // Giới hạn độ dài mô tả
    },
    isFeatured: { // Trường tùy chọn nâng cao
        type: Boolean,
        default: false
    },
    createdAt: {
        type: Date,
        default: Date.now // Tự động thêm ngày tạo
    }
});
module.exports = mongoose.model('Post', PostSchema);