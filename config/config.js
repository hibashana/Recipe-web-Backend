
require("dotenv").config();
module.exports = {
  env:process.env.NODE_ENV||"development",
  port:process.env.PORT||3000,
  development: {
    username: process.env.DB_USER,//"postgres",
    password: process.env.DB_PASSWORD,//"admin",
    database: process.env.DB_NAME,//"recipesapp_db",
    host: process.env.DB_HOST,//"localhost",
    dialect: process.env.DB_DIALECT,//"postgres",
    port:process.env.DB_PORT,
    operatorsAliases: 0,
  },

}

// {
//   "development": {
//     "username": "root",
//     "password": null,
//     "database": "database_development",
//     "host": "127.0.0.1",
//     "dialect": "mysql"
//   },
//   "test": {
//     "username": "root",
//     "password": null,
//     "database": "database_test",
//     "host": "127.0.0.1",
//     "dialect": "mysql"
//   },
//   "production": {
//     "username": "root",
//     "password": null,
//     "database": "database_production",
//     "host": "127.0.0.1",
//     "dialect": "mysql"
//   }
// }
