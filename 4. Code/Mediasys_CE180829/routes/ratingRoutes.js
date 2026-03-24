const express = require("express");
const Rating = require("../models/Ratings");
const verifyToken = require("../middleware/auth");

const router = express.Router();

router.post("/", verifyToken, async (req, res) => {

    const rating = new Rating({
        mediaId: req.body.mediaId,
        rating: req.body.rating,
        review: req.body.review,
        userId: req.user.id
    });

    await rating.save();

    res.json(rating);
});

router.get("/:mediaId", async (req, res) => {

    const ratings = await Rating.find({
        mediaId: req.params.mediaId
    }).populate("userId", "username");

    res.json(ratings);
});

module.exports = router;