const isEmpty = require('./is-empty'); 
const validator = require('validator');

module.exports= function validateLoginInput(data){
    let errors={};

    //check if data will be empty, if not it will set the variable to empty
    //so the validator can check it

    data.email = !isEmpty(data.email) ? data.email: '';
    data.password = !isEmpty(data.password) ? data.password: '';
    






    if(validator.isEmpty(data.email)){
        errors.email = 'email is required';
    }

    if(!validator.isEmail(data.email)){
        errors.email = 'email is not in the correct format';
    }

    if(validator.isEmpty(data.password)){
        errors.password = 'password is required';
    }

    if(!validator.isLength(data.password,{min:6, max: 30})){
        errors.password = 'password must be at least 6 characters';
    }

    


    return {
        errors, 
        isValid: isEmpty(errors) 
    }
}