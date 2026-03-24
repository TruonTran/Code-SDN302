const mongoose = require("mongoose")

const FoodSchema = new mongoose.Schema({

    foodName: {
        type: String,
        required: true,
        unique: true
    },

    foodDescription: {
        type: String,
        required: true
    },

    imageUrl: {
        type: String,
        required: true
    },

    calories: {
        type: Number,
        required: true,
        min: 700,
        max: 1500
    },

    rating: {
        type: Number,
        required: true,
        min: 1,
        max: 5
    },

    isVegetarian: {
        type: Boolean,
        default: false
    },

    nation: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Nation"
    }

}, { timestamps: true })

module.exports = mongoose.model("Food", FoodSchema)