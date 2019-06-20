var express = require('express');
var router = express.Router();
var chuyenmuc = require('../models/ChuyenMuc.model');
var choxuatban = require('../models/Baivietdaxuatban.model')
var baibao = require('../models/BaiBao.model');
var baidaduyet = require('../models/Baivietdaxuatban.model')
var danhsachtag = require('../models/tagmodel')
var thanhvien = require('../models/user.model');
var phanhe = require('../models/user.model');
router.get('/xemdanhsachbaiviet/:id', (req, res) => {
    if (req.params.id != null) {
        chuyenmuc.chuyenmucnho().then(rows => {

            var temp = [];
            var i;
            for (i = 0; i < rows.length; i++) {
                if (rows[i].idChuyenMuc == req.params.id) {
                    rows[i].isSelected = true;
                }
                else rows[i].isSelected = false;
            }

            baidaduyet.baivietdaduyet(req.params.id).then(row => {
                res.render('Admin_QlbaiViet', {
                    CMNho: rows,
                    baiviet: row,
                })
            })
        })
    } else {
        console.log('...');
    }
})
//nguoi dung
router.get('/xemdanhsachnguoidung/:id', (req, res) => {
    if (req.params.id != null) {
        thanhvien.all().then(rows => {

            res.render('Admin_QlNguoiDung', {
                dsThanhVien: rows,
            })


        });
    } else {
        console.log('...');
    }

})
router.get('/profile/:id', (req, res) => {
    if (req.params.id != null) {
        thanhvien.single(req.params.id).then(rows => {
            thanhvien.heNguoiDung(rows[0].PhanHe).then(row => {
                console.log(row);
                phanhe.dsPhanHe().then(row_dsph => {
                    res.render('In4NguoiDung', {
                        infoThanhVien: rows[0],
                        PhanHe: row[0],
                        dsphanhe: row_dsph,
                    })
                })
            })
        })
    }
})
router.post('/approvepost_update', (req, res) => {
    var idthanhvien = req.body.idtv;

    thanhvien.singlesua(idthanhvien).then(rows => {

        rows[0].PhanHe = req.body.tenph;
        thanhvien.capnhat(rows[0]).then(roww => {
            res.redirect('/admin/' + req.body.idtv)
        })





    })

})
// bai viet
router.get('/xemdanhsachbaiviet/:id', (req, res) => {
    if (req.params.id != null) {
        chuyenmuc.chuyenmucnho().then(rows => {

            var temp = [];
            var i;
            for (i = 0; i < rows.length; i++) {
                if (rows[i].idChuyenMuc == req.params.id) {
                    rows[i].isSelected = true;
                } else rows[i].isSelected = false;
            }

            baidaduyet.baivietdaduyet(req.params.id).then(row => {
                res.render('Admin_QlbaiViet', {
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

    chuyenmuc.chuyenmucnho().then(rows => {
        res.redirect('/admin/xemdanhsachbaiviet/' + rows[0].idChuyenMuc);
    });

})

router.get('/duyetbai/:id', (req, res) => {
    if (req.params.id != null) {
        chuyenmuc.chuyenmucnho().then(rows => {

            var temp = [];
            var i;
            for (i = 0; i < rows.length; i++) {
                if (rows[i].idChuyenMuc == req.params.id) {
                    rows[i].isSelected = true;
                }
                else rows[i].isSelected = false;
            }

            choxuatban.dangchoxuatban(req.params.id).then(row => {
                res.render('BaiVietDaDuyet', {
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

    chuyenmuc.chuyenmucnho().then(rows => {
        res.redirect('/admin/duyetbai/' + rows[0].idChuyenMuc);
    });
})

router.get('/qltag', (req, res) => {

    danhsachtag.dstag().then(rows => {
        res.render('Admin_Qltags', {
            tags: rows,
        });
    });
})
router.get('/qlchuyenmuc', (req, res) => {

    console.log('alksdjlkasjldasd');
    chuyenmuc.menu().then(row => {

        res.render('Admin_Qlchuyenmuc', {

            chuyenmuc: row,
        })

    });
})

router.post('/qltag/xoatag/:idtag', (req, res) => {
    var idtag = req.params.idtag;
    console.log(idtag);
    danhsachtag.singgletag(idtag).then(rows => {
        rows[0].Xoa = 1;
        danhsachtag.update(rows[0]).then(a => {
            res.redirect('/admin/qltag');
        });
    });
})
router.post('/qltag/suatag/:idtag', (req, res) => {
    var idtag = req.params.idtag;
    danhsachtag.singgletag(idtag).then(rows => {
        rows[0].tenTag = req.body.tagmoi;
        danhsachtag.update(rows[0]).then(a => {
            res.redirect('/admin/qltag');
        });
    });
})

router.post('/qlchuyenmuc/xoacm/', (req, res) => {
    var idcmuc = req.body.idcm;
    var idcm1 = req.body.idcm1;
    var idcm2 = req.body.idcm2;
    chuyenmuc.chuyenmucidcm(idcmuc).then(rows => {
        chuyenmuc.chuyenmucidcm(idcm1).then(rows1 => {
            chuyenmuc.chuyenmucidcm(idcm2).then(rows2 => {
                rows[0].Xoa = 1;
                rows1[0].Xoa = 1;
                rows2[0].Xoa = 1;
                chuyenmuc.update(rows[0]);
                chuyenmuc.update(rows1[0]);
                chuyenmuc.update(rows2[0]).then(a => {
                    res.redirect('/admin/qlchuyenmuc');
                });

            })

        })
        
    });
})

router.post('/qlchuyenmuc/suacm/', (req, res) => {
    var idcmuc = req.body.idcm;
    var idcm1 = req.body.idcm1;
    var idcm2 = req.body.idcm2;
    chuyenmuc.chuyenmucidcm(idcmuc).then(rows => {
        chuyenmuc.chuyenmucidcm(idcm1).then(rows1 => {
            chuyenmuc.chuyenmucidcm(idcm2).then(rows2 => {
                rows[0].TenCM = req.body.cm;
                rows1[0].TenCM = req.body.cm1;
                rows2[0].TenCM = req.body.cm2;
                chuyenmuc.update(rows[0]).then(b => {
                    chuyenmuc.update(rows1[0]).then(c => {
                        chuyenmuc.update(rows2[0]).then(a => {
                            res.redirect('/admin/qlchuyenmuc');
                        });
                    });
                })


            })

        })
    });
})

router.post('/qlchuyenmuc/them/', (req, res) => {
    var cm = {
        TenCM : req.body.cm,
        LoaiCM: 0,
    }

    chuyenmuc.add(cm).then(id => {
        var cm1 = {
            TenCM : req.body.cm1,
            LoaiCM:id,
        }
        chuyenmuc.add(cm1).then(id1 => {
            var cm2 = {
                TenCM : req.body.cm2,
                LoaiCM:id,
            }
            chuyenmuc.add(cm2).then(id2 => {
                res.redirect('/admin/qlchuyenmuc');
            })
        })
    })
})

router.post('/adminduyetbai', (req, res) => {
    var idBaiBao = req.body.idchuyenmuc1;
    baibao.singlebyid(idBaiBao).then(rows => {
        rows[0].NgayDang = req.body.day;
        rows[0].TrangThai = 2;
        delete rows[0]['NgayDangBai'];
        baibao.update(rows[0]);
        res.redirect('/admin/duyetbai/');
    });
})
router.post('/admintuchoi', (req, res) => {
    var idBaiBao = req.body.idchuyenmuc;
    baibao.singlebyid(idBaiBao).then(rows => {
        rows[0].LyDo = req.body.lydo;
        rows[0].TrangThai = 4;
        delete rows[0]['NgayDangBai'];
        baibao.update(rows[0]);
        res.redirect('/admin/duyetbai/');
    })

})
router.post('/xemdanhsachbaiviet/xoabai/:id', (req, res) => {
    var idBaiBao = req.params.id;
    baibao.singlebyid(idBaiBao).then(rows => {
        rows[0].Xoa = 1;
        delete rows[0]['NgayDangBai'];
        baibao.update(rows[0]).then(a => {
            res.redirect('/admin/xemdanhsachbaiviet/');
        });

    });
})
router.post('/xemdanhsachbaiviet/xoabai/:id', (req, res) => {

    var idBaiBao = req.params.id;
    baibao.singlebyid(idBaiBao).then(rows => {
        rows[0].Xoa = 1;
        delete rows[0]['NgayDangBai'];
        baibao.update(rows[0]);
        res.redirect('/admin/xemdanhsachbaiviet/');
    });
})
module.exports = router;