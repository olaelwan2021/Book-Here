import { Router } from "express";
import { createBooking, deleteBooking, getBookingById, getBookingByUserId, getBookings, updateBooking } from "../controllers/booking.controller.js";
import { validationResult } from "express-validator";
import { CustomError } from "../middlewares/errorHandler.js";
import { bookingValidator, updateBookingValidator } from "../validations/booking.validation.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";
import { adminMiddleware } from "../middlewares/admin.middleware.js";


const bookingRouter = Router();

const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    throw new CustomError(errors.array()[0].msg, 400);
  }
  next();
};

bookingRouter.get("/",authMiddleware,adminMiddleware, getBookings);
bookingRouter.get("/:id",authMiddleware,adminMiddleware, getBookingById);
bookingRouter.get("/me/:id",authMiddleware, getBookingByUserId);
bookingRouter.post("/",bookingValidator,validate,authMiddleware, createBooking);
bookingRouter.put("/:id",updateBookingValidator,validate,authMiddleware, updateBooking);
bookingRouter.delete("/:id",authMiddleware, deleteBooking);


export default bookingRouter;
