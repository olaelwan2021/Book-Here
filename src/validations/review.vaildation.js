import { body } from "express-validator";

export const reviewValidator = [
  body('rating')
    .notEmpty()
    .withMessage('Rating is required')
    .isInt({ min: 1, max: 5 })
    .withMessage('Rating must be an integer between 1 and 5'),
    body('comment')
    .optional()
    .trim()
];