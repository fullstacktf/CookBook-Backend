const mongoose = require('mongoose');
const { Schema } = mongoose;

const IngredientsSchema = new Schema({
    name: { type: String, required: true, unique: true },
}, {
    collation: 'Ingredients'
});

module.exports = mongoose.model('Ingredient', IngredientsSchema);
