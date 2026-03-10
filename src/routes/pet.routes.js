const express = require("express");
const router = express.Router();
const petController = require("../controllers/pet.controller");
const { verifyToken } = require("../middlewares/auth.middleware");

router.post("/", verifyToken, petController.addPet);

router.get("/", verifyToken, petController.getAllPets);

router.get("/nearby", verifyToken, petController.getNearbyPets);

router.put("/approve/:id", verifyToken, petController.approvePet);

router.get("/:id", verifyToken, petController.getPetById);

router.put("/:id", verifyToken, petController.updatePet);

router.delete("/:id", verifyToken, petController.deletePet);

module.exports = router;
