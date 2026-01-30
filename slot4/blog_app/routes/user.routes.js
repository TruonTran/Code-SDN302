const express = require('express');
const router = express.Router();
const User = require('../models/user.model');

// Tạo user
router.post('/', async (req, res) => {
    const { name, email } = req.body;
    const user = new User({ name, email });
    await user.save();
    res.json(user);
});
module.exports = router;