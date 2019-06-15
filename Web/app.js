var express = require('express');
var exphbs = require('express-handlebars');
var morgan = require('morgan');
var hbs_section =require('express-handlebars-sections');
var app = express();

app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.engine('hbs', exphbs({
  defaultLayout: 'main.hbs',
  layoutsDir: 'views/_layouts',
  helpers: {
    section:hbs_section(),
  }
}));
app.set('view engine', 'hbs'); 

app.use(require('./middlewares/locals.mdw'));

app.use(express.static(__dirname+'/public'));
// // app.use(require('./middlewares/locals.mdw'));



app.get('/KinhDoanh', (req, res) => {
  res.render('KinhDoanh');
})

app.use('/', require('./router/Index.router'));
app.use('/baibao', require('./router/BaiViet.router'))
app.use('/chuyenmuc', require('./router/ChuyenMuc.router'))
// app.use('/categories', require('./routes/category.route'));
// app.use('/admin/categories', require('./routes/admin/category.route'));

app.listen(4000, () => {
  console.log('Web Server is running at http://localhost:4000');
})
