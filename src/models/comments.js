const mongoose = require('mongoose');
const { Schema } = mongoose;

const CommentsSchema = new Schema({
    commentOwner: String,
    likes: Number
}, {
    collation: 'Comments'
});

module.exports = mongoose.model('Comment', CommentsSchema);
