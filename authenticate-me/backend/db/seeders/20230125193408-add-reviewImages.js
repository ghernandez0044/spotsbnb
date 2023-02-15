'use strict';

/** @type {import('sequelize-cli').Migration} */

const { seedReviewImages } = require('../../utils/fakeSeed')

let options = {}
if(process.env.NODE_ENV === 'production'){
  options.schema = process.env.SCHEMA 
}

options.tableName = 'ReviewImages'

const reviewImages = [
  { reviewId: 1, url: 'https://stock.adobe.com/images/rating-theme-with-person-using-a-laptop-on-a-white-table/225614302?prev_url=detail' },
  { reviewId: 2, url: 'https://stock.adobe.com/images/rating-theme-with-person-using-a-laptop-on-a-white-table/225614302?prev_url=detail' },
  { reviewId: 3, url: 'https://stock.adobe.com/images/rating-theme-with-person-using-a-laptop-on-a-white-table/225614302?prev_url=detail' },
  { reviewId: 4, url: 'https://stock.adobe.com/images/rating-theme-with-person-using-a-laptop-on-a-white-table/225614302?prev_url=detail' },
  { reviewId: 5, url: 'https://stock.adobe.com/images/rating-theme-with-person-using-a-laptop-on-a-white-table/225614302?prev_url=detail' },
  { reviewId: 6, url: 'https://stock.adobe.com/images/rating-theme-with-person-using-a-laptop-on-a-white-table/225614302?prev_url=detail' },
  { reviewId: 7, url: 'https://stock.adobe.com/images/rating-theme-with-person-using-a-laptop-on-a-white-table/225614302?prev_url=detail' },
  { reviewId: 8, url: 'https://stock.adobe.com/images/rating-theme-with-person-using-a-laptop-on-a-white-table/225614302?prev_url=detail' },
  { reviewId: 9, url: 'https://stock.adobe.com/images/rating-theme-with-person-using-a-laptop-on-a-white-table/225614302?prev_url=detail' },
  { reviewId: 10, url: 'https://stock.adobe.com/images/rating-theme-with-person-using-a-laptop-on-a-white-table/225614302?prev_url=detail' },
  { reviewId: 11, url: 'https://stock.adobe.com/images/rating-theme-with-person-using-a-laptop-on-a-white-table/225614302?prev_url=detail' },
  { reviewId: 12, url: 'https://stock.adobe.com/images/rating-theme-with-person-using-a-laptop-on-a-white-table/225614302?prev_url=detail' },
  { reviewId: 13, url: 'https://stock.adobe.com/images/rating-theme-with-person-using-a-laptop-on-a-white-table/225614302?prev_url=detail' }
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
