var express = require('express');
var router = express.Router();
var passport = require('passport');
var baibaomodel = require('../models/BaiBao.model');
var auth = require('../middlewares/auth');
var thanhvien = require('../models/user.model');

router.get('/', (req, res) => {
    res.render('DoiMatKhau');
})

router.post('/changePassWord', (req, res) => {
    var idthanhvien = req.user.idThanhVien;
    thanhvien.singlesua(idthanhvien).then(rows => {


        if (req.user.MatKhau === req.body.oldPassword) {
            if (req.body.newPassword === req.body.confirmPassword)
                rows[0].MatKhau = req.body.newPassword; // mật khẩu mới
            thanhvien.capnhat(rows[0]);
            req.user.MatKhau = req.body.newPassword;
            res.redirect('/DoiMatKhau');

        }


    })

})
module.exports = router;

// req.logIn(user, err => {
//     userModel.getPassByEmail(user.Email).then(tk => {
//         if (tk[0].PhanHe == 3) {
//             return res.redirect('/');
//         }
//         if (tk[0].PhanHe == 2) {
//             return res.redirect('/');
//         }
//         if (tk[0].PhanHe == 1) {
//             return res.redirect('/');
//         }
//         if (tk[0].PhanHe == 4) {
//             return res.redirect('/');
//         } else {
//             return res.redirect('/Admin');
//         }
//     })