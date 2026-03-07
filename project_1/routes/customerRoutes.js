// Import thư viện express
const express = require("express");

// Tạo router để định nghĩa các API route
const router = express.Router();

// Import các model MongoDB
const Order = require("../models/Order");
const Product = require("../models/Product");

// API: GET /:customerId/orders
// Mục đích: Lấy tất cả đơn hàng của một khách hàng theo customerId
router.get("/:customerId/orders", async (req, res) => {

    // Lấy customerId từ URL parameter
    const { customerId } = req.params;

    // Tìm tất cả order có customer_id trùng với customerId
    // populate để lấy thông tin product từ collection Product
    const orders = await Order.find({ customer_id: customerId })
        .populate("items.product_id");

    // Nếu không tìm thấy đơn hàng nào
    if (orders.length === 0) {
        return res.status(404).json({
            error: "No orders found for this customer"
        });
    }

    // Format lại dữ liệu trả về cho đẹp và dễ đọc
    const result = orders.map(order => ({

        // ID của order
        _id: order._id,

        // Ngày tạo đơn hàng
        order_date: order.order_date,

        // Trạng thái đơn hàng (Pending, Completed...)
        status: order.status,

        // Danh sách sản phẩm trong order
        items: order.items.map(i => ({
            // Tên sản phẩm (lấy từ Product model)
            product: i.product_id.name,

            // Số lượng mua
            quantity: i.quantity,

            // Tổng tiền của sản phẩm đó
            total: i.quantity * i.price_at_order
        })),

        // Tổng tiền toàn bộ order
        total_amount: order.total_amount
    }));

    // Trả dữ liệu về client
    res.json(result);
});

// Export router để dùng trong app.js hoặc server.js
module.exports = router;