var express = require('express');
var mongoose = require('mongoose');
var db = mongoose.connection;
var User = require('../models/user');
var router = express.Router();

router.get('/getname', function (req, res, next) {
    if (req.isAuthenticated()) {
        User.findOne({
            _id: req.user.id
        }, function (err, user) {
            if (err) {
                return next(err);
            }
            res.contentType('text/json');
            res.end(JSON.stringify({
                name: user.name
            }));
        });
    }
    else {
        res.status(401);
        res.end();
    }
});

router.get('/gettodos', function (req, res, next) {
    if (req.isAuthenticated()) {
        User.findOne({
            _id: req.user.id
        }, function (err, user) {
            if (err) {
                return next(err);
            }
            res.contentType('text/json');
            res.end(JSON.stringify({
                todos: user.todos
            }));
        });
    }
    else {
        res.status(401);
        res.end();
    }
});

router.post('/settodos', function (req, res, next) {
    if (req.isAuthenticated()) {
        User.update(
            {
                _id: req.user.id
            },
            {
                todos: req.body.todos || []
            },
            function (err, num) {
                if (err) {
                    return next(err);
                }
                res.end(JSON.stringify({
                    result: 'ok'
                }));
            }
        );
    }
    else {
        res.status(401);
        res.end();
    }
});

module.exports = router;
