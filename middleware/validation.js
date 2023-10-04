
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

