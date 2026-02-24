// config/db.js 
const mongoose = require('mongoose');
module.exports = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true
            // Removed useCreateIndex and useFindAndModify as they are deprecated in Mongoose 6+ 
        });
        console.log('Kết nối DB thành công');
    } catch (err) {
        console.error('Lỗi kết nối DB:', err.message);
        process.exit(1); // Exit process with failure 
    }
};