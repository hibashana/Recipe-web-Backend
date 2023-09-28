
const category = require('./category');
const Category = require('./category');
'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Recipes extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
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
// Recipes.belongsTo(Category, { foreignKey: 'ctgyid' });