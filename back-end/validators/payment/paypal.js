const Validator = require("validator");
const isEmpty = require("../isEmpty");

module.exports = function validatePaymentInput(data) {
  let errors = {};

  data.title = !isEmpty(data.title) ? data.title : "";
  data.price = !isEmpty(data.price) ? data.price : "";

  if (Validator.isEmpty(data.title)) {
    errors.title = "Title field is required";
  }

  if (!Validator.isLength(data.title, { min: 2, max: 100 })) {
    errors.title = "Title must be between 2 and 100 characters";
  }

  if (Validator.isEmpty(data.price)) {
    errors.price = "Price field is required";
  }

  if (
    !Validator.isCurrency(data.price, {
      decimal_separator: ".",
      allow_decimal: true,
      require_decimal: false,
      digits_after_decimal: [2],
      allow_space_after_digits: false,
    })
  ) {
    errors.price = "Price is invalid";
  }

  return {
    errors,
    isValid: isEmpty(errors),
  };
};
