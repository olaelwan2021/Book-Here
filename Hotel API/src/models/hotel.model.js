import mongoose from "mongoose";

const hotelSchema = new mongoose.Schema(
{
  name: String,
  description: String,
  location: String,
  contactEmail: String,
  phone: String,
  images: [String],
  facilities: [String],
}    
,{timestamps:true})

const Hotel = mongoose.model('Hotel', hotelSchema)

export default Hotel