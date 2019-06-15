var chuyenmuc=require('../models/ChuyenMuc.model');

module.exports = (req, res, next) => {
    chuyenmuc.menu().then(rows => {
        res.locals.lcChuyenMuc = rows;
    
        next();
    })
    
}
