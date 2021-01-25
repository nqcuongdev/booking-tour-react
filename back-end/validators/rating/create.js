const Validator = require("validator");
const isEmpty = require("../isEmpty");

module.exports = function validateRatingInput(data) {
  let errors = {};

  data.content = !isEmpty(data.content) ? data.content : "";
  data.target_id = !isEmpty(data.target_id) ? data.target_id : "";

  if (Validator.isEmpty(data.content)) {
    errors.content = "Content field is required";
  }

  if (!Validator.isLength(data.title, { min: 2, max: 200 })) {
    errors.content = "Title must be between 2 and 200 characters";
  }

  if (Validator.isEmpty(data.target_id)) {
    errors.target_id = "Package field is required";
  }

  return {
    errors,
    isValid: isEmpty(errors),
  };
};
