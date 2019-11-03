const mongoose = require('mongoose');
const { Schema } = mongoose;

const IngredientsSchema = new Schema({
    name: String
}, {
    collation: 'IngredientsData'
});

module.exports = mongoose.model('Ingredient', IngredientsSchema);
