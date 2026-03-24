const express = require("express");
const Song = require("../models/Song");
const auth = require("../middleware/auth");
const isAdmin = require("../middleware/isAdmin");

const router = express.Router();

// get all
router.get("/", async (req, res) => {
    const songs = await Song.find().sort({ createdAt: -1 });
    res.json(songs);
});

// create
router.post("/", auth, isAdmin, async (req, res) => {
    const song = new Song(req.body);
    await song.save();
    res.json(song);
});

module.exports = router;