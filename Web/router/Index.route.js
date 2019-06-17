var express = require('express');
var router = express.Router();


var baibaomodel= require('../models/BaiBao.model');

router.get('/', (req, res) => {
    baibaomodel.noibat().then(rows=> {
    

       res.render('index.hbs',{
           bonbaibao: rows,
          
       })

     

    });
    

})

// router.post('/post', (req, res) => {
//     var txtarea = req.body.text;
//     var txtinput = req.body.ip;
    
//     console.log(txtarea + ' - ' + txtinput);
//     res.redirect('/');
// })

module.exports = router;