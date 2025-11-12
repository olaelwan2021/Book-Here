import { body } from "express-validator";

export const bookingValidator = [
  body('checkIn')
    .notEmpty()
    .withMessage('Check-in date is required')
    .isISO8601()
    .toDate()
    .withMessage('Invalid check-in date format'),
  body('checkOut')
    .notEmpty()
    .withMessage('Check-out date is required')
    .isISO8601()
    .toDate()
    .withMessage('Invalid check-out date format'),

]

export const updateBookingValidator = [
  body('checkIn')
    .optional()
    .isISO8601()
    .toDate()
    .withMessage('Invalid check-in date format'),
  body('checkOut')
    .optional()
    .isISO8601()
    .toDate()
    .withMessage('Invalid check-out date format'),
  body('totalPrice')
    .optional()
    .isFloat({ gt: 0 })
    .withMessage('Total price must be a positive number'),
  body('price')
    .optional()
    .isFloat({ gt: 0 })
    .withMessage('Price must be a positive number'),
  body('status')
    .optional()
    .isIn(['pending', 'confirmed', 'cancelled'])
    .withMessage("Status must be either 'pending', 'confirmed', or 'cancelled'"),
];
