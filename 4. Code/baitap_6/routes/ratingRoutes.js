const express = require("express");
const Rating = require("../models/Rating");
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

router.put("/:id", verifyToken, async (req, res) => {
    try {
        const rating = await Rating.findById(req.params.id);

        if (!rating) {
            return res.status(404).json({ message: "Rating not found" });
        }

        // chỉ cho user sửa rating của chính họ
        if (rating.userId.toString() !== req.user.id) {
            return res.status(403).json({ message: "Not allowed" });
        }

        rating.rating = req.body.rating || rating.rating;
        rating.review = req.body.review || rating.review;

        const updatedRating = await rating.save();

        res.json(updatedRating);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;