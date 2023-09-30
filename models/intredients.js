'use strict';
const {
  Model
} = require('sequelize');
const Recipes = require('./recipes');
module.exports = (sequelize, DataTypes) => {
  class intredients extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      intredients.belongsTo(models.Recipes, {
        foreignKey: 'RecipeID', // The foreign key in the Ingredients table
      });
    }
  }
  intredients.init({
    intrdid: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      autoIncrement: false,
    },
    name_qnty:{ 
      type:DataTypes.STRING,
      allowNull: false,
    },
    RecipeID:{
      type:DataTypes.UUID,
    },
  }, {
    sequelize,
    modelName: 'intredients',
  });
  return intredients;
};
