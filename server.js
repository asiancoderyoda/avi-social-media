const express = require("express");
const app = express();
const colors = require("colors");
const dotenv = require("dotenv");

const auth = require('./routes/auth');
const post = require("./routes/post");
const user = require("./routes/user");


dotenv.config({ path: "./config/config.env" });

app.use(express.json())

const connectDB = require("./config/db");

connectDB();


app.use('/api/v1', auth);
app.use('/api/v1', post);
app.use('/api/v1', user);

PORT = process.env.PORT || 5000;

if(process.env.NODE_ENV === "production") {
  app.use(express.static('client/build'));
  const path=require('path')
  app.get('*', (req, res) => {
      res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}


app.listen(
  PORT,
  console.log(
    `Server is running in ${process.env.NODE_ENV} mode on port ${PORT}`.bgGreen
      .yellow.bold
  )
);
