
const Category = require('./category');

'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
 
 
  class Recipes extends Model {
    static associate(models) {
      // define association here
      Recipes.belongsTo(models.Category, {
        foreignKey: "ctgyid", //foreignKey added here
      });
    }
  }

  

  Recipes.init({
    rcpid: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      autoIncrement: false,
    },
    name:{ 
      type:DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    image:{ 
      type:DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type:DataTypes.STRING,
    }  
  }, {
    sequelize,
    modelName: 'Recipes',
  });

  return Recipes;
};
