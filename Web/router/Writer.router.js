var express = require('express');
var router = express.Router();
var baidaxuatban= require('../models/Baivietdaxuatban.model');
router.get('/', (req, res) => {
    baidaxuatban.daxuatban().then(rows=> {

       res.render('PhongVien.hbs',{
           BVdaxuatban: rows,
          
       })

     

    });
    

})




module.exports = router;