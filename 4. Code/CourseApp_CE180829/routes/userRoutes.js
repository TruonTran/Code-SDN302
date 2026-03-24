const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

const router = express.Router();

router.post("/register", async (req, res) => {
    const { username, email, password, role } = req.body;

    const exist = await User.findOne({ email });
    if (exist) return res.json({ message: "Email already exists" });

    const hash = await bcrypt.hash(password, 10);

    const user = new User({
        username,
        email,
        password: hash,
        role: role || "student" // 🔥 chỗ này
    });

    await user.save();

    res.json({ message: "Registered successfully" });
});

// login
router.post("/login", async (req, res) => {
    const user = await User.findOne({ email: req.body.email });
    if (!user) return res.json({ message: "email not found" });

    const isMatch = await bcrypt.compare(req.body.password, user.password);
    if (!isMatch) return res.json({ message: "Wrong password" });

    const token = jwt.sign(
        { id: user._id, role: user.role },
        process.env.JWT_SECRET,
        { expiresIn: "24h" }
    );

    res.json({
        message: "Login successfully",
        token: token,
    });
});

// chức năng logout
router.post("/logout", (req, res) => {
    res.json({ message: "Logged out successfully" });
});

module.exports = router;