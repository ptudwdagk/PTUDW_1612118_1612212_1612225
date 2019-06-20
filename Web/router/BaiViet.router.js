var express = require('express');
var router = express.Router();


var baibaomodel = require('../models/BaiBao.model');

router.get('/:id', (req, res) => {

    baibaomodel.single(req.params.id).then(rows => {
       
      
        if (rows[0].Premium != 1 ) {
            baibaomodel.baivietcungchuyenmuc(rows[0].ChuyenMuc).then(rows_baicungchuyenmuc => {

                res.render('BaiViet.hbs', {
                    baibao: rows[0],
                    baibaocungchuyenmuc: rows_baicungchuyenmuc,
                })
            })
        }
        else
        if ( !req.user && rows[0].Premium == 1)
        {
            res.render('loi');
        }
        else 
        if (req.user.HieuLuc > 0)
        {
            baibaomodel.baivietcungchuyenmuc(rows[0].ChuyenMuc).then(rows_baicungchuyenmuc => {

                res.render('BaiViet.hbs', {
                    baibao: rows[0],
                    baibaocungchuyenmuc: rows_baicungchuyenmuc,
                })
            })
        }
        else
       
        {
            res.render('loi');
        }    
        
    })


})



module.exports = router;