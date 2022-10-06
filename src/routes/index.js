const authRouter = require('./auth')

const routes = (app) => {
   app.use('/auth', authRouter);
}

module.exports = routes;
