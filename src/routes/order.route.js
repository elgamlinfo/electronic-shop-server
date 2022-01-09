const express = require('express');
const router = express.Router();
const {createOrder, getOrders, getAllOrders, updateOrders, deleteOrder} = require('../controllers/order.control')
const auth = require('../middlewares/auth')


router.post('/order', auth, createOrder)


router.get('/order', auth, getOrders)


router.get('/order/all',  getAllOrders)


router.patch('/order/:id', auth, updateOrders)

router.delete('/order/:id', auth, deleteOrder)


module.exports = router