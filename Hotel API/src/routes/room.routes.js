import { Router } from "express";
import {
  getRooms,
  getRoomById,
  createRoom,
  updateRoom,
  deleteRoom,
} from "../controllers/room.controller.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";
import { adminMiddleware } from "../middlewares/admin.middleware.js";
import { validationResult } from "express-validator";
import { CustomError } from "../middlewares/errorHandler.js";
import {roomValidator, updateRoomValidator} from "../validations/room.validation.js";
import upload from "../middlewares/upload.js";

const roomsRouter = Router();

const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    throw new CustomError(errors.array()[0].msg, 400);
  }
  next();
};

roomsRouter.get("/", authMiddleware, getRooms);
roomsRouter.get("/:id", authMiddleware, getRoomById);
roomsRouter.post("/", authMiddleware, adminMiddleware,upload.array('images',5),roomValidator,validate, createRoom);
roomsRouter.put("/:id", authMiddleware, adminMiddleware,updateRoomValidator,validate, updateRoom);
roomsRouter.delete("/:id", authMiddleware, adminMiddleware, deleteRoom);


export default roomsRouter;
