const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
      trim: true,
    },
    lastName: {
      type: String,
      required: true,
      trim: true,
    },

    email: {
      type: String,
      required: true,
      trim: true,
      unique: true,        // 1 email = 1 user
      lowercase: true,
    },

    password: {
      type: String,
      required: true,
    },

    // ---- Email Verification Fields ----
    isVerified: {
      type: Boolean,
      default: false,       // default false, after OTP verify = true
    },
    otp: {
      type: String,         // store hashed OTP if possible
    },
    otpExpires: {
      type: Date,           // expiry time for OTP
    },

    // Profile photo or avatar (optional)
    image: {
      type: String,
    },

    // Agar aapko reset-password functionality bhi chahiye
    resetToken: {
      type: String,
    },
    resetTokenExpires: {
      type: Date,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);
