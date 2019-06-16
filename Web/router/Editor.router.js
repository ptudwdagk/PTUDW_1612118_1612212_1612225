var express = require('express');
var router = express.Router();
var chuyenmuc= require('../models/ChuyenMuc.model');
var choxuatban= require('../models/Baivietdaxuatban.model')

router.get('/:id', (req, res) => {
    if (req.params.id != null)
    {
            chuyenmuc.chuyenmucnho().then(rows=> {

                var temp = [];
                var i;
                for(i = 0; i < rows.length; i++){
                    if (rows[i].idChuyenMuc == req.params.id){
                        rows[i].isSelected = true;
                    }
                    else rows[i].isSelected = false;
                }
                console.log(rows);
        choxuatban.dangchoxuatban(req.params.id).then(row =>{
            res.render('BienTapVien.hbs',{
                CMNho: rows,
                baiviet: row,
            })
        })
    });
    } else {
        console.log('maybingua');
    }

})

router.get('/', (req, res) => {

    chuyenmuc.chuyenmucnho().then(rows=> {
        res.redirect('/editor/' + rows[0].idChuyenMuc);
    });

})


module.exports = router;