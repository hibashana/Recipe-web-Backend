
'use strict';
const {
  Model
} = require('sequelize');
 
module.exports = (sequelize, DataTypes) => {
 
 
  class Recipes extends Model {
    static associate(models) {
      // define association here
      
      // Recipes.belongsTo(models.Category, {
      //   foreignKey: "ctgyid",  
      // });
      Recipes.belongsToMany(models.Banner, {
        through: 'BannerRecipes',
        foreignKey: 'recipeId',
        as: 'Banners',
      });

      Recipes.hasMany(models.Ingredients, {
        foreignKey: 'RecipeID', // The fK in the Ingredients table
      });
      Recipes.hasMany(models.Steps, {
        foreignKey: 'RecipeID', // The fK in the Steps table
      });
      // Recipes.hasMany(models.App, {
      //   foreignKey: 'RecipeID', // The fK in the Steps table
      // });
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
    },
    premium: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
    CategoryID:{
      type:DataTypes.UUID,
      allowNull: false,
    },
    appID:{
      type:DataTypes.UUID,
      allowNull: false,
    },
  }, {
    sequelize,
    modelName: 'Recipes',
  });

  return Recipes;
};
