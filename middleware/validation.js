


const Joi = require('joi');


const httpStatus = require('http-status');



const validate = (schema) => (req, res, next) => {
  
    const { value, error } = schema.validate(req.body);
  
    if (error) {
      const errorMessage = error.details.map((details) => details.message).join(', ');
      return res.status(httpStatus.BAD_REQUEST).json({error:errorMessage});
    }
  

    req.body = value; // Update the request body with the validated value
    return next();
  };
  

module.exports = validate;


// const pick = require('../utils/pick');
// const validate = (schema) => (req, res, next) => {
//   const validSchema = pick(schema, ['params', 'query', 'body','form-data']);
//   const object = pick(req, Object.keys(validSchema));
//   const { value, error } = Joi.compile(validSchema)
//     .validate(object);

//   if (error) {
//     const errorMessage = error.details.map((details) => details.message).join(', ');
//     return res.status(httpStatus.BAD_REQUEST).json({error:errorMessage});
//   }
//   Object.assign(req, value);
//   return next();
// };

// module.exports = validate;