/**
 * @file Question.js
 * @author Trương Ngọc Trân - CE180829
 * @date 3/2/2026
 * @description Mongoose schema cho Question
 */

const mongoose = require("mongoose");

const questionSchema = new mongoose.Schema({
    text: {
        type: String,
        required: true
    },
    options: {
        type: [String],
        required: true
    },
    correctAnswerIndex: {
        type: Number,
        required: true
    },
    keywords: {
        type: [String],
        default: []
    }
}, { timestamps: true });

module.exports = mongoose.model("Question", questionSchema);
