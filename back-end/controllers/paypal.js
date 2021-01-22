const paypal = require("paypal-rest-sdk");

// Load validate
const paypalValidate = require("../validators/payment/paypal");

exports.pay = async (req, res) => {
  const { errors, isValid } = paypalValidate(req.body);

  //Check value request
  if (!isValid) {
    return res.status(400).json({
      success: false,
      message: errors,
    });
  }

  const { name, price } = req.body;
  const url = req.protocol + "://" + req.get("host") + req.originalUrl;
  const create_payment_json = {
    intent: "sale",
    payer: {
      payment_method: "paypal",
    },
    redirect_urls: {
      return_url: `${url}/api/v1/paypal/success`,
      cancel_url: `${url}/api/v1/paypal/cancel`,
    },
    transactions: [
      {
        item_list: {
          items: [
            {
              name: name,
              price: price,
              currency: "USD",
              quantity: 1,
            },
          ],
        },
        amount: {
          currency: "USD",
          total: price,
        },
      },
    ],
  };

  paypal.payment.create(create_payment_json, function (error, payment) {
    if (error) {
      throw error;
    } else {
      return res.status(200).json({
        success: true,
        message: payment.id,
      });
    }
  });
};

exports.success = async (req, res) => {
  console.log(req.body);
};

exports.cancel = async (req, res) => {
  console.log(req.body);
};
