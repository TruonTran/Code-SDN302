const mongoose = require("mongoose");

const enrollmentsSchema = new mongoose.Schema({
    studentId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    courseId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Courses",
        required: true
    },

    progressPercentage: {
        type: Number,
    },

    status: { type: String, default: "enrolled" }

}, {
    timestamps: true
});

module.exports = mongoose.model("Enrollments", enrollmentsSchema);