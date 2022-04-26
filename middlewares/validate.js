const { buscaEstoque, juntaId } = require('../calculations');
const validateService = require('../services/validateService');

// middleware que chama schema validação do joi
const joiValidate = (schema) => (req, res, next) => {
  // Validação nessecaria quando o corpo da requisição é um array
  let error;
  if (req.body[0]) {
    req.body.forEach((sale) => {
      ({ error } = schema.validate(sale));
    });
  } else {
    ({ error } = schema.validate(req.body));
  }

  // Tentativa de tornar a função acima um ternario mal sucedida e o tempo não me deixa entender no momento
  // const { error } = req.body[0] ? (
  //   req.body.forEach((sale) => schema.validate(sale))) : schema.validate(req.body);

  if (error) {
    const [code, message] = error.message.split('|');
    return res.status(code).json({ message });
  }
  next();
};

const checkProductExists = async (req, res, next) => {
  const { name } = req.body;
  const productExists = await validateService.checkProductExists(name);
   // Se o nome já existir no banco o service retornar productExists com true ou false caso não exista
   if (productExists) return res.status(409).json({ message: 'Product already exists' });
   next();
};

const checkIdExists = async (req, res, next) => {
  const { id } = req.params;
  // Retorna retorna true ou false se a url é de sale
  const urlSale = req.url.includes('sales');
    const idNotExists = await validateService.checkIdNotExists(id, urlSale);
   // Se o id não existir no banco o service retornar idNotExists com true ou false caso não exista
   if (!idNotExists) {
     return res.status(404).json({ message: 'Product not found' });
   }
   if (idNotExists.length === 0) {
    return res.status(404).json({ message: 'Sale not found' });
   }

   next();
};

const checkStock = async (req, res, next) => {
  const saleList = req.body;

  const saleListIds = juntaId(saleList);
  const productList = await buscaEstoque(saleListIds);
  try {
    saleList.forEach((sale, index) => {
      if (sale.quantity > productList[index].quantity) {
        throw new Error('Such amount is not permitted to sell');
      }
    });
    next();
  } catch (error) {
    return res.status(422).json({ message: error.message });
  }
};

module.exports = {
  joiValidate,
  checkProductExists,
  checkIdExists,
  checkStock,
};
