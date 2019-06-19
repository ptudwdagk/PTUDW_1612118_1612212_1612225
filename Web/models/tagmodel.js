var db=require('../utils/db')

module.exports={
    add: entity => {
        return db.add ('nhantag',entity);
    },
    dstag: () => {
        return db.load(`select * from nhantag`);
    },
}