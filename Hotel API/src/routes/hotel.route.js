import { Router } from "express";
import {  getHotelInfo, updateHotelInfo } from "../controllers/hotel.controller.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";
import { adminMiddleware } from "../middlewares/admin.middleware.js";
import upload from "../middlewares/upload.js";
import { validationResult } from "express-validator";
import { CustomError } from "../middlewares/errorHandler.js";
import hotelValidator from "../validations/hotel.validation.js";

const hotelRouter = Router();

const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    throw new CustomError(errors.array()[0].msg, 400);
  }
  next();
};

hotelRouter.get("/", getHotelInfo)
hotelRouter.put("/:id",authMiddleware,adminMiddleware,upload.array('images',5),hotelValidator,validate, updateHotelInfo)


export default hotelRouter;