const Tag = require("../models/tag");
const Notification = require("../models/notification");
const Validator = require("validator");

// Load validate
const tagValidate = require("../validators/tag/create");

exports.all = async (req, res) => {
  const tags = await Tag.find({});

  return res.status(200).json({
    success: !!tags,
    data: tags,
  });
};

exports.show = async (req, res) => {
  let _id = req.params.id;
  let checkIDValid = Validator.isMongoId(_id);
  if (!checkIDValid) {
    return res.status(400).json({
      success: false,
      message: "Your ID is not valid",
    });
  }

  const tag = await Tag.findOne({ _id });

  if (!tag) {
    return res.status(404).json({
      success: !!tag,
      message: "Can not found this tag",
    });
  }

  return res.status(200).json({
    success: !!tag,
    data: tag,
  });
};

exports.create = async (req, res) => {
  const { errors, isValid } = tagValidate(req.body);

  //Check value request
  if (!isValid) {
    return res.status(400).json({
      success: false,
      message: errors,
    });
  }

  const { title } = req.body;

  let checkExistedTitle = await Tag.findOne({ title });

  if (!checkExistedTitle) {
    let created_by = req.user.id;
    const tag = await Tag.create({
      title,
      created_by,
    });

    return res.status(200).json({
      success: !!tag,
      data: tag,
    });
  }

  return res.status(401).json({
    success: false,
    message: "This tag has existed!",
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
  const { errors, isValid } = tagValidate(req.body);

  //Check value request
  if (!isValid) {
    return res.status(400).json({
      success: false,
      message: errors,
    });
  }

  const { title, status } = req.body;

  const checkExistedTag = await Tag.findOne({ _id });

  if (!checkExistedTag) {
    return res.status(404).json({
      success: false,
      message: "Can not found this tag",
    });
  }

  let data = {
    title: title,
    status: status,
    updated_at: Date.now(),
    updated_by: req.user.id,
  };

  const tag = await Tag.findByIdAndUpdate({ _id }, data, {
    new: true,
  });

  // Create notification
  await Notification.create({
    type: "tag",
    content: `${req.user.full_name} has updated tag ${checkExistedTag.title} to ${title}.`,
    package: tag._id,
  });

  return res.status(200).json({
    success: !!tag,
    message: "Update tag success",
    data: tag,
  });
};
