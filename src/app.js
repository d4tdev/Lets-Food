const express = require('express');
const path = require('path');
const passport = require('passport');
const cookieParser = require('cookie-parser');
const morgan = require('morgan');
const flash = require('connect-flash');
const methodOverride = require('method-override');

// security
const cors = require('cors');
// const helmet = require('helmet');
// const xss = require('xss-clean');
// const rateLimit = require('express-rate-limit');

const session = require('express-session');
const MongoStore = require('connect-mongo');

require('dotenv').config();
const app = express();

const db = require('./config/connect');
const routes = require('./routes');
const notFound = require('./middleware/notFound');

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
         autoRemoveInterval: 1800,
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
         maxAge: 30 * 60 * 1000,
         httpOnly: true,
      },
   })
);

// Passport middleware
app.use(passport.initialize());
app.use(passport.session());

// anti ddos
// app.set('trust proxy', 1);
// app.use(
//    rateLimit({
//       windowMs: 15 * 60 * 1000, // 15 minutes
//       max: 150, // limit each IP to 100 requests per windowMs
//    })
// );

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'public', 'views'));
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors());
app.use(methodOverride('_method'));
app.use(morgan('combined'));
app.use(flash());
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// app.use(
//    helmet({
//       contentSecurityPolicy: false,
//    })
// );
// app.use(xss());

routes(app);
// app.use(notFound);

app.listen(process.env.PORT, () => {
   console.log(`Server is running on port ${process.env.PORT}`);
});
