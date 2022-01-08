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
app.use(cors())


/********start  required routers*******/
const userRouter = require('./routes/user.route');
const categoryRouter = require('./routes/category.route');
const cartRouter = require('./routes/cart.route');
const orderRouter = require('./routes/order.route');
const favouriteRouter = require('./routes/favourite.route');
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


app.use(express.static('public', {
    etag: true, // Just being explicit about the default.
    lastModified: true,  // Just being explicit about the default.
    setHeaders: (res, path) => {
      const hashRegExp = new RegExp('\\.[0-9a-f]{8}\\.');
  
      if (path.endsWith('.html')) {
        // All of the project's HTML files end in .html
        res.setHeader('Cache-Control', 'no-cache');
      } else if (hashRegExp.test(path)) {
        // If the RegExp matched, then we have a versioned URL.
        res.setHeader('Cache-Control', 'max-age=31536000');
      }
    },
  }));


/********start  use routers*******/
app.use(userRouter)
app.use(categoryRouter)
app.use(cartRouter)
app.use(orderRouter)
app.use(favouriteRouter)
app.use(productRouter)
/********end  use routers*******/



/***********server listen************/
app.listen(port, () => console.log(`http://localhost:${port}`))
/***********server listen************/