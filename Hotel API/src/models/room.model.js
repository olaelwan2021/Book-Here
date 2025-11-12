import mongoose from "mongoose";

const roomSchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String },
    capacity: { type: Number, default: 1 },
    price: { type: Number, required: true },
    currency: { type: String, default: "EGP" },
    images: [String],
    available: { type: Boolean, default: true },
    amenities: [String]
},{timestamps:true})

const Room = mongoose.model('Room', roomSchema)

export default Room