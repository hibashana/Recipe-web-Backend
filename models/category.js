'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Category extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Category.hasMany(models.Recipes, {
        foreignKey: 'CategoryID', // The foreign key in the Recipes table
      });
      // Category.hasMany(models.App, {
      //   foreignKey: 'CategoryID', // The foreign key in the Recipes table
      // });
    }
  }
  Category.init({
    ctgyid: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      autoIncrement: false,
    },
    name: { 
      type:DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    // image:{ 
    //   type:DataTypes.STRING,
    //   allowNull: false,
    // },
    appID:{
      type:DataTypes.UUID,
      allowNull: false,
    },
  }, {
    sequelize,
    modelName: 'Category',
  });
  return Category;
};