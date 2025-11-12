import { CustomError } from "../middlewares/errorHandler.js";
import User from "../models/user.model.js";

export const getUsers = async (req, res) => {
    const users = await User.find().select("-password -refreshToken");
    return res.status(200).json(users);
}

export const getUserById = async (req, res) => {
    const { id } = req.params;
    const user = await User.findById(id).select("-password -refreshToken");
    if (!user) {
        throw new CustomError("User not found", 404);
    }
    return res.status(200).json(user);
}

export const createUser = async (req, res) => {
    const { name, email, password, role } = req.body;
    const avatar = req.file ? req.file.filename : 'default-avatar.jpg';

    const existingUser = await User.findOne({ email });
    if (existingUser) {
        throw new CustomError("Email already in use", 400);
    }
    const user = new User({ name, email, password, role: role || 'user', avatar });
    await user.save();
    return res.status(201).json({
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        avatar: user.avatar,
    });
}

export const updateUser = async (req, res) => {
    const { id } = req.params;
    const updateData = req.body;
    try {
        const updatedUser = await User.findByIdAndUpdate(id, updateData, { new: true }).select("-password -refreshToken");
        if (!updatedUser) {
            throw new CustomError("User not found", 404);
        }
        return res.status(200).json(updatedUser);
    } catch (error) {
        throw new CustomError("Error updating user", 400);
    }
};

export const deleteUser = async (req, res) => {
    const { id } = req.params;
    try {
        const user = await User.findByIdAndDelete(id);
        if (!user) {
            throw new CustomError("User not found", 404);
        }
        return res.status(200).json({ message: "User deleted successfully" });
    } catch (error) {
        throw new CustomError("Error deleting user", 400);
    }
};