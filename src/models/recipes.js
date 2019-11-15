const mongoose = require('mongoose');
const { Schema } = mongoose;

const RecipeSchema = new Schema({
    title: { type: String, required: true },
    owner: { type: String, required: true },
    description: { type: String, required: true },
    ingredients: [{
        name: { type: String, required: true },
        quantity: String
    }],
    likes: Number,
    comments: Array,
    date: Date,
    tags: Array
}, {
    collection: 'RecipesData'
});

module.exports = mongoose.model('Recipe', RecipeSchema);