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
  let books = await Book.find({ user: id })
    .populate({
      path: "code",
      populate: {
        path: "tour",
        populate: [
          {
            path: "attributes",
            model: "attribute",
          },
          {
            path: "destination",
            model: "destination",
          },
        ],
      },
    })
    .populate({
      path: "room",
      populate: {
        path: "hotel",
        model: "hotel",
      },
    });

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

exports.all = async (req, res) => {
  if (req.user.role !== "admin") {
    return res.status(403).json({
      success: false,
      message: "You have not permission",
    });
  }

  const users = await User.find({});

  return res.json({
    success: !!users,
    data: users,
  });
};

exports.updateRoleUser = async (req, res) => {
  let _id = req.params.id;

  let checkIDValid = Validator.isMongoId(_id);
  if (!checkIDValid) {
    return res.status(400).json({
      success: false,
      message: "Your ID is not valid",
    });
  }

  if (req.user.role !== "admin") {
    return res.status(403).json({
      success: false,
      message: "You have not permission",
    });
  }

  let checkExistedUser = await User.findOne({ _id });
  if (!checkExistedUser) {
    return res.status(404).json({
      success: false,
      message: "User not found",
    });
  }

  const { role } = req.body;
  const user = await User.findByIdAndUpdate(
    { _id },
    {
      role: role,
    },
    {
      new: true,
    }
  );

  return res.json({
    success: !!user,
    message: "Update role user success",
  });
};
