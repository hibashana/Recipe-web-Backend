const Joi = require('joi');

// const createCategory = Joi.object().keys({ 
//   FormData: Joi.object().keys({
//         name: Joi.string().required(),
//         Image: Joi.string().required(),
//     }),
//   });

  const create  = Joi.object().keys({
    name: Joi.string().required(),
    image: Joi.string().required(),

  });


  const getaCategory = Joi.object({
    params: Joi.object({
      id: Joi.string().required(),
    }),
  });

  const updateCategory= Joi.object().keys({
    name: Joi.string(),
    image: Joi.string(),
        
      }).min(1);

  module.exports={create,getaCategory,updateCategory};