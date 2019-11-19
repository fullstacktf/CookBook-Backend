const mongoose = require('mongoose');
const { Schema } = mongoose;

const RecipeSchema = new Schema({
    title: String,
    owner: String,
    description: String,
    ingredients: [{
        name: String,
        quantity: String
    }],
    likes: Number,
    comments: [{
        commentOwner: String,
        content: String,
        likes: Number,
        date: Date
    }],
    date: Date,
    tags: Array
}, {
    collection: 'RecipesData'
});

module.exports = mongoose.model('Recipe', RecipeSchema);