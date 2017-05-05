var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');
var passport = require('passport');
var FacebookStrategy = require('passport-facebook').Strategy;
var VkontakteStrategy = require('passport-vkontakte').Strategy;
var User = require('./models/user');
var mongoose = require('mongoose');

mongoose.connect('mongodb://admin:admin@ds131621.mlab.com:31621/todolist');

passport.serializeUser(function (user, done) {
    done(null, user.id);
});

passport.deserializeUser(function (id, done) {
    User.findById(id, function (err, user) {
        done(err, user);
    });
});

passport.use(new VkontakteStrategy({
    clientID: '6017738',
    clientSecret: '3S1lekVHVeGC6NkXQsJN',
    callbackURL: '/auth/vk/cb',
    apiVersion: '5.37'
}, function (accessToken, refreshToken, profile, done) {
    User.findOrCreate({
        login: profile.id,
        name: profile.displayName
    }, function (err, user, created) {
        done(err, user);
    })
}));

passport.use(new FacebookStrategy({
    clientID: '444096675925208',
    clientSecret: '3a114f200812d2ddfd5ae77b024c8c2d',
    callbackURL: '/auth/fb/cb',
    enableProof: false,
    profileFields: ['displayName']
}, function (accessToken, refreshToken, profile, done) {
    User.findOrCreate({
        login: profile.id,
        name: profile.displayName
    }, function (err, user, created) {
        done(err, user);
    });
}));

var index = require('./routes/index');
var auth = require('./routes/auth');
var api = require('./routes/api');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

if (app.get('env') === 'development') {
    app.locals.pretty = true;
}

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({
    saveUninitialized: true,
    secret: 'SECRET',
    resave: true
}));
app.use(passport.initialize());
app.use(passport.session());

app.use('/', index);
app.use('/auth', auth);
app.use('/api', api);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handler
app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});

module.exports = app;
