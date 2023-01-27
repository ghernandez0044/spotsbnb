'use strict';

/** @type {import('sequelize-cli').Migration} */

const { seedReviews } = require('../../utils/fakeSeed')

let options = {}
if(process.env.NODE_ENV === 'production'){
  options.schema = process.env.SCHEMA
}

options.tableName = 'Reviews'

const reviews = [
  { spotId: 1, userId: 1, review: 'Perspiciatis odit quam.', stars: 1 },
  {
    spotId: 2,
    userId: 2,
    review: 'Quod ut quos et. Rerum occaecati veritatis amet dolorem voluptates.',
    stars: 2
  },
  {
    spotId: 3,
    userId: 3,
    review: 'Porro consequuntur quisquam dolore perspiciatis.',
    stars: 2
  },
  {
    spotId: 4,
    userId: 4,
    review: 'Sunt dolorem nulla voluptas. Nostrum maxime voluptate non veniam. Et beatae dicta fuga. Velit voluptatum incidunt consectetur illo amet earum veritatis quam.',
    stars: 2
  },
  {
    spotId: 4,
    userId: 5,
    review: 'Nihil possimus magnam suscipit magni iure atque. Magni debitis ipsum iusto sapiente deserunt vero distinctio. Totam architecto dicta dignissimos nobis libero.',
    stars: 4
  },
  {
    spotId: 5,
    userId: 6,
    review: 'Quia accusamus et tempore est perspiciatis asperiores provident culpa.',
    stars: 4
  },
  {
    spotId: 5,
    userId: 7,
    review: 'Dolorem consequatur repudiandae veritatis cupiditate cupiditate tempora.',
    stars: 5
  },
  {
    spotId: 6,
    userId: 8,
    review: 'Optio saepe incidunt. Quam quibusdam debitis adipisci deserunt accusamus id. Dolor reiciendis dolores temporibus vel.',
    stars: 5
  },
  {
    spotId: 7,
    userId: 9,
    review: 'Molestiae possimus explicabo nam autem itaque quasi dolor eveniet. Consequatur error quia alias neque fugiat.',
    stars: 2
  },
  {
    spotId: 8,
    userId: 10,
    review: 'Qui totam assumenda ullam possimus cum. Fugit earum nobis. Explicabo doloremque non quae sit illum nesciunt.',
    stars: 4
  },
  {
    spotId: 9,
    userId: 11,
    review: 'Beatae voluptates cupiditate architecto. Itaque perferendis non nihil. Voluptas consequuntur rem unde nesciunt.',
    stars: 3
  },
  {
    spotId: 10,
    userId: 12,
    review: 'Quibusdam a commodi corrupti optio distinctio optio. Corrupti cum dicta non molestiae eos impedit quas. Quibusdam cumque odit saepe tempora rerum. Dolore neque sint sunt amet asperiores ipsum.',
    stars: 2
  },
  {
    spotId: 10,
    userId: 13,
    review: 'Nobis error non at omnis ad modi. Harum asperiores soluta ipsam animi atque ipsam. Voluptas culpa architecto assumenda repudiandae rem harum. Atque molestias dolor reiciendis officia cupiditate quidem.',
    stars: 1
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
   await queryInterface.bulkInsert(options, reviews, {})
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete(options, reviews, {})
  }
};
