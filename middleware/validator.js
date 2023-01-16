import { validationResult } from 'express-validator';

const validateRequest = (req, res, next) => {
  const validationErrors = validationResult(req);

  if (validationErrors.isEmpty()) {
    return next();
  }
  res.status(422).send({ validationErrors: validationErrors.array() });
};

export default validateRequest;