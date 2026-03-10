const stripe = require("../config/stripe");
const Wallet = require("../models/wallet.model");

exports.handleWebhook = async (req, res) => {
  const sig = req.headers["stripe-signature"];

  try {
    const event = stripe.webhooks.constructEvent(
      req.body,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET,
    );

    if (event.type === "payment_intent.succeeded") {
      const paymentIntent = event.data.object;
      const userId = paymentIntent.metadata.userId;
      const wallet = await Wallet.findOne({ where: { user_id: userId } });
      wallet.balance += paymentIntent.amount / 100;
      await wallet.save();

      console.log("Payment Success:", paymentIntent.id);

      // update wallet here
    }

    res.json({ received: true });
  } catch (err) {
    console.error("Stripe Webhook Error:", err.message);

    res.status(400).send(`Webhook Error: ${err.message}`);
  }
};
// 