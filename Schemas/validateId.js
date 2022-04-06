const joi = require('joi');

module.exports = () => joi.object({
  name: joi.min(5).empty()
  .messages({
      'number.base': '400|\'quantity\' need be a number',
      'number.empty': '400|\'quantity\' is not be empty.',
      'number.min': '400|\'quantity\' must be greater than 0',
      'any.required': '400|\'quantity\' is required.',
      'number.integer': '400|\'quantity\' need its a whole number.',
    }),
});
