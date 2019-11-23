import Recipe from '../models/recipes.model';
import moment from 'moment';


export default class RecipeCRUD {
  static async getAllRecipes() {
    const recipes = await Recipe.find();
    return recipes;
  }

  static async getRecipe(id) {
    const recipe = await Recipe.findById(id);
    return recipe;
  }

  static async newRecipe(body) {
    const { title, owner, description, ingredients, tags } = body;
    const newRecipe = new Recipe({
      title,
      owner,
      description,
      ingredients,
      likes: 0,
      comments: [],
      date: Date(),
      tags
    });
    await newRecipe.save();
    return newRecipe;
  }

  static async updateRecipe(id, body) {
    const recipeUpdated = await Recipe.findOneAndUpdate(id, body);
    return recipeUpdated;
  }

  static async deleteRecipe(id, body) {
    const recipeDeleted = await Recipe.findByIdAndDelete(id);
    return recipeDeleted;
  }
}
