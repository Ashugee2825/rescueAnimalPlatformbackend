const Stripe = require("stripe");
const stripe = Stripe(process.env.STRIPE_SECRET);

// services/stripe.service.js
exports.createPaymentIntent = async (amount) => {
  try {
    console.log("Stripe Payment Intent");

        const paymentIntent = await stripe.paymentIntents.create({
          amount: amount * 100, // Convert to cents
          currency: "usd",
          automatic_payment_methods: {
            enabled: true,
          },
        });

    return paymentIntent;
  } catch (error) {
    console.error("Stripe Error:", error.message);
    throw error;
  }
};
// Optional: Function to handle Stripe webhooks
// exports.handleWebhook = async (req) => {