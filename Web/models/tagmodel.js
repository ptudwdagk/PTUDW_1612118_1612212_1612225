var db=require('../utils/db')

module.exports={
    add: entity => {
        return db.add ('nhantag',entity);
    },
    dstag: () => {
        return db.load(`select * from nhantag where Xoa !=1 `);
    },
    singgletag: id => {
        return db.load(`select * from nhantag where idTag=${id}`);
    },
    update: entity => {
        return db.update(`nhantag`, `idTag`, entity);
    },
}