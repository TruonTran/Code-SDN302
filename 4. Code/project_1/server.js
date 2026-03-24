const express = require("express");
const connectDB = require("./config/db");
// thay đổi đường dẫn nếu cần
const customerRoutes = require("./routes/customerRoutes");
const orderRoutes = require("./routes/orderRoutes");

const app = express();

app.use(express.json());

connectDB();
// thay đổi đường dẫn nếu cần
app.use("/api/customers", customerRoutes);
app.use("/api/orders", orderRoutes);

// lưu ý đổi port theo đề yêu cầu
app.listen(9999, () => {
    console.log("Server running at http://localhost:9999");
});