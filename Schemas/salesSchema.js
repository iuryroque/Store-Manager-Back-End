const joi = require('joi');

module.exports = joi.object({
  productId: joi.number().required().empty().min(1)
    .messages({
    'number.min': '422|quantity must be greater than or equal to 1',
    'any.required': '400|productId is required',
    'number.empty': '409|Product already exists',
  }),
  quantity: joi.number().required().empty().min(1)
    .messages({
    'number.min': '422|quantity must be greater than or equal to 1',
    'any.required': '400|quantity is required',
    'number.empty': '409|Product already exists',
  }),
});
