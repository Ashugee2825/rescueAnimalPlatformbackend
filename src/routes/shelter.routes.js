const express = require("express");
const router = express.Router();

const shelterController = require("../controllers/shelter.controller");

const { verifyToken } = require("../middlewares/auth.middleware");

// CRUD
router.post("/", verifyToken, shelterController.createShelter);
router.get("/", verifyToken, shelterController.getAllShelters);
router.get("/:id", verifyToken, shelterController.getShelterById);
router.put("/:id", verifyToken, shelterController.updateShelter);
router.delete("/:id", verifyToken, shelterController.deleteShelter);

// Analytics
router.get(
  "/analytics/:id",
  verifyToken,
  shelterController.getShelterAnalytics,
);

module.exports = router;
