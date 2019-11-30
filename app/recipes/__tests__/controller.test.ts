import * as controller from '../controllers/recipe.controller';

function next(): void {
  return null;
}

const res = { 'a': 'a' };

describe('recipe.controller', () => {
  test('Should return error if recipe does not exist in database', () => {
    const recipe = undefined;
    expect(controller.getRecipes(recipe, res, next)).toBe('Error to get the recipe or the recipe does not exist.');
  });
});