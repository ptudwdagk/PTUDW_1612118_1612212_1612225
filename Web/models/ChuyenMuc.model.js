var db = require('../utils/db');

var result = {
    all: () => {
        return db.load(`select * from chuyenmuc where LoaiChuyenMuc = 0 `);
    },
    // menu: () => {
    //     // return db.load(select * from chuyenmuc where LoaiCM = 0);
    //     return db.load(`SELECT bang1.idChuyenMuc as idcon1, bang1.TenCM as con1, bang2.TenCM AS con2, bang2.idChuyenMuc AS idcon2,bang2.LoaiCM, cm3.TenCM FROM (SELECT TenCM, LoaiCM, idChuyenMuc FROM chuyenmuc WHERE LoaiCM != 0 AND Xoa = 0 GROUP BY LoaiCM) AS bang1, (SELECT cm.TenCM, cm.LoaiCM, cm.idChuyenMuc FROM chuyenmuc as cm WHERE cm.LoaiCM != 0 AND cm.Xoa = 0) as bang2, chuyenmuc as cm3 WHERE bang2.TenCM != bang1.TenCM AND bang1.LoaiCM = bang2.LoaiCM AND bang2.LoaiCM = cm3.idChuyenMuc`);
    //   },
}

module.exports = result;