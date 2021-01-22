const Tag = require("../models/tag");

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
