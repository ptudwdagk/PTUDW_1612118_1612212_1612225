var express = require('express');
var exphbs = require('express-handlebars');
var morgan = require('morgan');

var app = express();

app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.engine('hbs', exphbs({
  defaultLayout: 'main.hbs',
  layoutsDir: 'views/_layouts'
}));
app.set('view engine', 'hbs');

app.use(express.static(__dirname+'/public'));
// app.use(require('./middlewares/locals.mdw'));

app.get('/', (req, res) => {
  res.end('kjhkajshdkjashdasd');
})  

app.get('/KinhDoanh', (req, res) => {
  res.render('KinhDoanh');
})

app.use('/writer', require('./router/writer.route'));


// app.use('/categories', require('./routes/category.route'));
// app.use('/admin/categories', require('./routes/admin/category.route'));

app.listen(4000, () => {
  console.log('Web Server is running at http://localhost:4000');
})