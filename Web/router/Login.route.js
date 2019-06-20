var express = require('express');
var router = express.Router();
var passport = require('passport');
var baibaomodel = require('../models/BaiBao.model');
var auth = require('../middlewares/auth');
var userModel = require('../models/BienTapVien.model');

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
            userModel.getPassByEmail(user.Email).then(tk => {
                if (tk[0].PhanHe == 3) {
                    return res.redirect('/editor');
                }
                if (tk[0].PhanHe == 2) {
                    return res.redirect('/writer');
                }
                if (tk[0].PhanHe == 1) {
                    return res.redirect('/');
                }
                if (tk[0].PhanHe == 4) {
                    return res.redirect('/Admin/xemdanhsachnguoidung/' + req.user.idThanhVien);
                } else {
                    return res.redirect('/');
                }
            })

        });
    })(req, res, next);
})
router.get('/index', auth, (req, res, next) => {
    res.end('index');
})
router.get('/logout', (req, res, next) => {
    req.logOut();
    res.redirect('/Login')
})
module.exports = router;