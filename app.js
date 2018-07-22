require('./config/config'); //instantiate configuration variables
require('./global_functions'); //instantiate global functions

console.log("Environment:", CONFIG.app);

// const env = process.env.NODE_ENV || 'development';
// const config = require('./config/config.json')[env];
const createError = require('http-errors');
const express = require('express');
const path = require('path');
const favicon = require('serve-favicon');
const logger = require('morgan');
const passport = require('passport');
// const cors = require('cors');
// const cookieParser  = require('cookie-parser');
// require('./config/passport');
const verifyToken = require('./middleware').verifyToken;

const models = require('./models');


// requiring routes
const authRouter = require('./routes/auth.server.route');

const indexRouter = require('./routes/index.server.route');
const utentiRouter = require('./routes/utenti.server.route');
const sksRouter = require('./routes/sks.server.route');
const pcRouter = require('./routes/pc.server.route');
const matricoleRouter = require('./routes/matricole.server.route');
const rinnoviRouter = require('./routes/rinnovi.server.route');
const clientiRouter = require('./routes/clienti.server.route');

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: false}));
// app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'dist/client')));
app.use('/', express.static(path.join(__dirname, 'dist/client')));

//Passport
app.use(passport.initialize());
//load passport strategies
require('./config/passport');

// DB
models.sequelize.authenticate().then(() => {
    console.log('Connected to SQL database', CONFIG.db_name);
  })
  .catch(err => {
    console.error('Unable to connect to SQL database:', CONFIG.db_name, err);
  });
  if(CONFIG.app==='dev'){
    models.sequelize.sync()//creates table if they do not already exist
    // models.sequelize.sync({ force: true });//deletes all tables then recreates them useful for testing and development purposes
    .then()
    .catch(err => console.assert(err));
  }
// CORS
app.use((req, res, next) => {
    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', '*');
    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With, content-type, Authorization, Content-Type, authorization');
    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);
    // Pass to next layer of middleware
    next();
});

// app.use(cors());
// Routes
app.use('/api/', indexRouter);

// app.options('/api/auth', cors());
app.use('/api/auth',  authRouter);

app.use('/api/utenti', verifyToken, utentiRouter);
app.use('/api/sks', verifyToken, sksRouter);
app.use('/api/pc', verifyToken, pcRouter);
app.use('/api/matricole', verifyToken, matricoleRouter);
app.use('/api/rinnovi', verifyToken, rinnoviRouter);
app.use('/api/clienti', verifyToken, clientiRouter);

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
    res.send(err);
});

module.exports = app;
