const joi = require('joi');

module.exports = joi.object({
  name: joi.string().required().empty().min(5)
    .messages({
    'any.required': '400|"name" is required',
    'string.min': '422|"name" length must be at least 5 characters long',
    'string.empty': '409|"Product" already exists',
  }),
  quantity: joi.number().required().empty().min(1)
    .messages({
    'number.min': '422|"quantity" must be greater than or equal to 1',
    'any.required': '400|"quantity" is required',
  }),
});
