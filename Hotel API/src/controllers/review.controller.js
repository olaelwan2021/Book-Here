import { CustomError } from "../middlewares/errorHandler.js";
import Review from "../models/review.model.js";
import Room from "../models/room.model.js";

export const createReview = async (req, res) => {
  try {
    const { roomId, userId, rating, comment } = req.body;

    const room = await Room.findById(roomId);
    if (!room) {
      throw new CustomError("Room not found", 404);
    }

    const existingReview = await Review.findOne({ roomId, userId });
    if (existingReview) {
      throw new CustomError("You already reviewed this room", 400);
    }

    const newReview = new Review({
      roomId,
      userId,
      rating: Number(rating),
      comment: comment?.trim() || "",
    });

    await newReview.save();

    const reviews = await Review.find({ roomId });
    const avgRating =
      reviews.reduce((acc, review) => acc + review.rating, 0) / reviews.length;

    room.rating = avgRating.toFixed(1);
    await room.save();

    res.status(201).json({ message: "Review created successfully" });
  } catch (error) {
    throw new CustomError("Error creating review", 500);
  }
};

export const getReviewsByRoom = async (req, res) => {
  try {
    const { id } = req.params;
    const reviews = await Review.find({ roomId: id });
    res.status(200).json(reviews);
  } catch (error) {
    throw new CustomError("Error fetching reviews", 500);
  }
};

export const deleteReview = async (req, res) => {
  try {
    const { id } = req.params;
    const review = await Review.findByIdAndDelete(id);
    if (!review) {
      return res.status(404).json({ message: "Review not found" });
    }
    res.status(200).json({ message: "Review deleted successfully" });
  } catch (error) {
    throw new CustomError("Error deleting review", 500);
  }
};
