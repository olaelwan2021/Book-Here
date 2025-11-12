import { Router } from "express";
import {
  register,
  login,
  logout,
  profile,
  updateProfile,
  forgotPassword,
  resetPassword,
  refreshToken
} from "../controllers/auth.controller.js";

import { validationResult } from "express-validator";
import {authMiddleware} from "../middlewares/auth.middleware.js"
import { registerValidator, loginValidator, profileValidator } from "../validations/auth.validation.js";
import upload from "../middlewares/upload.js";
import { CustomError } from "../middlewares/errorHandler.js";

const authRouter = Router();


const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    throw new CustomError(errors.array()[0].msg, 400);
  }
  next();
};


authRouter.post("/register",upload.single('avatar'), registerValidator, validate, register);
authRouter.post("/login", loginValidator, validate, login);
authRouter.post("/logout", authMiddleware, logout);
authRouter.post("/refresh-token",authMiddleware, refreshToken);

authRouter.get("/profile", authMiddleware, profile);
authRouter.put("/profile", authMiddleware, profileValidator, validate, updateProfile);

authRouter.post("/forgot-password", forgotPassword);
authRouter.post("/reset-password/:token", resetPassword);

export default authRouter;
