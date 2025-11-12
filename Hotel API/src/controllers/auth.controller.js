import jwt from "jsonwebtoken";
import crypto from "crypto";
import User from "../models/user.model.js";
import { CustomError } from "../middlewares/errorHandler.js";
import sendEmail from "../utils/sendEmail.js";


const generateTokens = (user) => {
  const accessToken = jwt.sign(
    { id: user._id, role: user.role },
    process.env.JWT_SECRET,
    { expiresIn: "1h" }
  );

  const refreshToken = jwt.sign(
    { id: user._id },
    process.env.REFRESH_TOKEN_SECRET,
    { expiresIn: "7d" }
  );

  return { accessToken, refreshToken };
};

 
export const register = async (req, res) => {
  const { name, email, password } = req.body;
  const avatar = req.file ? req.file.filename : 'default-avatar.jpg';

  const existingUser = await User.findOne({ email });
  if (existingUser) {
    throw new CustomError("Email already in use", 400);
  }

  const user = new User({ name, email, password,role:'user', avatar });
  await user.save();

  const { accessToken, refreshToken } = generateTokens(user);
  user.refreshToken = refreshToken;
  await user.save();

  
  const welcomeMessage = `
    <h2>Welcome, ${user.name}</h2>
    <p>Your account has been created successfully.</p>
    <p>You can now log in and start using our app.</p>
    <br/>
    <p>Best regards,<br/>The Support Team</p>
  `;

  try {
    await sendEmail({
      email: user.email,
      subject: "Welcome to Our Website",
      message: welcomeMessage,
    });
  } catch (error) {
    throw new CustomError("Error sending welcome email", 500);
  }

  res.cookie("refreshToken", refreshToken, {
    httpOnly: true,
    secure: false,
    sameSite: "strict",
    maxAge: 7 * 24 * 60 * 60 * 1000,
  });

  return res.status(201).json({
    user,
    accessToken,
  });
};


 
export const login = async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email }).select("+password");

  if (!user || !(await user.matchPassword(password))) {
    throw new CustomError("Invalid email or password", 400);
  }

  const { accessToken, refreshToken } = generateTokens(user);
  user.refreshToken = refreshToken;
  await user.save();

 
  const loginMessage = `
    <h2>Hello, ${user.name}</h2>
    <p>You just logged into your account successfully.</p>
    <p>If this wasn't you, please reset your password immediately.</p>
  `;

  try {
    await sendEmail({
      email: user.email,
      subject: "Login Notification",
      message: loginMessage,
    });
  } catch (error) {
    throw new CustomError("Error sending login email", 500);
  }

  res.cookie("refreshToken", refreshToken, {
    httpOnly: true,
    secure: false,
    sameSite: "strict",
    maxAge: 7 * 24 * 60 * 60 * 1000,
  });

  return res.status(200).json({ user, accessToken });
};

 
export const profile = async (req, res) => {
  const user = await User.findById(req.user.id).select("-password");
  return res.status(200).json(user);
};

 
export const updateProfile = async (req, res) => {
  const user = await User.findById(req.user.id).select("+password");
  const avatar = req.file ? req.file.filename : 'default-avatar.jpg';
  if (!user) throw new CustomError("User not found", 404);

  user.name = req.body.name || user.name;
  user.email = req.body.email || user.email;
  user.avatar = avatar || user.avatar;
  if (req.body.password) user.password = req.body.password;

  const updatedUser = await user.save();

  res.status(200).json({
    id: updatedUser._id,
    name: updatedUser.name,
    email: updatedUser.email,
    role: updatedUser.role,
    avatar: updatedUser.avatar,
  });
};


export const logout = async (req, res) => {
  const refreshToken = req.cookies.refreshToken;
  if (refreshToken) {
    const user = await User.findOne({ refreshToken });
    if (user) {
      user.refreshToken = null;
      await user.save();
    }
  }

  res.clearCookie("refreshToken");
  res.json({ message: "User logged out successfully" });
};


export const forgotPassword = async (req, res) => {
  const { email } = req.body;

  const user = await User.findOne({ email });
  if (!user) {
    throw new CustomError("User not found with this email", 404);
  }

  const resetToken = user.getResetPasswordToken();
  await user.save({ validateBeforeSave: false });

  const resetUrl = `${req.protocol}://${req.get(
    "host"
  )}/api/v1/auth/reset-password/${resetToken}`;

  const message = `
    <h3>Hello, ${user.name}</h3>
    <p>You requested to reset your password. Click the link below:</p>
    <a href="${resetUrl}" target="_blank">Reset Password</a>
    <p>This link will expire in 10 minutes.</p>
  `;

  try {
    await sendEmail({
      email: user.email,
      subject: "Password Reset Request",
      message,
    });

    res.status(200).json({ message: "Password reset email sent successfully" });
  } catch (error) {
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;
    await user.save({ validateBeforeSave: false });
    throw new CustomError("Email could not be sent", 500);
  }
};



export const resetPassword = async (req, res) => {
  const resetPasswordToken = crypto
    .createHash("sha256")
    .update(req.params.token)
    .digest("hex");

  const user = await User.findOne({
    resetPasswordToken,
    resetPasswordExpire: { $gt: Date.now() },
  });

  if (!user) {
    throw new CustomError("Invalid or expired reset token", 400);
  }

  user.password = req.body.password;
  user.resetPasswordToken = undefined;
  user.resetPasswordExpire = undefined;
  await user.save();

  res.status(200).json({ message: "Password reset successful" });
};



export const refreshToken = async (req, res) => {
  const refreshToken = req.cookies.refreshToken;
  if (!refreshToken)
    throw new CustomError("No refresh token provided", 401);

  try {
    const decoded = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);
    const user = await User.findById(decoded.id);

    if (!user || user.refreshToken !== refreshToken)
      throw new CustomError("Invalid refresh token", 403);

    const { accessToken } = generateTokens(user);
    return res.json({ accessToken });
  } catch (err) {
    throw new CustomError("Invalid or expired refresh token");
  }
};