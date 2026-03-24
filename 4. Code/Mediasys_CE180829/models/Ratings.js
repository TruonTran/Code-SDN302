const mongoose = require("mongoose");

const RatingSchema = new mongoose.Schema({
    mediaId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Media"
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    rating: Number,
    comment: String,
}, { timestamps: true });

module.exports = mongoose.model("Ratings", RatingSchema);