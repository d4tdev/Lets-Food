const User = require('../model/User');

const createUser = data => {
   return new Promise(async (resolve, reject) => {
      try {
         const { username, password } = data;
         if (!username || !password) {
            return reject({
               message: 'Username and password are required',
            });
         }
         const isExist = await User.findOne({
            username: username,
            password: password,
         });
         if (isExist) {
            return reject({
               message: 'Username already exists',
            });
         }
         const newUser = await User.create({
            username: username,
            password: password,
         });
         resolve({ message: 'Create successfully', newUser });
      } catch (e) {
         reject(e);
      }
   });
};

module.exports = { createUser };
