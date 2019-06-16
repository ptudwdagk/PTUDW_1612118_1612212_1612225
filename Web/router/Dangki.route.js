var express = require('express');
var router = express.Router();
var passport = require('passport');
var baibaomodel = require('../models/BaiBao.model');
var auth = require('../middlewares/auth');

router.get('/', (req, res) => {
    res.render('Dangki');
})

router.post('/', (req, res) => {
    var temp = req.body;

    entity = {
        HoTen: temp.ten,
        Email: temp.email,
        PhanHe: 1,
        MatKhau: temp.matkhau
    }
    baibaomodel.add(entity);
    res.redirect('/login')
})
module.exports = router;