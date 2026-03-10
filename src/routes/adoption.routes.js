const express = require("express");
const router = express.Router();
const adoptionController = require("../controllers/adoption.controller");
const { verifyToken } = require("../middlewares/auth.middleware");

router.post("/", verifyToken, adoptionController.requestAdoption);
router.put("/:id/approve", verifyToken, adoptionController.approveAdoption);

module.exports = router;
