'use strict';

/** @type {import('sequelize-cli').Migration} */

let options = {}
if(process.env.NODE_ENV === 'production'){
  options.schema = process.env.SCHEMA
}

options.tableName = 'SpotImages'

const spotImages = [
  {
    spotId: 1,
    url: 'https://stock.adobe.com/images/entrance-to-the-house/406563391?prev_url=detail',
    preview: true
  },
  {
    spotId: 1,
    url: 'https://stock.adobe.com/images/entrance-to-the-house/406563391?prev_url=detail&asset_id=445800413',
    preview: false
  },
  {
    spotId: 1,
    url: 'https://stock.adobe.com/images/entrance-to-the-house/406563391?prev_url=detail&asset_id=445800208',
    preview: false
  },
  {
    spotId: 1,
    url: 'https://stock.adobe.com/images/entrance-to-the-house/406563391?prev_url=detail&asset_id=426823027',
    preview: false
  },
  {
    spotId: 1,
    url: 'https://stock.adobe.com/images/entrance-to-the-house/406563391?prev_url=detail&asset_id=436132576',
    preview: false
  },
  {
    spotId: 2,
    url: 'https://stock.adobe.com/images/entrance-to-the-house/406563391?prev_url=detail&asset_id=454215128',
    preview: true
  },
  {
    spotId: 2,
    url: 'https://stock.adobe.com/images/entrance-to-the-house/406563391?prev_url=detail&asset_id=445800344',
    preview: false
  },
  {
    spotId: 2,
    url: 'https://stock.adobe.com/images/entrance-to-the-house/406563391?prev_url=detail&asset_id=337622286',
    preview: false
  },
  {
    spotId: 3,
    url: 'https://stock.adobe.com/images/entrance-to-the-house/406563391?prev_url=detail&asset_id=445800208',
    preview: true
  },
  {
    spotId: 3,
    url: 'https://stock.adobe.com/images/entrance-to-the-house/406563391?prev_url=detail&asset_id=445800413',
    preview: false
  },
  {
    spotId: 3,
    url: 'https://stock.adobe.com/images/entrance-to-the-house/406563391?prev_url=detail&asset_id=491763320',
    preview: false
  },
  {
    spotId: 3,
    url: 'https://stock.adobe.com/images/entrance-to-the-house/406563391?prev_url=detail&asset_id=337621596',
    preview: false
  },
  {
    spotId: 3,
    url: 'https://stock.adobe.com/images/entrance-to-the-house/406563391?prev_url=detail&asset_id=426823027',
    preview: false
  },
  {
    spotId: 4,
    url: 'https://stock.adobe.com/images/entrance-to-the-house/406563391?prev_url=detail&asset_id=350405566',
    preview: true
  },
  {
    spotId: 4,
    url: 'https://stock.adobe.com/images/entrance-to-the-house/406563391?prev_url=detail&asset_id=468710893',
    preview: false
  },
  {
    spotId: 4,
    url: 'https://stock.adobe.com/images/entrance-to-the-house/406563391?prev_url=detail&asset_id=468710882',
    preview: false
  },
  {
    spotId: 4,
    url: 'https://stock.adobe.com/images/entrance-to-the-house/406563391?prev_url=detail&asset_id=436132576',
    preview: false
  },
  {
    spotId: 4,
    url: 'https://stock.adobe.com/images/entrance-to-the-house/406563391?prev_url=detail&asset_id=454215128',
    preview: false
  },
  {
    spotId: 5,
    url: 'https://stock.adobe.com/images/entrance-to-the-house/406563391?prev_url=detail&asset_id=470967702',
    preview: true
  },
  {
    spotId: 5,
    url: 'https://stock.adobe.com/images/entrance-to-the-house/406563391?prev_url=detail&asset_id=445800344',
    preview: false
  },
  {
    spotId: 5,
    url: 'https://stock.adobe.com/images/entrance-to-the-house/406563391?prev_url=detail&asset_id=337622286',
    preview: false
  },
  {
    spotId: 5,
    url: 'https://stock.adobe.com/images/entrance-to-the-house/406563391?prev_url=detail&asset_id=406563456',
    preview: false
  },
  {
    spotId: 5,
    url: 'https://stock.adobe.com/images/entrance-to-the-house/406563391?prev_url=detail&asset_id=445800413',
    preview: false
  },
  {
    spotId: 6,
    url: 'https://stock.adobe.com/images/entrance-to-the-house/406563391?prev_url=detail&asset_id=337622062',
    preview: true
  },
  {
    spotId: 6,
    url: 'https://stock.adobe.com/images/entrance-to-the-house/406563391?prev_url=detail&asset_id=445800413',
    preview: false
  },
  {
    spotId: 6,
    url: 'https://stock.adobe.com/images/entrance-to-the-house/406563391?prev_url=detail&asset_id=491763320',
    preview: false
  },
  {
    spotId: 6,
    url: 'https://stock.adobe.com/images/entrance-to-the-house/406563391?prev_url=detail&asset_id=337621596',
    preview: false
  },
  {
    spotId: 6,
    url: 'https://stock.adobe.com/images/entrance-to-the-house/406563391?prev_url=detail&asset_id=426823027',
    preview: false
  },
  {
    spotId: 7,
    url: 'https://stock.adobe.com/images/entrance-to-the-house/406563391?prev_url=detail&asset_id=348728888',
    preview: true
  },
  {
    spotId: 7,
    url: 'https://stock.adobe.com/images/entrance-to-the-house/406563391?prev_url=detail&asset_id=445800413',
    preview: false
  },
  {
    spotId: 7,
    url: 'https://stock.adobe.com/images/entrance-to-the-house/406563391?prev_url=detail&asset_id=445800208',
    preview: false
  },
  {
    spotId: 7,
    url: 'https://stock.adobe.com/images/entrance-to-the-house/406563391?prev_url=detail&asset_id=426823027',
    preview: false
  },
  {
    spotId: 7,
    url: 'https://stock.adobe.com/images/entrance-to-the-house/406563391?prev_url=detail&asset_id=436132576',
    preview: false
  },
  {
    spotId: 8,
    url: 'https://stock.adobe.com/images/entrance-to-the-house/406563391?prev_url=detail&asset_id=406551913',
    preview: true
  },
  {
    spotId: 8,
    url: 'https://stock.adobe.com/images/entrance-to-the-house/406563391?prev_url=detail&asset_id=445800413',
    preview: false
  },
  {
    spotId: 8,
    url: 'https://stock.adobe.com/images/entrance-to-the-house/406563391?prev_url=detail&asset_id=445800208',
    preview: false
  },
  {
    spotId: 8,
    url: 'https://stock.adobe.com/images/entrance-to-the-house/406563391?prev_url=detail&asset_id=426823027',
    preview: false
  },
  {
    spotId: 8,
    url: 'https://stock.adobe.com/images/entrance-to-the-house/406563391?prev_url=detail&asset_id=436132576',
    preview: false
  },
  {
    spotId: 9,
    url: 'https://stock.adobe.com/images/entrance-to-the-house/406563391?prev_url=detail&asset_id=350430305',
    preview: true
  },
  {
    spotId: 9,
    url: 'https://stock.adobe.com/images/entrance-to-the-house/406563391?prev_url=detail&asset_id=445800413',
    preview: false
  },
  {
    spotId: 9,
    url: 'https://stock.adobe.com/images/entrance-to-the-house/406563391?prev_url=detail&asset_id=445800208',
    preview: false
  },
  {
    spotId: 9,
    url: 'https://stock.adobe.com/images/entrance-to-the-house/406563391?prev_url=detail&asset_id=426823027',
    preview: false
  },
  {
    spotId: 9,
    url: 'https://stock.adobe.com/images/entrance-to-the-house/406563391?prev_url=detail&asset_id=436132576',
    preview: false
  },
  {
    spotId: 10,
    url: 'https://stock.adobe.com/images/entrance-to-the-house/406563391?prev_url=detail&asset_id=350432246',
    preview: true
  },
  {
    spotId: 10,
    url: 'https://stock.adobe.com/images/entrance-to-the-house/406563391?prev_url=detail&asset_id=445800413',
    preview: false
  },
  {
    spotId: 10,
    url: 'https://stock.adobe.com/images/entrance-to-the-house/406563391?prev_url=detail&asset_id=445800208',
    preview: false
  },
  {
    spotId: 10,
    url: 'https://stock.adobe.com/images/entrance-to-the-house/406563391?prev_url=detail&asset_id=426823027',
    preview: false
  },
  {
    spotId: 10,
    url: 'https://stock.adobe.com/images/entrance-to-the-house/406563391?prev_url=detail&asset_id=436132576',
    preview: false
  },
  {
    spotId: 11,
    url: 'https://stock.adobe.com/images/entrance-to-the-house/406563391?prev_url=detail&asset_id=429342894',
    preview: true
  },
  {
    spotId: 11,
    url: 'https://stock.adobe.com/images/entrance-to-the-house/406563391?prev_url=detail&asset_id=445800413',
    preview: false
  },
  {
    spotId: 11,
    url: 'https://stock.adobe.com/images/entrance-to-the-house/406563391?prev_url=detail&asset_id=445800208',
    preview: false
  },
  {
    spotId: 11,
    url: 'https://stock.adobe.com/images/entrance-to-the-house/406563391?prev_url=detail&asset_id=426823027',
    preview: false
  },
  {
    spotId: 11,
    url: 'https://stock.adobe.com/images/entrance-to-the-house/406563391?prev_url=detail&asset_id=436132576',
    preview: false
  },
  {
    spotId: 12,
    url: 'https://stock.adobe.com/images/entrance-to-the-house/406563391?prev_url=detail&asset_id=350431351',
    preview: true
  },
  {
    spotId: 12,
    url: 'https://stock.adobe.com/images/entrance-to-the-house/406563391?prev_url=detail&asset_id=445800413',
    preview: false
  },
  {
    spotId: 12,
    url: 'https://stock.adobe.com/images/entrance-to-the-house/406563391?prev_url=detail&asset_id=445800208',
    preview: false
  },
  {
    spotId: 12,
    url: 'https://stock.adobe.com/images/entrance-to-the-house/406563391?prev_url=detail&asset_id=426823027',
    preview: false
  },
  {
    spotId: 12,
    url: 'https://stock.adobe.com/images/entrance-to-the-house/406563391?prev_url=detail&asset_id=436132576',
    preview: false
  },
  {
    spotId: 13,
    url: 'https://stock.adobe.com/images/entrance-to-the-house/406563391?prev_url=detail&asset_id=350431351',
    preview: true
  },
  {
    spotId: 13,
    url: 'https://stock.adobe.com/images/entrance-to-the-house/406563391?prev_url=detail&asset_id=445800413',
    preview: false
  },
  {
    spotId: 13,
    url: 'https://stock.adobe.com/images/entrance-to-the-house/406563391?prev_url=detail&asset_id=445800208',
    preview: false
  },
  {
    spotId: 13,
    url: 'https://stock.adobe.com/images/entrance-to-the-house/406563391?prev_url=detail&asset_id=426823027',
    preview: false
  },
  {
    spotId: 13,
    url: 'https://stock.adobe.com/images/entrance-to-the-house/406563391?prev_url=detail&asset_id=436132576',
    preview: false
  },
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
