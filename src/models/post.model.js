const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
    image: {
        type: String
    },
    caption: {
        type: String
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Auth',
        required: true
    },
    likes: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }],
    comments: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Comment'
    }]
}, {
    timestamps: true
});

const Post = mongoose.model('Post', postSchema);
module.exports = Post;