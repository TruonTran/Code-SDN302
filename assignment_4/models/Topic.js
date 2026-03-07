/**
 * @file Topic.js
 * @author Trương Ngọc Trân - CE180829
 * @date 27/2/2026
 * @description Định nghĩa schema cho model Topic
 */

const mongoose = require("mongoose");

const topicSchema = new mongoose.Schema({
    name: String,
    subjectId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Subject"
    }
});

module.exports = mongoose.model("Topic", topicSchema);