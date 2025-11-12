import jwt from "jsonwebtoken";
import { CustomError } from "./errorHandler.js";

export function authMiddleware(req, res, next) {
  const authHeader = req.headers["authorization"];
  if (!authHeader) throw new CustomError("No token provided", 401);

  const token = authHeader.split(" ")[1];
  if (!token) throw new CustomError("Token missing", 401);

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    throw new CustomError("Invalid token", 401);
  }
}
