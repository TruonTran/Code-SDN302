const express = require("express");
const Review = require("../models/Review");
const Song = require("../models/Song");
const auth = require("../middleware/auth");

const router = express.Router();

// add review
router.post("/:songId", auth, async (req, res) => {

    // ❗ chỉ 1 review
    const exist = await Review.findOne({
        songId: req.params.songId,
        userId: req.user.id
    });

    if (exist) {
        return res.json({ message: "Already reviewed" });
    }

    const review = new Review({
        songId: req.params.songId,
        userId: req.user.id,
        rating: req.body.rating,
        comment: req.body.comment
    });

    await review.save();

    await updateAvg(req.params.songId);

    res.json({ message: "Review added" });
});

// update review
router.put("/:id", auth, async (req, res) => {
    const review = await Review.findById(req.params.id);

    if (review.userId.toString() !== req.user.id) {
        return res.json({ message: "Not allowed" });
    }

    review.rating = req.body.rating;
    review.comment = req.body.comment;

    await review.save();

    await updateAvg(review.songId);

    res.json({ message: "Updated" });
});

// delete
router.delete("/:id", auth, async (req, res) => {
    const review = await Review.findById(req.params.id);

    if (review.userId.toString() !== req.user.id) {
        return res.json({ message: "Not allowed" });
    }

    await review.deleteOne();

    await updateAvg(review.songId);

    res.json({ message: "Deleted" });
});

// 🔥 tính averageRating
async function updateAvg(songId) {
    const reviews = await Review.find({ songId });

    const avg =
        reviews.reduce((sum, r) => sum + r.rating, 0) / (reviews.length || 1);

    await Song.findByIdAndUpdate(songId, {
        averageRating: avg
    });
}

module.exports = router;