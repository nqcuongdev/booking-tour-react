const Validator = require("validator");
const isEmpty = require("../isEmpty");

module.exports = function validateCategoryInput(data) {
  let errors = {};

  data.title = !isEmpty(data.title) ? data.title : "";
  data.type = !isEmpty(data.type) ? data.type : "";

  if (Validator.isEmpty(data.title)) {
    errors.title = "Title field is required";
  }

  if (!Validator.isLength(data.title, { min: 2, max: 100 })) {
    errors.title = "Title must be between 2 and 100 characters";
  }

  if (Validator.isEmpty(data.type)) {
    errors.type = "Type is required";
  }

  return {
    errors,
    isValid: isEmpty(errors),
  };
};
