const express = require("express");
const Products = require("../models/Products");
const auth = require("../middleware/auth");
const isAdmin = require("../middleware/isAdmin");
const Review = require("../models/Review");
const mongoose = require("mongoose");
const router = express.Router();

// get all
router.get("/", async (req, res) => {
    const product = await Products.find().sort({ createdAt: -1 });
    res.json(product);
});

// GET /products/top-rated
router.get("/top-rated", async (req, res) => {
    try {
        const products = await Products.find()
            .sort({ averageRating: -1 })
            .limit(5)
            .select("name averageRating");

        res.json(products);

    } catch (err) {
        res.status(500).json({ message: "Server error" });
    }
});



// GET /products/most-reviewed
router.get("/most-reviewed", async (req, res) => {
    try {
        const result = await Products.aggregate([
            {
                $project: {
                    reviewCount: "$numReviews"
                }
            },
            {
                $sort: { reviewCount: -1 }
            },
            {
                $limit: 5
            }
        ]);

        res.json(result);

    } catch (err) {
        res.status(500).json({ message: "Server error" });
    }
});

// GET /products/:id/statistics
router.get("/:id/statistics", async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ message: "Invalid product ID" });
    }

    try {
        const reviews = await Review.find({ productId: id });

        const total = reviews.length;

        const avg = total
            ? reviews.reduce((sum, r) => sum + r.rating, 0) / total
            : 0;

        // 🔥 rating distribution
        const distribution = {
            5: 0,
            4: 0,
            3: 0,
            2: 0,
            1: 0
        };

        reviews.forEach(r => {
            distribution[r.rating]++;
        });

        res.json({
            averageRating: avg,
            totalReviews: total,
            ratingDistribution: distribution
        });

    } catch (err) {
        res.status(500).json({ message: "Server error" });
    }
});

//get product theo id 
router.get("/:id", async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ message: "Invalid product ID" });
    }

    try {
        const product = await Products.findById(id);

        if (!product) {
            return res.status(404).json({ message: "Product not found" });
        }

        res.json(product);

    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
});

// create
router.post("/", auth, isAdmin, async (req, res) => {
    const product = new Products(req.body);
    await product.save();
    res.json(product);
});

// UPDATE product (Task 8)
router.put("/:id", auth, isAdmin, async (req, res) => {
    const { id } = req.params;

    // check ObjectId hợp lệ
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ message: "Invalid product ID" });
    }

    try {
        // ❌ không cho sửa averageRating
        delete req.body.averageRating;

        const product = await Products.findByIdAndUpdate(
            id,
            req.body,
            { new: true }
        );

        if (!product) {
            return res.status(404).json({ message: "Product not found" });
        }

        res.json({ message: "Product updated successfully" });

    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
});


// DELETE product (Task 9)
router.delete("/:id", auth, isAdmin, async (req, res) => {
    const { id } = req.params;

    // check ObjectId
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ message: "Invalid product ID" });
    }

    try {
        const product = await Products.findByIdAndDelete(id);

        if (!product) {
            return res.status(404).json({ message: "Product not found" });
        }

        res.json({ message: "Product deleted successfully" });

    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
});




module.exports = router;