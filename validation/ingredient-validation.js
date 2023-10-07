const Joi = require('joi');

const createIngredients= Joi.object().keys({
    name_qnty: Joi.string().required(),
    RecipeID: Joi.string().required(),
});

  
  const getaIngredient = Joi.object({
    params: Joi.object({
      id: Joi.string().required(),
    }),
  });

  const updateIngredients= Joi.object().keys({
    name_qnty: Joi.string().required(),
    RecipeID: Joi.string().required(),
    
  
  });



  module.exports={createIngredients,getaIngredient,updateIngredients}