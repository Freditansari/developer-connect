const isEmpty = require('./is-empty'); 
const validator = require('validator');

module.exports= function validatePostInput(data){
    let errors={};

    //check if data will be empty, if not it will set the variable to empty
    //so the validator can check it

    data.text = !isEmpty(data.text) ? data.text: '';

    if(!validator.isLength(data.text,{ min: 5, max: 300})){
        errors.text = 'post must be between 5-300 characters';
    }
    

    if(validator.isEmpty(data.text)){
        errors.text = 'text field is required';
    }


    


    return {
        errors, 
        isValid: isEmpty(errors) 
    }
}