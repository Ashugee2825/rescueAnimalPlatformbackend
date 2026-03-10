const express = require("express");
const router = express.Router();
const supportController = require("../controllers/support.controller");
const { verifyToken } = require("../middlewares/auth.middleware");

router.post("/", verifyToken, supportController.createTicket);
router.get("/", verifyToken, supportController.getTickets);

module.exports = router;
