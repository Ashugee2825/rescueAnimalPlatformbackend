//  USERS TABLE (All Roles) Roles: RRADMIN,ADMIN ,SHELTER,FOSTER,VOLUNTEER,ADOPTER,VENUE_PARTNER

const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { v4: uuidv4 } = require("uuid");
const User = require("../models/user.model");
const emailService = require("../services/email.service");
const generateTokens = require("../utils/generateTokens");
const jwtConfig = require("../config/jwt");

// controllers/auth.controller.js

// const {
//   generateAccessToken,
//   generateRefreshToken,
// } = require("../utils/generateTokens.js");

/*
  Validation helpers (basic learning purpose)
*/
const validateEmail = (email) => {
  return /^\S+@\S+\.\S+$/.test(email);
};

const validatePhone = (phone) => {
  return /^[0-9]{10}$/.test(phone);
};

// REGISTER AUTH CONTROLLER (REGISTER = SIGNUP)
exports.register = async (req, res) => {
  try {
    console.log("Register API hit");
    console.log("Admin:req .user ", req.user); // decoded token
    console.log("ADMIN REGISTER PAYLOAD:", req.body);
    console.log("Register request received");

    const { email, password, role, first_name, last_name, phone } = req.body;
    // Basic validations
    if (!validateEmail(email))
      return res.status(400).json({ message: "Invalid Email" });

    if (!validatePhone(phone))
      return res.status(400).json({ message: "Invalid Phone Number" });

    if (!first_name || !last_name)
      return res.status(400).json({ message: "First & Last name required" });

    const allowedRoles = ["ADOPTER"];

    if (!allowedRoles.includes(role)) {
      return res.status(403).json({
        message: "Invalid role selection",
      });
    } //Admin roles should only be created via invite system.

    // 2️ Check existing user
    const existingUser = await User.findOne({ where: { email } });

    if (existingUser) {
      console.error("REGISTER ERROR: User already exists");
      return res.status(409).json({ message: "User already exists" });
    } // //409 = Conflict

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      id: uuidv4(),
      email,
      password: hashedPassword,
      role,
      first_name,
      last_name,
      phone,
      is_verified: false,
      one_time_pin: Math.floor(100000 + Math.random() * 900000).toString(),
      otp_expiry: new Date(Date.now() + 30 * 60 * 1000), // 30 mins from now
    });

    console.log("User Registered Successfully", user.email, user.role, user.id);

    res.status(201).json({
      success: true,
      message: "User Registered",
      data: user,
    });
  } catch (error) {
    console.error("Register Error:", error.message);
    res.status(500).json({
      success: false,
      message: "Registration Failed",
      error: error.message,
    });
  }
};

// LOGIN  WITH ACCESS + REFRESH TOKEN
exports.login = async (req, res) => {
  try {
    console.log("Login API Hit");

    const { email, password } = req.body;

    if (!email || !password) {
      // Validate Input
      console.error("Missing email or password"); // want to show in logs
      return res.status(400).json({
        message: "Email and password required that you want to provide",
      });
    }

    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const { accessToken, refreshToken } = generateTokens(user);

    // // Access Token (15min)
    // const accessToken = jwt.sign(
    //   { id: user.id, role: user.role },
    //   process.env.JWT_ACCESS_SECRET,
    //   { expiresIn: process.env.ACCESS_EXPIRES },
    // );

    // // Refresh Token (1 day)
    // const refreshToken = jwt.sign(
    //   { id: user.id },
    //   process.env.JWT_REFRESH_SECRET,
    //   { expiresIn: process.env.REFRESH_EXPIRES },
    // );

    user.refreshToken = refreshToken;
    await user.save();

    // 4 Send response with tokens and user info (except password)
    res.json({
      success: true,
      accessToken,
      refreshToken,
      user: {
        id: user.id,
        email: user.email,
        role: user.role,
        first_name: user.first_name,
        last_name: user.last_name,
        phone: user.phone,
        is_verified: user.is_verified,
      },
    });
  } catch (error) {
    console.error("Login Error:", error.message);
    res.status(500).json({
      success: false,
      message: "LOGIN Failed",
      error: error.message,
    });
  }
};

