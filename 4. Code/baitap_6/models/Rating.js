const mongoose = require("mongoose");

const RatingsSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    mediaId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Media"
    },
    rating: Number,
    review: String
}, { timestamps: true });

module.exports = mongoose.model("Ratings", RatingsSchema);