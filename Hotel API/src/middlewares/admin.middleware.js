import { CustomError } from "./errorHandler.js";

export function adminMiddleware(req, res, next) {
  if (!req.user) {
    throw new CustomError("Unauthorized access", 401);
  }

  if (req.user.role !== "admin") {
    throw new CustomError("Admins only", 403);
  }

  next();
}
