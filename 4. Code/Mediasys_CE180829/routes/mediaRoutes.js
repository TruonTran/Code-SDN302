const express = require("express");
const Media = require("../models/Medias");
const Rating = require("../models/Ratings");

const router = express.Router();

router.get("/", async (req, res) => {
    const medias = await Media.find();
    res.json(medias);
});

router.put("/:id/comment", async (req, res) => {
    try {
        const { score, comment } = req.body;
        const userId = req.body.userId;

        const newRating = new Rating({
            mediaId: req.params.id,
            userId: userId,
            rating: score,
            comment: comment
        });

        await newRating.save();

        res.status(201).json({
            mediaId: newRating.mediaId,
            userId: newRating.userId,
            score: newRating.rating,
            comment: newRating.comment,
            createdAt: newRating.createdAt,
            _id: newRating._id
        });
    } catch (err) {
        res.status(500).json({
            error: err.message
        });
    }
});

module.exports = router;