const salesModel = require('../models/salesModel');
const calculations = require('../calculations');

const getAll = async () => {
  const sales = await salesModel.getAll();
  return sales;
};

const getById = async (id) => {
  const sale = await salesModel.getById(id);
  return sale;
};

// Agradecimento ao Leandro Oliveira e ao Lucas Pinheiro ambos da t15b por a conversa sobre promisse e qual a melhor forma de fazer "map ou foreach...".
const create = async (saleList) => {
  const { insertId } = await salesModel.createSaleNow();
  const saleNewList = { id: insertId, itemsSold: [] };
  await Promise.all(saleList.map(
    async ({ productId, quantity }) => {
      await salesModel.createProductSale(insertId, productId, quantity);
      saleNewList.itemsSold.push({ productId, quantity });
    },
  ));

  await calculations.sub(saleList);
  return saleNewList;
  // Criado para fazer uma venda por item da lista
  // const saleNewList = [];
  // await Promise.all(saleList.map(
  //   async ({ productId, quantity }) => {
    //     const { insertId } = await salesModel.createSaleNow();
    //     await salesModel.createSale(insertId, productId, quantity);
  //     saleNewList.push({ id: insertId, productId, quantity });
  //   },
  // ));
};

const edit = async (id, saleList) => {
  const saleEditList = { saleId: id, itemUpdated: saleList };
  await calculations.sum(id);
  await calculations.sub(saleList);
  await Promise.all(saleList.map(
    async ({ productId, quantity }) => salesModel.edit(id, productId, quantity)
    ,
    ));
    return saleEditList;
  };

  const destroy = async (id) => {
    await calculations.sum(id);
    const retorno = await salesModel.destroy(id);
    return retorno;
  };

  module.exports = {
    getAll,
    getById,
    create,
  edit,
  destroy,
};
