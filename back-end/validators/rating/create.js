const Validator = require("validator");
const isEmpty = require("../isEmpty");

module.exports = function validateRatingInput(data) {
  let errors = {};

  data.content = !isEmpty(data.content) ? data.content : "";
  data.package = !isEmpty(data.package) ? data.package : "";

  if (Validator.isEmpty(data.content)) {
    errors.content = "Content field is required";
  }

  if (!Validator.isLength(data.title, { min: 2, max: 200 })) {
    errors.content = "Title must be between 2 and 200 characters";
  }

  if (Validator.isEmpty(data.package)) {
    errors.package = "Package field is required";
  }

  if (!Validator.isMongoId(data.package)) {
    errors.package = "Package invalid";
  }

  return {
    errors,
    isValid: isEmpty(errors),
  };
};
