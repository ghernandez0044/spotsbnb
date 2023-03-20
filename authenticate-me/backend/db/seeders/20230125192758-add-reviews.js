'use strict';

/** @type {import('sequelize-cli').Migration} */

const { seedReviews } = require('../../utils/fakeSeed')

let options = {}
if(process.env.NODE_ENV === 'production'){
  options.schema = process.env.SCHEMA
}

options.tableName = 'Reviews'

const reviews = [
  { spotId: 1, userId: 4, review: "Amazing views and cozy accommodations! We loved our stay here and can't wait to come back. Highly recommend!", stars: 1 },
  { spotId: 1, userId: 2, review: "This rental exceeded our expectations. The amenities were top-notch and the location was perfect for exploring the area.", stars: 2 },
  { spotId: 1, userId: 3, review: "A truly unforgettable stay. The house was spacious, clean, and beautifully decorated. We didn't want to leave!", stars: 3 },
  { spotId: 1, userId: 6, review: "Perfect for a family getaway. The kids loved the pool and game room, while the adults enjoyed the peaceful surroundings.", stars: 4 },
  {
    spotId: 2,
    userId: 6,
    review: "Absolutely stunning property with every detail thoughtfully considered. A true gem in the heart of the city.",
    stars: 2
  },
  {
    spotId: 2,
    userId: 1,
    review: "If you're looking for a luxurious and relaxing vacation, this is the place to be. We couldn't have asked for more!",
    stars: 2
  },
  {
    spotId: 2,
    userId: 3,
    review: "The location was perfect for our group's needs, and the house itself was immaculate. We will definitely be returning!",
    stars: 4
  },
  {
    spotId: 2,
    userId: 4,
    review: "Incredible attention to detail throughout the entire property. The hosts were welcoming and made us feel right at home.",
    stars: 5
  },
  {
    spotId: 3,
    userId: 7,
    review: "From the moment we arrived, we knew we were in for a special stay. The house was impeccable and the views were breathtaking.",
    stars: 2
  },
  {
    spotId: 3,
    userId: 4,
    review: "We had a fantastic time at this rental. The outdoor space was amazing and the house was comfortable and well-appointed.",
    stars: 5
  },
  {
    spotId: 3,
    userId: 5,
    review: 'Had an amazing stay at this vacation rental! The house was clean, comfortable, and had everything we needed for a great weekend getaway. Highly recommend!',
    stars: 1
  },
  {
    spotId: 3,
    userId: 6,
    review: "Beautiful house with stunning views! The pictures don't do it justice. The owners were incredibly helpful and responsive. Can't wait to come back!",
    stars: 1
  },
  {
    spotId: 4,
    userId: 1,
    review: 'This rental was the perfect escape from the city. The location was serene and peaceful. The house was spotless and had all the amenities we needed. A+ experience!',
    stars: 4
  },
  {
    spotId: 4,
    userId: 5,
    review: 'Wow, what an incredible property! The house was spacious, tastefully decorated, and had top-notch appliances. The pool and outdoor area were the cherry on top. Highly recommend!',
    stars: 5
  },
  {
    spotId: 4,
    userId: 6,
    review: 'Our family had a fantastic time at this rental. The house was large enough for everyone to have their own space, yet cozy enough for family bonding time. The nearby activities were a bonus!',
    stars: 3
  },
  {
    spotId: 4,
    userId: 5,
    review: "If you're looking for a luxurious vacation rental, this is it! The house was immaculate, the furnishings were high-end, and the amenities were first-class. We felt like royalty!",
    stars: 4
  },
  {
    spotId: 5,
    userId: 6,
    review: "This rental exceeded our expectations. The location was perfect, the house was clean and comfortable, and the owners were a pleasure to work with. We can't wait to book again!",
    stars: 4
  },
  {
    spotId: 5,
    userId: 7,
    review: 'Amazing location! The house was clean, comfortable and had everything we needed for a relaxing vacation.',
    stars: 5
  },
  {
    spotId: 5,
    userId: 7,
    review: 'This rental exceeded our expectations. Beautifully decorated, fully equipped kitchen, and a great outdoor space to unwind.',
    stars: 5
  },
  {
    spotId: 5,
    userId: 9,
    review: 'We had a wonderful time at this house. The owner was responsive and helpful, and the views were breathtaking.',
    stars: 3
  },
  {
    spotId: 6,
    userId: 8,
    review: 'The perfect getaway! The house was secluded yet close to all the attractions. We loved the hot tub and the fire pit.',
    stars: 3
  },
  {
    spotId: 6,
    userId: 9,
    review: 'This house exceeded our expectations! It was clean, comfortable, and had stunning views. We will definitely be coming back!',
    stars: 5
  },
  {
    spotId: 6,
    userId: 10,
    review: 'Amazing location! The house was right on the beach and the sunsets were breathtaking. Highly recommend this rental!',
    stars: 4
  },
  {
    spotId: 6,
    userId: 11,
    review: "Our family had a wonderful time at this vacation rental. It had everything we needed and more. Can't wait to come back!",
    stars: 5
  },
  {
    spotId: 7,
    userId: 9,
    review: 'The house was spacious and beautifully decorated. It felt like a home away from home. We had a great time!',
    stars: 4
  },
  {
    spotId: 7,
    userId: 10,
    review: 'The rental was perfect for our weekend getaway. The kitchen was well-stocked and the beds were comfortable. Would definitely recommend!',
    stars: 2
  },
  {
    spotId: 7,
    userId: 11,
    review: 'The house was in a quiet neighborhood and had a great backyard. We enjoyed sitting by the pool and grilling. Will be back!',
    stars: 5
  },
  {
    spotId: 7,
    userId: 12,
    review: 'The rental was sparkling clean and had a great location. We were able to walk to all the shops and restaurants. Highly recommend!',
    stars: 4
  },
  {
    spotId: 8,
    userId: 10,
    review: 'The house had stunning views of the mountains and was equipped with everything we needed. We had a fantastic time!',
    stars: 2
  },
  {
    spotId: 8,
    userId: 11,
    review: "The rental was perfect for our group of friends. It had plenty of space and was in a great location. Can't wait to come back!",
    stars: 2
  },
  {
    spotId: 8,
    userId: 12,
    review: 'The house was beautifully furnished and had all the amenities we needed. It was the perfect place for a relaxing weekend away.',
    stars: 5
  },
  {
    spotId: 8,
    userId: 13,
    review: 'We had an amazing stay at this rental! The house was spacious, clean, and had everything we needed. Highly recommend!',
    stars: 4
  },
  {
    spotId: 9,
    userId: 11,
    review: 'The rental was in a great location and had stunning views. It was the perfect place for a romantic getaway!',
    stars: 3
  },
  {
    spotId: 9,
    userId: 12,
    review: 'The house was perfect for our family vacation. It had a great backyard for the kids to play in and was close to all the attractions.',
    stars: 5
  },
  {
    spotId: 9,
    userId: 13,
    review: "The rental was beautifully decorated and had a great pool. We had a fantastic time and can't wait to come back!",
    stars: 3
  },
  {
    spotId: 10,
    userId: 12,
    review: 'The house was in a quiet neighborhood and had plenty of space for our group. We had a wonderful time and would definitely recommend!',
    stars: 2
  },
  {
    spotId: 10,
    userId: 13,
    review: 'The rental had everything we needed and more! The kitchen was well-stocked and the beds were comfortable. We will be back!',
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
