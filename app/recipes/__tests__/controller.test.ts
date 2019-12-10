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
    test('should return true if the recipe is an array with content', () => {
      const recipe = ['content'];
      expect(validateDeliverRecipe(recipe)).toBe(true);
    });
    test('should return true if the recipe is an object with content', () => {
      const recipe = { 'a': 'a' };
      expect(validateDeliverRecipe(recipe)).toBe(true);
    });
    test('should return false if the recipe is something diferent', () => {
      const recipe = '';
      expect(validateDeliverRecipe(recipe)).toBe(false);
    });
  });
});