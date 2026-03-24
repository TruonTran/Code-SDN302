/**
 * @file questionRoutes.js
 * @author Trương Ngọc Trân - CE180829
 * @date 27/2/2026
 * @description Định nghĩa các route liên quan đến câu hỏi
 */

const express = require("express");
const Question = require("../models/Question");

const router = express.Router();
const auth = require("../middleware/auth");

// GET /questions (Public)
router.get("/", async (req, res) => {
    try {
        const questions = await Question.find();
        res.json(questions);
    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
});

router.post("/", auth, async (req, res) => {
    try {
        const { questionText, options, correctAnswer, subject, topic } = req.body;

        if (!questionText || !options || !correctAnswer || !subject || !topic) {
            return res.status(400).json({ message: "All fields are required" });
        }

        const newQuestion = new Question({
            questionText,
            options,
            correctAnswer,
            subject,
            topic,
            createdBy: req.user.userId
        });

        await newQuestion.save();

        res.status(201).json(newQuestion);

    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
});


// PUT /questions/:id (Auth + Ownership)
router.put("/:id", auth, async (req, res) => {
    try {
        const question = await Question.findById(req.params.id);

        if (!question) {
            return res.status(404).json({ message: "Question not found" });
        }

        // Kiểm tra quyền sở hữu
        if (question.createdBy.toString() !== req.user.userId) {
            return res.status(403).json({ message: "Forbidden: You are not the owner" });
        }

        const { questionText, options, correctAnswer } = req.body;

        if (questionText) question.questionText = questionText;
        if (options) question.options = options;
        if (correctAnswer) question.correctAnswer = correctAnswer;

        await question.save();

        res.json({ message: "Question updated successfully" });

    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
});

// DELETE /questions/:id (Auth + Ownership)
router.delete("/:id", auth, async (req, res) => {
    try {
        const question = await Question.findById(req.params.id);

        if (!question) {
            return res.status(404).json({ message: "Question not found" });
        }

        // Kiểm tra quyền sở hữu
        if (question.createdBy.toString() !== req.user.userId) {
            return res.status(403).json({ message: "Forbidden: You are not the owner" });
        }

        await Question.findByIdAndDelete(req.params.id);

        res.json({ message: "Question deleted successfully" });

    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
});

module.exports = router;