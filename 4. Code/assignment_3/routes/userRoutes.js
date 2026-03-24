/**
 * @file userRoutes.js
 * @author Trương Ngọc Trân - CE180829
 * @date 27/2/2026
 * @description Định nghĩa các route liên quan đến người dùng
 */

const express = require("express");
const bcrypt = require("bcryptjs");
const User = require("../models/User");

const router = express.Router();

const jwt = require("jsonwebtoken");

// POST /users/register
router.post("/register", async (req, res) => {
    try {
        const { username, password } = req.body;

        // Kiểm tra thiếu dữ liệu
        if (!username || !password) {
            return res.status(400).json({ message: "Username and password are required" });
        }

        // Kiểm tra username đã tồn tại chưa
        const existingUser = await User.findOne({ username });
        if (existingUser) {
            return res.status(409).json({ message: "Username already exists" });
        }

        // Hash password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Tạo user mới
        const newUser = new User({
            username,
            password: hashedPassword
        });

        await newUser.save();

        res.status(201).json({
            message: "User registered successfully"
        });

    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
});


// POST /users/login
router.post("/login", async (req, res) => {
    try {
        const { username, password } = req.body;

        // Kiểm tra thiếu dữ liệu
        if (!username || !password) {
            return res.status(400).json({ message: "Username and password are required" });
        }

        // Kiểm tra user tồn tại
        const user = await User.findOne({ username });
        if (!user) {
            return res.status(401).json({ message: "Invalid username or password" });
        }

        // So sánh password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ message: "Invalid username or password" });
        }

        // Tạo JWT token
        const token = jwt.sign(
            {
                userId: user._id,
                username: user.username
            },
            process.env.JWT_SECRET,
            { expiresIn: "1d" }
        );

        res.json({ token });

    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
});

// POST /users/logout
router.post("/logout", (req, res) => {
    res.json({
        message: "You are logged out"
    });
});

module.exports = router;