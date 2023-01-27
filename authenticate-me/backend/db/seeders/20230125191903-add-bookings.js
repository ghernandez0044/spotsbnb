'use strict';

/** @type {import('sequelize-cli').Migration} */

const { seedBookings } = require('../../utils/fakeSeed')

let options = {}
if(process.env.NODE_ENV === 'production'){
  options.schema = process.env.SCHEMA
}

options.tableName = 'Bookings'

const bookings = [
  {
    spotId: 8,
    userId: 8,
    startDate: new Date('2023-07-14 12:00:00'),
    endDate: new Date('2023-07-16 11:23:00')
  },
  {
    spotId: 11,
    userId: 10,
    startDate: new Date('2023-04-16 11:23:00'),
    endDate: new Date('2023-05-14 11:23:00')
  },
  {
    spotId: 8,
    userId: 4,
    startDate: new Date('2023-02-12 11:23:00'),
    endDate: new Date('2023-03-19 11:23:00')
  },
  {
    spotId: 8,
    userId: 6,
    startDate: new Date('2023-01-16 11:23:00'),
    endDate: new Date('2023-01-22 11:23:00')
  },
  {
    spotId: 5,
    userId: 5,
    startDate: new Date('2023-08-16 11:23:00'),
    endDate: new Date('2023-08-24 11:23:00')
  },
  {
    spotId: 13,
    userId: 6,
    startDate: new Date('2023-09-16 11:23:00'),
    endDate: new Date('2023-09-18 11:23:00')
  },
  {
    spotId: 7,
    userId: 10,
    startDate: new Date('2023-09-24 11:23:00'),
    endDate: new Date('2023-09-27 11:23:00')
  },
  {
    spotId: 10,
    userId: 11,
    startDate: new Date('2023-09-29 11:23:00'),
    endDate: new Date('2023-09-30 11:23:00')
  },
  {
    spotId: 6,
    userId: 3,
    startDate: new Date('2023-10-16 11:23:00'),
    endDate: new Date('2023-10-19 11:23:00')
  },
  {
    spotId: 8,
    userId: 7,
    startDate: new Date('2023-10-24 11:23:00'),
    endDate: new Date('2023-10-28 11:23:00')
  },
  {
    spotId: 4,
    userId: 9,
    startDate: new Date('2023-10-29 11:23:00'),
    endDate: new Date('2023-10-31 11:23:00')
  },
  {
    spotId: 7,
    userId: 2,
    startDate: new Date('2023-11-24 11:23:00'),
    endDate: new Date('2023-11-27 11:23:00')
  },
  {
    spotId: 13,
    userId: 9,
    startDate: new Date('2023-12-16 11:23:00'),
    endDate: new Date('2023-12-24 11:23:00')
  }
]

module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
   await queryInterface.bulkInsert(options, bookings, {})

  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete(options, bookings, {})
  }
};
