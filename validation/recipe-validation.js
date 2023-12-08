const Joi = require('joi');

const createRecipe= Joi.object().keys({
  name: Joi.string().required(),
  description: Joi.string().empty(''),
  //CategoryID:Joi.string().required(),
  appID:Joi.string().required(),
  image: Joi.string().required(),

});

  
  const getaRecipe = Joi.object({
    params: Joi.object({
      id: Joi.string().required(),
    }),
  });

  const updateRecipe= Joi.object().keys({
    name: Joi.string(),
    description: Joi.string(),
    // CategoryID:Joi.string().required(),
    //image: Joi.string(),
    premium:Joi.string(),
  
  });



  module.exports={createRecipe,getaRecipe,updateRecipe}