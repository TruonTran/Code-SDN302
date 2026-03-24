const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");

const authRoutes = require("./routes/authRoutes");
const mediaRoutes = require("./routes/mediaRoutes");
const ratingRoutes = require("./routes/ratingRoutes");

const app = express();

app.use(cors());
app.use(bodyParser.json());

app.set("view engine", "ejs");

mongoose.connect("mongodb://127.0.0.1:27017/media_db")
    .then(() => console.log("MongoDB connected"))
    .catch(err => console.log(err));

app.use("/api/auth", authRoutes);
app.use("/medias", mediaRoutes);
app.use("/api/ratings", ratingRoutes);

app.listen(8386, () => {
    console.log("Server running on port 8386");
});