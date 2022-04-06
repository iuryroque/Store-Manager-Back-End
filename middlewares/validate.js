// middleware que chama schema validação do joi
const joiValidate = (schema) => (req, res, next) => {
const { error } = schema.validate(req.body);
if (error) {
  const [code, message] = error.message.split('|');
  return res.status(code).json({ message });
}
next();
};

module.exports = {
  joiValidate,
};
