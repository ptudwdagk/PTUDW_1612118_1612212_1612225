var db = require('../utils/db')

module.exports = {
    getPassByEmail: Email => {
        return db.load(`select * from thanhvien where Email = '${Email}' and Xoa= 0 `);
    },

}