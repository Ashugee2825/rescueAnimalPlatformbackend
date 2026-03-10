const stripeService = require("../services/stripe.service");
const Adoption = require("../models/adoption.model");

// src/controllers/payment.controller.js
exports.payAdoptionFee = async (req, res) => {
  try {
    const { adoptionId } = req.params;

    const adoption = await Adoption.findByPk(adoptionId);

    const paymentIntent = await stripeService.createPaymentIntent(
      adoption.adoption_fee,
    );

    adoption.payment_status = "PAID";
    await adoption.save();

    res.json(paymentIntent);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
