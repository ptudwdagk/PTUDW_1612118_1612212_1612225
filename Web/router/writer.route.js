var express = require('express');
var router = express.Router();

router.get('/post', (req, res) => {
    var txtarea = 'Duc';
    var txtinput = 'DDD';
    res.render('aaa.hbs', {
        a : txtarea,
        b : txtinput,
    });
})

router.post('/post', (req, res) => {
    var txtarea = req.body.text;
    var txtinput = req.body.ip;
    
    console.log(txtarea + ' - ' + txtinput);
    res.redirect('/');
})

module.exports = router;