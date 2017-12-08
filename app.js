var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var index = require('./routes/index');
var admin = require('./routes/admin');
var apiV1 = require('./routes/apiV1');
//var users = require('./routes/users');
var mongoose = require('mongoose');

var app = express();

var  express  =  require('express');
var  express_handlebars   =  require('express-handlebars');
var  express_handlebars_sections  =  require('express-handlebars-sections'); 
var  app  =  express(); 
let  hbs  =  express_handlebars.create({
    defaultLayout: 'layout',
         // properties used by express-handlebars configuration ... 
    extname: '.hbs'
});

express_handlebars_sections(hbs);   
// CONFIGURE 'express_handlebars_sections' 
 
app.engine('hbs', hbs.engine);

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

if (app.get('env') == 'development') {
    var browserSync = require('browser-sync');
    var config = {
        files: ["public/**/*.{js,css}", "client/*.js", "sass/**/*.scss", "views/**/*.hbs"],
        logLevel: 'debug',
        logSnippet: false,
        reloadDelay: 3000,
        reloadOnRestart: true
    };
    var bs = browserSync(config);
    var cbs = require('connect-browser-sync');
    app.use(cbs(bs));
    mongoose.connect('mongodb://127.0.0.1:27017/ecotour', {
        useMongoClient: true
    });
} else {
    mongoose.connect('mongodb://newuser:Start2017@ds135186.mlab.com:35186/heroku_6ns1b38c', {
        useMongoClient: true
    });
}


mongoose.Promise = global.Promise;

app.use('/', index);
app.use('/admin', admin);
app.use('/api/v1', apiV1);
//app.use('/users', users);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handler
app.use(function(err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});

module.exports = app;