require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.set("view engine", "ejs");

mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log("MongoDB Connected"))
    .catch(err => console.log(err));

app.get("/", (req, res) => {
    res.send("Server is running...");
});

const authRoutes = require("./routes/authRoutes");
const mediaRoutes = require("./routes/mediaRoutes");
const ratingRoutes = require("./routes/ratingRoutes");

app.use("/users", authRoutes);
app.use("/medias", mediaRoutes);
app.use("/api/ratings", ratingRoutes);


const PORT = process.env.PORT || 1234;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});