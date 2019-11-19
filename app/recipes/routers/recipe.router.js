const express = require('express');
const router = express.Router();
const recipeController = require('../controllers/recipe.controller')
const Recipe = require('../models/recipes.model');

// get all recipes

router.get('/', (req, res, next) => {
    try {
        recipeController.getAllRecipes()
            .then(recipes => {
                res.res.status(200).json(recipes)
            })
            .catch(error => {
                next(`Error in the database: ${error}`)
            })
    }
    catch (e) {
        next('The database is empty or the recipe not exist')
    }
});

// get one recipe

router.get('/:id', async (req, res) => {
    try {
        recipeController.getRecipe(req.params.id)
            .then(recipe => {
                res.status(200).json(recipe)
            })
            .catch(error => {
                next(`Error in the database: ${error}`)
            })
    } catch (error) {
        next(`Error to get the recipe: ${error}`);
    }
});

// add new recipe

router.post('/', async (req, res, next) => {
    try {
        // if (isValid(req.body)([validator1, validator2, ...])) {
        recipeController.newRecipe(req.body)
            .then(recipe => {
                res.status(200).json(recipe)
            })
            .catch(error => {
                next(`Error in the database: ${error}`)
            })
        // }
        // else {
        //     next('Invalid recipe')
        // }
    } catch (error) {
        next(`Error to save the recipe in the database: ${error}`);
    }
});

// // update a new recipe

// router.put('/:id', async (req, res) => {
//     const { title, owner, description, ingredients, likes, comments, date, tags } = req.body;
//     const newRecipe = { title, owner, description, ingredients, likes, comments, date, tags };
//     await Recipe.findByIdAndUpdate(req.params.id, newRecipe);
//     res.json({ status: 'Recipe Updated' });
// });

// // delete recipe

// router.delete('/:id', async (req, res) => {
//     await Recipe.findByIdAndRemove(req.params.id);
//     res.json({ status: 'Recipe Deleted' });
// });

module.exports = router;