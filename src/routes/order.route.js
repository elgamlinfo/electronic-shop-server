const express = require('express');
const router = express.Router();
const {createOrder, getOrders, updateOrders} = require('../controllers/order.control')
const auth = require('../middlewares/auth')


router.post('/order', auth, createOrder)


router.get('/order', auth, getOrders)


router.patch('/order/:id', auth, updateOrders)


module.exports = router