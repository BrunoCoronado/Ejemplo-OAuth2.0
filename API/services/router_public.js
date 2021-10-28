const express = require('express');
const router = new express.Router();

const productos = require('../controllers/productos');

router.route('/productos').get(productos.productos)

module.exports = router