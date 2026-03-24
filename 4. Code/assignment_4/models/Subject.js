/**
 * @file Subject.js
 * @author Trương Ngọc Trân - CE180829
 * @date 27/2/2026
 * @description Định nghĩa schema cho model Subject
 */

const mongoose = require("mongoose");

const subjectSchema = new mongoose.Schema({
  name: String
});

module.exports = mongoose.model("Subject", subjectSchema);