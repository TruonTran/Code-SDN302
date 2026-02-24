/**
 * @file Quiz.js
 * @author Trương Ngọc Trân - CE180829
 * @date 3/2/2026
 * @description Mongoose schema cho Quiz
 */

const mongoose = require("mongoose");

const quizSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String
    },
    questions: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Question"
        }
    ]
}, { timestamps: true });

module.exports = mongoose.model("Quiz", quizSchema);
