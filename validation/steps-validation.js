const Joi = require('joi');

const createSteps= Joi.object().keys({
    description: Joi.string().required(),
    RecipeID: Joi.string().required(),
});


  // const getaIngredient = Joi.object({
  //   params: Joi.object({
  //     id: Joi.string().required(),
  //   }),
  // });

  const updateSteps= Joi.object().keys({
    description: Joi.string(),
    RecipeID: Joi.string(),
    })



  module.exports={createSteps,updateSteps}