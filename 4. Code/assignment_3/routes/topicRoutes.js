/**
 * @file topicRoutes.js
 * @author Trương Ngọc Trân - CE180829
 * @date 27/2/2026
 * @description Định nghĩa các route liên quan đến chủ đề
 */

const express = require("express");
const Question = require("../models/Question");

const router = express.Router();

// GET /topics (lấy từ questions)
router.get("/", async (req, res) => {
    try {
        const questions = await Question.find();

        const topics = questions.map(q => q.topic);

        const uniqueTopics = topics.filter((value, index, self) =>
            index === self.findIndex(t => t._id === value._id)
        );

        res.json(uniqueTopics);

    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
});

module.exports = router;