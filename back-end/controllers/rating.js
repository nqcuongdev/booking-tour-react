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
  const { errors, isValid } = ratingValidate(req.body);

  //Check value request
  if (!isValid) {
    return res.status(400).json({
      success: false,
      message: errors,
    });
  }

  let user = req.user;
  if (user) {
    const { content, rating, package } = req.body;
    const ratingWithUser = await Rating.create({
      name: user.name,
      email: user.email,
      user: user.id,
      content,
      rating,
      package,
    });

    return res.status(200).json({
      success: !!ratingWithUser,
      data: ratingWithUser,
    });
  }

  const { name, email, website, content, rating, package } = req.body;
  const ratingWithoutUser = await Rating.create({
    name,
    email,
    website,
    content,
    rating,
    package,
  });

  return res.status(200).json({
    success: !!ratingWithoutUser,
    data: ratingWithoutUser,
  });
};
