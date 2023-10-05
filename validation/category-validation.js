const Joi = require('joi');

const createCategory = {
    formdata: Joi.object().keys({
        
        name: Joi.string().required(),
        image:Joi.string().required(),
    }),
  };


  const getaCategory = Joi.object({
    params: Joi.object({
      id: Joi.string().required(),
    }),
  });

  const updateCategory = {
        body: Joi.object({
        name: Joi.string(),
        
      })
  };

  module.exports={createCategory,getaCategory,updateCategory};