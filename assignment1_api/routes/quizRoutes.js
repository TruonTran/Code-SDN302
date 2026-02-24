/**
 * @file quizRoutes.js
 * @author Trương Ngọc Trân - CE180829
 * @date 3/2/2026
 * @description Định nghĩa các route cho Quiz
 */

const express = require("express");
const router = express.Router();
const quizController = require("../controllers/quizController");

// lấy tất cả quiz
router.get("/", quizController.getAllQuizzes);


// tạo quiz mới
router.post("/", quizController.createQuiz);

router.get("/:id", quizController.getQuizById);
// cập nhật quiz theo ID
router.put("/:id", quizController.updateQuiz);
// xóa quiz theo ID
router.delete("/:id", quizController.deleteQuiz);
// lấy quiz với câu hỏi có từ "capital"
router.get("/:quizId/populate", quizController.getQuizWithCapitalQuestions);
// thêm một câu hỏi vào quiz
router.post("/:quizId/question", quizController.addOneQuestion);
// thêm nhiều câu hỏi vào quiz
router.post("/:quizId/questions", quizController.addManyQuestions);

// nhớ dòng này (ko có là lỗi import đó)
module.exports = router;
