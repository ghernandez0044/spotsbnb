'use strict';
const { seedSpots } = require('../../utils/fakeSeed')

/** @type {import('sequelize-cli').Migration} */

let options = {}
if(process.env.NODE_ENV === 'production'){
  options.schema = process.env.SCHEMA
}
options.tableName = 'Spots'

const spots = [
  {
    ownerId: 1,
    address: '600 8th Avenue',
    city: 'San Francisco',
    state: 'California',
    country: 'United States',
    lat: 37.776748,
    lng: -122.466214,
    name: 'San Francisco near Golden Gate Park',
    description: 'Provident itaque voluptatem quo occaecati. Modi voluptatem dolor quos molestias saepe. Explicabo perspiciatis voluptate nam recusandae et quis. Odit perspiciatis autem tempore harum est molestiae tenetur harum ad.',
    price: 111.25
  },
  {
    ownerId: 2,
    address: '500 Central Avenue',
    city: 'Alameda',
    state: 'California',
    country: 'United States',
    lat: 37.771601,
    lng: -122.282149,
    name: 'Alameda near Marina',
    description: 'Reiciendis incidunt qui quisquam. Repellat sapiente perspiciatis minima dolore. Cumque dolorem commodi alias eligendi dolor quisquam. Delectus necessitatibus recusandae quasi debitis.',
    price: 122
  },
  {
    ownerId: 3,
    address: '511 North Rodeo Drive',
    city: 'Beverly Hills',
    state: 'California',
    country: 'United States',
    lat: 34.072023,
    lng: -118.405879,
    name: 'Beverly Hills in Rodeo Drive',
    description: 'Sapiente in voluptatibus quam adipisci.',
    price: 132.75
  },
  {
    ownerId: 4,
    address: '207 South 9th Street',
    city: 'Las Vegas',
    state: 'Nevada',
    country: 'United States',
    lat: 36.165677,
    lng: -115.136825,
    name: 'Las Vegas near Fremont Street',
    description: 'Aliquam ea dolorum quam repellendus laborum aliquid ex vel.',
    price: 143.5
  },
  {
    ownerId: 5,
    address: '6109 South St Lawrence Avenue',
    city: 'Chicago',
    state: 'Illinois',
    country: 'United States',
    lat: 41.783375,
    lng: -87.611142,
    name: 'Chicago home near University of Chicago',
    description: 'Ad voluptatem voluptatum nesciunt delectus. Dolor aliquam culpa. Ipsa perspiciatis voluptatem. Beatae pariatur ducimus mollitia consequatur est sed recusandae ipsa.',
    price: 154.25
  },
  {
    ownerId: 6,
    address: '25 Central Park West',
    city: 'New York',
    state: 'New York',
    country: 'United States',
    lat: 40.770732,
    lng: -73.980579,
    name: 'New York City in front of Central Park',
    description: 'Quod aspernatur amet voluptatibus harum qui magni excepturi. Saepe ea omnis ea. Natus dignissimos animi. Eveniet temporibus ullam.',
    price: 165
  },
  {
    ownerId: 7,
    address: '409 SW 8th Avenue',
    city: 'Miami',
    state: 'Florida',
    country: 'United States',
    lat: 25.769860,
    lng: -80.207383,
    name: 'Little Havana Miami',
    description: 'Nam quisquam placeat ut placeat eius provident in voluptate exercitationem. Amet ad aperiam.',
    price: 175.75
  },
  {
    ownerId: 8,
    address: '1390 Calle San Jacinto',
    city: 'San Juan',
    state: 'San Juan',
    country: 'Puerto Rico',
    lat: 18.383648,
    lng: -66.092123,
    name: 'San Juan Puerto Rico Getaway!',
    description: 'Excepturi consectetur aliquam nobis in atque nostrum. Fugit nihil officia nobis non officia. Voluptatem omnis earum. Non dolores atque doloribus dolor officia numquam perspiciatis velit.',
    price: 186.5
  },
  {
    ownerId: 9,
    address: 'Oudezijds Voorburgwal 126B',
    city: 'Amsterdam',
    state: 'Amsterdam',
    country: 'Netherlands',
    lat: 52.373453,
    lng: 4.897061,
    name: 'Downtown Amsterdam',
    description: 'Delectus fugiat ipsa repellendus maiores harum voluptatem sint neque. Autem ducimus delectus dolor earum laboriosam labore. Ab explicabo ipsam omnis sint commodi. Doloribus quae quae qui molestiae saepe.',
    price: 197.25
  },
  {
    ownerId: 10,
    address: '22 Mohammed Mahmoud ',
    city: 'Abdeen',
    state: 'Cairo',
    country: 'Egypt',
    lat: 30.043615,
    lng: 31.236632,
    name: 'Downtown Cairo near Egyptian Pyramids',
    description: 'Libero quasi magni omnis occaecati. Consequatur ullam qui eligendi quaerat quidem cum laborum deserunt dolore. Eius minima earum alias.',
    price: 208
  },
  {
    ownerId: 11,
    address: 'Al Karamah Street',
    city: 'Abu Dhabi',
    state: 'United Arab Emirates',
    country: 'Saudi Arabia',
    lat: 79.8057,
    lng: 16.5164,
    name: 'Downtown Abu Dhabi near the palace',
    description: 'Praesentium incidunt autem velit. Provident voluptatibus maiores dolores illo maxime vero saepe ipsam unde. Deserunt earum maiores porro porro consectetur quibusdam. Magni cumque consequuntur vero eaque culpa quis labore.',
    price: 218.75
  },
  {
    ownerId: 12,
    address: '4 Logan Circle',
    city: 'Washington',
    state: 'DC',
    country: 'United States',
    lat: 38.909631,
    lng: -77.030728,
    name: 'Washington DC near Logan Circle',
    description: 'Modi dolores vitae. Ipsam asperiores vel perspiciatis reiciendis. Quo cumque aliquam ipsum quos neque.',
    price: 229.5
  },
  {
    ownerId: 13,
    address: '341 N Main St',
    city: 'Cascade',
    state: 'Idaho',
    country: 'United States',
    lat: 44.518318,
    lng: -116.044077,
    name: 'Cascade home near lakefront',
    description: 'Voluptas dolorem eos esse eveniet eius quasi iste iusto. Sequi omnis itaque magni minus perspiciatis repellendus laboriosam. Saepe accusamus pariatur nobis eius.',
    price: 240.25
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

    await queryInterface.bulkInsert(options, spots, {})

  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */

    await queryInterface.bulkDelete(options, spots, {})

  }
};
