'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Airplane extends Model {
    static associate(models) {
      // define association here
      this.hasMany(models.Flight,{
        foreignKey:'airplaneId',
        onDelete:'CASCADE',
      })
    }
  }

  Airplane.init({
    modelNumber: {
      type: DataTypes.STRING,
      allowNull: false
    },
    capacity: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        max: {
          args: [1000],
          msg: 'Capacity cannot exceed 1000 seats'
        }
      }
    }
  }, {
    sequelize,
    modelName: 'Airplane'
  });

  return Airplane;
};
