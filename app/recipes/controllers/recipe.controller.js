const Recipe = require('../models/recipes.model');
const moment = require('moment')

module.exports = class RecipeCRUD {

    static async getAllRecipes() {
        return await Recipe.find();
    }

    static async getRecipe(id) {
        return await Recipe.findById(id)
    }

    static async newRecipe(body) {
        const { title, owner, description, ingredients, tags } = body;
        const newRecipe = new Recipe({
            title,
            owner,
            description,
            ingredients,
            likes: 0,
            comments,
            date: moment.calendarFormat(),
            tags
        });
        return await newRecipe.save();
    }

    // static async updateRecipe(req, res) {
    //     const recipeToUpdate = recipe.findById(req.body.title, (err, recipe) => {
    //         if (err) return res.status(500).send({ message: `Error to realize the task: ${err}` });
    //         if (!recipe) return res.status(404).send({ message: 'Recipe doesn\'t exist' });
    //     });
    //     res.json(recipe);
    // }

    // static async delete(body, paramTitulo) { }
}