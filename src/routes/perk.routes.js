const express = require("express");
const router = express.Router();

const perkController = require("../controllers/perk.controller");
const { verifyToken } = require("../middlewares/auth.middleware");

// src/routes/perk.routes.js

// Create Perk (Venue/Admin)
router.post("/", verifyToken, perkController.createPerk);

// Get all perks
router.get("/", verifyToken, perkController.getAllPerks);

// Get single perk
router.get("/:id", verifyToken, perkController.getPerkById);

// Update perk
router.put("/:id", verifyToken, perkController.updatePerk);

// Delete perk
router.delete("/:id", verifyToken, perkController.deletePerk);

// Redeem perk
router.post("/redeem", verifyToken, perkController.redeemPerk);

module.exports = router;
