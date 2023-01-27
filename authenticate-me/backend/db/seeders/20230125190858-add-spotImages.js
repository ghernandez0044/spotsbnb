'use strict';

/** @type {import('sequelize-cli').Migration} */

const { seedSpotImages } = require('../../utils/fakeSeed')

let options = {}
if(process.env.NODE_ENV === 'production'){
  options.schema = process.env.SCHEMA
}

options.tableName = 'SpotImages'

const spotImages = [
  {
    spotId: 1,
    url: 'https://loremflickr.com/640/480/city',
    preview: false
  },
  {
    spotId: 2,
    url: 'https://loremflickr.com/640/480/city',
    preview: false
  },
  {
    spotId: 3,
    url: 'https://loremflickr.com/640/480/city',
    preview: true
  },
  {
    spotId: 4,
    url: 'https://loremflickr.com/640/480/city',
    preview: true
  },
  {
    spotId: 5,
    url: 'https://loremflickr.com/640/480/city',
    preview: false
  },
  {
    spotId: 6,
    url: 'https://loremflickr.com/640/480/city',
    preview: false
  },
  {
    spotId: 7,
    url: 'https://loremflickr.com/640/480/city',
    preview: true
  },
  {
    spotId: 8,
    url: 'https://loremflickr.com/640/480/city',
    preview: false
  },
  {
    spotId: 9,
    url: 'https://loremflickr.com/640/480/city',
    preview: false
  },
  {
    spotId: 10,
    url: 'https://loremflickr.com/640/480/city',
    preview: true
  },
  {
    spotId: 11,
    url: 'https://loremflickr.com/640/480/city',
    preview: true
  },
  {
    spotId: 12,
    url: 'https://loremflickr.com/640/480/city',
    preview: false
  },
  {
    spotId: 13,
    url: 'https://loremflickr.com/640/480/city',
    preview: false
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
    await queryInterface.bulkInsert(options, spotImages, {})

  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete(options, spotImages, {})
  }
};
