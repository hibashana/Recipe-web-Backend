'use strict';
const {
  Model
} = require('sequelize');
const Recipes = require('./recipes');
const Category=require('./category')
module.exports = (sequelize, DataTypes) => {
  class app extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      app.belongsTo(models.Recipes, {
        foreignKey: 'RecipeID', // The foreign key in the Ingredients table
      });
      app.belongsTo(models.Category, {
        foreignKey: 'CategoryID', // The foreign key in the Ingredients table
      });
    }
  }
  app.init({
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      autoIncrement: false,
    },
    name: DataTypes.STRING,
    description: DataTypes.STRING,
    RecipeID:{
      type:DataTypes.UUID,
    },
    CategoryID:{
      type:DataTypes.UUID,
    },
  }, {
    sequelize,
    modelName: 'app',
  });
  return app;
};