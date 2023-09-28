'use strict';
const {
  Model
} = require('sequelize');
const recipes = require('./recipes');
module.exports = (sequelize, DataTypes) => {
  class steps extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
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
  }, {
    sequelize,
    modelName: 'steps',
  });
  return steps;
};
// steps.belongsTo(recipes, { foreignKey: 'rcpid' });
