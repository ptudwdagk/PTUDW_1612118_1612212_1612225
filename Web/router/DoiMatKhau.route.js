var express = require('express');
var router = express.Router();
var passport = require('passport');
var baibaomodel = require('../models/BaiBao.model');
var auth = require('../middlewares/auth');

router.get('/', (req, res) => {
    res.render('DoiMatKhau');
})

router.post('/', (req, res) => {

})
module.exports = router;