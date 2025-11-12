import { CustomError } from "../middlewares/errorHandler.js";
import Hotel from "../models/hotel.model.js";

export const getHotelInfo = async (req, res) => {
    const hotelInfo = await Hotel.find();
    return res.status(200).json(hotelInfo);
};

export const updateHotelInfo = async (req, res, next) => {
  const { id } = req.params;
  const updateData = req.body;
  const images = req.files ? req.files.map(file => file.filename) : [];

  try {
    const existingHotel = await Hotel.findById(id);
    if (!existingHotel) {
      return next(new CustomError("Hotel not found", 404));
    }

    const updatedHotel = await Hotel.findByIdAndUpdate(
      id,
      {
        ...updateData,
        ...(images.length > 0 && { images: [...existingHotel.images, ...images] }),
      },
      { new: true }
    );

    return res.status(200).json({
      message: "Hotel info updated successfully",
      hotel: updatedHotel,
    });
  } catch (error) {
    console.error(error);
    return next(new CustomError("Error updating hotel info", 500));
  }
};