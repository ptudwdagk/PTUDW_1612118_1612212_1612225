var db =require('../utils/db')
module.exports= {
    daxuatban: () => {
        return db.load(`select * from baibao where TacGia=4 and TrangThai=1`);
    },
    
}