const mongoose = require('mongoose');
const { Schema } = mongoose;

const IngredientsSchema = new Schema({
    name: { type: String, required: true, unique: true },
}, {
    collection: 'Ingredients'
});

module.exports = mongoose.model('Ingredient', IngredientsSchema);