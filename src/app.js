const express = require('express');
const cors = require('cors');
const path = require('path');
require('dotenv').config();
const app = express();

const db = require('./config/connect');
const routes = require('./routes');

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }));

db.connect();

routes(app);

app.listen(process.env.PORT, () => {
   console.log(`Server is running on port ${process.env.PORT}`);
});
