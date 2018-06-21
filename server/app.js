// require('./config/config'); //instantiate configuration variables
require('./global_functions'); //instantiate global functions

const env = process.env.NODE_ENV || 'development';
const config = require('./config/config.json')[env];
const createError = require('http-errors');
const express = require('express');
const path = require('path');
const logger = require('morgan');
const passport = require('passport');
// const cookieParser  = require('cookie-parser');

const models = require('./models');

// requiring routes
const indexRouter = require('./routes/index.server.route');
const utentiRouter = require('./routes/utenti.server.route');
const sksRouter = require('./routes/sks.server.route');

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({
    extended: false
}));
// app.use(cookieParser());
// app.use(express.static(path.join(__dirname, 'public')));

//Passport
app.use(passport.initialize());

// DB
models.sequelize.authenticate().then(() => {
    console.log('Connected to SQL database');
  })
  .catch(err => {
    console.error('Unable to connect to SQL database:', err);
  });
  if(config.database === 'sequelize_dev'){
    models.sequelize.sync();//creates tables from models
    // models.sequelize.sync({ force: true });//good for testing
  }
// CORS
app.use((req, res, next) => {
    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', '*');
    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With, content-type, Authorization, Content-Type');
    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);
    // Pass to next layer of middleware
    next();
});
// routes
// app.use('/', function(req, res){
// 	res.statusCode = 200;//send the appropriate status code
// 	res.json({status:"success", message:"Parcel Pending API", data:{}})
// });
app.use('/', indexRouter);
app.use('/utenti', utentiRouter);
app.use('/sks', sksRouter);

// catch 404 and forward to error handler
app.use((req, res, next) => {
    next(createError(404));
});

// error handler
app.use((err, req, res, next) => {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});

module.exports = app;