const express = require('express');
const taskRouter = require('./routes/taskRouter');
const connectDB = require('./db/connect');
require('dotenv').config();

const hostname = 'localhost';
const port = 8000;

const app = express();
app.use(express.json());
//import HTML file from public folder
app.use(express.static('./public/'));

//Routing(api endpoint)
app.use('/api/v1/tasks/', taskRouter);

//connect to mongoDB server
const start = async () => {
  try {
    await connectDB(process.env.MONGO_HEROKU_URL || process.env.MONGO_URL);
    app.listen(process.env.port || port, console.log('Server is running'));
  } catch (err) {
    console.log(err);
  }
};

start();
