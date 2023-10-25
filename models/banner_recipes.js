'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class BannerRecipes extends Model {
    static associate(models) {
      // Define associations here
    }
  }

  BannerRecipes.init(
    {
      id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        autoIncrement: false,
      },
      bannerId: {
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
      modelName: 'BannerRecipes',
    }
  );

  return BannerRecipes;
};
