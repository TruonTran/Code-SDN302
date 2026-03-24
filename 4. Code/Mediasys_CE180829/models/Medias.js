const mongoose = require("mongoose");

const MediasSchema = new mongoose.Schema({
    title: String,
    category: String,
    year: Number,
    description: String,
    posterUrl: String,
    averageRating: Number
});

module.exports = mongoose.model("Medias", MediasSchema, "Medias");