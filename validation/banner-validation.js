const Joi = require('joi');

  const createBanner  = Joi.object().keys({
    name: Joi.string().required(),
    image: Joi.string().required(),
    appID: Joi.string().required(),
  });


//   const getaCategory = Joi.object({
//     params: Joi.object({
//       id: Joi.string().required(),
//     }),
//   });

  const updateBanner= Joi.object().keys({
    name: Joi.string(),
    image: Joi.string(),
    appID: Joi.string().required(),  
      });

  module.exports={createBanner,updateBanner};