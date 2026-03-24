/**
 * @file db.js
 * @author Trương Ngọc Trân - CE180829
 * @date 3/2/2026
 * @description Kết nối đến cơ sở dữ liệu MongoDB
 */

const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log("MongoDB connected");
    } catch (err) {
        console.error(err.message);
        process.exit(1);
    }
};
module.exports = connectDB; 