exports.verifyEmail = async (req, res) => {
  try {
    console.log("Verify Email API");

    const { token } = req.params;

    const decoded = jwt.verify(token, process.env.JWT_ACCESS_SECRET);

    const user = await User.findByPk(decoded.id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    user.is_verified = true;
    await user.save();

    res.json({ message: "Email verified successfully" });
  } catch (error) {
    console.error("Verify Email Error:", error.message);
    res.status(400).json({ message: "Invalid or Expired Token" });
  }
};


// REFRESH TOKEN API CONTROLLER
exports.refreshToken = async (req, res) => {
  try {
    console.log("REFRESH HIT");
    const { refreshToken } = req.body;
    if (!refreshToken) {
      return res.status(400).json({ message: "Refresh Token Required" });
    }

    const decoded = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET);
    const user = await User.findByPk(decoded.id);
    if (!user) {
      return res
        .status(404)
        .json({ message: "User not found & Token expired" });
    }

    const newAccessToken = jwt.sign(
      { id: user.id, role: user.role },
      process.env.JWT_ACCESS_SECRET,
      { expiresIn: process.env.ACCESS_EXPIRES },
    );
    res.json({ accessToken: newAccessToken });
  } catch (error) {
    console.error("Refresh Token Error:", error.message);
    res.status(401).json({ message: "Invalid or Expired Refresh Token" });
  }
};

// USER PROFILE API  PROFILE

exports.profile = async (req, res) => {
  const user = await User.findByPk(req.user.id, {
    attributes: { exclude: ["password", "refreshToken"] },
  });
  res.json(user);
};

// POST /auth/logout
exports.logout = async (req, res) => {
  try {
    // For JWT, we can't truly "logout" on the server side without a token blacklist.
    // But we can instruct the client to delete the token.
    res.json({ message: "Logged out successfully" });
  } catch (error) {
    console.error("Logout Error:", error.message);
    res.status(500).json({ message: "Logout Failed", error: error.message });
  }
};

// CHANGE PASSWORD API
exports.changePassword = async (req, res) => {
  try {
    const { oldPassword, newPassword } = req.body;

    const user = await User.findByPk(req.user.id);

    const isMatch = await bcrypt.compare(oldPassword, user.password);

    if (!isMatch)
      return res.status(400).json({ message: "Old password incorrect" });

    user.password = await bcrypt.hash(newPassword, 10);
    await user.save();

    res.json({ message: "Password changed successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;

    const user = await User.findOne({ where: { email } });

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    const token = jwt.sign({ id: user.id }, process.env.JWT_ACCESS_SECRET, {
      expiresIn: "15m",
    });

    // Normally send via email
    const resetLink = `http://localhost:3000/reset-password/${token}`;
    // but my local host port 5000 any issue check

    console.log("Password Reset Link:", resetLink);

    res.json({
      message: "Password reset link generated",
      resetLink,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

exports.resetPassword = async (req, res) => {
  try {
    const { token, newPassword } = req.body;

    const decoded = jwt.verify(token, process.env.JWT_ACCESS_SECRET);

    const user = await User.findByPk(decoded.id);

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);

    user.password = hashedPassword;

    await user.save();

    res.json({
      message: "Password reset successful",
    });
  } catch (error) {
    res.status(400).json({
      message: "Invalid or expired token",
    });
  }
};
// Email OTP Verification (Better than JWT Email Verify)

exports.verifyOTP = async (req, res) => {
  const { email, otp } = req.body;

  const user = await User.findOne({ where: { email } });

  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  if (user.one_time_pin !== otp) {
    return res.status(400).json({ message: "Invalid OTP" });
  }

  if (new Date() > user.otp_expiry) {
    return res.status(400).json({ message: "OTP expired" });
  }

  user.is_verified = true;
  user.one_time_pin = null;
  user.otp_expiry = null;

  await user.save();

  res.json({ message: "Account verified" });
};