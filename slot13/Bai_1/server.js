require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 5000;

// // Kích hoạt CORS cho tất cả origin 
// app.use(cors());

const corsOptions = {
    origin: ['http://localhost:3000', 'https://trusted.com'],
    methods: ['GET', 'POST'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true
};

app.use(cors(corsOptions));
// app.options('*', cors(corsOptions));

// Middleware xử lý JSON 
app.use(express.json());

// API đơn giản 
app.get('/api/data', (req, res) => {
    res.json({ message: 'CORS is enabled!' });
});

const { createProxyMiddleware } = require('http-proxy-middleware');

app.use('/proxy-api', createProxyMiddleware({
    target: 'https://jsonplaceholder.typicode.com',
    changeOrigin: true
}));

// Chạy server 
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});