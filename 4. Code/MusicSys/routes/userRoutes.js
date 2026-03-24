const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

const router = express.Router();
const blacklist = [];

// register
// router.post("/register", async (req, res) => {
//     const { username, password } = req.body;

//     const exist = await User.findOne({ username });
//     if (exist) return res.json({ message: "Username exists" });

//     const hash = await bcrypt.hash(password, 10);

//     const user = new User({ username, password: hash });
//     await user.save();

//     res.json({ message: "User created" });
// });

router.post("/register", async (req, res) => {
    const { username, password, role } = req.body;

    const exist = await User.findOne({ username });
    if (exist) return res.json({ message: "Username exists" });

    const hash = await bcrypt.hash(password, 10);

    const user = new User({
        username,
        password: hash,
        role: role || "user" // 🔥 chỗ này
    });

    await user.save();

    res.json({ message: "User created" });
});

// login
router.post("/login", async (req, res) => {
    const user = await User.findOne({ username: req.body.username });

    if (!user) return res.json({ message: "User not found" });

    const isMatch = await bcrypt.compare(req.body.password, user.password);
    if (!isMatch) return res.json({ message: "Wrong password" });

    const token = jwt.sign(
        { id: user._id, role: user.role },
        process.env.JWT_SECRET,
        { expiresIn: "24h" }
    );

    res.json({ token });
});

router.post("/logout", (req, res) => {
    res.json({ message: "Logged out successfully" });
});

module.exports = router;