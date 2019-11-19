const express = require('express');
const router = express.Router();

// recipe model

const Recipe = require('../models/task');

// get all recipes

router.get('/', async (req, res) => {
    const recipes = await Task.find();
    res.json(recipes);
});

// get recipes by id

router.get('/:id', async (req, res) => {
    const recipe = await Recipe.findById(req.params.id);
    res.json(recipe);
});

// add new recipe

router.post('/', async (req, res) => {
    const { title, owner, description, ingredients, likes, comments, date, tags } = req.body;
    const recipe = new Recipe({title, owner, description, ingredients, likes, comments, date, tags});
    await recipe.save();
    res.json({  status: 'recipe saved'  });
});

// update a new recipe

router.put('/:id', async (req, res) => {
    const { title, owner, description, ingredients, likes, comments, date, tags } = req.body;
    const newRecipe = {title, owner, description, ingredients, likes, comments, date, tags};
    await Recipe.findByIdAndUpdate(req.params.id, newRecipe);
    res.json({  status: 'Recipe Updated'  });
});

// delete recipe

router.delete('/:id', async (req, res) => {
    await Recipe.findByIdAndRemove(req.params.id);
    res.json({  status: 'Recipe Deleted'  });
});

module.exports = router;