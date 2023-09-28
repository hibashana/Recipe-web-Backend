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
      // define association here
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
    image:{ 
      type:DataTypes.STRING,
      allowNull: false,
    },
    no_of_recipes:{ 
      type: DataTypes.INTEGER,
    },
  }, {
    sequelize,
    modelName: 'Category',
  });
  return Category;
};