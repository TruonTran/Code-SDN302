/**
 * @file User.js
 * @author Trương Ngọc Trân - CE180829
 * @date 27/2/2026
 * @description Định nghĩa schema cho model User
 */

const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    username: String,
    password: String
});

module.exports = mongoose.model("User", userSchema);