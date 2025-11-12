import { Router } from "express";
import { createReview, deleteReview, getReviewsByRoom } from "../controllers/review.controller.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";
import { adminMiddleware } from "../middlewares/admin.middleware.js";
import { validationResult } from "express-validator";
import { CustomError } from "../middlewares/errorHandler.js";
import { reviewValidator } from "../validations/review.vaildation.js";

const reviewRouter = Router();

const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    throw new CustomError(errors.array()[0].msg, 400);
  }
  next();
};

reviewRouter.post('/',authMiddleware,reviewValidator,validate,createReview)
reviewRouter.get('/:id',authMiddleware, getReviewsByRoom)
reviewRouter.delete('/:id',authMiddleware,adminMiddleware, deleteReview)

export default reviewRouter;