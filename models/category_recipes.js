'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class CategoryRecipes extends Model {
    static associate(models) {
      // Define associations here
      CategoryRecipes.belongsTo(models.Category, {
        foreignKey: 'categoryId',
      });
      CategoryRecipes.belongsTo(models.Recipes, {
        foreignKey: 'recipeId',
      });
    }
  }

  CategoryRecipes.init(
    {
      id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        autoIncrement: false,
      },
      categoryId: {
        type: DataTypes.UUID,
        allowNull: false,
      },
      recipeId: {
        type: DataTypes.UUID,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: 'CategoryRecipes',
    }
  );

  return CategoryRecipes;
};
