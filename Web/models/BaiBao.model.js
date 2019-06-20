var db = require('../utils/db')
module.exports = {
    noibat: () => {
        return db.load(`select * from baibao where Xoa !=1 order by luotXem desc limit 5 `);
    },
    add: entity => {
        return db.add('thanhvien', entity)
    },

    noibat_10: () => {
        return db.load(`select *, date_format(NgayDang,"%d-%m-%Y") as NgayDangBai from baibao where Xoa!=1 order by luotXem desc limit 10 `);
    },
    moinhat: () => {
        return db.load(`select *, date_format(NgayDang,"%d-%m-%Y") as NgayDangBai from baibao where Xoa!=1 order by NgayDangBai desc limit 10 `);
    },
    
    single: id => {
        return db.load(`select *, date_format(NgayDang,"%d-%m-%Y") as NgayDangBai from baibao b  join chuyenmuc c on b.ChuyenMuc = c.idChuyenMuc where b.idBaiBao = ${id} and  b.Xoa!=1   `);
        
    },
    single1: id => {
        return db.load(`select *, date_format(NgayDang,"%d-%m-%Y") as NgayDangBai from nhantag nt join tag_baibao tb on nt.idTag = tb.idTag  join  baibao b on tb.idBaiBao= b.idBaiBao  join chuyenmuc c on b.ChuyenMuc = c.idChuyenMuc where b.idBaiBao = ${id} and  b.Xoa!=1   `);
        
    },
    singlebyid: id =>{
        return db.load(`select *, date_format(NgayDang,"%d-%m-%Y") as NgayDangBai from baibao where idBaiBAo= ${id} and Xoa!=1`);
    },
    baivietcungchuyenmuc: idCM => {
        return db.load(`select *, date_format(NgayDang,"%d-%m-%Y") as NgayDangBai from baibao  where ChuyenMuc = ${idCM} and Xoa!=1 order by NgayDangBai DESC`)
    },
    bvnoibatnhat10huyenmucnoibat: () => {
        return db.load(`SELECT*, date_format(b2.NgayDang,"%d-%m-%Y") as NgayDangBai from baibao b2 JOIN (select b.chuyenmuc as id, c.TenCM, SUM( b.luotxem) as "tong luot xem" from baibao b join chuyenmuc c on b.ChuyenMuc = c.idChuyenMuc WHERE c.LoaiCM!=0 and b.Xoa!=1 GROUP BY b.chuyenmuc ORDER BY SUM( b.luotxem) DESC LIMIT 10) as bang2 on b2.ChuyenMuc = bang2.id GROUP by b2.ChuyenMuc ORDER by b2.luotXem DESC`);
    },
    update: entity => {
        return db.update(`baibao`, `idBaiBao`, entity);
    },
    timkiembaibao: ten => {
        return db.load(`select *, date_format(NgayDang,"%d-%m-%Y") as NgayDangBai from baibao bb join chuyenmuc cm on bb.Chuyenmuc = cm.idChuyenmuc where TenBaiBao like "%${ten}%" or TenCM like "%${ten}%" or NoiDung like "%${ten}%" or NoiDungTomTat like "%${ten}%" group by idbaibao order by NgayDangBai DESC `)
    }
  
}