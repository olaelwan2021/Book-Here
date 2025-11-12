import { CustomError } from "../middlewares/errorHandler.js";
import Booking from "../models/booking.model.js";
import Room from "../models/room.model.js";


export const getBookings = async (req, res) => {
  try {
    const bookings = await Booking.find().populate("roomId");
    res.status(200).json(bookings);
  } catch (error) {
    res.status(500).json({ message: "Error fetching bookings", error: error.message });
  }
};

export const getBookingByUserId = async (req, res) => {
  try {
    const bookings = await Booking.find({ userId: req.user._id }).populate("room");
    res.status(200).json(bookings);
  } catch (error) {
    throw new CustomError("Error fetching bookings for user", 500);
  }
};


export const getBookingById = async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id).populate("room");
    if (!booking) return res.status(404).json({ message: "Booking not found" });
    res.status(200).json(booking);
  } catch (error) {
    throw new CustomError("Error fetching booking", 500);
  }
};


export const createBooking = async (req, res, next) => {
  try {
    const { userId, roomId, guests, checkIn, checkOut } = req.body;
    const room = await Room.findById(roomId);
    if (!room) {
      throw new CustomError("Room not found", 404);
    }

    const checkInDate = new Date(checkIn);
    const checkOutDate = new Date(checkOut);

    if (checkOutDate <= checkInDate) {
      throw new CustomError("Check-out date must be after check-in date", 400);
    }

    if (room.capacity < guests) {
      throw new CustomError("Number of guests exceeds room capacity", 400);
    }

    const nights = Math.ceil((checkOutDate - checkInDate) / 1000 * 60 * 60 * 24);
    const totalPrice = room.price * guests * nights;

    const booking = new Booking({
      userId,
      roomId,
      guests,
      checkIn: checkInDate,
      checkOut: checkOutDate,
      totalPrice,
    });

    await booking.save();
    room.available = false;
    await room.save();

    res.status(201).json({ success: true, booking });
  } catch (error) {
    next(new CustomError(error.message || "Error creating booking", 500));
  }
};


export const updateBooking = async (req, res) => {
  try {
    const booking = await Booking.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!booking) return res.status(404).json({ message: "Booking not found" });
    res.status(200).json(booking);
  } catch (error) {
    throw new CustomError("Error updating booking", 500);
  }
};


export const deleteBooking = async (req, res) => {
  try {
    const booking = await Booking.findByIdAndDelete(req.params.id);
    if (!booking) return res.status(404).json({ message: "Booking not found" });

    await Room.findByIdAndUpdate(booking.room, { status: "available" });

    res.status(200).json({ message: "Booking deleted successfully" });
  } catch (error) {
    throw new CustomError("Error deleting booking", 500);
  }
};
