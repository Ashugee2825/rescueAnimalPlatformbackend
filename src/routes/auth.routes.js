const express = require("express");
const router = express.Router();

const authController = require("../controllers/auth.controller");
const authMiddleware = require("../middlewares/auth.middleware");

// src/routes/auth.routes.js
router.post("/register", authController.register);
router.post("/login", authController.login);
router.get("/verify/:token", authController.verifyEmail);

router.post("/forgot-password", authController.forgotPassword);
router.post("/reset-password", authController.resetPassword);

router.post("/refresh-token", authController.refreshToken);


/* AUTHENTICATED USER */
router.post("/logout", authMiddleware.authenticate, authController.logout);
router.get("/profile", authMiddleware.authenticate, authController.profile);
router.post("/change-password", authMiddleware.authenticate, authController.changePassword);

router.post("/verify-otp", authController.verifyOTP);

module.exports = router;
