var express = require('express');
var router = express.Router();
var chuyenmuc = require('../models/ChuyenMuc.model');
var choxuatban = require('../models/Baivietdaxuatban.model')
var baibao = require('../models/BaiBao.model');

router.get('/:id', (req, res) => {
    if (req.params.id != null) {
        chuyenmuc.chuyenmucnho().then(rows => {

            var temp = [];
            var i;
            for (i = 0; i < rows.length; i++) {
                if (rows[i].idChuyenMuc == req.params.id) {
                    rows[i].isSelected = true;
                } else rows[i].isSelected = false;
            }

            choxuatban.dangchoxuatban(req.params.id).then(row => {
                res.render('BienTapVien.hbs', {
                    CMNho: rows,
                    baiviet: row,
                })
            })
        });
    } else {
        console.log('...');
    }

})

router.get('/', (req, res) => {

    chuyenmuc.chuyenmucnho().then(rows => {
        res.redirect('/editor/' + rows[0].idChuyenMuc);
    });

})
router.post('/duyetbai', (req, res) => {
    var idBaiBao = req.body.idchuyenmuc;
    baibao.singlebyid(idBaiBao).then(rows => {
        rows[0].NgaySinh = req.body.day;
        rows[0].TrangThai = 2;
        baibao.update(rows[0]);
        res.redirect('/editor');
    })

})


module.exports = router;