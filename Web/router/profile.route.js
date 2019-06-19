var express = require('express');
var router = express.Router();
var passport = require('passport');
var baibaomodel = require('../models/BaiBao.model');
var auth = require('../middlewares/auth');

var thanhvien = require('../models/user.model');
router.get('/', (req, res) => {
    res.render('profile');
})

router.post('/approvepost', (req, res) => {
    var idthanhvien = req.user.idThanhVien;
    thanhvien.singlesua(idthanhvien).then(rows => {
        console.log(rows[0]);
        rows[0].HoTen = req.body.name;
        rows[0].NgaySinh = req.body.publishdate;
        console.log(req.body.name);
        console.log(rows[0]);
        thanhvien.capnhat(rows[0]);
        req.user.HoTen = req.body.name;
        req.user.NgaySinh = req.body.publishdate;
        res.redirect('/profile');
    })

})
module.exports = router;