var db=require('../utils/db')

module.exports={
    add: entity => {
        return db.add ('baibao',entity);
    },
    update: entity =>{
           return db.update('baibao', 'idBaiBao', entity );        
    }
}