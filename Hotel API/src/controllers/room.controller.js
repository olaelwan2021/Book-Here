import { CustomError } from "../middlewares/errorHandler.js";
import Room from "../models/room.model.js";



export const getRooms = async (req, res) => {
  const { minPrice, maxPrice } = req.query;
  const filters = {};
  if (minPrice || maxPrice) filters.price = {};
  if (minPrice) filters.price.$gte = Number(minPrice);
  if (maxPrice) filters.price.$lte = Number(maxPrice);
  const page = Number(req.query.page) || 1;
  const limit = Number(req.query.limit) || 10;
  const skip = (page - 1) * limit;
  try {
    const rooms = await Room.find(filters).skip(skip).limit(limit);
    res.status(200).json({ success: true, count: rooms.length, data: rooms });
  } catch (error) {
    throw new CustomError("Error fetching rooms", 500);
  }
};


export const getRoomById = async (req, res) => {
  const { id } = req.params
  try {
    const room = await Room.findById(id);
    if (!room) return res.status(404).json({ message: "Room not found" });
    res.status(200).json(room);
  } catch (error) {
    throw new CustomError("Error fetching room", 500);
  }
};
 
export const createRoom = async (req, res) => {
  const images = req.files ? req.files.map(file => file.filename) : [];
  req.body.images = images;
  try {
    const room = new Room(req.body);
    await room.save();
    res.status(201).json(room);
  } catch (error) {
    throw new CustomError("Error creating room", 500);
  }
};

 
export const updateRoom = async (req, res) => {
  const { id } = req.params
  try {
    const room = await Room.findByIdAndUpdate(id, req.body, { new: true });
    if (!room) throw new CustomError("Room not found", 404);
    res.status(200).json({ message: "Room updated successfully", room });
  } catch (error) {
    throw new CustomError("Error updating room", 500);
  }
};
 
export const deleteRoom = async (req, res) => {
  const { id } = req.params
  try {
    const room = await Room.findByIdAndDelete(id);
    if (!room) throw new CustomError("Room not found", 404);
    res.status(200).json({ message: "Room deleted successfully" });
  } catch (error) {
    throw new CustomError("Error deleting room", 500);
  }
};
