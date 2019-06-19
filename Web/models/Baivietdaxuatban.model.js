var db =require('../utils/db')
module.exports= {
    daxuatban: () => {
        return db.load(`select *,date_format(NgayDang,"%d-%m-%Y") as NgayDangBai  from baibao where TacGia=4 and TrangThai=1 and Xoa!=1`);
    },
    dangchoxuatban: id  =>{
        return db.load(`select bb.idBaiBao, bb.TenBaiBao,bb.NgayDang,tv.HoTen,cm.TenCM,date_format(NgayDang,"%d-%m-%Y") as NgayDangBai  from baibao bb, chuyenmuc cm, thanhvien tv where bb.ChuyenMuc=cm.idChuyenMuc and bb.TacGia=tv.idThanhVien and bb.TrangThai=3 and bb.Xoa!=1 and bb.ChuyenMuc= ${id}` )
    },
    baivietdaduyet: id=>{
        return db.load(`select *, date_format(NgayDang,"%d-%m-%Y") as NgayDangBai  from baibao bb, chuyenmuc cm, thanhvien tv where bb.ChuyenMuc=cm.idChuyenMuc and bb.TacGia=tv.idThanhVien and (bb.TrangThai=1 or bb.TrangThai=2)  and bb.ChuyenMuc= ${id} and bb.Xoa!=1 group by idBaiBao` )
    },


}