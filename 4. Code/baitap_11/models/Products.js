const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },

    brand: {
        type: String,
        required: true,
        trim: true
    },

    category: {
        type: String,
        required: true,
        enum: ["Laptop", "PC", "Accessory"]
    },

    price: {
        type: Number,
        required: true,
        min: 0
    },

    stock: {
        type: Number,
        required: true,
        min: 0,
        default: 0
    },

    // 🔥 Nested object
    specifications: {
        cpu: {
            type: String,
            required: true
        },
        ram: {
            type: String,
            required: true
        },
        storage: {
            type: String,
            required: true
        },
        gpu: String,
        screen: String,
        os: String
    },

    imageUrl: {
        type: String,
        default: ""
    },

    // ❌ không cho nhập tay
    averageRating: {
        type: Number,
        default: 0,
        min: 0,
        max: 5,
        select: false // ẩn khi query nếu muốn
    },

    // 👉 lưu để tối ưu (không cần query reviews nhiều)
    numReviews: {
        type: Number,
        default: 0
    }

}, {
    timestamps: true
});


productSchema.pre("save", async function () {
    if (this.isModified("averageRating")) {
        this.averageRating = undefined;
    }
});


// 🚀 Method tính rating (gọi từ controller)
productSchema.methods.updateRating = async function () {
    const Review = mongoose.model("Review");

    const reviews = await Review.find({ productId: this._id });

    const avg =
        reviews.reduce((sum, r) => sum + r.rating, 0) /
        reviews.length;

    this.averageRating = avg || 0;
    this.numReviews = reviews.length;

    await this.save();
};

module.exports = mongoose.model("Product", productSchema, "Product");