'use strict';

/** @type {import('sequelize-cli').Migration} */

const { seedReviewImages } = require('../../utils/fakeSeed')

let options = {}
if(process.env.NODE_ENV === 'production'){
  options.schema = process.env.SCHEMA 
}

options.tableName = 'ReviewImages'

const reviewImages = seedReviewImages(13)

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
