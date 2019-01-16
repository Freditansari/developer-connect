const isEmpty = require("./is-empty");
const validator = require("validator");

module.exports = function validateExperienceInput(data) {
  let errors = {};

  //check if data will be empty, if not it will set the variable to empty
  //so the validator can check it

  data.title = !isEmpty(data.title) ? data.title : "";
  data.company = !isEmpty(data.company) ? data.company : "";
  data.from = !isEmpty(data.from) ? data.from : "";

  if (validator.isEmpty(data.title)) {
    errors.title = "job title is required";
  }

  if (validator.isEmpty(data.company)) {
    errors.company = "company field is required";
  }
  if (validator.isEmpty(data.from)) {
    errors.from = "from date field is required";
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
