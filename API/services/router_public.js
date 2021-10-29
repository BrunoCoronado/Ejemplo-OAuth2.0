const express = require('express');
const router = new express.Router();

const auth = require('../controllers/auth');
    
router.route('/login').post(auth.login)
router.route('/refresh').post(auth.refresh)

const productos = require('../controllers/productos');

router.route('/producto').post(productos.producto)
router.route('/productos').get(productos.productos)

module.exports = router