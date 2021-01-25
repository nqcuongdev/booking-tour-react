const Rating = require("../models/rating");

// Load validate
const ratingValidate = require("../models/rating");

// Package: Tour, Hotel, Event, Blog
exports.getListRatingsOfPackage = async (req, res) => {
  let _id = req.params.id;
  let checkIDValid = Validator.isMongoId(_id);
  if (!checkIDValid) {
    return res.status(400).json({
      success: false,
      message: "Your ID is not valid",
    });
  }

  const { package } = req.body;

  const ratings = await Rating.find({ package });

  return res.status(200).json({
    success: !!ratings,
    data: ratings,
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

  const rating = await Rating.findOne({ _id });

  if (!rating) {
    return res.status(404).json({
      success: !!rating,
      message: "Can not found this rating",
    });
  }

  return res.status(200).json({
    success: !!rating,
    data: rating,
  });
};

exports.create = async (req, res) => {
  // const { errors, isValid } = ratingValidate(req.body);

  // //Check value request
  // if (!isValid) {
  //   return res.status(400).json({
  //     success: false,
  //     message: errors,
  //   });
  // }

  const { name, email, user, content, rating, target_id } = req.body;
  const ratingWithUser = await Rating.create({
    name,
    email,
    user,
    content,
    rating,
    target_id,
  });

  return res.status(200).json({
    success: !!ratingWithUser,
    data: ratingWithUser,
  });
};
