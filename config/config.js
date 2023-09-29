
require("dotenv").config();
module.exports = {
  env:process.env.NODE_ENV||"development",
  port:process.env.PORT,
  development: {
    username: "postgres",
    password: "admin",
    database: "recipesapp_db",
    host: "localhost",
    dialect: "postgres",
    port:5432,
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
