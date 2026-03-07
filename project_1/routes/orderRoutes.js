// Import thư viện
const express = require("express");
const router = express.Router();

// Import models
const Order = require("../models/Order");
const Product = require("../models/Product");
const Customer = require("../models/Customer");



/*
========================================
Q4 - REPORT: Product Sales
GET /api/orders/reports/product-sales
========================================
*/
router.get("/reports/product-sales", async (req, res) => {
    try {

        // MongoDB Aggregation
        const report = await Order.aggregate([

            // Tách từng item trong mảng items
            { $unwind: "$items" },

            // Group theo product_id
            {
                $group: {
                    _id: "$items.product_id",
                    total_quantity_sold: { $sum: "$items.quantity" }
                }
            },

            // Sắp xếp bán nhiều -> ít
            { $sort: { total_quantity_sold: -1 } }

        ]);

        res.json(report);

    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});



/*
========================================
Q3 - CREATE ORDER
POST /api/orders
========================================
*/
router.post("/", async (req, res) => {
    try {

        // Lấy dữ liệu từ request body
        const { customer_id, items, payment_method } = req.body;

        /*
        -------------------------------
        1 Validate items
        -------------------------------
        */
        if (!items || items.length === 0) {
            return res.status(400).json({
                error: "Items required"
            });
        }

        /*
        -------------------------------
        2 Validate customer
        -------------------------------
        */
        const customer = await Customer.findById(customer_id);

        if (!customer) {
            return res.status(404).json({
                error: "Customer not found"
            });
        }

        let newItems = []; // items sẽ lưu vào order
        let total = 0; // tổng tiền
        let updated_products = []; // danh sách product sau khi trừ stock

        /*
        -------------------------------
        3 Loop từng sản phẩm trong items
        -------------------------------
        */
        for (let item of items) {

            const product = await Product.findById(item.product_id);

            /*
            product không tồn tại
            */
            if (!product) {
                return res.status(404).json({
                    error: "Product not found"
                });
            }

            /*
            Check stock đủ hay không
            */
            if (product.stock < item.quantity) {
                return res.status(400).json({
                    error: "Insufficient quantity to purchase"
                });
            }

            /*
            Trừ stock sau khi mua
            */
            product.stock -= item.quantity;
            await product.save();

            /*
            Tính tổng tiền
            */
            total += product.price * item.quantity;

            /*
            Lưu items vào order
            */
            newItems.push({
                product_id: product._id,
                quantity: item.quantity,
                price_at_order: product.price
            });

            /*
            Lưu thông tin product sau khi update
            */
            updated_products.push({
                name: product.name,
                stock: product.stock
            });

        }

        /*
        -------------------------------
        4 Create Order
        -------------------------------
        */
        const order = new Order({
            customer_id,
            items: newItems,
            payment_method,
            total_amount: total,
            status: "Pending"
        });

        await order.save();

        /*
        -------------------------------
        5 Response
        -------------------------------
        */
        res.status(201).json({
            message: "Order created successfully",
            order_id: order._id,
            updated_products: updated_products,
            total_amount: total
        });

    } catch (err) {
        res.status(500).json({
            error: err.message
        });
    }
});



/*
========================================
Q4 - UPDATE ORDER
PUT /api/orders/:orderId
========================================
*/
router.put("/:orderId", async (req, res) => {

    try {

        const orderId = req.params.orderId;
        const { items } = req.body;

        /*
        -------------------------------
        1 Validate items
        -------------------------------
        */
        if (!items || items.length === 0) {
            return res.status(400).json({
                error: "Items required"
            });
        }

        /*
        -------------------------------
        2 Tìm order
        -------------------------------
        */
        const order = await Order.findById(orderId);

        if (!order) {
            return res.status(404).json({
                error: "Order not found"
            });
        }

        /*
        -------------------------------
        3 Check status Pending
        -------------------------------
        */
        if (order.status !== "Pending") {
            return res.status(409).json({
                error: "Order is not in Pending status. Update denied."
            });
        }

        /*
        -------------------------------
        4 Trả lại stock cũ
        -------------------------------
        */
        for (let oldItem of order.items) {

            const product = await Product.findById(oldItem.product_id);

            if (product) {
                product.stock += oldItem.quantity;
                await product.save();
            }

        }

        let newItems = [];
        let total = 0;

        /*
        -------------------------------
        5 Check stock mới
        -------------------------------
        */
        for (let item of items) {

            const product = await Product.findById(item.product_id);

            if (!product) {
                return res.status(404).json({
                    error: "Product not found"
                });
            }

            if (product.stock < item.quantity) {
                return res.status(400).json({
                    error: "Insufficient quantity to purchase"
                });
            }

            /*
            Trừ stock
            */
            product.stock -= item.quantity;
            await product.save();

            /*
            Tính lại tổng tiền
            */
            total += product.price * item.quantity;

            newItems.push({
                product_id: product._id,
                quantity: item.quantity,
                price_at_order: product.price
            });

        }

        /*
        -------------------------------
        6 Update order
        -------------------------------
        */
        order.items = newItems;
        order.total_amount = total;

        await order.save();

        res.status(200).json({
            message: "Order updated successfully",
            new_total_amount: total
        });

    } catch (err) {
        res.status(500).json({
            error: err.message
        });
    }

});



module.exports = router;