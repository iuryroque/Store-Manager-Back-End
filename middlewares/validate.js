const validateService = require('../services/validateService');

// middleware que chama schema validação do joi
const joiValidate = (schema) => (req, res, next) => {
  let error;

  // Validação nessecaria quando o corpo da requisição é um array
  if (req.body[0]) {
    req.body.forEach((sale) => {
      ({ error } = schema.validate(sale));
    });
  } else {
    ({ error } = schema.validate(req.body));
  }
if (error) {
  const [code, message] = error.message.split('|');
  return res.status(code).json({ message });
}
next();
};

const checkProductExists = async (req, res, next) => {
  const { name } = req.body;
  //
  //
  // Passar essa validação para o Joi
  if (!name) return res.status(409).json({ message: 'Product already exists' });
  //
  //
  const productExists = await validateService.checkProductExists(name);
   // Se o nome já existir no banco o service retornar productExists com true ou false caso não exista
   if (productExists) return res.status(409).json({ message: 'Product already exists' });
   next();
};

module.exports = {
  joiValidate,
  checkProductExists,
};
