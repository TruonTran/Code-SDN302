/**
 * @file topicRoutes.js
 * @author Trương Ngọc Trân - CE180829
 * @date 27/2/2026
 * @description Định nghĩa route cho model Topic
 */


const express = require("express");
const router = express.Router();
const Topic = require("../models/Topic");

// Route để hiển thị tất cả chủ đề
router.get("/view", async (req, res) => {
    // find tất cả chủ đề trong cơ sở dữ liệu, đồng thời populate trường subjectId để lấy tên môn học tương ứng
    const topics = await Topic.find()
        .populate("subjectId", "name");
    // render trang topics.ejs với dữ liệu đó
    res.render("topics", { topics });
});

module.exports = router;