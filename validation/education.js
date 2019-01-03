const isEmpty = require("./is-empty");
const validator = require("validator");

module.exports = function validateEducationInput(data) {
  let errors = {};

  //check if data will be empty, if not it will set the variable to empty
  //so the validator can check it

  data.school = !isEmpty(data.school) ? data.school : "";
  data.degree = !isEmpty(data.degree) ? data.degree : "";
  data.from = !isEmpty(data.from) ? data.from : "";
  data.fieldOfStudy = !isEmpty(data.fieldOfStudy) ? data.fieldOfStudy : "";

  if (validator.isEmpty(data.school)) {
    errors.school = "school is required";
  }

  if (validator.isEmpty(data.degree)) {
    degree.password = "degree field is required";
  }
  if (validator.isEmpty(data.from)) {
    errors.from = "from date field is required";
  }
  if (validator.isEmpty(data.fieldOfStudy)) {
    errors.fieldOfStudy = "Field of study is required";
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
