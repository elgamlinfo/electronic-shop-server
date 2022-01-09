const Cart = require('../models/cart.model');
const Order = require('../models/order.model');
const mongoose = require('mongoose')


/****************start creare order*****************/
let createOrder = (req, res) => {
    let someDate = new Date();
    let numberOfDaysToAdd = 5;
    let result = someDate.setDate(someDate.getDate() + numberOfDaysToAdd);
    let date = new Intl.DateTimeFormat(['ban', 'id']).format(result);

    Cart.findById(req.user.cartId, (err, cart) => {
        if(err) return res.status(500).json({error: err.message})
        if(cart.products.length === 0) return res.status(404).json({message: "cart empty"})
        let c = {...cart._doc}
        delete c._id
        let order = new Order(c);
        order.customer = req.user.name;
        order.deliveryDate = date;
        order.placed = true
        order.transit = false
        order.completed = false
        cart.qnt = 0
        cart.totalPrice = 0
        cart.products = []
        cart.save()
        order.save()
        .then(result => {
            res.json(order)
        })
        .catch(error => {
            res.status(500).json({error: error.message})
        })
    })
}
/****************end creare order*****************/

/**********************start get  orders*******************/
let getOrders = (req, res) => {
    if(req.user.admin) {
        Order.find({}, (error, orders) => {
            if(error) return res.status(500).json({error: error.message})
            //if(orders.length === 0) return res.status(404).json({message: "no orders"})
            return res.json(orders);
        })
    }
    Order.find({userId: req.user._id}, (error, orders) => {
        if(error) return res.status(500).json({error: err.message})
        if(orders.length === 0) return res.status(404).json({message: "no orders"})
        return res.json(orders);
    })
}
/**********************end get  orders*******************/

/**********************start get  orders*******************/
let getAllOrders = (req, res) => {  
    Order.find({}, (error, orders) => {
        if(error) return res.status(500).json({error: error.message})
        if(orders.length === 0) return res.status(404).json({message: "no orders"})
        return res.json(orders);
    })
    
}
/**********************end get  orders*******************/


/**************************start update orders status***************************/
let updateOrders = (req, res) => {
    let data = req.body
    if(!req.user.admin) return res.status(401).json({message: "admins only"})
    Order.findById(req.params.id, (error, order) => {
        if(error) return res.status(500).json({error: error.message})
        if(!order) return res.status(404).json({message: "no order with this id"})
        data.transit?order.transit = true: order.completed = true
        order.save()
        .then(result => {
            res.json(result)
        })
        .catch(error => {
            res.status(500).json({error: error.message})
        })
    })
}
/**************************end update orders status***************************/


let deleteOrder = (req, res) => {
    Order.findByIdAndDelete(req.params.id, (error, order) => {
        if(error) return res.status(500).json(error);
        res.json({message:'order deleted'})
    })
}


module.exports = {
    createOrder,
    getOrders,
    getAllOrders,
    updateOrders,
    deleteOrder
}