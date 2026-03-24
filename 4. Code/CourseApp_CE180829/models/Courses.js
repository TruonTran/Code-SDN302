const mongoose = require("mongoose");

const coursesSchema = new mongoose.Schema({
    title: String,
    description: String,
    price: {
        type: Number,
        required: true,
        min: 0
    },
    instructor: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    }
}, {
    timestamps: true
});


module.exports = mongoose.model("Courses", coursesSchema);