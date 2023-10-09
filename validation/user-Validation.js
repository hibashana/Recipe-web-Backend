const Joi = require('joi');
const { password} = require('./custom-validation');


const createUser = Joi.object({
     name: Joi.string().required(),
      // type: Joi.string().required(),
      email: Joi.string().email().required(),
      contact: Joi.string() .pattern(/^\d{10}$/).required(),
      username: Joi.string().alphanum().min(3).max(30).required(),
      password:Joi.string().required().custom(password),
  });

const loginUser =  Joi.object({
    username: Joi.string().alphanum().required(),
    password: Joi.string().required().custom(password),
  });

const updatePassword = Joi.object({
    ruserid: Joi.string(),
    password: Joi.string().required().custom(password),
  });

const loginAdmin =  Joi.object({
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


const updateUserDetails = Joi.object({
    name: Joi.string(),
    email: Joi.string().email(),
    contact: Joi.string().pattern(/^\d{10}$/),
    username: Joi.string(),
  });




// const deleteUser = Joi.object({
//   params: Joi.object({
//     ruserid: Joi.string().required(),
//   }),
// });

  


module.exports={createUser,updatePassword,loginUser,loginAdmin,getAllUser,getaUser,updateUserDetails}
