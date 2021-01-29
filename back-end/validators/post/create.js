const Validator = require("validator");
const isEmpty = require("../isEmpty");

module.exports = function validatePostInput(data) {
  let errors = {};

  data.title = !isEmpty(data.title) ? data.title : "";
  data.content = !isEmpty(data.content) ? data.content : "";
  data.category = !isEmpty(data.category) ? data.category : "";
  data.destination = !isEmpty(data.destination) ? data.destination : "";

  if (Validator.isEmpty(data.title)) {
    errors.title = "Title field is required";
  }

  if (!Validator.isLength(data.title, { min: 2 })) {
    errors.title = "Title must be least 2 characters";
  }

  if (Validator.isEmpty(data.content)) {
    errors.content = "Content field is required";
  }

  if (!Validator.isLength(data.content, { min: 2 })) {
    errors.content = "Content must be least 2 characters";
  }

  if (Validator.isEmpty(data.category)) {
    errors.category = "Category field is required";
  }

  if (Validator.isEmpty(data.destination)) {
    errors.destination = "Destination field is required";
  }

  return {
    errors,
    isValid: isEmpty(errors),
  };
};
