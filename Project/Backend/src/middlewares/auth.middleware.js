import jwt from "jsonwebtoken";
import { CustomError } from "./errorHandler.js";
import User from "../models/user.model.js"



export const authMiddleware = async (req, res, next) => {
  try {
    const { authorization } = req.headers;
    if (!authorization || !authorization.startsWith("Bearer ")) {
      throw new CustomError("User must be logged in", 401);
    }

    const token = authorization.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const user = await User.findById(decoded.id);
    if (!user) throw new CustomError("User not found", 404);

    req.user = user;
    next();
  } catch (err) {
    next(new CustomError(err.message || "Authentication failed", 401));
  }
};
