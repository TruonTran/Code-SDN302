/**
 * @file question.js
 * @author Trương Ngọc Trân - CE180829
 * @date 9/2/2026
 * @description Định nghĩa các route liên quan đến câu hỏi
 */

const express = require("express");
const router = express.Router();
const axios = require("axios");
const https = require("https");

const apiUrl = "https://localhost:3443";

const axiosInstance = axios.create({
    httpsAgent: new https.Agent({ rejectUnauthorized: false })
});

// ================= LIST =================
router.get("/", async (req, res) => {
    const { data } = await axiosInstance.get(`${apiUrl}/questions`);
    res.render("questions/list", { questions: data });
});

// ================= CREATE =================
router.get("/create", (req, res) => {
    res.render("questions/create");
});

router.post("/create", async (req, res) => {
    await axiosInstance.post(`${apiUrl}/questions`, req.body);
    res.redirect("/questions");
});

// ================= EDIT FORM =================
router.get("/:id/edit", async (req, res) => {
    const { data } = await axiosInstance.get(
        `${apiUrl}/questions/${req.params.id}`
    );
    res.render("questions/edit", { question: data });
});

// ================= EDIT SUBMIT =================
router.post("/:id/edit", async (req, res) => {
    await axiosInstance.put(
        `${apiUrl}/questions/${req.params.id}`,
        req.body
    );
    res.redirect("/questions");
});

// ================= DELETE =================
router.post("/:id/delete", async (req, res) => {
    await axiosInstance.delete(
        `${apiUrl}/questions/${req.params.id}`
    );
    res.redirect("/questions");
});

// ================= DETAILS =================
router.get("/:id", async (req, res) => {
    const { data } = await axiosInstance.get(
        `${apiUrl}/questions/${req.params.id}`
    );
    res.render("questions/details", { question: data });
});

module.exports = router;
