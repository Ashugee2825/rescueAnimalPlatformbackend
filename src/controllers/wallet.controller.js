const { v4: uuidv4 } = require("uuid");
const Wallet = require("../models/wallet.model");
const WalletTransaction = require("../models/walletTransaction.model");
const stripeService = require("../services/stripe.service");

// src/controllers/wallet.controller.js

// Create Wallet if not exists
exports.getWallet = async (req, res) => {
  try {
    console.log("Get Wallet API");

    let wallet = await Wallet.findOne({ where: { user_id: req.user.id } });

    // create wallet if missing
    if (!wallet) {
      wallet = await Wallet.create({
        id: uuidv4(),
        user_id: req.user.id,
        balance: 0,
      });
    }

    res.json(wallet);
  } catch (error) {
    console.error("Get Wallet Error:", error.message);
    res.status(500).json({ message: error.message });
  }
};

// Create Stripe PaymentIntent 
//  User -> create payment intent
//Stripe -> pay   //   Stripe webhook -> update wallet
exports.createPaymentIntent = async (req, res) => {
  try {
    const { amount } = req.body;

    const paymentIntent = await stripeService.createPaymentIntent(amount);

    res.json(paymentIntent);
  } catch (error) {
    console.error("Stripe Payment Error:", error.message);
    res.status(500).json({ message: error.message });
  }
};

// Topup Wallet    WALLET + STRIPE COMPLETE LOGIC
exports.topupWallet = async (req, res) => {
  try {
    console.log("Wallet Topup API");

    const { amount } = req.body;

    const paymentIntent = await stripeService.createPaymentIntent(amount);

    let wallet = await Wallet.findOne({
      where: { user_id: req.user.id },
    });

    if (!wallet) {
      wallet = await Wallet.create({
        user_id: req.user.id,
        balance: 0,
      });
    }

    wallet.balance += amount;
    await wallet.save();

    await WalletTransaction.create({
      id: uuidv4(),
      wallet_id: wallet.id,
      amount,
      type: "CREDIT",
      description: "Wallet Topup",
      sender_id: null,
      receiver_id: req.user.id,
    });

    res.json({ message: "Wallet Updated", wallet });
  } catch (error) {
    console.error("Wallet Topup Error:", error.message);
    res.status(500).json({ message: error.message });
  }
};



// Deduct Wallet (Donation / Purchase)
exports.deductWallet = async (userId, amount, description) => {
  try {
    console.log("Wallet Deduction");

    const wallet = await Wallet.findOne({
      where: { user_id: userId },
    });

    if (!wallet) {
      throw new Error("Wallet not found");
    }

    // Check balance
    if (wallet.balance < amount) {
      throw new Error("Insufficient wallet balance");
    }

    wallet.balance -= amount;
    await wallet.save();

    await WalletTransaction.create({
      id: uuidv4(),
      wallet_id: wallet.id,
      amount,
      type: "DEBIT",
      description,
      sender_id: userId,
      receiver_id: null,
    });

    return true;
  } catch (error) {
    console.error("Wallet Deduct Error:", error.message);
    throw error;
  }
};