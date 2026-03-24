/**
 * @file subjectRoutes.js
 * @author Trương Ngọc Trân - CE180829
 * @date 27/2/2026
 * @description Định nghĩa route cho model Subject
 */

const express = require("express");
const router = express.Router();
const Subject = require("../models/Subject");
// Route để hiển thị tất cả môn học
router.get("/view", async (req, res) => {
    // find tất cả môn học trong cơ sở dữ liệu và render trang subjects.ejs với dữ liệu đó
    const subjects = await Subject.find();
    res.render("subjects", { subjects });
});

module.exports = router;