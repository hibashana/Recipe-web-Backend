

const password = (value) => {
    if (value.length < 8) {
      throw new Error('password must be at least 8 characters');
    }
    if (!value.match(/\d/) || !value.match(/[a-zA-Z]/)) {
      throw new Error('password must contain at least 1 letter and 1 number');
    }
    return value;
  };
  const packageName = (value) => {
    if (!value.match(/^([a-z]+\.)+[a-z]+$/)) {
      throw new Error('Invalid package name format');
    }
    return value;
  };
  // const objectId = (value) => {
  //   if (!value.match(/^[0-9a-fA-F]{24}$/)) {
  //       throw new Error('"{{#label}}" must be a valid  id');
  //   }
  //   return value;
  // };     
  



  module.exports = {password,packageName};