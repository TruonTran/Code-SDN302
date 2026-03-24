const mongoose = require("mongoose");

const MediaSchema = new mongoose.Schema({
    title: String,
    description: String,
    type: String,
    releaseYear: Number
}, { timestamps: true });

module.exports = mongoose.model("Media", MediaSchema);