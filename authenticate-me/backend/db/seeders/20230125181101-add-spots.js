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
    address: '7118 Rowe Stream',
    city: 'Hilo',
    state: 'Hawaii',
    country: 'Northern Mariana Islands',
    lat: -70.2693,
    lng: -88.5506,
    name: 'Cleveland',
    description: 'Provident itaque voluptatem quo occaecati. Modi voluptatem dolor quos molestias saepe. Explicabo perspiciatis voluptate nam recusandae et quis. Odit perspiciatis autem tempore harum est molestiae tenetur harum ad.',
    price: 111.25
  },
  {
    ownerId: 2,
    address: '30048 Marcelle Corner',
    city: 'Bend',
    state: 'Maine',
    country: 'Jamaica',
    lat: -19.5967,
    lng: -5.7873,
    name: 'Benjamin',
    description: 'Reiciendis incidunt qui quisquam. Repellat sapiente perspiciatis minima dolore. Cumque dolorem commodi alias eligendi dolor quisquam. Delectus necessitatibus recusandae quasi debitis.',
    price: 122
  },
  {
    ownerId: 3,
    address: '59020 Kane Circle',
    city: 'La Mesa',
    state: 'Wisconsin',
    country: 'Bangladesh',
    lat: -85.1569,
    lng: -121.18,
    name: 'Destiney',
    description: 'Sapiente in voluptatibus quam adipisci.',
    price: 132.75
  },
  {
    ownerId: 4,
    address: '76686 Feil Brook',
    city: 'Mission Viejo',
    state: 'North Carolina',
    country: 'Angola',
    lat: -14.2985,
    lng: -50.9006,
    name: 'Garth',
    description: 'Aliquam ea dolorum quam repellendus laborum aliquid ex vel.',
    price: 143.5
  },
  {
    ownerId: 5,
    address: '4993 Daisy Park',
    city: 'Eau Claire',
    state: 'Ohio',
    country: 'Slovenia',
    lat: -63.3946,
    lng: 108.8063,
    name: 'Alfonso',
    description: 'Ad voluptatem voluptatum nesciunt delectus. Dolor aliquam culpa. Ipsa perspiciatis voluptatem. Beatae pariatur ducimus mollitia consequatur est sed recusandae ipsa.',
    price: 154.25
  },
  {
    ownerId: 6,
    address: '32122 Karlie Roads',
    city: 'Milwaukee',
    state: 'Iowa',
    country: 'Central African Republic',
    lat: 62.9267,
    lng: -160.4082,
    name: 'Emmett',
    description: 'Quod aspernatur amet voluptatibus harum qui magni excepturi. Saepe ea omnis ea. Natus dignissimos animi. Eveniet temporibus ullam.',
    price: 165
  },
  {
    ownerId: 7,
    address: '938 Hilll Court',
    city: 'Mesa',
    state: 'West Virginia',
    country: 'Ghana',
    lat: 77.6089,
    lng: -172.7318,
    name: 'Randall',
    description: 'Nam quisquam placeat ut placeat eius provident in voluptate exercitationem. Amet ad aperiam.',
    price: 175.75
  },
  {
    ownerId: 8,
    address: '35127 Hodkiewicz Lake',
    city: 'Lawrence',
    state: 'Kansas',
    country: 'Guernsey',
    lat: -35.337,
    lng: -19.8507,
    name: 'Reba',
    description: 'Excepturi consectetur aliquam nobis in atque nostrum. Fugit nihil officia nobis non officia. Voluptatem omnis earum. Non dolores atque doloribus dolor officia numquam perspiciatis velit.',
    price: 186.5
  },
  {
    ownerId: 9,
    address: '094 Effie Estate',
    city: 'Atascocita',
    state: 'Kansas',
    country: 'Mali',
    lat: 13.1326,
    lng: 66.8352,
    name: 'Joelle',
    description: 'Delectus fugiat ipsa repellendus maiores harum voluptatem sint neque. Autem ducimus delectus dolor earum laboriosam labore. Ab explicabo ipsam omnis sint commodi. Doloribus quae quae qui molestiae saepe.',
    price: 197.25
  },
  {
    ownerId: 10,
    address: '44891 Hickle Flats',
    city: 'Kettering',
    state: 'South Carolina',
    country: 'Kazakhstan',
    lat: -55.2117,
    lng: 19.144,
    name: 'Milan',
    description: 'Libero quasi magni omnis occaecati. Consequatur ullam qui eligendi quaerat quidem cum laborum deserunt dolore. Eius minima earum alias.',
    price: 208
  },
  {
    ownerId: 11,
    address: '2384 Antonio Burg',
    city: 'Kettering',
    state: 'Illinois',
    country: 'New Caledonia',
    lat: 79.8057,
    lng: 16.5164,
    name: 'Dayana',
    description: 'Praesentium incidunt autem velit. Provident voluptatibus maiores dolores illo maxime vero saepe ipsam unde. Deserunt earum maiores porro porro consectetur quibusdam. Magni cumque consequuntur vero eaque culpa quis labore.',
    price: 218.75
  },
  {
    ownerId: 12,
    address: '198 Hosea Forks',
    city: 'Pontiac',
    state: 'Wisconsin',
    country: 'Nicaragua',
    lat: -29.1804,
    lng: 131.778,
    name: 'Abigayle',
    description: 'Modi dolores vitae. Ipsam asperiores vel perspiciatis reiciendis. Quo cumque aliquam ipsum quos neque.',
    price: 229.5
  },
  {
    ownerId: 13,
    address: '2952 Ryan Haven',
    city: 'Orlando',
    state: 'South Carolina',
    country: 'Martinique',
    lat: -5.7324,
    lng: 74.4408,
    name: 'Colleen',
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
