var db = require('../utils/db');

var result = {
    all: () => {
        return db.load(`select * from chuyenmuc where LoaiCM = 0 `);
    },
    
    menu: () => {
        
        return db.load(`SELECT bang1.idChuyenMuc as idcm1, bang1.TenCM as cm1, bang2.TenCM AS cm2, bang2.idChuyenMuc AS idcm2,bang2.LoaiCM, cm3.TenCM FROM (SELECT TenCM, LoaiCM, idChuyenMuc FROM chuyenmuc WHERE LoaiCM != 0 GROUP BY LoaiCM) AS bang1, (SELECT cm.TenCM, cm.LoaiCM, cm.idChuyenMuc FROM chuyenmuc as cm WHERE cm.LoaiCM != 0  ) as bang2, chuyenmuc as cm3 WHERE bang2.TenCM != bang1.TenCM AND bang1.LoaiCM = bang2.LoaiCM AND bang2.LoaiCM = cm3.idChuyenMuc`);
    },
    single:id => {
      return db.load(`select *  from baibao b join  chuyenmuc c on b.ChuyenMuc = c.idChuyenMuc  where ChuyenMuc = ${id} `);
  },

}

module.exports = result;
