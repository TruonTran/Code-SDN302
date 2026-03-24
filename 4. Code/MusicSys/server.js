require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log("MongoDB connected"))
    .catch(err => console.log(err));

app.use("/users", require("./routes/userRoutes"));
app.use("/songs", require("./routes/songRoutes"));
app.use("/reviews", require("./routes/reviewRoutes"));

app.listen(process.env.PORT, () => {
    console.log("Server running on port", process.env.PORT);
});