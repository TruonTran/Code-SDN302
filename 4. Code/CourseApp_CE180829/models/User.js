const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    username: { type: String},
    email: { type: String, unique: true },
    password: String,
    role: { type: String, default: "student" }
}, { timestamps: true });

module.exports = mongoose.model("User", userSchema);