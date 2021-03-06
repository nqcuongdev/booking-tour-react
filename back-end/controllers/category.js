const Category = require("../models/category");
const Notification = require("../models/notification");
const Validator = require("validator");

//Load validate
const categoryValidate = require("../validators/category/category");

exports.all = async (req, res) => {
  let categories = await Category.find({});

  return res.status(200).json({
    success: !!categories,
    data: categories,
  });
};

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

    // Create notification
    await Notification.create({
      type: "category",
      content: `${req.user.full_name} has created new category: ${title}`,
      package: category._id,
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

  // Create notification
  await Notification.create({
    type: "category",
    content: `${req.user.full_name} has updated category ${checkExistedCategory.title} to ${title}.`,
    package: category._id,
  });

  return res.status(200).json({
    success: !!category,
    message: "Update category success",
    data: category,
  });
};
