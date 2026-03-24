const express = require("express");
const Review = require("../models/Review");
const Products = require("../models/Products");
const auth = require("../middleware/auth");

const router = express.Router();


// 🔥 ADD REVIEW
router.post("/:productId", auth, async (req, res) => {
    const { productId } = req.params;

    try {
        // ❗ check đã review chưa
        const exist = await Review.findOne({
            productId,
            userId: req.user.id
        });

        if (exist) {
            return res.status(400).json({ message: "Already reviewed" });
        }

        const review = new Review({
            productId,
            userId: req.user.id,
            rating: req.body.rating,
            comment: req.body.comment
        });

        await review.save();

        await updateAvg(productId);

        res.json({ message: "Review added" });

    } catch (err) {
        res.status(500).json({ message: "Server error" });
    }
});


// // 🔥 UPDATE REVIEW
// router.put("/:id", auth, async (req, res) => {
//     try {
//         const review = await Review.findById(req.params.id);

//         if (!review) {
//             return res.status(404).json({ message: "Review not found" });
//         }

//         // ❗ chỉ owner
//         if (review.userId.toString() !== req.user.id) {
//             return res.status(403).json({ message: "Not allowed" });
//         }

//         review.rating = req.body.rating;
//         review.comment = req.body.comment;

//         await review.save();

//         await updateAvg(review.productId);

//         res.json({ message: "Updated" });

//     } catch (err) {
//         res.status(500).json({ message: "Server error" });
//     }
// });

// 🔥 UPDATE REVIEW BY PRODUCT ID
router.put("/:productId", auth, async (req, res) => {
    const { productId } = req.params;

    try {
        // tìm review theo user + product
        const review = await Review.findOne({
            productId,
            userId: req.user.id
        });

        if (!review) {
            return res.status(404).json({ message: "Review not found" });
        }

        // update
        review.rating = req.body.rating;
        review.comment = req.body.comment;

        await review.save();

        await updateAvg(productId);

        res.json({ message: "Updated" });

    } catch (err) {
        res.status(500).json({ message: "Server error" });
    }
});


// // 🔥 DELETE REVIEW
// router.delete("/:id", auth, async (req, res) => {
//     try {
//         const review = await Review.findById(req.params.id);

//         if (!review) {
//             return res.status(404).json({ message: "Review not found" });
//         }

//         // ❗ owner hoặc admin
//         if (
//             review.userId.toString() !== req.user.id &&
//             req.user.role !== "admin"
//         ) {
//             return res.status(403).json({ message: "Not allowed" });
//         }

//         const productId = review.productId;

//         await review.deleteOne();

//         await updateAvg(productId);

//         res.json({ message: "Deleted" });

//     } catch (err) {
//         res.status(500).json({ message: "Server error" });
//     }
// });

// 🔥 DELETE REVIEW BY PRODUCT ID
router.delete("/:productId", auth, async (req, res) => {
    const { productId } = req.params;

    try {
        const review = await Review.findOne({
            productId,
            userId: req.user.id
        });

        if (!review) {
            return res.status(404).json({ message: "Review not found" });
        }

        await review.deleteOne();

        await updateAvg(productId);

        res.json({ message: "Deleted" });

    } catch (err) {
        res.status(500).json({ message: "Server error" });
    }
});

router.get("/myreviews", auth, async (req, res) => {
    try {
        // lấy tất cả review của user hiện tại
        const reviews = await Review.find({
            userId: req.user.id
        })
            .populate("productId", "name brand category") // lấy info product
            .populate("userId", "username"); // lấy username

        // format lại đúng đề
        const result = {
            user: reviews[0]?.userId?.username || "",
            reviews: reviews.map(r => ({
                product: {
                    name: r.productId?.name,
                    brand: r.productId?.brand,
                    category: r.productId?.category
                },
                rating: r.rating,
                comment: r.comment,
                createdAt: r.createdAt
            }))
        };

        res.json(result);

    } catch (err) {
        res.status(500).json({ message: "Server error" });
    }
});

// 🔥 GET REVIEWS BY PRODUCT (bonus - dễ ăn điểm)
router.get("/:productId", async (req, res) => {
    try {
        const reviews = await Review.find({
            productId: req.params.productId
        }).populate("userId", "username");

        res.json(reviews);

    } catch (err) {
        res.status(500).json({ message: "Server error" });
    }
});


// 🔥 UPDATE AVERAGE RATING
async function updateAvg(productId) {
    const reviews = await Review.find({ productId });

    const avg = reviews.length
        ? reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length
        : 0;

    await Products.findByIdAndUpdate(productId, {
        averageRating: avg,
        numReviews: reviews.length
    });
}


module.exports = router;