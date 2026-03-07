const mongoose = require("mongoose");

const ItemSchema = new mongoose.Schema({
    product_id: {
        // Tham chiếu đến Product model để lấy thông tin sản phẩm
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product"
    },
    quantity: Number,
    price_at_order: Number
});

const OrderSchema = new mongoose.Schema({
    customer_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Customer"
    },
    items: [ItemSchema],
    status: {
        type: String,
        default: "Pending"
    },
    total_amount: Number,
    order_date: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model("Order", OrderSchema);