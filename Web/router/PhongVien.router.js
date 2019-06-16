var express = require('express');
var router = express.Router();
var chuyenmuc= require('../models/ChuyenMuc.model');
var dangbai=require('../models/postModal')
var tagg=require('../models/tagmodel')
var baiviettagmodel=require('../models/baiviettagmodel')
router.get('/', (req, res) => {
    chuyenmuc.chuyenmucnho().then(rows=> {

       res.render('PhongVien.hbs',{
           CMNho: rows,
          
       })
    });
})
router.post('/',(req,res) => {
var now= new Date();
var month= now.getMonth()+1;
var day=now.getFullYear()+'/'+month+'/'+now.getDate();
var entity = {
    TenBaiBao:req.body.tieude ,
    ChuyenMuc: req.body.chuyenmuc,
    TacGia: 1,
    NgayDang:day,
    TrangThai: 3,
    NoiDung: req.body.noidung,
    NoiDungTomTat:req.body.tomtat,
    AnhDaiDien:'đfff',
    Premium:0,
    luotXem: 0,

}
dangbai.add(entity).then(baivietid => {
    var alltag=req.body.tags.split(';');
    alltag.pop();
    for (var tag of alltag){
        tagg.add({tenTag: tag}).then(tagid =>{
            baiviettagmodel.add({
                idTag : tagid,
                idBaiBao : baivietid,
            })
        }).catch(err => {
            console.log(err);
        });

    }

}).catch(err => {
    console.log(err);
});
})




module.exports = router;