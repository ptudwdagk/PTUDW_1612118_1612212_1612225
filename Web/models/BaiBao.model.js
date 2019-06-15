var db =require('../utils/db')
module.exports= {
    noibat: () => {
        return db.load(`select * from baibao order by luotXem desc limit 5`);
    },
    noibat_10: () => {
        return db.load(`select * from baibao order by luotXem desc limit 10 `);
    },
    moinhat: ()=>{
        return db.load(`select * from baibao order by ngaydang desc limit 10 `);
    },
    moinhatmoichuyenmuc:()=> {
        return db.load(`select  distinct chuyenmuc from baibao order by ngaydang desc limit 6`);
    },
    single:id => {
        return db.load(`select *  from baibao b join chuyenmuc c on b.ChuyenMuc = c.idChuyenMuc where idBaiBao = ${id} `);
    },
    baivietcungchuyenmuc:idCM => {
        return db.load(`select * from baibao  where ChuyenMuc = ${idCM}`)
    },
    bvnoibatnhat10huyenmucnoibat:()=>{
        return db.load(`SELECT* from baibao b2 JOIN (select b.chuyenmuc as id, c.TenCM, SUM( b.luotxem) as "tong luot xem" from baibao b join chuyenmuc c on b.ChuyenMuc = c.idChuyenMuc WHERE c.LoaiCM!=0 GROUP BY b.chuyenmuc ORDER BY SUM( b.luotxem) DESC LIMIT 10) as bang2 on b2.ChuyenMuc = bang2.id GROUP by b2.ChuyenMuc ORDER by b2.luotXem DESC`);
    },

}