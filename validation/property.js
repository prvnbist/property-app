const Validator = require('validator');
const isEmpty = require('is-empty');

module.exports = function validatePropertyInput(data) {
    let errors = {};

    data.name = !isEmpty(data.name) ? data.name : '';
    data.price = !isEmpty(data.price) ? data.price : '';

    if (Validator.isEmpty(data.name)) {
        errors.name = 'Name field is required';
    }
    if (Validator.isEmpty(data.price)) {
        errors.price = 'Price field is required';
    }
    if (Validator.isEmpty(data.price)) {
        errors.price = 'Price field is required';
    }
    return {
        errors,
        isValid: isEmpty(errors),
    };
};
