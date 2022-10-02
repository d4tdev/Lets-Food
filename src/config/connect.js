const mongoose = require('mongoose');

const connect = async () => {
   try {
      await mongoose.connect(process.env.MONGO_URI, {
         useNewUrlParser: true,
         useUnifiedTopology: true,
      });
      console.log('Database connected');
   } catch (e) {
      console.log(e);
      process.exit(1);
   }
};

module.exports = { connect };
