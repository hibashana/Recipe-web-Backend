'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {

  class steps extends Model {
    static associate(models) {
      steps.belongsTo(models.Recipes, {
        foreignKey: 'RecipeID'
         // The foreign key in the Steps table
      });  // define association here
    }
  }
  steps.init({
    stpid: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      autoIncrement: false,
    },
    description: { 
      type:DataTypes.STRING,
      allowNull: false,
    },
    RecipeID:{
      type:DataTypes.UUID,
    },
  }, {
    sequelize,
    modelName: 'steps',
  });
  return steps;
};
