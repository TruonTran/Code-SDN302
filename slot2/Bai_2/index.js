const express = require('express');
const app = express();
const PORT = 3000;
app.use(express.json()); // middleware để đọc JSON 
// Dữ liệu mẫu 
let users = [
    { id: 1, name: "Alice", email: "alice@example.com" },
    { id: 2, name: "Bob", email: "bob@example.com" }
];
// GET all users 
app.get('/users', (req, res) => {
    res.json(users);
});
// GET user by ID 
app.get('/users/:id', (req, res) => {
    const user = users.find(u => u.id == req.params.id);
    if (user) res.json(user);
    else res.status(404).json({ message: "User not found" });
});
// POST - Create new user 
app.post('/users', (req, res) => {
    const newUser = {
        id: users.length + 1,
        ...req.body
    };
    users.push(newUser);
    res.status(201).json(newUser);
});
// PUT - Update user 
app.put('/users/:id', (req, res) => {
    const index = users.findIndex(u => u.id == req.params.id);
    if (index !== -1) {
        users[index] = { id: Number(req.params.id), ...req.body };
        res.json(users[index]);
    } else {
        res.status(404).json({ message: "User not found" });
    }
});
// DELETE user 
app.delete('/users/:id', (req, res) => {
    const index = users.findIndex(u => u.id == req.params.id);
    if (index !== -1) {
        const deleted = users.splice(index, 1);
        res.json(deleted[0]);
    } else {
        res.status(404).json({ message: "User not found" });
    }
});
// Khởi động server 
app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
});