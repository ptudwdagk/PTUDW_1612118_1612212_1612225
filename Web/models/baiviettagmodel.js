var db=require('../utils/db')

module.exports={
    add: entity => {
        return db.add ('tag_baibao',entity);
    },
    update: entity => {
        return db.update('tag_baibao', 'idTag', entity);
    }
}