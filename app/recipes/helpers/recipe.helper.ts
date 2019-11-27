import { Recipe } from '../models/recipes.model';

const validateDeliverRecipe: Function = recipe => {
  if (Array.isArray(recipe) && recipe.length === 0) console.log('hola');
  else if (recipe) return true;
  return false;
};

export default validateDeliverRecipe;