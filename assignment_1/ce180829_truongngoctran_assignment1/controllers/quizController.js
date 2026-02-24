/**
 * @file quizController.js
 * @author Trương Ngọc Trân - CE180829
 * @date 2/3/2026
 * @description Controller xử lý logic cho Quiz
 */

const Quiz = require("../models/Quiz");
const Question = require("../models/Question");

// GET /quizzes (populate questions)
// Lấy danh sách tất cả quiz (có câu hỏi).
exports.getAllQuizzes = async (req, res, next) => {
    try {
        const quizzes = await Quiz.find().populate("questions");
        res.json(quizzes);
    } catch (error) {
        next(error);
    }
};

// POST /quizzes
// Thêm một bài quiz mới.
exports.createQuiz = async (req, res, next) => {
    try {
        const quiz = new Quiz(req.body);
        await quiz.save();
        res.status(201).json(quiz);
    } catch (error) {
        next(error);
    }
};

// PUT /quizzes/:id
// Update a quiz by ID
exports.updateQuiz = async (req, res, next) => {
    try {
        const quiz = await Quiz.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );
        res.json(quiz);
    } catch (error) {
        next(error);
    }
};

// DELETE /quizzes/:id
// Xóa một quiz. 
exports.deleteQuiz = async (req, res, next) => {
    try {
        await Quiz.findByIdAndDelete(req.params.id);
        res.json({ message: "Quiz deleted successfully" });
    } catch (error) {
        next(error);
    }
};

// GET /quizzes/:quizId/populate (filter keyword "capital")
// Lọc câu hỏi có chứa từ "capital". 
exports.getQuizWithCapitalQuestions = async (req, res, next) => {
    try {
        const quiz = await Quiz.findById(req.params.quizId).populate({
            path: "questions",
            match: { keywords: "capital" }
        });
        res.json(quiz);
    } catch (error) {
        next(error);
    }
};

// POST /quizzes/:quizId/question
// Thêm một câu hỏi vào quiz.
exports.addOneQuestion = async (req, res, next) => {
    try {
        const question = new Question(req.body);
        await question.save();

        const quiz = await Quiz.findById(req.params.quizId);
        quiz.questions.push(question._id);
        await quiz.save();

        res.status(201).json(question);
    } catch (error) {
        next(error);
    }
};

// POST /quizzes/:quizId/questions
// Thêm nhiều câu hỏi vào quiz.
exports.addManyQuestions = async (req, res, next) => {
    try {
        const questions = await Question.insertMany(req.body);

        const quiz = await Quiz.findById(req.params.quizId);
        questions.forEach(q => quiz.questions.push(q._id));
        await quiz.save();

        res.status(201).json(questions);
    } catch (error) {
        next(error);
    }
};
