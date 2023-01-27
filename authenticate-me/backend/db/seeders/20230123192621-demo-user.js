'use strict';
const bcrypt = require('bcryptjs')

let options = {}
if(process.env.NODE_ENV === 'production'){
  options.schema = process.env.SCHEMA
}

/** @type {import('sequelize-cli').Migration} */
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

    options.tableName = 'Users'

    await queryInterface.bulkInsert(options, [
      {
        firstName: 'Fake1',
        lastName: 'User1',
        email: 'demo1@user.io',
        username: 'FakeUser1',
        hashedPassword: bcrypt.hashSync('password1')
      },
      {
        firstName: 'Fake2',
        lastName: 'User2',
        email: 'demo2@user.io',
        username: 'FakeUser2',
        hashedPassword: bcrypt.hashSync('password2')
      },
      {
        firstName: 'Fake3',
        lastName: 'User3',
        email: 'demo3@user.io',
        username: 'FakeUser3',
        hashedPassword: bcrypt.hashSync('password3')
      }
    ],
    {}
    )

  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */

    options.tableName = 'Users'
    const Op = Sequelize.Op
    await queryInterface.bulkDelete(options, {
      username: {
        [Op.in]: ['FakeUser1', 'FakeUser2', 'FakeUser3']
      }
    },
    {}
    )

  }
};
