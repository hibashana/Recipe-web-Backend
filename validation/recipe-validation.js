const Joi = require('joi');

const createRecipe = {
    body: Joi.object().keys({
        name: Joi.string().required(),
        description: Joi.string().required(),
        CategoryID:Joi.string().required(),
        // image: Joi.string().required(),
    }),
  };
  
  const getaRecipe = Joi.object({
    params: Joi.object({
      id: Joi.string().required(),
    }),
  });

  module.exports={createRecipe,getaRecipe}