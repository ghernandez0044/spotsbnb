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
    url: 'image.shutterstock.com/image-photo/beautiful-exterior-newly-built-luxury-260nw-529108441.jpg',
    preview: true
  },
  {
    spotId: 1,
    url: 'image.shutterstock.com/image-photo/stylish-scandinavian-living-room-interior-260nw-1489795766.jpg',
    preview: false
  },
  {
    spotId: 1,
    url: 'www.shutterstock.com/image-photo/modern-boho-interior-living-room-260nw-1444456808.jpg',
    preview: false
  },
  {
    spotId: 1,
    url: 'www.shutterstock.com/image-photo/stylish-scandinavian-living-room-interior-260nw-1506370985.jpg',
    preview: false
  },
  {
    spotId: 1,
    url: 'www.shutterstock.com/image-photo/urban-jungle-bright-living-room-260nw-1276888387.jpg',
    preview: false
  },
  {
    spotId: 2,
    url: 'image.shutterstock.com/image-photo/luxurious-new-construction-home-bellevue-260nw-555325381.jpg',
    preview: true
  },
  {
    spotId: 2,
    url: 'image.shutterstock.com/image-photo/stylish-scandinavian-living-room-interior-260nw-1489795766.jpg',
    preview: false
  },
  {
    spotId: 2,
    url: 'www.shutterstock.com/image-photo/modern-boho-interior-living-room-260nw-1444456808.jpg',
    preview: false
  },
  {
    spotId: 3,
    url: 'www.shutterstock.com/image-photo/quiet-street-us-260nw-274752770.jpg',
    preview: true
  },
  {
    spotId: 3,
    url: 'image.shutterstock.com/image-photo/stylish-scandinavian-living-room-interior-260nw-1489795766.jpg',
    preview: false
  },
  {
    spotId: 3,
    url: 'www.shutterstock.com/image-photo/modern-boho-interior-living-room-260nw-1444456808.jpg',
    preview: false
  },
  {
    spotId: 3,
    url: 'www.shutterstock.com/image-photo/stylish-scandinavian-living-room-interior-260nw-1506370985.jpg',
    preview: false
  },
  {
    spotId: 3,
    url: 'www.shutterstock.com/image-photo/urban-jungle-bright-living-room-260nw-1276888387.jpg',
    preview: false
  },
  {
    spotId: 4,
    url: 'image.shutterstock.com/image-photo/street-suburban-homes-260nw-629472962.jpg',
    preview: true
  },
  {
    spotId: 4,
    url: 'image.shutterstock.com/image-photo/stylish-scandinavian-living-room-interior-260nw-1489795766.jpg',
    preview: false
  },
  {
    spotId: 4,
    url: 'www.shutterstock.com/image-photo/modern-boho-interior-living-room-260nw-1444456808.jpg',
    preview: false
  },
  {
    spotId: 4,
    url: 'www.shutterstock.com/image-photo/stylish-scandinavian-living-room-interior-260nw-1506370985.jpg',
    preview: false
  },
  {
    spotId: 4,
    url: 'www.shutterstock.com/image-photo/urban-jungle-bright-living-room-260nw-1276888387.jpg',
    preview: false
  },
  {
    spotId: 5,
    url: 'www.shutterstock.com/image-photo/view-modern-residential-houses-neighborhood-260nw-1392175103.jpg',
    preview: true
  },
  {
    spotId: 5,
    url: 'image.shutterstock.com/image-photo/stylish-scandinavian-living-room-interior-260nw-1489795766.jpg',
    preview: false
  },
  {
    spotId: 5,
    url: 'www.shutterstock.com/image-photo/modern-boho-interior-living-room-260nw-1444456808.jpg',
    preview: false
  },
  {
    spotId: 5,
    url: 'www.shutterstock.com/image-photo/stylish-scandinavian-living-room-interior-260nw-1506370985.jpg',
    preview: false
  },
  {
    spotId: 5,
    url: 'www.shutterstock.com/image-photo/urban-jungle-bright-living-room-260nw-1276888387.jpg',
    preview: false
  },
  {
    spotId: 6,
    url: 'www.shutterstock.com/image-photo/living-residential-housing-neighborhood-street-260nw-1218861316.jpg',
    preview: true
  },
  {
    spotId: 6,
    url: 'image.shutterstock.com/image-photo/stylish-scandinavian-living-room-interior-260nw-1489795766.jpg',
    preview: false
  },
  {
    spotId: 6,
    url: 'www.shutterstock.com/image-photo/modern-boho-interior-living-room-260nw-1444456808.jpg',
    preview: false
  },
  {
    spotId: 6,
    url: 'www.shutterstock.com/image-photo/stylish-scandinavian-living-room-interior-260nw-1506370985.jpg',
    preview: false
  },
  {
    spotId: 6,
    url: 'www.shutterstock.com/image-photo/urban-jungle-bright-living-room-260nw-1276888387.jpg',
    preview: false
  },
  {
    spotId: 7,
    url: 'www.shutterstock.com/image-photo/living-residential-housing-neighborhood-street-260nw-1218861385.jpg',
    preview: true
  },
  {
    spotId: 7,
    url: 'image.shutterstock.com/image-photo/stylish-scandinavian-living-room-interior-260nw-1489795766.jpg',
    preview: false
  },
  {
    spotId: 7,
    url: 'www.shutterstock.com/image-photo/modern-boho-interior-living-room-260nw-1444456808.jpg',
    preview: false
  },
  {
    spotId: 7,
    url: 'www.shutterstock.com/image-photo/stylish-scandinavian-living-room-interior-260nw-1506370985.jpg',
    preview: false
  },
  {
    spotId: 7,
    url: 'www.shutterstock.com/image-photo/urban-jungle-bright-living-room-260nw-1276888387.jpg',
    preview: false
  },
  {
    spotId: 8,
    url: 'image.shutterstock.com/image-photo/exterior-modern-white-villa-pool-260nw-1151072345.jpg',
    preview: true
  },
  {
    spotId: 8,
    url: 'image.shutterstock.com/image-photo/stylish-scandinavian-living-room-interior-260nw-1489795766.jpg',
    preview: false
  },
  {
    spotId: 8,
    url: 'www.shutterstock.com/image-photo/modern-boho-interior-living-room-260nw-1444456808.jpg',
    preview: false
  },
  {
    spotId: 8,
    url: 'www.shutterstock.com/image-photo/stylish-scandinavian-living-room-interior-260nw-1506370985.jpg',
    preview: false
  },
  {
    spotId: 8,
    url: 'www.shutterstock.com/image-photo/urban-jungle-bright-living-room-260nw-1276888387.jpg',
    preview: false
  },
  {
    spotId: 9,
    url: 'www.shutterstock.com/image-photo/modern-villa-pool-night-scene-260nw-147711812.jpg',
    preview: true
  },
  {
    spotId: 9,
    url: 'image.shutterstock.com/image-photo/stylish-scandinavian-living-room-interior-260nw-1489795766.jpg',
    preview: false
  },
  {
    spotId: 9,
    url: 'www.shutterstock.com/image-photo/modern-boho-interior-living-room-260nw-1444456808.jpg',
    preview: false
  },
  {
    spotId: 9,
    url: 'www.shutterstock.com/image-photo/stylish-scandinavian-living-room-interior-260nw-1506370985.jpg',
    preview: false
  },
  {
    spotId: 9,
    url: 'www.shutterstock.com/image-photo/urban-jungle-bright-living-room-260nw-1276888387.jpg',
    preview: false
  },
  {
    spotId: 10,
    url: 'www.shutterstock.com/image-photo/modern-villa-pool-night-scene-260nw-146067944.jpg',
    preview: true
  },
  {
    spotId: 10,
    url: 'image.shutterstock.com/image-photo/stylish-scandinavian-living-room-interior-260nw-1489795766.jpg',
    preview: false
  },
  {
    spotId: 10,
    url: 'www.shutterstock.com/image-photo/modern-boho-interior-living-room-260nw-1444456808.jpg',
    preview: false
  },
  {
    spotId: 10,
    url: 'www.shutterstock.com/image-photo/stylish-scandinavian-living-room-interior-260nw-1506370985.jpg',
    preview: false
  },
  {
    spotId: 10,
    url: 'www.shutterstock.com/image-photo/urban-jungle-bright-living-room-260nw-1276888387.jpg',
    preview: false
  },
  {
    spotId: 11,
    url: 'www.shutterstock.com/image-photo/modern-villa-pool-view-garden-260nw-144461764.jpg',
    preview: true
  },
  {
    spotId: 11,
    url: 'image.shutterstock.com/image-photo/stylish-scandinavian-living-room-interior-260nw-1489795766.jpg',
    preview: false
  },
  {
    spotId: 11,
    url: 'www.shutterstock.com/image-photo/modern-boho-interior-living-room-260nw-1444456808.jpg',
    preview: false
  },
  {
    spotId: 11,
    url: 'www.shutterstock.com/image-photo/stylish-scandinavian-living-room-interior-260nw-1506370985.jpg',
    preview: false
  },
  {
    spotId: 11,
    url: 'www.shutterstock.com/image-photo/urban-jungle-bright-living-room-260nw-1276888387.jpg',
    preview: false
  },
  {
    spotId: 12,
    url: 'www.shutterstock.com/image-illustration/realistic-3d-rendering-very-modern-260nw-500436808.jpg',
    preview: true
  },
  {
    spotId: 12,
    url: 'image.shutterstock.com/image-photo/stylish-scandinavian-living-room-interior-260nw-1489795766.jpg',
    preview: false
  },
  {
    spotId: 12,
    url: 'www.shutterstock.com/image-photo/modern-boho-interior-living-room-260nw-1444456808.jpg',
    preview: false
  },
  {
    spotId: 12,
    url: 'www.shutterstock.com/image-photo/stylish-scandinavian-living-room-interior-260nw-1506370985.jpg',
    preview: false
  },
  {
    spotId: 12,
    url: 'www.shutterstock.com/image-photo/urban-jungle-bright-living-room-260nw-1276888387.jpg',
    preview: false
  },
  {
    spotId: 13,
    url: 'www.shutterstock.com/image-illustration/3d-rendering-upscale-modern-mansion-600w-1247473441.jpg',
    preview: true
  },
  {
    spotId: 13,
    url: 'image.shutterstock.com/image-photo/stylish-scandinavian-living-room-interior-260nw-1489795766.jpg',
    preview: false
  },
  {
    spotId: 13,
    url: 'www.shutterstock.com/image-photo/modern-boho-interior-living-room-260nw-1444456808.jpg',
    preview: false
  },
  {
    spotId: 13,
    url: 'www.shutterstock.com/image-photo/stylish-scandinavian-living-room-interior-260nw-1506370985.jpg',
    preview: false
  },
  {
    spotId: 13,
    url: 'www.shutterstock.com/image-photo/urban-jungle-bright-living-room-260nw-1276888387.jpg',
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
