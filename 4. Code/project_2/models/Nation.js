const mongoose = require("mongoose")

const NationSchema = new mongoose.Schema({

    nationName: {
        type: String,
        required: true,
        unique: true
    },

    continent: {
        type: String,
        required: true
    }

}, { timestamps: true })

module.exports = mongoose.model("Nation", NationSchema)