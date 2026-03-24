// File chính của ứng dụng Express
const express = require('express');
const { engine } = require('express-handlebars');
const path = require('path');
const { v4: uuidv4 } = require('uuid'); // Import uuid để tạo ID
const app = express();
const PORT = 3000;
// --- Mock Data (Dữ liệu giả định trong bộ nhớ) ---
let tasks = [
    {
        id: uuidv4(), name: 'Học Node.js', description: 'Hoàn thành dự án quản lý nhiệm vụ', completed: false
    },
    {
        id: uuidv4(), name: 'Làm bài tập Handlebars', description: 'Nắm vững các cú pháp và helper', completed: true
    },
    {
        id: uuidv4(), name: 'Chuẩn bị bài thuyết trình', description: 'Tóm tắt các kiến thức đã học', completed: false
    }
];
// --- Cấu hình Handlebars ---
app.engine('handlebars', engine({
    defaultLayout: 'main',
    layoutsDir: path.join(__dirname, 'views/layouts'),
    partialsDir: path.join(__dirname, 'views/partials'),
    extname: '.handlebars',
    helpers: {
        // Custom Helpers (sẽ thêm sau)
        isCompleted: (status) => status ? 'Đã hoàn thành' : 'Chưa hoàn thành',
        ifEquals: (arg1, arg2, options) => { // Helper so sánh
            return (arg1 == arg2) ? options.fn(this) : options.inverse(this);
        }
    }
}));
app.set('view engine', 'handlebars');
app.set('views', path.join(__dirname, 'views'));
// --- Middleware ---
app.use(express.static(path.join(__dirname, 'public'))); // Phục vụ file tĩnh
app.use(express.urlencoded({ extended: true })); // Xử lý dữ liệu form (xwww-form-urlencoded)
app.use(express.json()); // Xử lý dữ liệu JSON (nếu có)
// --- Routes (sẽ thêm sau) ---
// Route Trang Chủ: Hiển thị tất cả nhiệm vụ
app.get('/', (req, res) => {
    res.render('index', { title: 'Tất cả nhiệm vụ', tasks: tasks });
});
// Route hiển thị form thêm nhiệm vụ
app.get('/tasks/add', (req, res) => {
    res.render('addTask', { title: 'Thêm Nhiệm vụ Mới' });
});

// Route xử lý thêm nhiệm vụ mới
app.post('/tasks', (req, res) => {
    const { name, description } = req.body;
    if (name && description) {
        const newTask = {
            id: uuidv4(),
            name,
            description,
            completed: false
        };
        tasks.push(newTask);
        res.redirect('/'); // Redirect về trang chủ sau khi thêm
    } else {
        res.status(400).send('Tên và mô tả nhiệm vụ không được để trống.');
    }
});

// Route xem chi tiết nhiệm vụ
app.get('/tasks/:id', (req, res) => {
    const task = tasks.find(t => t.id === req.params.id);
    if (task) {
        res.render('taskDetail', {
            title: `Chi tiết: ${task.name}`, task:
                task
        });
    } else {
        res.status(404).send('Không tìm thấy nhiệm vụ.');
    }
});

// Route hiển thị form chỉnh sửa nhiệm vụ
app.get('/tasks/edit/:id', (req, res) => {
    const task = tasks.find(t => t.id === req.params.id);
    if (task) {
        res.render('editTask', { title: `Sửa: ${task.name}`, task: task });
    } else {
        res.status(404).send('Không tìm thấy nhiệm vụ để sửa.');
    }
});

// Route xử lý cập nhật nhiệm vụ
app.post('/tasks/edit/:id', (req, res) => {
    const taskId = req.params.id;
    const { name, description, completed } = req.body;
    const taskIndex = tasks.findIndex(t => t.id === taskId);
    if (taskIndex !== -1) {
        tasks[taskIndex] = {
            ...tasks[taskIndex], // Giữ lại ID cũ và các thuộc tính không đổi
            name: name,
            description: description,
            completed: completed === 'on' ? true : false // Checkbox trả về 'on' nếu được chọn
        };
        res.redirect(`/tasks/${taskId}`); // Redirect về trang chi tiết sau khi cập nhật
    } else {
        res.status(404).send('Không tìm thấy nhiệm vụ để cập nhật.');
    }
});

// Route xử lý xóa nhiệm vụ
app.post('/tasks/delete/:id', (req, res) => {
    const taskId = req.params.id;
    const initialLength = tasks.length;
    tasks = tasks.filter(t => t.id !== taskId);
    if (tasks.length < initialLength) {
        res.redirect('/'); // Redirect về trang chủ nếu xóa thành công
    } else {
        res.status(404).send('Không tìm thấy nhiệm vụ để xóa.');
    }
});

// Route xử lý chuyển đổi trạng thái nhiệm vụ (hoàn thành/chưa hoàn thành)
app.post('/tasks/toggle/:id', (req, res) => {
    const taskId = req.params.id;
    const taskIndex = tasks.findIndex(t => t.id === taskId);
    if (taskIndex !== -1) {
        tasks[taskIndex].completed = !tasks[taskIndex].completed; // Đảo ngược trạng thái
        res.redirect('/'); // Quay lại trang chủ
    } else {
        res.status(404).send('Không tìm thấy nhiệm vụ để chuyển đổi trạng thái.');
    }
});


// --- Khởi động Server ---
app.listen(PORT, () => {
    console.log(`Server đang chạy tại http://localhost:${PORT}`);
});
