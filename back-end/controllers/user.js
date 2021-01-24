const Validator = require("validator");
const User = require("../models/user");

exports.show = async (req, res) => {
  const { id } = req.user;

  let checkIDValid = Validator.isMongoId(id);
  if (!checkIDValid) {
    return res.status(400).json({
      success: false,
      message: "Your ID is not valid",
    });
  }

  let user = await User.findOne({ _id: id });

  if (!user) {
    return res.status(404).json({
      success: !!user,
      message: "Can not found this user",
    });
  }

  return res.status(200).json({
    success: !!user,
    data: user,
  });
};

exports.updateProfile = async (req, res) => {
  const { id } = req.user;

  let checkIDValid = Validator.isMongoId(id);
  if (!checkIDValid) {
    return res.status(400).json({
      success: false,
      message: "Your ID is not valid",
    });
  }
};
