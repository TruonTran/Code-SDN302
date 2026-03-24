/**
 * @file questionRoutes.js
 * @author Trương Ngọc Trân - CE180829
 * @date 27/2/2026
 * @description Định nghĩa route cho model Question
 */

const express = require("express");
const router = express.Router();
const Question = require("../models/Question");

// Import các model liên quan để sử dụng populate
require("../models/User");
require("../models/Subject");
require("../models/Topic");

// Route để hiển thị tất cả câu hỏi
router.get("/view", async (req, res) => {
  // try catch để xử lý lỗi khi truy vấn cơ sở dữ liệu
  try {
    // Sử dụng populate để lấy thông tin chi tiết của subject, topic và createdBy
    const questions = await Question.find()
      .populate("subjectId", "name")
      .populate("topicId", "name")
      .populate("createdBy", "username");
    // Render trang questions.ejs và truyền dữ liệu questions vào để hiển thị
    res.render("questions", { questions });

  } catch (error) {
    res.status(500).send(error.message);
  }
});

module.exports = router;