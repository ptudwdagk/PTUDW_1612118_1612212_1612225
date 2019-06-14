var express = require('express');
var router = express.Router();
var chuyenmuc= require('../models/ChuyenMuc.model');
var dangbai=require('../models/postModal')
router.get('/', (req, res) => {
    chuyenmuc.chuyenmucnho().then(rows=> {

       res.render('PhongVien.hbs',{
           CMNho: rows,
          
       })

     

    });
    

})
router.post('/',(req,res) => {

var entity = {
    TenBaiBao:req.body.tieude ,
    ChuyenMuc: req.body.chuyenmuc,
    TacGia: 1,
    NgayDang:"2018/10/07",
    TrangThai: 1,
    NoiDung: req.body.noidung,
    NoiDungTomTat:req.body.tomtat,
    AnhDaiDien:'đfff',
    Premium:0,
    luotXem: 0,

}
dangbai.add(entity).then(id => {
    console.log(id);
});
}
)



module.exports = router;