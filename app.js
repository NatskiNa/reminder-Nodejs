const express = require('express');
const taskRouter = require('./routes/taskRouter');
const connectDB = require('./db/connect');
require('dotenv').config();

const hostname = 'localhost';
const port = 8000;

const app = express();
app.use(express.json());
app.use(express.static('./public/'));

//Routing
app.use('/api/v1/tasks/', taskRouter);

//connect to database
const start = async () => {
  try {
    await connectDB(process.env.MONGO_URL);
    app.listen(port, hostname, () => {
      console.log(`Server running at http://${hostname}: ${port}/`);
    });
  } catch (err) {
    console.log(err);
  }
};

start();