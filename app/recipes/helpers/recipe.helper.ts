const validateDeliverRecipe: Function = recipe => {
  if (Array.isArray(recipe) && recipe.length === 0) return false;
  else if (Object.entries(recipe).length != 0) return true;
  return false;
};

export default validateDeliverRecipe;