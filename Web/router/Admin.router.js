var express = require('express');
var router = express.Router();

router.get('/', (req, res) => {
    res.render('Admin_QLbaiviet');
})


module.exports = router;