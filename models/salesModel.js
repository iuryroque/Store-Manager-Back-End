const connection = require('./connection');

const serialize = (salesData) => ({
  saleId: salesData.sale_id,
  date: salesData.date,
  productId: salesData.product_id,
  quantity: salesData.quantity,
});

const getAll = async () => {
  const [sales] = await connection.execute(`SELECT sale_id, product_id, s.date, quantity
  FROM sales s INNER JOIN sales_products sp
  ON s.id = sp.sale_id`);
  return sales.map(serialize);
};

const getById = async (id) => {
  const [sale] = await
    connection.execute(`SELECT s.date, product_id, quantity
      FROM sales s INNER JOIN sales_products sp
      ON s.id = sp.sale_id WHERE id = ? ORDER BY sale_id, product_id`, [id]);
      console.log(sale);
  return sale.map(serialize);
};

const createSaleNow = async () => {
  const [saleId] = await
    connection.execute('INSERT INTO sales (date) VALUES (now())');
  return saleId;
};

const createProductSale = async (id, productId, quantity) => {
  const [saleId] = await
    connection.execute(
      'INSERT INTO sales_products (sale_id, product_id, quantity) VALUES (? , ?, ?)',
      [id, productId, quantity],
    );
  return saleId;
};

const edit = async (saleID, productId, quantity) => {
  const [updatedSale] = await
    connection.execute(`UPDATE sales_products SET quantity = ?
    WHERE sale_id = ? AND product_id  = ?`, [quantity, saleID, productId]);
  return updatedSale;
};

const destroy = async (id) => {
  const destroySale = await connection.execute('DELETE FROM sales WHERE id = ?', [id]);
  return destroySale;
};

module.exports = {
  getAll,
  getById,
  createSaleNow,
  createProductSale,
  edit,
  destroy,
};
