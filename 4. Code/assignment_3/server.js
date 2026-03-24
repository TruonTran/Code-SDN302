/**
 * @file server.js
 * @author Trương Ngọc Trân - CE180829
 * @date 27/2/2026
 * @description Khởi tạo server Express và cấu hình các route
 */

require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const userRoutes = require("./routes/userRoutes");
const questionRoutes = require("./routes/questionRoutes");

const subjectRoutes = require("./routes/subjectRoutes");
const topicRoutes = require("./routes/topicRoutes");

const app = express();

app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log("MongoDB Connected"))
    .catch(err => console.log(err));

app.get("/", (req, res) => {
    res.send("Server is running...");
});

app.use("/users", userRoutes);
app.use("/questions", questionRoutes);

app.use("/subjects", subjectRoutes);
app.use("/topics", topicRoutes);

const PORT = process.env.PORT || 6000;
app.listen(PORT, () => {
    console.log(`Server đang chạy http://localhost:${PORT}`);
});