const Category = require("../models/category");

//Load validate
const categoryValidate = require("../validators/category/category");

exports.getAll = async (req, res) => {
  let categories = await Category.find({ type: req.params.type });

  return res.status(200).json({
    success: !!categories,
    data: categories,
  });
};

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

  let checkExistedTitle = await Category.findOne({ title });

  if (!checkExistedTitle) {
    const category = await Category.create({
      title,
      type,
    });

    return res.status(200).json({
      success: !!category,
      data: category,
    });
  }

  return res.status(401).json({
    success: !!checkExistedTitle,
    message: "This category has existed!",
  });
};
