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
var finalhandler = require('finalhandler')
const serveStatic = require('serve-static')
var http = require('http')
const port = process.env.PORT || 3000;
/********end  required files*******/


/*************start init app tools***********/


// Serve up public/ftp folder
var serve = serveStatic('public/ftp', {
    index: false,
    setHeaders: setHeaders
})

// Create server
var server = http.createServer(function onRequest (req, res) {
    serve(req, res, finalhandler(req, res))
})

// Set header to force download
function setHeaders (res, path) {
    res.setHeader('Content-Disposition', contentDisposition(path))
}

server.on("request", function (request, response) {
	console.log(`METHOD: ${request.method}; URL: ${request.url}`);
	switch(request.method)
	{
	case "GET":
	case "PUT":
	case "POST":
	case "PATCH":
	case "DELETE":
		response.writeHead(200, {
			"Content-Type":"application/json",
			"Access-Control-Allow-Origin":"*", // REQUIRED CORS HEADER
			"Access-Control-Allow-Headers":"Origin, X-Requested-With, Content-Type, Accept" // REQUIRED CORS HEADER
		});
		response.end(JSON.stringify({dummy:"dummy"}));
		break;
	case "OPTIONS": // THE CLIENT OCCASIONALLY - NOT ALWAYS - CHECKS THIS
		response.writeHead(200, {
			"Access-Control-Allow-Origin":"*", // REQUIRED CORS HEADER
			"Access-Control-Allow-Methods":"GET, POST, DELETE, PUT, PATCH", // REQUIRED CORS HEADER
			"Access-Control-Allow-Headers":"Origin, X-Requested-With, Content-Type, Accept" // REQUIRED CORS HEADER
		});
		response.end();
		break;
	default:
		response.writeHead(405, {
			"Content-Type":"application/json"
		});
		response.end(JSON.stringify({error:`method ${request.method} not allowed`}));
		break;
	}
});

app.use(cors())
/********start  required routers*******/
const userRouter = require('./routes/user.route');
const categoryRouter = require('./routes/category.route');
const cartRouter = require('./routes/cart.route');
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



/********start  use routers*******/
app.use(userRouter)
app.use(categoryRouter)
app.use(cartRouter)
app.use(favouriteRouter)
app.use(productRouter)
/********end  use routers*******/



/***********server listen************/
server.listen(port, () => console.log(`http://localhost:${port}`))
/***********server listen************/