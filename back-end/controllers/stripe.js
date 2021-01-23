const stripe = require("stripe")(process.env.STRIPE_CLIENT_SECRET);
const e = require("express");
const { uuid } = require("uuidv4");

exports.charge = async (req, res) => {
  const { product, token } = req.body;

  let customer = await stripe.customers.create({
    email: token.email,
    source: token.id,
  });

  if (customer) {
    let result = await stripe.charges.create({
      amount: product.price * 100,
      currency: "usd",
      customer: customer.id,
      receipt_email: token.email,
      description: "purchase of product",
    });

    return res.json({
      success: !!result,
      data: result,
    });
  } else {
    return res.json({
      success: false,
      message: "An error occur",
    });
  }
};
