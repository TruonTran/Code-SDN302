const app = require('./app'); // Import đối tượng Express app từ file app.js 
const PORT = process.env.PORT || 3000; // Định nghĩa cổng mà server sẽ lắng nghe
// Sử dụng process.env.PORT nếu có (dành cho môi trường deploy), nếu không thì mặc định là 3000
// Lắng nghe các kết nối đến trên cổng đã định nghĩa 
app.listen(PORT, () => {
    // Callback function sẽ được gọi khi server bắt đầu lắng nghe 
    console.log(`Server đang chạy tại http://localhost:${PORT}`);
    console.log('Để upload file, sử dụng POST request tới /upload với trường "file".');
    console.log('Để xem danh sách file, truy cập http://localhost:3000/files/list.');
    console.log('Để tải file, truy cập http://localhost:3000/download/<tên_file>.');
});