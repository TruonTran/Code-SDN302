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
    const { data } = await axiosInstance.get(`${apiUrl}/quizzes`);
    res.render("quizzes/list", { quizzes: data });
});

// ================= CREATE =================
router.get("/create", async (req, res) => {
    const { data: questions } = await axiosInstance.get(
        `${apiUrl}/questions`
    );

    res.render("quizzes/create", { questions });
});

router.post("/create", async (req, res) => {
    await axiosInstance.post(`${apiUrl}/quizzes`, req.body);
    res.redirect("/quizzes");
});

// ================= DETAILS =================
router.get("/:id", async (req, res) => {
    const { data } = await axiosInstance.get(
        `${apiUrl}/quizzes/${req.params.id}`
    );
    res.render("quizzes/details", { quiz: data });
});

// ================= EDIT FORM =================
router.get("/:id/edit", async (req, res) => {
    const { data: quiz } = await axiosInstance.get(
        `${apiUrl}/quizzes/${req.params.id}`
    );

    const { data: questions } = await axiosInstance.get(
        `${apiUrl}/questions`
    );

    res.render("quizzes/edit", { quiz, questions });
});


// ================= EDIT SUBMIT =================
router.post("/:id/edit", async (req, res) => {
    await axiosInstance.put(
        `${apiUrl}/quizzes/${req.params.id}`,
        req.body
    );
    res.redirect("/quizzes");
});

// ================= DELETE =================
router.post("/:id/delete", async (req, res) => {
    await axiosInstance.delete(
        `${apiUrl}/quizzes/${req.params.id}`
    );
    res.redirect("/quizzes");
});

module.exports = router;


