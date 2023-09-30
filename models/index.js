const Sequelize = require('sequelize');
const { development } = require('../config/config');

const sequelize = new Sequelize(development.database, development.username, development.password, development);

const models = {
  sequelize,
  Sequelize,
  Ruser: require('./ruser')(sequelize, Sequelize.DataTypes),
  Category:require('./category')(sequelize,Sequelize.DataTypes),
  Recipes:require('./recipes')(sequelize,Sequelize.DataTypes),
  Ingredients:require('./intredients')(sequelize,Sequelize.DataTypes),
  Steps:require('./steps')(sequelize,Sequelize.DataTypes),
  Banner:require('./banner')(sequelize,Sequelize.DataTypes),
 // token: require('./token')(sequelize, Sequelize.DataTypes),
};

Object.keys(models).forEach((modelName) => {
  if (models[modelName].associate) {
    models[modelName].associate(models);
  }
});

module.exports = models;


// 'use strict';

// const fs = require('fs');
// const path = require('path');
// const Sequelize = require('sequelize');
// const process = require('process');
// const basename = path.basename(__filename);
// const env = process.env.NODE_ENV || 'development';
// const config = require(__dirname + '/../config/config.json')[env];
// const db = {};

// let sequelize;
// if (config.use_env_variable) {
//   sequelize = new Sequelize(process.env[config.use_env_variable], config);
// } else {
//   sequelize = new Sequelize(config.database, config.username, config.password, config);
// }

// fs
//   .readdirSync(__dirname)
//   .filter(file => {
//     return (
//       file.indexOf('.') !== 0 &&
//       file !== basename &&
//       file.slice(-3) === '.js' &&
//       file.indexOf('.test.js') === -1
//     );
//   })
//   .forEach(file => {
//     const model = require(path.join(__dirname, file))(sequelize, Sequelize.DataTypes);
//     db[model.name] = model;
//   });

// Object.keys(db).forEach(modelName => {
//   if (db[modelName].associate) {
//     db[modelName].associate(db);
//   }
// });

// db.sequelize = sequelize;
// db.Sequelize = Sequelize;

// module.exports = db;
