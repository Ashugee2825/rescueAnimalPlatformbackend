const Stripe = require("stripe");
// src/config/stripe.js
const stripe = new Stripe(process.env.STRIPE_SECRET);

module.exports = stripe;
