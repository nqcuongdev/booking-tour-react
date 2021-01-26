const Validator = require("validator");
const User = require("../models/user");
const Book = require("../models/booking");

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
  let books = await Book.find({ user: id });

  if (!user) {
    return res.status(404).json({
      success: !!user,
      message: "Can not found this user",
    });
  }

  return res.status(200).json({
    success: !!user,
    data: user,
    books: books,
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
