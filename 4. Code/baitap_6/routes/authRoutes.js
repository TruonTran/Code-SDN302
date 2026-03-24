const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

const router = express.Router();

const SECRET = "mysecretkey";

// REGISTER
router.post("/register", async (req, res) => {

    const { username, password } = req.body;

    try {

        const hashed = await bcrypt.hash(password, 10);

        const user = new User({
            username,
            password: hashed
        });

        await user.save();

        res.json({
            message: "Register success",
            user: user
        });

    } catch (err) {
        res.status(500).json(err);
    }

});

// LOGIN
router.post("/login", async (req, res) => {

    const { username, password } = req.body;

    try {

        const user = await User.findOne({ username });

        if (!user) {
            return res.status(400).json("User not found");
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(400).json("Wrong password");
        }

        // CREATE TOKEN
        const token = jwt.sign(
            { id: user._id },
            SECRET,
            { expiresIn: "1h" }
        );

        res.json({
            message: "Login success",
            token: token,
            user: {
                id: user._id,
                username: user.username
            }
        });

    } catch (err) {
        res.status(500).json(err);
    }

});

module.exports = router;