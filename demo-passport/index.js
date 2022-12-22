'use strict';
const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

const expressHandlebars = require('express-handlebars');

const { SESSION_SECRET, REDIS } = require('./config/auth.json');

const cookieParser = require('cookie-parser');
const passport = require('passport');
const flash = require('connect-flash');
const session = require('express-session');
const redisStore = require('connect-redis')(session);

const { createClient } = require("redis")
let redisClient = createClient({
    host: REDIS.host,
    port: REDIS.port,
    legacyMode: true
});
redisClient.connect().catch(console.error)


// Thiet lap Static public folder
app.use(express.static(__dirname + '/public'));

// Thiet lap Handlebars View Engine
app.engine('hbs', expressHandlebars.engine({
    layoutsDir: __dirname + '/views/layouts',
    partialsDir: __dirname + '/views/partials',
    extname: 'hbs',
    defaultLayout: 'layout',
    runtimeOptions: {
        allowProtoPropertiesByDefault: true
    }
}));
app.set('view engine', 'hbs');

// Thiet lap doc thong tin gui tu Form POST
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Thiet lap  doc cookies (su dung cho viec auth)
app.use(cookieParser());

// Thiet lap su dung session va luu tru session tren Redis
app.use(session({
    secret: SESSION_SECRET,
    store: new redisStore({ client: redisClient }),
    resave: false,
    saveUninitialized: false,
    cookie: {
        secure: false,  // if true only transmit cookie over https
        httpOnly: true, // prevent client side JS from reading the cookie
        maxAge: 20 * 60 * 1000 // 20 minutes
    },
}));

// Thiet lap su dung passport
require('./controllers/passport')(passport);
app.use(passport.initialize());
app.use(passport.session());

// Su dung connect-flash luu tru flash message trong session
app.use(flash());

// Su dung middlewares khoi tao gia tri
app.use(function (req, res, next) {
    res.locals.isLoggedIn = req.isAuthenticated();
    if (req.body.keepLoggedIn != "") {
        req.session.cookie.maxAge = null;
    }
    next();
});

// Chuyen huong xu ly routes
app.use('/', require('./routes/indexRoute'));
app.use('/', require('./routes/authRoute'));

// Xu ly khi co loi
app.use((req, res) => {
    res.status(404).render('error', { message: 'Request NOT Found!' })
})

app.use((error, req, res, next) => {
    console.error(error);
    res.status(500).render('error', { message: "Internal Server Error! <br/> Please see the server's logs for more details." })
})

// Khoi dong server
app.listen(port, () => {
    console.log(`server is running on port ${port}`);
})