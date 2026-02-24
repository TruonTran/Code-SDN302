const mongoose = require('mongoose');
const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI ||
            'mongodb://127.0.0.1:27017/simpleblog', {
            // Các tùy chọn Mongoose được khuyến nghị (tùy thuộc phiên bản Mongoose của bạn, có thể không cần nữa)
        // useNewUrlParser: true,
        // useUnifiedTopology: true,
        // useCreateIndex: true, // Nếu bạn dùng index
        // useFindAndModify: false // Nếu bạn dùng findByIdAndUpdate
    });
    console.log(`MongoDB Connected: ${conn.connection.host}`);
} catch (err) {
    console.error(`Error: ${err.message}`);
    process.exit(1); // Thoát ứng dụng nếu kết nối lỗi
}
};
module.exports = connectDB;