import { body } from "express-validator";

const hotelValidator = [
  body('name')
  .optional()
    .notEmpty()
    .withMessage('Hotel name is required')
    .isString()
    .withMessage('Hotel name must be a string'),
    body('description')
    .optional()
    .notEmpty()
    .withMessage('Description is required')
    .isString()
    .withMessage('Description must be a string'),
    body('location')
    .optional()
    .notEmpty()
    .withMessage('Location is required')
    .isString()
    .withMessage('Location must be a string'),
    body('contactEmail')
    .optional()
    .notEmpty()
    .withMessage('Contact email is required')
    .isEmail()
    .withMessage('Invalid email format'),
    body('phone')
    .optional()
    .notEmpty()
    .withMessage('Phone number is required')
    .isString()
    .withMessage('Phone number must be a string'),
];

export default hotelValidator;