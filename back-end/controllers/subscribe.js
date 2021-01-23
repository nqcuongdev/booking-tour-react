const Subscribe = require("../models/subscribe");
const validateSubscribeAdd = require("../validators/subscribe/add");

exports.add = async (req, res) => {
    const { errors, isValid } = validateSubscribeAdd(req.body);

    if (!isValid) {
        return res.status(400).json({
            success: false,
            message: errors,
        });
    }

    const { email } = req.body;

    //check email subscribed
    const email_subscribed = await Subscribe.findOne({ email });
    
    if (email_subscribed) {
        return res.status(401).json({
          success: false,
          message: { email: "You have subscribed before" },
        });
    }

    const subscribe = await Subscribe.create({
        email
    });

    // subscribe.save()

    return res.status(200).json({
        success: true,
        message: "Thank you subscribe",
    });
}