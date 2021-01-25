const Contact = require("../models/contact");
const contactValidate = require("../validators/contact/add");

exports.add = async (req, res) => {
    const { errors, isValid } = contactValidate(req.body);

    if (!isValid) {
        return res.status(400).json({
            success: false,
            message: errors,
        });
    }

    const { name, email, subject, message } = req.body;

    const contact = await Contact.create({
        name,
        email,
        subject,
        message
    });

    contact.save()

    return res.status(200).json({
        success: true,
        message: "Contact has been sent successfully",
    });
}