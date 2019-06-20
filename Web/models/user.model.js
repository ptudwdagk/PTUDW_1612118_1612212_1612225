var db = require('../utils/db');

module.exports = {
    all: () => {
        return db.load('select * from thanhvien');
    },

    single: id => {
        return db.load(`select * ,  date_format(NgaySinh,"%d-%m-%Y") as datePublished from thanhvien where idThanhVien = ${id}`);
    },

    singleByUserName: userName => {
        return db.load(`select *, date_format(NgaySinh,"%d-%m-%Y") as datePublished from thanhvien where Email = '${userName}'`);
    },

    add: entity => {
        return db.add('users', entity);
    },

    update: entity => {
        var id = entity.f_ID;
        delete entity.f_ID;
        return db.update('users', 'f_ID', entity, id);
    },

    delete: id => {
        return db.delete('users', 'f_ID', id);
    },
    capnhat: entity => {
        return db.update(`thanhvien`, `idThanhVien`, entity);
    },
    singlesua: id => {
        return db.load(`select * from thanhvien where idThanhVien = ${id}`);
    },
    heNguoiDung: id => {
        return db.load(` select * from phanhe where idPhanHe = ${id}`);
    },
    dsPhanHe: () => {
        return db.load(`select * from phanhe `);
    },
    singlePH: id => {
        return db.load(`select * from phanhe where idPhanHe = ${id}`);
    },




};