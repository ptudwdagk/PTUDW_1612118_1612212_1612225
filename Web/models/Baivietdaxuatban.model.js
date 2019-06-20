var db =require('../utils/db')
module.exports= {
    daxuatban:id  => {
        return db.load(`select * from baibao where TacGia= ${id} and TrangThai=1 and Xoa!=1`);
    },
    dangchoxuatbantheowriter: id =>{
       return db.load(`select * from baibao where TacGia= ${id} and TrangThai=2 and Xoa!=1 `);
    },
    chuaduocduyettheowriter: id =>{
        return db.load(`select * from baibao where TacGia= ${id} and TrangThai=3 and Xoa!=1 `);
     },
     bituchoitheowriter: id =>{
        return db.load(`select * from baibao where TacGia= ${id} and TrangThai=4 and Xoa!=1 `);
     },
    dangchoxuatban: id  =>{
        return db.load(`select bb.idBaiBao, bb.TenBaiBao,bb.NgayDang,tv.HoTen,cm.TenCM,date_format(NgayDang,"%d-%m-%Y") as NgayDangBai  from baibao bb, chuyenmuc cm, thanhvien tv where bb.ChuyenMuc=cm.idChuyenMuc and bb.TacGia=tv.idThanhVien and bb.TrangThai=3 and bb.Xoa!=1 and bb.ChuyenMuc= ${id}` )
    },
    baivietdaduyet: id=>{
        return db.load(`select *, date_format(NgayDang,"%d-%m-%Y") as NgayDangBai  from baibao bb, chuyenmuc cm, thanhvien tv where bb.ChuyenMuc=cm.idChuyenMuc and bb.TacGia=tv.idThanhVien and (bb.TrangThai=1 or bb.TrangThai=2)  and bb.ChuyenMuc= ${id} and bb.Xoa!=1 group by idBaiBao` )
    },


}