const mongoose = require("mongoose");
// thay đổi tên database nếu cần
const connectDB = async () => {
    await mongoose.connect("mongodb://127.0.0.1:27017/SDN302_FA25_B5");
    console.log("MongoDB connected");
};

module.exports = connectDB;