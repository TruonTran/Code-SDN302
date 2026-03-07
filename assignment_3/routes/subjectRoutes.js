/**
 * @file subjectRoutes.js
 * @author Trương Ngọc Trân - CE180829
 * @date 27/2/2026
 * @description Định nghĩa các route liên quan đến môn học
 */

const express = require("express");
const Question = require("../models/Question");

const router = express.Router();

// GET /subjects (lấy từ questions)
router.get("/", async (req, res) => {
    try {
        const questions = await Question.find();

        // Lấy subject từ questions
        const subjects = questions.map(q => q.subject);

        // Loại bỏ trùng theo _id
        const uniqueSubjects = subjects.filter((value, index, self) =>
            index === self.findIndex(s => s._id === value._id)
        );

        res.json(uniqueSubjects);

    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
});

module.exports = router;