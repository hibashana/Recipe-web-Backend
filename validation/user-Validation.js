const Joi = require('joi');
const { password } = require('./custom-validation');

const createUser= Joi.object({
  name: Joi.string().required(),
  email: Joi.string().email().required(),
  contact: Joi.string() .pattern(/^\d{10}$/).required(),
  username: Joi.string().alphanum().min(3).max(30).required(),
  password:Joi.string().required().custom(password),
});

const loginUser  = Joi.object({
  username: Joi.string().alphanum().required(),
    password: Joi.string().required().custom(password),
  });

  // const getAllUser = Joi.object({
  //     name: Joi.string(),
  //     type: Joi.string(),
  //     sortBy: Joi.string(),
  //   });

  // const getaUser = {
  //   params: Joi.object().keys({
  //     userId: Joi.string().custom(objectId),
  //   }),
  // };


module.exports={createUser,loginUser }