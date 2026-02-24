/**
 * @file questionController.js
 * @author Trương Ngọc Trân - CE180829
 */

const Question = require("../models/Question");

// GET /questions
exports.getAllQuestions = async (req, res, next) => {
    try {
        const questions = await Question.find();
        res.json(questions);
    } catch (err) {
        next(err);
    }
};

// POST /questions
exports.createQuestion = async (req, res, next) => {
    try {
        const question = new Question(req.body);
        await question.save();
        res.status(201).json(question);
    } catch (err) {
        next(err);
    }
};

// PUT /questions/:id
exports.updateQuestion = async (req, res, next) => {
    try {
        const question = await Question.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );
        res.json(question);
    } catch (err) {
        next(err);
    }
};

// DELETE /questions/:id
exports.deleteQuestion = async (req, res, next) => {
    try {
        await Question.findByIdAndDelete(req.params.id);
        res.json({ message: "Question deleted successfully" });
    } catch (err) {
        next(err);
    }
};

// GET /questions/:id
exports.getQuestionById = async (req, res, next) => {
    try {
        const question = await Question.findById(req.params.id);
        if (!question) {
            return res.status(404).json({ message: "Question not found" });
        }
        res.json(question);
    } catch (err) {
        next(err);
    }
};
