var express = require('express');
var router = express.Router();
var chuyenmuc= require('../models/ChuyenMuc.model');
var choxuatban= require('../models/Baivietdaxuatban.model')
var baibao= require('../models/BaiBao.model');
var baidaduyet=require('../models/Baivietdaxuatban.model')

router.get('/xemdanhsachbaiviet/:id', (req, res) => {
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
              
        baidaduyet.baivietdaduyet(req.params.id).then(row =>{
            res.render('Admin_QlbaiViet',{
                CMNho: rows,
                baiviet: row,
            })
        })
    });
    } else {
        console.log('...');
    }

})
router.get('/xemdanhsachbaiviet', (req, res) => {

    chuyenmuc.chuyenmucnho().then(rows=> {
        res.redirect('/admin/xemdanhsachbaiviet/' + rows[0].idChuyenMuc);
    });

})

router.get('/duyetbai/:id', (req, res) => {
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
              
        choxuatban.dangchoxuatban(req.params.id).then(row =>{
            res.render('BaiVietDaDuyet',{
                CMNho: rows,
                baiviet: row,
            })
        })
    });
    } else {
        console.log('...');
    }

})
router.get('/duyetbai', (req, res) => {

    chuyenmuc.chuyenmucnho().then(rows=> {
        res.redirect('/admin/duyetbai/' + rows[0].idChuyenMuc);
    });

})
router.post('/adminduyetbai',(req,res)=>{

    var idBaiBao = req.body.idchuyenmuc;     
        baibao.singlebyid(idBaiBao).then(rows=>{
        rows[0].NgayDang=req.body.day;
        rows[0].TrangThai=2;
        baibao.update(rows[0]);
        res.redirect('/admin/duyetbai/');    
    }) ;
})


module.exports = router;