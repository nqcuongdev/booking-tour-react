const Attribute = require("../models/attribute");
const Validator = require("validator");

//Load validate
const categoryValidate = require("../validators/category/category");

exports.create = async (req, res) => {
  const { errors, isValid } = categoryValidate(req.body);

  //Check value request
  if (!isValid) {
    return res.status(400).json({
      success: false,
      message: errors,
    });
  }

  const { title, type } = req.body;

  let checkExistedTitle = await Attribute.findOne({ title });

  if (!checkExistedTitle) {
    const category = await Attribute.create({
      title,
      type,
    });

    return res.status(200).json({
      success: !!category,
      data: category,
    });
  }

  return res.status(401).json({
    success: false,
    message: "This attribute has existed!",
  });
};
