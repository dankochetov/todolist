var express = require('express');
var passport = require('passport');
var router = express.Router();

router.get('/', function(req, res, next) {
   if (!req.isAuthenticated()) {
       res.render('auth');
   }
   else {
       next();
   }
});

router.get('/vk', passport.authenticate('vkontakte'));
router.get('/vk/cb', passport.authenticate('vkontakte', {
    failureRedirect: '/auth',
    successRedirect: '/'
}));

router.get('/fb', passport.authenticate('facebook'));
router.get('/fb/cb', passport.authenticate('facebook', {
    failureRedirect: '/auth',
    successRedirect: '/'
}));

router.get('/logout', function(req, res, next) {
    req.logout();
    res.redirect('/auth');
});

module.exports = router;
