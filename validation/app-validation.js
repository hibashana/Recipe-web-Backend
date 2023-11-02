const Joi = require('joi');
const {packageName}=require("./custom-validation")

  const createApp  = Joi.object().keys({
    name: Joi.string().required(),
    image: Joi.string().required(),
    packageName: Joi.string().required(),
  });




  const updateApp= Joi.object().keys({
    name: Joi.string().required(),
    //image: Joi.string(),
    packageName: Joi.string().custom(packageName),  
      });

  module.exports={createApp,updateApp};