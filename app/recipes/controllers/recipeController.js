import { HelperDB } from "./helperdb";
import Recipe from "../models/recipes";
const mongoose = require('mongoose');
const recipe = require('../models/task.model');
class RecipeCRUD {

    static async updateRecipe(req, res) {
        const recipeToUpdate = recipe.findById(req.body.title, (err, recipe) => {
            if (err) return res.status(500).send({ message: `Error updating the recipe: ${err}` });
            if (!recipe) return res.status(404).send({ message: 'Recipe doesn\'t exist' });
        });
        res.json(recipe);
    }
    static async newRecipe(req, res) {
        // Hay que llamar a un validador para que compruebe que los campos que nos 
        // pasa el cliente están correctos
        const newrecipe = recipe;
        newrecipe.save();
    }
    static async getAllRecipes() {}
    static async getRecipe(body, tag) {}
    static async delete(body, paramTitulo) {}
}