var express = require('express');
var router = express.Router();
var passport = require('passport');
var baibaomodel = require('../models/BaiBao.model');
var auth = require('../middlewares/auth');

var thanhvien = require('../models/user.model');
router.get('/', (req, res) => {
    res.render('In4NguoiDung');
})


module.exports = router;