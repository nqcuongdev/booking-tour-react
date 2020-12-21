const stripe = require("stripe")(process.env.STRIPE_CLIENT_SECRET);

exports.charge = async (req, res) => {
  const { price } = req.body;

  // Create payment intent
  const intent = await stripe.paymentIntents.create({
    amount: parseInt(price) * 100,
    currency: "usd",
  });

  // Return response to client
  return res.json({
    success: true,
    data: {
      client_secret: intent.client_secret,
      intent_id: intent.id,
    },
  });
};

exports.confirmPayment = async (req, res) => {};
