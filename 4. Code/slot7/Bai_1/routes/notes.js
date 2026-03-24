const express = require('express');
const router = express.Router();
const Note = require('../models/Note');
// Trang chủ → danh sách ghi chú
router.get('/', async (req, res) => {
    const notes = await Note.find().sort({ createdAt: -1 });
    res.render('notes/list', { notes });
});
// Form tạo mới
router.get('/notes/new', (req, res) => {
    res.render('notes/new');
});
// Tạo mới ghi chú
router.post('/notes', async (req, res) => {
    const { title, content } = req.body;
    await Note.create({ title, content });
    res.redirect('/');
});
// Xem ghi chú
router.get('/notes/:id', async (req, res) => {
    const note = await Note.findById(req.params.id);
    res.render('notes/show', { note });
});
// Form sửa
router.get('/notes/:id/edit', async (req, res) => {
    const note = await Note.findById(req.params.id);
    res.render('notes/edit', { note });
});
// Cập nhật ghi chú
router.put('/notes/:id', async (req, res) => {
    const { title, content } = req.body;
    await Note.findByIdAndUpdate(req.params.id, { title, content });
    res.redirect('/');
});
// Xoá ghi chú
router.delete('/notes/:id', async (req, res) => {
    await Note.findByIdAndDelete(req.params.id);
    res.redirect('/');
});
module.exports = router;