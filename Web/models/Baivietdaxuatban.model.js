var db =require('../utils/db')
module.exports= {
    daxuatban: () => {
        return db.load(`select * from baibao where TacGia=4 and TrangThai=1`);
    },
    dangchoxuatban: id  =>{
        return db.load(`select bb.idBaiBao, bb.TenBaiBao,bb.NgayDang,tv.HoTen,cm.TenCM from baibao bb, chuyenmuc cm, thanhvien tv where bb.ChuyenMuc=cm.idChuyenMuc and bb.TacGia=tv.idThanhVien and bb.TrangThai=1 and bb.ChuyenMuc= ${id}` )
    },


}