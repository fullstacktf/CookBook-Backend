import { Recipe, RecipeModel,/*  ImageModel */ } from '../models/recipes.model';
import path from 'path';
import fs from 'fs-extra';
import { Error } from 'mongoose';

export default class RecipeCRUD {

  static async getRecipes(): Promise<RecipeModel[]> {
    const recipes = await Recipe.find().limit(10);
    return recipes;
  }

  static async getRecipe(id: string): Promise<RecipeModel> {
    const recipe = await Recipe.findById(id);
    return recipe;
  }

  static async newRecipe(body: RecipeModel): Promise<RecipeModel> {
    const { title, owner, description, ingredients, tags } = body;
    const newRecipe = new Recipe({
      title,
      owner,
      description,
      ingredients,
      images: [],
      likes: 0,
      comments: [],
      date: new Date(),
      tags
    });
    await newRecipe.save();
    return newRecipe;
  }

  static async updateRecipe(id: string, body: RecipeModel): Promise<RecipeModel> {
    body.date = new Date();
    const recipeUpdated = await Recipe.findOneAndUpdate(id, body);
    return recipeUpdated.id;
  }

  static async deleteRecipe(id: string): Promise<RecipeModel> {
    const recipeDeleted = await Recipe.findByIdAndDelete(id);
    return recipeDeleted;
  }

  // likes and dislikes controllers

  static async likeDislikeRecipe(id: string, body: RecipeModel, symbol: boolean): Promise<RecipeModel> {
    symbol ? body.likes += 1 : body.likes -= 1;
    const recipe = await Recipe.findByIdAndUpdate(id, body);
    return recipe.id;
  }

  static async getlikeRecipe(id: string): Promise<number> {
    const recipe = await this.getRecipe(id);
    return recipe.likes;
  }

  // comment controllers

  static async commentRecipe(id: string, body: RecipeModel): Promise<RecipeModel> {
    const recipe = await this.getRecipe(id);
    recipe.comments.push(body);
    await recipe.save();
    return recipe;
  }

  static async deleteCommentRecipe(id: string, cid: string): Promise<RecipeModel> {
    const recipe = await this.getRecipe(id);
    recipe.comments.pull(cid);
    await recipe.save();
    return recipe;
  }

  static async getCommentRecipe(id: string, cid: string): Promise<RecipeModel> {
    const recipe = await this.getRecipe(id);
    const comment = recipe.comments.id(cid);
    return comment;
  }

  static async getCommentsRecipe(id: string): Promise<RecipeModel> {
    const recipe = await this.getRecipe(id);
    const comment = recipe.comments;
    return comment;
  }

  // images controllers

  static async getImages(id: string): Promise<RecipeModel> {
    const recipe = await this.getRecipe(id);
    const image = recipe.images;
    return image;
  }

  static async uploadImage(id: string, file: Express.Multer.File): Promise<RecipeModel> {
    const recipe = await this.getRecipe(id);

    if (!file) throw new Error('no files have been uploaded');

    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/jpg' || file.mimetype === 'image/png') {
      const body/* : ImageModel */ = {
        imgTitle: file.filename,
        imgDate: new Date,
        imgPath: file.path
      };

      recipe.images.push(body);
      await recipe.save();
      return recipe.id;
    }
    else
      throw new Error('Invalid format, only files with extension .jpg, .jpeg and .png');
  }

  static async deleteImage(id: string, iid: string): Promise<RecipeModel> {
    const recipe = await this.getRecipe(id);
    const image = recipe.images.id(iid);
    if (image) {
      fs.unlink(path.resolve(image.imgPath));
    }
    recipe.images.pull(iid);
    await recipe.save();
    return recipe;
  }
}
