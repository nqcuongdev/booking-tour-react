const Category = require("../models/category");
const Validator = require("validator");

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
    success: false,
    message: "This category has existed!",
  });
};

exports.update = async (req, res) => {
  let _id = req.params.id;
  let checkIDValid = Validator.isMongoId(_id);
  if (!checkIDValid) {
    return res.status(400).json({
      success: false,
      message: "Your ID is not valid",
    });
  }
  const { errors, isValid } = categoryValidate(req.body);

  //Check value request
  if (!isValid) {
    return res.status(400).json({
      success: false,
      message: errors,
    });
  }

  const { title, type, status } = req.body;

  const checkExistedCategory = await Category.findOne({ _id });

  if (!checkExistedCategory) {
    return res.status(404).json({
      success: false,
      message: "Can not found this category",
    });
  }

  let data = {
    title: title,
    type: type,
    status: status,
    updated_at: Date.now(),
  };

  const category = await Category.findByIdAndUpdate({ _id }, data, {
    new: true,
  });

  return res.status(200).json({
    success: !!category,
    message: "Update category success",
    data: category,
  });
};
