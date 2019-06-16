var express = require('express');
var router = express.Router();
var passport = require('passport');
var baibaomodel = require('../models/BaiBao.model');
var auth = require('../middlewares/auth');
router.get('/', (req, res) => {
    console.log(req.user);
    res.render('index');
})

module.exports = router;