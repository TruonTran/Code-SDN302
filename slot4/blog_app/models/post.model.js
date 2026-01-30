// const mongoose = require('mongoose');
// const postSchema = new mongoose.Schema({
//     title: String,
//     content: String,
//     author: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
// });
// module.exports = mongoose.model('Post', postSchema);

const mongoose = require('mongoose');

const postSchema = new mongoose.Schema(
    {
        title: { type: String, required: true },
        content: String,
        author: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true
        }
    },
    { timestamps: true }
);

// ✅ VIRTUAL POPULATE COMMENTS
postSchema.virtual('comments', {
    ref: 'Comment',
    localField: '_id',
    foreignField: 'post'
});

// ✅ BẮT BUỘC
postSchema.set('toJSON', { virtuals: true });
postSchema.set('toObject', { virtuals: true });

module.exports = mongoose.model('Post', postSchema);
