var express = require('express');
var exphbs = require('express-handlebars');
var hbs_sections = require('express-handlebars-sections');


var bodyParser = require('body-parser');
var numeral = require('numeral');

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

app.use(require('./middlewares/auth-locals.mdw'));
require('./middlewares/passport')(app);
require('./middlewares/session')(app);


app.set('view engine', 'hbs');
app.use(bodyParser());
app.use(require('./middlewares/locals.mdw'));




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
app.use('/', require('./router/Index.route'));
app.use('/DangKi', require('./router/Dangki.route'));



// app.use('/categories', require('./routes/category.route'));
// app.use('/admin/categories', require('./routes/admin/category.route'));

app.listen(4000, () => {
    console.log('Web Server is running at http://localhost:4000');
})