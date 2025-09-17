const express = require("express");
const router = express.Router();
const { signup, login } = require("../controllers/authController");
const { verifyEmail } = require("../controllers/verifyemailController");
router.post("/signup", signup);

// Verify OTP
router.post("/verify-email", verifyEmail);

// Login
router.post("/login", login);

module.exports = router;
