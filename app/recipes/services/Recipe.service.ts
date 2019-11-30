import { Recipe, RecipeModel } from '../models/recipes.model';
// import moment from 'moment';

export default class RecipeCRUD {

  static async getRecipes(): Promise<RecipeModel[]> {
    const recipes = await Recipe.find();
    return recipes;
  }

  static async getRecipe(id): Promise<RecipeModel> {
    const recipe = await Recipe.findById(id);
    return recipe;
  }

  static async newRecipe(body): Promise<RecipeModel> {
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

  static async updateRecipe(id, body): Promise<RecipeModel> {
    console.log(typeof id);
    const recipeUpdated = await Recipe.findOneAndUpdate(id, body);
    return recipeUpdated;
  }

  static async deleteRecipe(id): Promise<RecipeModel> {
    const recipeDeleted = await Recipe.findByIdAndDelete(id);
    return recipeDeleted;
  }
}
