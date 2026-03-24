/**
 * @file question.js
 * @author Trương Ngọc Trân - CE180829
 * @date 27/2/2026
 * @description Định nghĩa schema cho model Question
 */


const mongoose = require("mongoose");

const questionSchema = new mongoose.Schema({
    questionText: {
        type: String,
        required: true
    },
    options: {
        type: Object,
        required: true
    },
    correctAnswer: {
        type: String,
        required: true
    },
    subject: {
        _id: String,
        name: String
    },
    topic: {
        _id: String,
        name: String
    },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }
}, { timestamps: true });

module.exports = mongoose.model("Question", questionSchema);