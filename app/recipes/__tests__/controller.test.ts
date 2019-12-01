import validateDeliverRecipe from '../helpers/recipe.helper';;


describe('recipe.helper', () => {
  describe('validateDeliverRecipe', () => {
    test('should return false if the recipe is an array empty', () => {
      const recipe = [];
      expect(validateDeliverRecipe(recipe)).toBe(false);
    });
    test('should return false if the recipe is an object empty', () => {
      const recipe = {};
      expect(validateDeliverRecipe(recipe)).toBe(false);
    });
  });
});