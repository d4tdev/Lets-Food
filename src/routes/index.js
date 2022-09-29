const userRouter = require('./user.js')

const routes = (app) => {
   app.use('/user', userRouter);
}

module.exports = routes;
