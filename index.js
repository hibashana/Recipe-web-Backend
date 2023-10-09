const express = require('express');
const bodyParser = require('body-parser');
const dbConnect = require("./config/dbConnect");
const dotenv = require('dotenv');



dotenv.config();    //or require("dotenv").config  - load environment variables from .env file
dbConnect();


const app = express();
const PORT = process.env.PORT || 6000;

// parse json request body
app.use(express.json());

// parse urlencoded request body
app.use(express.urlencoded({ extended: true }));
const userAuthRouter = require("./router/userAuthRouter");
const categoryRouter= require("./router/categoryRouter");
const recipesRouter=require("./router/recipesRouter");
const bannerRouter=require("./router/bannerRouter");
const ingredientRouter=require("./router/ingredientRouter");
const stepsRouter=require("./router/stepsRouter");


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use("/api/user",userAuthRouter);
app.use('/public',express.static('public/images'));
app.use("/api/category",categoryRouter);
app.use("/api/recipes",recipesRouter);
app.use("/api/banner",bannerRouter);
app.use("/api/ingredients",ingredientRouter);
app.use("/api/steps",stepsRouter);
app.get('*', (req, res) => {
  res.status(404).send('Sorry, the page you are looking for does not exist.');
});




  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });