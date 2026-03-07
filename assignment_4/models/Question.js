/**
 * @file question.js
 * @author Trương Ngọc Trân - CE180829
 * @date 27/2/2026
 * @description Định nghĩa schema cho model Question
 */

const mongoose = require("mongoose");

const questionSchema = new mongoose.Schema({
    questionText: String,
    options: {
        A: String,
        B: String,
        C: String,
        D: String
    },
    correctAnswer: String,
    subjectId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Subject"
    },
    topicId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Topic"
    },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Question", questionSchema);