import { body, validationResult, ValidationChain } from 'express-validator';
import { Request, Response, NextFunction } from 'express';

export const recipeValidationRules = (): ValidationChain[] => {
  return [
    body('title')
      .exists()
      .withMessage('Title is required.')
      .notEmpty()
      .withMessage('Title cannot be empty.')
      .isString()
      .withMessage('Error in the title.')
      .matches(/^[a-zA-Z0-9\s]+$/, 'i')
      .withMessage('Title must be alphanumeric, and can contain spaces')
      .isLength({ min: 2, max: 30 })
      .withMessage('The Title must have a length between 2 and 30.'),

    body('description')
      .exists()
      .withMessage('Description is required.')
      .notEmpty()
      .withMessage('Description cannot be empty.')
      .isString()
      .withMessage('Error in the description.'),

    body('ingredients')
      .exists()
      .withMessage('Ingredients is required.')
      .notEmpty()
      .withMessage('Ingredients cannot be empty.')
      .custom(ingredients => {
        if (!Array.isArray(ingredients)) throw new Error('Error in the ingredients.');

        ingredients.forEach(element => {
          const keys = Object.keys(element);
          const values = Object.values(element);

          if (!keys.includes('name') || values[keys.indexOf('name')] === '') throw new Error('Ingredient name cannot be empty.');
          if (!keys.includes('quantity') || values[keys.indexOf('quantity')] === '') throw new Error('Ingredient quantity cannot be empty.');
        });

        return true;
      })
  ];
};

const validator = (req: Request, res: Response, next: NextFunction): Response | void => {
  const errors = validationResult(req);
  if (errors.isEmpty()) {
    return next();
  }

  const extractedErrors = [];
  errors.array().map(err => extractedErrors.push({ [err.param]: err.msg }));

  return res.status(422).json({ errors: extractedErrors });
};

export default validator;