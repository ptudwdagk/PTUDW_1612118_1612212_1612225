var express = require('express');
var router = express.Router();
var chuyenmuc= require('../models/ChuyenMuc.model');
var choxuatban= require('../models/Baivietdaxuatban.model')
var baibao= require('../models/BaiBao.model');
var baidaduyet=require('../models/Baivietdaxuatban.model')
var danhsachtag=require('../models/tagmodel')

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

router.get('/qltag', (req, res) => {

    danhsachtag.dstag().then(rows=> {
        res.render('Admin_Qltags',{
            tags: rows,
        });
    });
})


router.post('/adminduyetbai',(req,res)=>{
    var idBaiBao = req.body.idchuyenmuc;     
        baibao.singlebyid(idBaiBao).then(rows=>{
        rows[0].NgayDang=req.body.day;
        rows[0].TrangThai=2;
        delete rows[0]['NgayDangBai'];
        baibao.update(rows[0]);
        res.redirect('/admin/duyetbai/');    
    }) ;
})
router.post('/xemdanhsachbaiviet/xoabai/:id',(req,res)=>{
    
    var idBaiBao = req.params.id;     
        baibao.singlebyid(idBaiBao).then(rows=>{
        rows[0].Xoa = 1;
        delete rows[0]['NgayDangBai'];
        baibao.update(rows[0]);
        res.redirect('/admin/xemdanhsachbaiviet/');    
    }) ;
})


module.exports = router;