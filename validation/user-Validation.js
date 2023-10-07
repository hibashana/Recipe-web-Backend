const Joi = require('joi');
const { password, objectId } = require('./custom-validation');


const createUser = {
  body: Joi.object().keys({
     name: Joi.string().required(),
    //   // type: Joi.string().required(),
      email: Joi.string().email().required(),
      contact: Joi.string() .pattern(/^\d{10}$/).required(),
      username: Joi.string().alphanum().min(3).max(30).required(),
      password:Joi.string().required().custom(password),
  }),
};

const loginUser =  Joi.object().keys({
    username: Joi.string().alphanum().required(),
    password: Joi.string().required().custom(password),
  });

const updatePassword = {
  body: Joi.object().keys({
    ruserid: Joi.string(),
    password: Joi.string().required().custom(password),
  }),
};

const loginAdmin = Joi.object().keys({
    username: Joi.string().alphanum().required(),
    password: Joi.string().required().custom(password),
  });

const getAllUser = Joi.object({
  name: Joi.string(),
  type: Joi.string(),
  sortBy: Joi.string(),
});

const getaUser = Joi.object({
  params: Joi.object({
    ruserid: Joi.string().required(),
  }),
});


const updateUserDetails = {
  // params: Joi.object().keys({
    userId: Joi.required(),
  // }),
  body: Joi.object()
    .keys({
      name: Joi.string(),
      email: Joi.string().email(),
      contact: Joi.string().pattern(/^\d{10}$/), 
      username: Joi.string(),
    }).options({ allowUnknown: true })// Allow additional fields not defined in the schema;
      .min(1),
};

// const deleteUser = Joi.object({
//   params: Joi.object({
//     ruserid: Joi.string().required(),
//   }),
// });

  


module.exports={createUser,updatePassword,loginUser,loginAdmin,getAllUser,getaUser,updateUserDetails}
