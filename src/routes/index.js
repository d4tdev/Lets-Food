const authRouter = require('./auth.js')

const routes = (app) => {
   app.use('/auth', authRouter);
}

module.exports = routes;
