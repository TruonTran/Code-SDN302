const express = require('express');
const router = express.Router();
const Comment = require('../models/comment.model');

// Tạo comment
router.post('/', async (req, res) => {
    const { text, post, user } = req.body;
    const comment = new Comment({ text, post, user });
    await comment.save();
    res.json(comment);
});

module.exports = router;