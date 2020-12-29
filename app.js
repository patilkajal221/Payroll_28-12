const path = require("path");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const ejs = require('ejs');
const cors = require("cors");
const logger = require("morgan");
const database = require("./middlewares/database");
const error = require("./middlewares/error");
const { sendRender,sendJson } = require("./middlewares/generateResponse");
const routes = require("./routes/index.routes");
const express = require("express");
const app = express();
const expressLayouts = require('express-ejs-layouts');
const session = require('express-session');
const { sessionSecretKey } = require('./config');

database.connect();


// //public path setup
app.use(express.static(path.join(__dirname, "public")));
app.use('/lib', express.static(path.join(__dirname, "node_modules")));


// view engine setup
app.set("views", path.join(__dirname, "views"));


app.use(cors());
app.use(logger("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(expressLayouts);
app.use(express.static(__dirname));
app.response.sendRender = sendRender;
app.response.sendJson = sendJson;

app.use(session({
    // key: 'user_sid',
    secret:sessionSecretKey.secret,   
    resave: true,
    saveUninitialized: true,
    }
));


app.set('view engine', '.ejs');

app.use('/', require('./routes/index.routes'));

// if error is not an instanceOf APIError, convert it.
app.use(error.converter);
// catch 404 and forward to error handler
app.use(error.notFound);
// error handler, send stacktrace only during development
app.use(error.handler);
// app.use(expressSession(session));


module.exports = app;
