var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
    if (req.isAuthenticated()) {
        res.render('index');
    }
    else {
        res.redirect('/auth');
    }
});

module.exports = router;
