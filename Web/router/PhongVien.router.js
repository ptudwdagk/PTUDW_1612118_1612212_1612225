var express = require('express');
var router = express.Router();

var chuyenmuc = require('../models/ChuyenMuc.model');
var dangbai = require('../models/postModal')
var tagg = require('../models/tagmodel')
var baiviettagmodel = require('../models/baiviettagmodel')
var baidaxuatban = require('../models/Baivietdaxuatban.model');
var baibaomodel = require('../models/BaiBao.model');
var multer = require('multer');
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'public/uploads/');
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + file.originalname)
    }
})
var upload = multer({ storage: storage });




router.get('/danhsachbaiviet', (req, res) => {
    baidaxuatban.daxuatban(req.user.idThanhVien).then(rows => {
        baidaxuatban.dangchoxuatbantheowriter(req.user.idThanhVien).then(rows_choxuatban => {
            baidaxuatban.bituchoitheowriter(req.user.idThanhVien).then(rows_bituchoi => {
                baidaxuatban.chuaduocduyettheowriter(req.user.idThanhVien).then(rows_chuaduocduyet => {
                    res.render('PhongVienDanhSachBaiViet.hbs', {
                        BVdaxuatban: rows,
                        BaiVietDangChoXuatBan: rows_choxuatban,
                        BaiVietBiTuChoi: rows_bituchoi,
                        BaiVietChuaDuocDuyet: rows_chuaduocduyet,
                    })
                });
            })
        })
    })
})
router.get('/', (req, res) => {
    chuyenmuc.chuyenmucnho().then(rows => {

        res.render('PhongVien.hbs', {
            CMNho: rows,

        })
    });
})
router.get('/:id', (req, res) => {
    baibaomodel.single(req.params.id).then(rows => {
        tagg.single(req.params.id).then(tag_rows => {
            chuyenmuc.chuyenmucnho().then(rows_cm => {
                var i;
                for (i = 0; i < rows_cm.length; i++) {
                    if (rows_cm[i].idChuyenMuc == rows[0].ChuyenMuc) {
                        rows_cm[i].isSelected = true;
                    }
                    else rows_cm[i].isSelected = false;
                }

                res.render('PhongVien.hbs', {
                    baibaocansua: rows[0],
                    CMNho: rows_cm,
                    tag: tag_rows,
                })
            })
        })
    })


})

router.post('/', upload.single('anhdaidien'), (req, res) => {
    var fileinfo = '/uploads/' + req.file.filename;
    var now = new Date();
    var month = now.getMonth() + 1;
    var day = now.getFullYear() + '/' + month + '/' + now.getDate();
    var entity = {
        TenBaiBao: req.body.tieude,
        ChuyenMuc: req.body.chuyenmuc,
        TacGia: req.user.idThanhVien,
        NgayDang: day,
        TrangThai: 3,
        NoiDung: req.body.noidung,
        NoiDungTomTat: req.body.tomtat,
        AnhDaiDien: fileinfo,
        Premium: 0,
        luotXem: 0,

    }

    dangbai.add(entity).then(baivietid => {
        var alltag = req.body.tags.split(';');
        alltag.pop();
        for (var tag of alltag) {
            tagg.add({ tenTag: tag }).then(tagid => {
                baiviettagmodel.add({
                    idTag: tagid,
                    idBaiBao: baivietid,
                })
            }).catch(err => {
                console.log(err);
            });

        }
        res.redirect('/writer')

    }).catch(err => {
        console.log(err);
    });
})

router.post('/:id', upload.single('anhdaidien'), (req, res) => {
    console.log(req.params.id);
    baibaomodel.singlebyid(req.params.id).then(rows => {
        console.log(rows);
        var fileinfo = '/uploads/' + req.file.filename;
        var now = new Date();
        var month = now.getMonth() + 1;
        var day = now.getFullYear() + '/' + month + '/' + now.getDate();

        rows[0].TenBaiBao = req.body.tieude;
            rows[0].ChuyenMuc = req.body.chuyenmuc;
            rows[0].TacGia = req.user.idThanhVien;
            rows[0].NgayDang = day;
            rows[0].TrangThai = 3;
            rows[0].NoiDung = req.body.noidung;
            rows[0].NoiDungTomTat = req.body.tomtat;
            rows[0].AnhDaiDien = fileinfo;
            rows[0].Premium = 0;
            rows[0].luotXem = 0;
            delete rows[0]['NgayDangBai'];
            console.log(rows);

        dangbai.update(rows[0]).then(baivietid => {
            console.log(baivietid);
            var alltag = req.body.tags.split(';');
            alltag.pop();
            for (var tag of alltag) {
                tagg.update({ tenTag: tag }).then(tagid => {
                    baiviettagmodel.update({
                        idTag: tagid,
                        idBaiBao: baivietid,
                    })
                }).catch(err => {
                    console.log(err);
                });

            }
            res.redirect('/writer/danhsachbaiviet')
        })
    }).catch(err => {
        console.log(err);
    });
})


module.exports = router;