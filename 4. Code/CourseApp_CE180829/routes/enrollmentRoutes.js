const express = require("express");
const Enrollments = require("../models/Enrollments");
const Courses = require("../models/Courses");
const auth = require("../middleware/auth");

const router = express.Router();

router.post("/", auth, async (req, res) => {
    try {
        const userId = req.user.id; // 🔥 lấy từ token (middleware auth)
        const { courseId } = req.body;

        // 1. check course tồn tại
        const course = await Courses.findById(courseId);
        if (!course) {
            return res.status(404).json({ message: "Course not found" });
        }

        // 2. check đã enroll chưa
        const existing = await Enrollments.findOne({
            studentId: userId,
            courseId: courseId
        });

        if (existing) {
            return res.status(400).json({ message: "Already enrolled" });
        }

        // 3. tạo enrollment
        const enrollment = new Enrollments({
            studentId: userId,
            courseId: courseId
        });

        await enrollment.save();

        res.status(201).json({
            message: "Enrollment successful",
            enrollment
        });

    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Server error" });
    }
});

module.exports = router;