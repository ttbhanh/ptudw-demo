var express = require('express');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var sessions = require('express-session');
var hbs = require('express-handlebars');

var app = express();

app.engine('hbs', hbs({
  extname: 'hbs',
  defaultLayout: 'layout',
  layoutsDir: __dirname + '/views/layouts/'
}));

app.set('views', __dirname + '/views');
app.set('view engine', 'hbs');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(express.static(__dirname + '/public'));

app.use(cookieParser('Secret to encrypt signed cookies'));

app.use(sessions({
  cookie: { httpOnly: true, maxAge: 60 * 60 * 1000 },
  secret: 'secret to hash session id',
  resave: false,
  saveUninitialized: false
}));

app.get('/', function (req, res) {
  res.render('index');
});

app.get('/web', function (req, res) {
  res.render('web');
});

app.get('/createCookie', function (req, res) {
  res.cookie('username', 'ttbhanh', { maxAge: 60 * 60 * 1000, httpOnly: false });
  res.cookie('password', '123456', { maxAge: 60 * 60 * 1000, httpOnly: true });
  res.cookie('signed_password', '123456', { maxAge: 60 * 60 * 1000, httpOnly: true, signed: true });
  res.render('view');
});

app.get('/clearCookie', function (req, res) {
  res.clearCookie('username');
  res.clearCookie('password');
  res.clearCookie('signed_password');
  res.render('view');
});

app.get('/cookie', function (req, res) {
  res.render('cookie');
});

app.get('/session', function (req, res) {
  var isLogin = (req.session.username != undefined) && (req.session.username != '');
  res.render('session', { isLogin: isLogin });
});

app.get('/view', function (req, res) {
  console.log(req.cookies);
  console.log(req.signedCookies);
  res.render('view');
});

app.get('/admin', function (req, res, next) {
  if ((!req.session.username) || (req.session.username.trim() == '')) {
    return res.render('login');
  }
  next();
}, function (req, res) {
  res.render('admin');
});

app.get('/login', function (req, res) {
  res.render('login');
});

app.post('/login', function (req, res) {
  var username = req.body.username;
  var password = req.body.password;
  if (username == "admin" && password == "123") {
    req.session.username = username;
  }
  res.redirect('/admin');
});

app.get('/logout', function (req, res) {
  req.session.destroy(function (error) {
    if (error) return next(error);
    res.redirect('/login');
  });
});

app.use((req, res) => {
  res.render('error', { message: 'Request NOT Found!' });
});

app.use((err, req, res, next) => {
  res.render('error', { message: 'Internal Server Error!' });
});

app.listen(4000, function () {
  console.log('server is listening on port 4000');
});
