import { checkSchema, validationResult } from 'express-validator';

const recipeValidator = (req, res, next) => {
  console.log('dentro del validador ', req.body);
  checkSchema({
    title: {
      in: ['body'],
      errorMessage: 'Invalid recipe title',
    }
  });
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
  }

  //console.log('dentro del validador ' + req.body.owner);
  next();
};

export default recipeValidator;