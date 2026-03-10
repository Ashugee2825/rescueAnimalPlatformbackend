const express = require("express");
const router = express.Router();

const volunteerController = require("../controllers/volunteer.controller");
const { verifyToken } = require("../middlewares/auth.middleware");

router.get("/perks", verifyToken, volunteerController.getVolunteerPerks);

module.exports = router;
