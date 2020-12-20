const stripe = require("stripe")(process.env.STRIPE_CLIENT_SECRET);

exports.charge = async (req, res) => {
  const { email, token } = req.body;
  let customer = await stripe.customers.create({
    email: email,
    source: token,
  });
  console.log(customer);
};

exports.success = async (req, res) => {};
