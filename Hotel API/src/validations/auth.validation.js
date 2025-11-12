import { body } from "express-validator";

export const registerValidator = [
    body('name').notEmpty().withMessage('name is required').isLength({ min: 3 }).withMessage('name must be at least 3 characters'),
    body('email').isEmail().withMessage('vaild email is required'),
    body('password').isLength({ min: 6 })
        .withMessage("Password must be at least 6 characters long"),
    body('role').optional()
        .isIn(["user", "admin"])
        .withMessage("Role must be either 'user' or 'admin'"),
]

export const loginValidator = [
    body('email').isEmail().withMessage('vaild email is required'),
    body('password').notEmpty()
        .withMessage("Password is required")
]

export const profileValidator = [
    body("name").optional().isLength({ min: 3 }).withMessage("Name must be at least 3 characters"),
    body("email").optional().isEmail().withMessage("Please enter a valid email"),
    body("password")
      .optional()
      .isLength({ min: 6 })
      .withMessage("Password must be at least 6 characters long"),
]