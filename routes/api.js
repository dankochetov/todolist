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

module.exports = router;
