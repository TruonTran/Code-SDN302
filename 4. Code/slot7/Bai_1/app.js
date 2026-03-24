// const express = require('express');
// const mongoose = require('mongoose');
// const methodOverride = require('method-override');
// const app = express();
// // Kết nối DB
// mongoose.connect('mongodb://127.0.0.1:27017/note-app')
// // Middleware
// app.use(express.urlencoded({ extended: true }));
// app.use(methodOverride('_method'));
// app.use(express.static('public'));
// app.set('view engine', 'ejs');
// // Routes
// const noteRoutes = require('./routes/notes');
// app.use('/', noteRoutes);
// app.listen(3000, () => console.log('Server running on http://localhost:3000'));

const express = require('express');
const mongoose = require('mongoose');
const methodOverride = require('method-override');

const app = express();

// MongoDB
mongoose.connect('mongodb://127.0.0.1:27017/note-app')
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.log(err));

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'));
app.use(express.static('public'));

// View engine
app.set('view engine', 'ejs');
app.set('views', 'views');

// Routes
const noteRoutes = require('./routes/notes');
app.use('/', noteRoutes);

// Server
app.listen(3000, () => {
    console.log('Server running at http://localhost:3000');
});