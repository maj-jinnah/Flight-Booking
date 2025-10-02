'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Seat extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Seat.belongsTo(models.Airplane, {
        foreignKey: 'airplaneId',
        onDelete: 'CASCADE',
      });
    }
  }
  Seat.init({
    airplaneId: {
      type : DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Airplanes',
        key: 'id',
      },
      onDelete: 'CASCADE',
    },
    row: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    col: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    type: {
      type: DataTypes.ENUM,
      values: ['economy', 'business', 'first-class', 'premium-economy'],
      defaultValue: 'economy',
      allowNull: false,
    }
  }, {
    sequelize,
    modelName: 'Seat',
  });
  return Seat;
};