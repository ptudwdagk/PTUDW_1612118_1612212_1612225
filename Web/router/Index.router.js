var express = require('express');
var router = express.Router();


var baibaomodel= require('../models/BaiBao.model');

router.get('/', (req, res) => {
    baibaomodel.noibat().then(rows=> {
      baibaomodel.noibat_10().then(rows_10bainoibat=>{
      baibaomodel.moinhat().then(moinhatrows=>{
       
        baibaomodel.bvnoibatnhat10huyenmucnoibat().then(bvchuyenmucnoibat_rows=>{

          res.render('index.hbs',{
            bonbaibao: rows,
            muoibaibao:rows_10bainoibat,
            baimoinhat: moinhatrows,
            baithuocchuyenmucnoibat : bvchuyenmucnoibat_rows,
        })
        })

      })

      
          
       })

    });
    

})
router.post('/timkiem',(req,res)=>{
  
  baibaomodel.timkiembaibao(req.body.ten).then(rows_timkiem=>{
    baibaomodel.noibat_10().then(rows_10bainoibat=>{
      baibaomodel.moinhat().then(moinhatrows=>{
      res.render('timkiem',{
        baiviettimkiem: rows_timkiem,
        muoibaibao:rows_10bainoibat,
        baimoinhat: moinhatrows,
      })
    })      
  }) 
}) 
}) 


// router.post('/post', (req, res) => {
//     var txtarea = req.body.text;
//     var txtinput = req.body.ip;
    
//     console.log(txtarea + ' - ' + txtinput);
//     res.redirect('/');
// })

module.exports = router ;