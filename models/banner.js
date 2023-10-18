'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class banner extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  banner.init({
    id: {
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
    appID:{
      type:DataTypes.UUID,
      allowNull: false,
    },
  }, {
    sequelize,
    modelName: 'banner',
  });
  return banner;
};