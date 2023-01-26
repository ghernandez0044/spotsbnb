'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Booking extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here

      // One-to-Many Relationship between Users and Bookings
      Booking.belongsTo(
        models.User,
        { foreignKey: 'userId' }
      )

      // One-To-Many Relationship between Spots and Bookings
      Booking.belongsTo(
        models.Spot,
        { foreignKey: 'spotId' }
      )
    }
  }
  Booking.init({
    spotId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    startDate: DataTypes.DATE,
    endDate: {
      type: DataTypes.DATE,
      validate: {
        correctDate(date){
          if(date.getTime() >= this.startDate){
            throw new Error('endDate cannot be on or before startDate')
          }
        }
      }
    }
  }, {
    sequelize,
    modelName: 'Booking',
  });
  return Booking;
};