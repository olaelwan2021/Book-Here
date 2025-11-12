import { Router } from "express";
import { createUser, deleteUser, getUserById, getUsers, updateUser } from "../controllers/user.controller.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";
import { adminMiddleware } from "../middlewares/admin.middleware.js";
import upload from "../middlewares/upload.js";
import { validationResult } from "express-validator";
import { CustomError } from "../middlewares/errorHandler.js";
import { updateUserValidator, userValidator } from "../validations/user.validation.js";

const userRouter = Router();

const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    throw new CustomError(errors.array()[0].msg, 400);
  }
  next();
};

userRouter.get('/',authMiddleware,adminMiddleware, getUsers);
userRouter.get('/:id',authMiddleware,adminMiddleware, getUserById);
userRouter.post('/',upload.single('avatar'),authMiddleware,adminMiddleware,userValidator,validate, createUser);
userRouter.put('/:id',upload.single('avatar'),authMiddleware,adminMiddleware,updateUserValidator,validate, updateUser);
userRouter.delete('/:id',authMiddleware,adminMiddleware, deleteUser);

export default userRouter;