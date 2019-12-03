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
      .isAlphanumeric()
      .withMessage('Title must be alphanumeric.')
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
          if (keys[0] != 'name' || values[0] === '') throw new Error('Ingredient name cannot be empty.');
          if (keys[1] != 'quantity' || values[1] === '') throw new Error('Ingredient quantity cannot be empty.');
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