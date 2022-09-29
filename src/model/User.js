const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
   username: {
      type: String,
      required: true,
      unique: true,
   },
   email: {
      type: String,
      unique: true,
   },
   password: {
      type: String,
      required: true,
   },
}, {collection: 'User'});

module.exports = mongoose.model('User', UserSchema);
