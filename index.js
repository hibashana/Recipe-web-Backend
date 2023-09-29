const express = require('express');
const bodyParser = require('body-parser');
const dbConnect = require("./config/dbConnect");
const dotenv = require('dotenv');



dotenv.config();    //or require("dotenv").config  - load environment variables from .env file
dbConnect();


const app = express();
const PORT = process.env.PORT || 6000;

const userAuthRouter = require("./router/userAuthRouter");
const categoryRouter= require("./router/categoryRouter");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use("/api/user",userAuthRouter);
app.use('/public',express.static('public/images'));
app.use("/api/category",categoryRouter);




  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });