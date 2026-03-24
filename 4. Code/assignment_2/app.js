/**
 * @file app.js
 * @author Trương Ngọc Trân - CE180829
 * @date 9/2/2026
 * @description Tập tin khởi tạo ứng dụng Express cho quản lý Quiz và Questions
 */

const express = require("express");
const path = require("path");

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use("/quizzes", require("./routes/quiz"));
app.use("/questions", require("./routes/question"));

app.listen(5000, () => {
    console.log("chạy thành công đường dẫn http://localhost:5000");
});
