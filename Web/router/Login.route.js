var express = require('express');
var router = express.Router();
var passport = require('passport');
var baibaomodel = require('../models/BaiBao.model');
var auth = require('../middlewares/auth');

router.get('/', (req, res, next) => {
        res.render('login');
    })
    // router.post('/Login', (req, res, next) => {

// })
router.post('/', (req, res, next) => {
    passport.authenticate('local', (err, user, info) => {
        if (err)
            return next(err);

        if (!user) {
            return res.render('Login', {
                err_message: info.message
            })
        }
        req.logIn(user, err => {
            if (err)
                return next(err);
            return res.redirect('/')
        });
    })(req, res, next);
})
router.get('/index', auth, (req, res, next) => {
    res.end('index');
})

module.exports = router;