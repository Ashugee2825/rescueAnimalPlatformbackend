const express = require("express");
const router = express.Router();

const walletController = require("../controllers/wallet.controller");
const { verifyToken } = require("../middlewares/auth.middleware");
// src/routes/wallet.routes.js

router.get("/", verifyToken, walletController.getWallet);
router.post("/topup", verifyToken, walletController.topupWallet);
router.post(
  "/payment-intent",
  verifyToken,
  walletController.createPaymentIntent,
);

module.exports = router;
