/********start required files*******/
require('dotenv').config()
require('./db/db');
const express = require('express');
const app = express();
const cors = require('cors')
const morgan = require('morgan');
const helmet = require('helmet');
const bodyParser = require('body-parser');
const session = require('express-session')
const cookieParser = require('cookie-parser')
const port = process.env.PORT || 3000;
/********end  required files*******/
/*************start init app tools***********/
// app.use(cors({
//     origin: 'https://electronic-shop-eta.vercel.app',
//     methods: ['GET','POST','DELETE','UPDATE','PUT','PATCH']
// }))
// Add headers before the routes are defined
app.use(function (req, res, next) {

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', 'https://electronic-shop-eta.vercel.app');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    next();
})
/********start  required routers*******/
const userRouter = require('./routes/user.route');
const categoryRouter = require('./routes/category.route');
const cartRouter = require('./routes/cart.route');
const productRouter = require('./routes/product.route');
/********end  required routers*******/



app.use(helmet())
app.use(morgan('tiny'))
app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json())
app.use(cookieParser())
app.use(session({
    secret: process.env.SESSION_SECRET_KEY,
    resave: false,
    saveUninitialized: true,
    cookie: { secure: true }
}))
/*************end init app tools***********/



/********start  use routers*******/
app.use(userRouter)
app.use(categoryRouter)
app.use(cartRouter)
app.use(productRouter)
/********end  use routers*******/



/***********server listen************/
app.listen(port, () => console.log(`http://localhost:${port}`))
/***********server listen************/