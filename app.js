const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const session = require('express-session');
const pgSession = require('connect-pg-simple')(session);
const cookieParser = require('cookie-parser');

require('dotenv').config();

const { testDBConnection } = require('./utils/helper');
const passport = require('./utils/passport');

const loginRoutes = require('./routes/login');
const registerRoutes = require('./routes/register');
const profileRoutes = require('./routes/profile');
const logoutRoutes = require('./routes/logout');

const pool = require('./config/database');

const PORT = process.env.PORT || 5000;

const app = express();

app.set('view engine', 'ejs');
app.set('views', 'views');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(path.join(__dirname, 'public')));
app.use(cookieParser());

app.use(
    session({
        store: new pgSession({
            pool: pool,
            tableName: 'session'
        }),
        secret: process.env.SESSION_SECRET,
        resave: false,
        saveUninitialized: false,
        cookie: {
            maxAge: 30 * 24 * 60 * 60 * 1000, 
            // secure: true,
            // httpOnly: true,
        }
    })
)

app.use(passport.initialize());
app.use(passport.session());

app.get('/', (req, res, next) => {
    res.send('<h1>Welcome To Auth By Mahmoud!</h1>');
})

app.use('/api/v1', loginRoutes);
app.use('/api/v1', registerRoutes);
app.use('/api/v1', profileRoutes);
app.use('/api/v1', logoutRoutes);



testDBConnection()
    .then(() => {
        app.listen(PORT, () => {
            console.log('Database Connected...');
            console.log(`Server Running On Port ${PORT}`);
        })
    })
    .catch(err => {
        console.log(err);
        throw new Error(err);
    })