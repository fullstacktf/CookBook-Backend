const mongoose = require('mongoose');
const { Schema } = mongoose;

const IngredientsSchema = new Schema({
    name: String
}, {
    collection: 'Ingredients'
});

module.exports = mongoose.model('Ingredient', IngredientsSchema);