var express = require('express');
var exphbs = require('express-handlebars');
var hbs_sections = require('express-handlebars-sections');


var bodyParser = require('body-parser');
var numeral = require('numeral');


var hbs_section = require('express-handlebars-sections');
var app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.engine('hbs', exphbs({
    extname: '.hbs',
    defaultLayout: 'main.hbs',
    layoutsDir: 'views/_layouts',
    helpers: {
        format: val => {
            return numeral(val).format('0,0');
        },
        section: hbs_sections()
    }
}));
app.set('view engine', 'hbs');

require('./middlewares/session')(app);
require('./middlewares/passport')(app);


app.use(bodyParser());
app.use(require('./middlewares/locals.mdw'));
app.use(require('./middlewares/auth-locals.mdw'));




// app.use((req, res, next) => {
//     res.render('404', { layout: false });
// })

// app.use((err, req, res, next) => {
//     res.render(error, {
//         layout: false,
//         message: errro.message,
//         error
//     })
// })



app.use(express.static(__dirname + '/public'));
// // app.use(require('./middlewares/locals.mdw'));
app.use('/Login', require('./router/Login.route'));

app.use('/DangKi', require('./router/Dangki.route'));
app.use('/profile', require('./router/profile.route'));
app.use('/', require('./router/Index.router'));
app.use('/baibao', require('./router/BaiViet.router'))
app.use('/chuyenmuc', require('./router/ChuyenMuc.router'))

app.use('/writer', require('./router/PhongVien.router'));
app.use('/editor', require('./router/Editor.router'));
app.use('/admin', require('./router/Admin.router'));
app.use('/DoiMatKhau', require('./router/DoiMatKhau.route'));

// app.use('/categories', require('./routes/category.route'));
// app.use('/admin/categories', require('./routes/admin/category.route'));

app.listen(4000, () => {
    console.log('Web Server is running at http://localhost:4000');
})