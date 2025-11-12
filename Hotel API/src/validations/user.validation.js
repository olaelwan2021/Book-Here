import { body } from "express-validator";

export const userValidator = [
    body('name').notEmpty().withMessage('name is required').isLength({ min: 3 }).withMessage('name must be at least 3 characters'),
    body('email').isEmail().withMessage('vaild email is required'),
    body('password').isLength({ min: 6 })
        .withMessage("Password must be at least 6 characters long"),
    body('role').optional()
        .isIn(["user", "admin"])
        .withMessage("Role must be either 'user' or 'admin'"),
]

export const updateUserValidator = [
    body('name').optional().isLength({ min: 3 }).withMessage('name must be at least 3 characters'),
    body('email').optional().isEmail().withMessage('vaild email is required'),
    body('password').optional().isLength({ min: 6 })
        .withMessage("Password must be at least 6 characters long"),
    body('role').optional()
        .isIn(["user", "admin"])
        .withMessage("Role must be either 'user' or 'admin'"),
]