const productsModel = require('./models/productsModel');
const salesModel = require('./models/salesModel');

const calc = async (salesList, productList, { tipo }) => {
  const promises = productList.map((product, index) => {
    if (tipo === 'sub') {
      console.log(product.quantity, salesList[index].quantity);
      return productsModel.edit(
      product.id, product.name, (product.quantity - salesList[index].quantity),
      );
    }
    // if (tipo === 'sum')
    console.log('+ ', product.quantity, salesList[index].quantity);
    return productsModel.edit(
      product.id, product.name, (product.quantity + salesList[index].quantity),
);
  });
  const result = await Promise.all(promises);
  return result;
};

const buscaEstoque = async (salesList) => {
  const promises = salesList.map(({ productId }) => productsModel.getById(productId));
  const result = await Promise.all(promises);
  return result;
};

const juntaId = (productList) => productList.reduce((acc, { productId, quantity }) => {
  const productFound = acc.findIndex((i) => i.productId === productId);
  if (productFound >= 0) {
    acc[productFound].quantity += quantity;
    return acc;
  }
  acc.push({ productId, quantity });
  return acc;
}, []);

const sum = async (id) => {
  const saleList = await salesModel.getById(id);
  const saleListIds = juntaId(saleList);
  const productList = await buscaEstoque(saleListIds);
  const mais = 'sum';
  await calc(saleListIds, productList, mais);
  return '';
};

const sub = async (saleList) => {
  const saleListIds = juntaId(saleList);
  const productList = await buscaEstoque(saleListIds);
  const menos = { tipo: 'sub' };
  await calc(saleListIds, productList, menos);
  return '';
};

module.exports = {
  sum,
  sub,
  juntaId,
  buscaEstoque,
};
