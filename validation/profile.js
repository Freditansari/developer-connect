const isEmpty = require("./is-empty");
const validator = require("validator");

module.exports = function validateProfileInput(data) {
  let errors = {};

  //check if data will be empty, if not it will set the variable to empty
  //so the validator can check it

  data.handle = !isEmpty(data.handle) ? data.handle : "";
  data.status = !isEmpty(data.status) ? data.status : "";
  data.skills = !isEmpty(data.skills) ? data.skills : "";

  if (!validator.isLength(data.handle, { min: 2, max: 40 })) {
    errors.handle = "Handles need to between 2-4 characters";
  }

  if (validator.isEmpty(data.handle)) {
    errors.handle = "profile handles is required";
  }

  if (validator.isEmpty(data.status)) {
    errors.status = "your work status is required";
  }
  if (validator.isEmpty(data.skills)) {
    errors.skills = "your work skills is required";
  }

  if (!isEmpty(data.website)) {
    console.log(data.website);
    if (!validator.isURL(data.website)) {
      errors.website = "not a valid url";
    }
  }
  if (!isEmpty(data.youtube)) {
    if (validator.isURL(data.youtube)) {
      errors.youtube = "not a valid url";
    }
  }
  if (!isEmpty(data.twitter)) {
    if (validator.isURL(data.twitter)) {
      errors.twitter = "not a valid url";
    }
  }
  if (!isEmpty(data.instagram)) {
    if (validator.isURL(data.instagram)) {
      errors.instagram = "not a valid url";
    }
  }
  if (!isEmpty(data.facebook)) {
    if (validator.isURL(data.facebook)) {
      errors.facebook = "not a valid url";
    }
  }

  // if(validator.isEmpty(data.email)){
  //     errors.email = 'email is required';
  // }

  // if(!validator.isEmail(data.email)){
  //     errors.email = 'email is not in the correct format';
  // }

  // if(validator.isEmpty(data.password)){
  //     errors.password = 'password is required';
  // }

  // if(!validator.isLength(data.password,{min:6, max: 30})){
  //     errors.password = 'password must be at least 6 characters';
  // }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
