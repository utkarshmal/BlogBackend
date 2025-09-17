// verifyEmailController.js
const User = require("../models/User");
const OTP = require("../models/OTP");
require("dotenv").config();

exports.verifyEmail = async (req, res) => {
  try {
    const { email, otp } = req.body;

    // Get the most recent OTP for the email
    const record = await OTP.findOne({ email }).sort({ createdAt: -1 }).limit(1);
    
    if (!record || record.otp !== otp) {
      return res.status(400).json({ success: false, message: "Invalid OTP" });
    }

    // Mark user as verified
    await User.findOneAndUpdate({ email }, { verified: true });

    return res.status(200).json({ success: true, message: "Email verified successfully" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, message: "Something went wrong" });
  }
};
