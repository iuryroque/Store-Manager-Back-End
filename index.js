require('dotenv').config();
const express = require('express');

const productsController = require('./controllers/productsController');
const salesController = require('./controllers/salesController');
const joi = require('./Schemas/validateId');

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});
app.get('/products', productsController.getAll);

app.get('/sales', salesController.getAll);

app.listen(process.env.PORT, () => {
  console.log(`Escutando na porta ${process.env.PORT}`);
});
