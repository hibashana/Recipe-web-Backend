const Joi = require('joi');

  const createApp  = Joi.object().keys({
    name: Joi.string().required(),
    image: Joi.string().required(),
    packageName: Joi.string().required(),
  });




  const updateApp= Joi.object().keys({
    name: Joi.string(),
    image: Joi.string(),
    packageName: Joi.string().required(),  
      });

  module.exports={createApp,updateApp};