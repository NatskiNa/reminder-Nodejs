const mongoose = require('mongoose');

const connectDB = (url) => {
  return mongoose
    .connect(url)
    .then(() => console.log('connect to database...'))
    .catch((err) => console.log(err));
};

module.exports = connectDB;
