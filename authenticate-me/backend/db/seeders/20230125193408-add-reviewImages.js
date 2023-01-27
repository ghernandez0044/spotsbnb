'use strict';

/** @type {import('sequelize-cli').Migration} */

const { seedReviewImages } = require('../../utils/fakeSeed')

let options = {}
if(process.env.NODE_ENV === 'production'){
  options.schema = process.env.SCHEMA 
}

options.tableName = 'ReviewImages'

const reviewImages = [
  { reviewId: 1, url: 'https://loremflickr.com/640/480/city' },
  { reviewId: 2, url: 'https://loremflickr.com/640/480/city' },
  { reviewId: 3, url: 'https://loremflickr.com/640/480/city' },
  { reviewId: 4, url: 'https://loremflickr.com/640/480/city' },
  { reviewId: 5, url: 'https://loremflickr.com/640/480/city' },
  { reviewId: 6, url: 'https://loremflickr.com/640/480/city' },
  { reviewId: 7, url: 'https://loremflickr.com/640/480/city' },
  { reviewId: 8, url: 'https://loremflickr.com/640/480/city' },
  { reviewId: 9, url: 'https://loremflickr.com/640/480/city' },
  { reviewId: 10, url: 'https://loremflickr.com/640/480/city' },
  { reviewId: 11, url: 'https://loremflickr.com/640/480/city' },
  { reviewId: 12, url: 'https://loremflickr.com/640/480/city' },
  { reviewId: 13, url: 'https://loremflickr.com/640/480/city' }
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
   await queryInterface.bulkInsert(options, reviewImages, {})
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete(options, reviewImages, {})
  }
};
