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
    description: 'Relax in this charming beach house with breathtaking views of the ocean. Enjoy the private deck and nautical touches inside. Spend your days exploring nearby beaches or lounging in the sun. Paradise!',
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
    description: 'Cozy up by the fire in this stunning ski-in/ski-out chalet. Entertain in the spacious living area with a fully equipped kitchen. Enjoy the outdoor hot tub with mountain views. Perfect winter getaway.',
    price: 122.00
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
    description: 'Stay in this stylish city apartment in the heart of downtown. Modern decor, open plan living, and cozy bedrooms. Close to the best restaurants, bars, and attractions. The perfect city escape.',
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
    description: 'Get away from it all in this rustic lakeside cabin. Cozy interior with a wood-burning fireplace and comfortable furnishings. Simple and comfortable bedrooms with stunning views of the surrounding forest. Perfect retreat.',
    price: 143.50
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
    description: 'Experience luxury in this stunning desert home with panoramic views of the landscape and a private pool. Modern and sleek interior with spacious and comfortable bedrooms. Perfect for exploring national parks or relaxing by the pool.',
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
    description: 'This charming beach house has stunning ocean views, a private deck, and cozy bedrooms. Relax and unwind on the beach or soak up the sun with a good book.',
    price: 165.00
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
    description: 'This stunning chalet offers ski-in/ski-out access, a fireplace, and an outdoor hot tub. The spacious living area is perfect for entertaining and the bedrooms offer stunning mountain views.',
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
    description: "This stylish city apartment is located in the heart of downtown and offers a modern decor, comfortable bedrooms, and easy access to the city's best attractions.",
    price: 186.50
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
    description: 'This rustic cabin is located on a tranquil lake and offers a cozy interior, comfortable bedrooms, and plenty of outdoor activities such as fishing and kayaking.',
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
    description: 'This stunning desert home offers panoramic views, a private pool, modern furnishings, and spacious bedrooms. Perfect for exploring nearby national parks or relaxing by the pool.',
    price: 208.00
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
    description: 'Stunning desert home with panoramic views of the landscape and private pool. Modern and sleek interior with plenty of natural light and stylish furnishings.',
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
    description: 'Stylish city apartment located in the heart of downtown. Modern decor and open plan living area make this apartment feel spacious and inviting. Cozy and comfortable bedrooms. Perfect for business or pleasure.',
    price: 229.50
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
    description: 'Rustic cabin on the edge of a tranquil lake. Cozy and inviting interior with a wood-burning fireplace and comfortable furnishings. Simple and comfortable bedrooms with stunning views. Fishing, kayaking, or simply relaxing on the dock await.',
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
