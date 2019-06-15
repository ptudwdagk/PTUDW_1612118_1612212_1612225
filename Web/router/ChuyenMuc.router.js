var express = require('express');
var router = express.Router();

var baibaomodel= require('../models/BaiBao.model');
var chuyenmucmodel= require('../models/ChuyenMuc.model');

router.get('/:id', (req, res) => {
    chuyenmucmodel.single(req.params.id).then(rows=>{
         console.log(rows);
         baibaomodel.noibat_10().then(rows_10bainoibat=>{
            baibaomodel.moinhat().then(moinhatrows=>{
           
                res.render('Page.hbs',{
                    baivietchuyenmuc: rows,
                
                  muoibaibao:rows_10bainoibat,
                  baimoinhat: moinhatrows,
                 
              })
           
            })
       
             })
  
    })
    

})



module.exports = router;