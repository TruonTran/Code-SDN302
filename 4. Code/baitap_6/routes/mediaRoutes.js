const express = require("express");
const Media = require("../models/Media");

const router = express.Router();

router.get("/", async (req, res) => {
    const medias = await Media.find();
    res.json(medias);
});

router.get("/:id", async (req, res) => {
    const media = await Media.findById(req.params.id);
    res.json(media);
});

module.exports = router;