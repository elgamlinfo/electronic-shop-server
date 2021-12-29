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


/********start  required routers*******/
const userRouter = require('./routes/user.route');
const categoryRouter = require('./routes/category.route');
const cartRouter = require('./routes/cart.route');
const productRouter = require('./routes/product.route');
/********end  required routers*******/


/*************start init app tools***********/
app.use(helmet())
app.use(morgan('tiny'))
app.use(cors({
    origin: '*',
    methods: ['GET','POST','DELETE','UPDATE','PUT','PATCH']
}))
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