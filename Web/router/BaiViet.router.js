var express = require('express');
var router = express.Router();


var baibaomodel= require('../models/BaiBao.model');

router.get('/:id', (req, res) => {
    baibaomodel.single(req.params.id).then(rows=>{
        
        baibaomodel.baivietcungchuyenmuc(rows[0].ChuyenMuc).then(rows_baicungchuyenmuc=>{
            
            res.render('BaiViet.hbs',{
                baibao: rows[0],
                baibaocungchuyenmuc :rows_baicungchuyenmuc,
            })
        })
        
    })
    

})



module.exports = router;