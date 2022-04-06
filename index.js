require('dotenv').config();
const express = require('express');

const productsController = require('./controllers/productsController');
const salesController = require('./controllers/salesController');
const validate = require('./middlewares/validate');
const joi = require('./Schemas/validateId');

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});

app.post('/products',
  validate.joiValidate(joi.name), validate.checkProductExists, productsController.create);
app.get('/products/:id', productsController.getById);
app.get('/products', productsController.getAll);

// app.post('/products', productsController.create);
app.get('/sales/:id', salesController.getById);
app.get('/sales', salesController.getAll);

app.listen(process.env.PORT, () => {
  console.log(`Escutando na porta ${process.env.PORT}`);
});
