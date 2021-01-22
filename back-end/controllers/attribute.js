const Attribute = require("../models/attribute");
const Notification = require("../models/notification");
const Validator = require("validator");

//Load validate
const categoryValidate = require("../validators/category/category");

exports.getAll = async (req, res) => {
  let attributes = await Attribute.find({ type: req.params.type });

  return res.status(200).json({
    success: !!attributes,
    data: attributes,
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

  let checkExistedTitle = await Attribute.findOne({ title });

  if (!checkExistedTitle) {
    const category = await Attribute.create({
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
    message: "This attribute has existed!",
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

  let checkExistedAttribute = await Attribute.findOne({ _id });

  if (!checkExistedAttribute) {
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

  const attribute = await Attribute.findByIdAndUpdate({ _id }, data, {
    new: true,
  });

  // Create notification
  await Notification.create({
    type: "category",
    content: `${req.user.full_name} has updated category ${checkExistedAttribute.title} to ${title}.`,
    package: attribute._id,
  });

  return res.status(200).json({
    success: !!attribute,
    message: "Update attribute success",
    data: attribute,
  });
};
