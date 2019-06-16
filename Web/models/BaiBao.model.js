var db = require('../utils/db')
module.exports = {
    noibat: () => {
        return db.load(`select * from baibao order by luotXem desc limit 5 `);
    },
    add: entity => {
        return db.add('thanhvien', entity)
    }


}