const mongoose = require("mongoose");

const songSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    artist: {
        type: String,
        required: true
    },
    genre: {
        type: String
    },
    releaseYear: {
        type: Number
    },
    duration: {
        type: Number // tính bằng giây
    },
    album: {
        type: String
    },
    coverUrl: {
        type: String
    },
    averageRating: {
        type: Number,
        default: 0
    }
}, {
    timestamps: true // tự tạo createdAt
});

module.exports = mongoose.model("Song", songSchema);