const express = require('express');
const { engine } = require('express-handlebars');
const path = require('path');
const connectDB = require('./config/db'); // Import hàm kết nối DB
const Post = require('./models/Post'); // Import Post Model
const session = require('express-session'); // Cho flash messages
const flash = require('connect-flash'); // Cho flash messages
const app = express();
const PORT = process.env.PORT || 3000;
// Connect to Database
connectDB();
// --- Cấu hình Handlebars ---
app.engine('handlebars', engine({
    defaultLayout: 'main',
    layoutsDir: path.join(__dirname, 'views/layouts'),
    partialsDir: path.join(__dirname, 'views/partials'),
    extname: '.handlebars',
    helpers: {
        // Custom Helpers
        formatDate: (date) => { // Định dạng ngày tháng
            return new Date(date).toLocaleDateString('vi-VN', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
            });
        },
        truncate: (str, len) => { // Cắt ngắn chuỗi
            if (str.length > len) {
                return str.substring(0, len) + '...';
            }
            return str;
        },
        isFeatured: (status) => status ? 'Có' : 'Không', // Helper cho trạng thái nổi bật
        // Helper so sánh cho checkbox (sẽ dùng trong form edit)
        ifChecked: (value) => value ? 'checked' : ''
    }
}));
app.set('view engine', 'handlebars');
app.set('views', path.join(__dirname, 'views'));
// --- Middleware ---
app.use(express.static(path.join(__dirname, 'public'))); // Phục vụ file tĩnh
app.use(express.urlencoded({ extended: true })); // Xử lý dữ liệu form (xwww-form-urlencoded)
app.use(express.json()); // Xử lý dữ liệu JSON (nếu có)
// Express Session Middleware (cho connect-flash)
app.use(session({
    secret: 'supersecretkey', // Chuỗi bí mật để mã hóa session
    resave: false,
    saveUninitialized: false
}));
// Connect Flash Middleware
app.use(flash());
// Middleware để đưa flash messages vào res.locals (có thể truy cập trong Handlebars)
app.use((req, res, next) => {
    res.locals.success_msg = req.flash('success_msg');
    res.locals.error_msg = req.flash('error_msg');
    res.locals.error = req.flash('error'); // Dùng cho passport nếu có
    next();
});
// --- Routes (sẽ thêm bên dưới) ---
// Route Trang Chủ: Hiển thị tất cả bài viết
app.get('/', async (req, res) => {
    try {
        const posts = await Post.find().sort({ createdAt: 'desc' }).lean();
        // .lean() để chuyển Mongoose document thành plain JS object
        res.render('index', { title: 'Tất cả bài viết', posts: posts });
    } catch (err) {
        console.error(err);
        res.render('index', {
            title: 'Lỗi', error_msg: 'Không thể tải bài viết.'
        });
    }
});

// Route hiển thị form thêm bài viết
app.get('/posts/add', (req, res) => {
    res.render('addPost', { title: 'Thêm Bài viết Mới' });
});
// Route xử lý thêm bài viết mới
app.post('/posts', async (req, res) => {
    const { title, author, content, description } = req.body;
    let errors = [];
    if (!title || !author || !content || !description) {
        errors.push({ msg: 'Vui lòng điền đầy đủ tất cả các trường.' });
    }
    if (errors.length > 0) {
        res.render('addPost', {
            title: 'Thêm Bài viết Mới',
            errors: errors,
            title: title, // Giữ lại dữ liệu đã nhập
            author: author,
            content: content,
            description: description
        });
    } else {
        try {
            const newPost = new Post({
                title,
                author,
                content,
                description,
                isFeatured: req.body.isFeatured === 'on' ? true : false // Xử lý checkbox
            });
            await newPost.save();
            req.flash('success_msg', 'Bài viết đã được thêm thành công!');
            res.redirect('/');
        } catch (err) {
            console.error(err);
            req.flash('error_msg', 'Có lỗi xảy ra khi thêm bài viết.');
            res.redirect('/posts/add'); // Quay lại form nếu có lỗi
        }
    }
});

// Route xem chi tiết bài viết
app.get('/posts/:id', async (req, res) => {
    try {
        const post = await Post.findById(req.params.id).lean();
        if (post) {
            res.render('postDetail', { title: post.title, post: post });
        } else {
            req.flash('error_msg', 'Không tìm thấy bài viết.');
            res.redirect('/');
        }
    } catch (err) {
        console.error(err);
        req.flash('error_msg', 'Có lỗi xảy ra khi tải chi tiết bài viết.');
        res.redirect('/');
    }
});

// Route hiển thị form chỉnh sửa bài viết
app.get('/posts/edit/:id', async (req, res) => {
    try {
        const post = await Post.findById(req.params.id).lean();
        if (post) {
            res.render('editPost', {
                title: `Sửa: ${post.title}`, post: post
            });
        } else {
            req.flash('error_msg', 'Không tìm thấy bài viết để sửa.');
            res.redirect('/');
        }
    } catch (err) {
        console.error(err);
        req.flash('error_msg', 'Có lỗi xảy ra khi tải bài viết để sửa.');
        res.redirect('/');
    }
});
// Route xử lý cập nhật bài viết
app.post('/posts/edit/:id', async (req, res) => {
    const postId = req.params.id;
    const { title, author, content, description } = req.body;
    const isFeatured = req.body.isFeatured === 'on' ? true : false;
    let errors = [];
    if (!title || !author || !content || !description) {
        errors.push({ msg: 'Vui lòng điền đầy đủ tất cả các trường.' });
    }
    if (errors.length > 0) {
        // Giữ lại dữ liệu cũ nếu có lỗi
        const oldPost = await Post.findById(postId).lean();
        res.render('editPost', {
            title: `Sửa: ${oldPost ? oldPost.title : 'Bài viết'}`,
            post: {
                ...oldPost, title, author, content, description,
                isFeatured
            }, // Kết hợp dữ liệu cũ và mới nhập
            errors: errors
        });
    } else {
        try {
            await Post.findByIdAndUpdate(postId, {
                title,
                author,
                content,
                description,
                isFeatured
            }, { new: true, runValidators: true }); // new: true trả về doc mới, runValidators: true chạy lại validation
            req.flash('success_msg', 'Bài viết đã được cập nhật thành công!');
            res.redirect(`/posts/${postId}`);
        } catch (err) {
            console.error(err);
            req.flash('error_msg', 'Có lỗi xảy ra khi cập nhật bài viết.');
            res.redirect(`/posts/edit/${postId}`);
        }
    }
});

// Route xử lý xóa bài viết
app.post('/posts/delete/:id', async (req, res) => {
    try {
        const deletedPost = await Post.findByIdAndDelete(req.params.id);
        if (deletedPost) {
            req.flash('success_msg', 'Bài viết đã được xóa thành công!');
            res.redirect('/');
        } else {
            req.flash('error_msg', 'Không tìm thấy bài viết để xóa.');
            res.redirect('/');
        }
    } catch (err) {
        console.error(err);
        req.flash('error_msg', 'Có lỗi xảy ra khi xóa bài viết.');
        res.redirect('/');
    }
});


// --- Khởi động Server ---
app.listen(PORT, () => {
    console.log(`Server đang chạy tại http://localhost:${PORT}`);
});
