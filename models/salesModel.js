const connection = require('./connection');

const getAll = async () => {
  const [sales] = await connection.execute(`SELECT sale_id, product_id, s.date, quantity
  FROM sales s INNER JOIN sales_products sp
  ON s.id = sp.sale_id`);
  return sales.map(serialize);
};


module.exports = {
  getAll,
};
