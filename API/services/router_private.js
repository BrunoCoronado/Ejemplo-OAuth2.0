const express = require('express');
const router = new express.Router();

const auth = require('../controllers/auth');

router.route('/login').post(auth.login)
router.route('/refresh').post(auth.refresh)

module.exports = router