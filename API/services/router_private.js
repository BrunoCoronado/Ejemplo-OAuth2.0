const express = require('express');
const router = new express.Router();

const productos = require('../controllers/productos');


router.route('/producto').post(productos.producto)
router.route('/productos').get(productos.productos)

module.exports = router