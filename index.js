const express = require('express');
const bodyParser = require('body-parser');
const dbConnect = require("./config/dbConnect");
const dotenv = require('dotenv');



dotenv.config();    //or require("dotenv").config  - load environment variables from .env file
//dbConnect();


const app = express();
const PORT = process.env.PORT || 6000;

// parse json request body
app.use(express.json());

// parse urlencoded request body
app.use(express.urlencoded({ extended: true }));
const appRouter=require("./router/v1/appRouter")
const userAuthRouter = require("./router/v1/userAuthRouter");
const categoryRouter= require("./router/v1/categoryRouter");
const recipesRouter=require("./router/v1/recipesRouter");
const bannerRouter=require("./router/v1/bannerRouter");
const ingredientRouter=require("./router/v1/ingredientRouter");
const stepsRouter=require("./router/v1/stepsRouter");


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static('public'));
app.use("/api/v1/app",appRouter)
app.use("/api/v1/user",userAuthRouter);
//app.use('/public',express.static('public/images'));
app.use("/api/v1/category",categoryRouter);
app.use("/api/v1/recipes",recipesRouter);
app.use("/api/v1/banner",bannerRouter);
app.use("/api/v1/ingredients",ingredientRouter);
app.use("/api/v1/steps",stepsRouter);
app.get('*', (req, res) => {
  res.status(404).send('Sorry, the page you are looking for does not exist.');
});




  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });