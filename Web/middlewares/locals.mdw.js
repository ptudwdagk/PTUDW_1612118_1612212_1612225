var chuyenmuc=require('../models/ChuyenMuc.model');

module.exports = (req, res, next) => {
    chuyenmuc.all().then(rows => {
        res.locals.lcChuyenMuc = rows;
        next();
    })
}
