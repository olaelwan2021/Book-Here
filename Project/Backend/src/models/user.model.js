import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import crypto from 'crypto';

const userSchema = new mongoose.Schema({
    avatar: {
        type: String,
        default: 'default-avatar.jpg'
    },
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true
    },
    password: {
        type: String,
        required: true,
        select: false
    },
    role: {
        type: String,
        enum: ['user', 'admin'],
        default: 'user'
    },

    refreshToken: {
        type: String,
        default: null
    },

    resetPasswordToken: String,
    resetPasswordExpire: Date

}, { timestamps: true });


 
userSchema.pre("save", async function(next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});


 
userSchema.methods.matchPassword = async function (password) {
    return await bcrypt.compare(password, this.password);
};



userSchema.methods.getResetPasswordToken = function () {
  const resetCode = Math.floor(100000 + Math.random() * 900000).toString();

  this.resetPasswordToken = resetCode;
  this.resetPasswordExpire = Date.now() + 10 * 60 * 1000;

  return resetCode;
};


const User = mongoose.model('User', userSchema);
export default User;
