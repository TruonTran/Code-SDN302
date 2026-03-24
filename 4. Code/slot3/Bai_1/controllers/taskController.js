const Task = require('../models/Task');
// Create 
exports.createTask = async (req, res) => {
    const task = new Task(req.body);
    await task.save();
    res.status(201).json(task);
};
// Read all 
exports.getTasks = async (req, res) => {
    const tasks = await Task.find();
    res.json(tasks);
};
// Read one 
exports.getTask = async (req, res) => {
    const task = await Task.findById(req.params.id);
    if (!task) return res.status(404).json({ error: "Task not found" });
    res.json(task);
};
// Update 
exports.updateTask = async (req, res) => {
    const task = await Task.findByIdAndUpdate(req.params.id, req.body, {
        new:
            true
    });
    res.json(task);
};
// Delete 
exports.deleteTask = async (req, res) => {
    await Task.findByIdAndDelete(req.params.id);
    res.json({ message: "Task deleted" });
}; 