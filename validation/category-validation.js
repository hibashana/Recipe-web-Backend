const Joi = require('joi');

// const createCategory = Joi.object().keys({ 
//   FormData: Joi.object().keys({
//         name: Joi.string().required(),
//         Image: Joi.string().required(),
//     }),
//   });

  const create  = Joi.object({
    name: Joi.string().required(),
    appID: Joi.string().required(),

  });


    // const getaCategory = Joi.object({
    //   params: Joi.object({
    //     ctgyid: Joi.string().required(),
    //   }),
    // });

  const updateCategory= Joi.object({
    name: Joi.string(),
    appID: Joi.string(),
        
      }).min(1);

  module.exports={create,updateCategory};