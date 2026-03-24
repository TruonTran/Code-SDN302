const express = require("express");
const Courses = require("../models/Courses");
// const auth = require("../middleware/auth");
// const isIntrustor = require("../middleware/isIntructor");
// const Review = require("../models/Review");
// const mongoose = require("mongoose");
const router = express.Router();

// get all
router.get("/", async (req, res) => {
    const course = await Courses.find().sort({ createdAt: -1 });
    res.json(course);
});



module.exports = router;