'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Spot extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here

      // One-To-Many Relationship between Users and Spots
      Spot.belongsTo(
        models.User,
        { foreignKey: 'ownerId' }
      )

      // One-To-Many Relationship between Spots and SpotImages
      Spot.hasMany(
          models.SpotImage,
          { foreignKey: 'spotId', onDelete: 'CASCADE', hooks: true }
        )

      // One-To-Many Relationship between Spots and Reviews
      Spot.hasMany(
        models.Review,
        { foreignKey: 'spotId', onDelete: 'CASCADE', hooks: true }
      )

      // One-To-Many Relationship between Spots and Bookings
      Spot.hasMany(
        models.Booking,
        { foreignKey: 'spotId', onDelete: 'CASCADE', hooks: true }
      )

      // Many-To-Many Relationship between Users and Spots through Reviews join table
      Spot.belongsToMany(
        models.User,
        { through: models.Review }
      )

      // Many-To-Many Relationship between Users and Spots through Bookings join table
      Spot.belongsToMany(
        models.User,
        { through: models.Booking }
      )

    }
  }
  Spot.init({
    ownerId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    address: {
      type: DataTypes.STRING,
      allowNull: false
    },
    city: {
      type: DataTypes.STRING,
      allowNull: false
    },
    state: {
      type: DataTypes.STRING,
      allowNull: false
    },
    country: {
      type: DataTypes.STRING,
      allowNull: false
    },
    lat: {
      type: DataTypes.FLOAT,
      allowNull: false
    },
    lng: {
      type: DataTypes.FLOAT,
      allowNull: false
    },
    name: {
      type: DataTypes.STRING,
      validate: {
        len: [0, 50]
      }
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1,254]
      }
    },
    price: {
      type: DataTypes.FLOAT,
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'Spot',
  });
  return Spot;
};