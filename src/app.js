const express = require('express');
const cors = require('cors');
const path = require('path');
const passport = require('passport');
const cookieParser = require('cookie-parser');
const morgan = require('morgan');
const flash = require('connect-flash');

const session = require('express-session');
const MongoStore = require('connect-mongo');

require('dotenv').config();
const app = express();

const db = require('./config/connect');
const routes = require('./routes');

db.connect();

// config passport

require('./config/passportGoogle')(passport);
require('./config/passportLocal')(passport);
require('./config/passportFacebook')(passport);
// session cookie
app.use(
	session({
		store: MongoStore.create({
			autoRemove: 'interval',
			autoRemoveInterval: 60,
			mongoUrl: process.env.MONGO_URI,
			mongoOptions: {
				useNewUrlParser: true,
				useUnifiedTopology: true,
			},
		}),

		secret: process.env.SESSION_SECRET,
		resave: false,
		saveUninitialized: false,
		cookie: {
			maxAge: 1 * 60 * 1000,
			httpOnly: true
		},
	})
);

// Passport middleware
app.use(passport.initialize());
app.use(passport.session());


app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'public', 'views'));
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors());
app.use(morgan('combined'));
app.use(flash());
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

routes(app);

app.listen(process.env.PORT, () => {
	console.log(`Server is running on port ${process.env.PORT}`);
});
