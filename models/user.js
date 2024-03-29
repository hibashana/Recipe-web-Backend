'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Users extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Users.init({
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      autoIncrement: false,
    },
    name: { 
      type:DataTypes.STRING,
      allowNull: false,
    },
    email:{ 
      type:DataTypes.STRING,
    },
    contact: { 
      type:DataTypes.STRING,
    },
    username:{ 
      type:DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    password: { 
      type:DataTypes.STRING,
      allowNull: false,
    },
    type:{ 
      type:DataTypes.STRING,
      allowNull: false,
      defaultValue: 'user',
    },
    isactive: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },

  }, {
    sequelize,
    modelName: 'Users',
  });
  return Users;
};