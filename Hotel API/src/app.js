import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import authRouter from "./routes/auth.routes.js";
import cookieParser from "cookie-parser";
import roomsRouter from "./routes/room.routes.js";
import bookingRouter from "./routes/booking.routes.js";
import reviewRouter from "./routes/review.route.js";
import hotelRouter from "./routes/hotel.route.js";
import { CustomError } from "./middlewares/errorHandler.js";
import userRouter from "./routes/user.route.js";

dotenv.config();
connectDB();

const app = express();


app.use(cors());
app.use(express.json());
app.use(cookieParser())
app.use(express.urlencoded({ extended: true }));
app.use('/uploads', express.static('uploads'));



app.get("/", (req, res) => {
    res.send("Hotel Booking API is running");
});

app.use("/api/v1/auth", authRouter);
app.use("/api/v1/rooms", roomsRouter);
app.use("/api/v1/bookings", bookingRouter);
app.use("/api/v1/reviews", reviewRouter);
app.use("/api/v1/hotel/info", hotelRouter);
app.use("/api/v1/users", userRouter);

app.use((req, res) => {
    throw new CustomError("Route not found", 404);
});


app.use((err, req, res, next) => {
    console.error("Error:", err);
    const statusCode = err.statusCode || 500;
    res.status(statusCode).json({
        success: err.success || false,
        message: err.message || "Internal Server Error",
    });
});

export default app;
