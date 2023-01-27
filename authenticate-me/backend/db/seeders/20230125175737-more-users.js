'use strict';

/** @type {import('sequelize-cli').Migration} */

// const { seedUsers } = require('../../utils/fakeSeed')
const bcrypt = require('bcryptjs')

let options = {}
if(process.env.NODE_ENV === 'production'){
  options.schema = process.env.SCHEMA
}

options.tableName = 'Users'

const users = [
  {
    firstName: 'Evert',
    lastName: 'Kuhn',
    username: 'Garfield.Kuhic88',
    hashedPassword: bcrypt.hashSync('password4'),
    email: 'Steve.Koepp@yahoo.com'
  },
  {
    firstName: 'Kaleb',
    lastName: 'Wunsch',
    username: 'Keanu.Graham24',
    hashedPassword: bcrypt.hashSync('password5'),
    email: 'Daren8@gmail.com'
  },
  {
    firstName: 'Sonia',
    lastName: 'Schaefer',
    username: 'Rhianna.Stehr',
    hashedPassword: bcrypt.hashSync('password6'),
    email: 'Eldora_Walker@yahoo.com'
  },
  {
    firstName: 'Kellen',
    lastName: 'Zieme',
    username: 'Abdullah72',
    hashedPassword: bcrypt.hashSync('password7'),
    email: 'Darryl_Gusikowski@hotmail.com'
  },
  {
    firstName: 'Matilde',
    lastName: 'Marvin',
    username: 'Buck_Bode',
    hashedPassword: bcrypt.hashSync('password8'),
    email: 'Shanelle0@hotmail.com'
  },
  {
    firstName: 'Camila',
    lastName: 'Baumbach',
    username: 'Georgiana26',
    hashedPassword: bcrypt.hashSync('password9'),
    email: 'Citlalli66@yahoo.com'
  },
  {
    firstName: 'Enid',
    lastName: 'Hartmann',
    username: 'Florian51',
    hashedPassword: bcrypt.hashSync('password10'),
    email: 'Brown_Ledner@gmail.com'
  },
  {
    firstName: 'Bennie',
    lastName: 'Balistreri',
    username: 'Marcelle.Farrell8',
    hashedPassword: bcrypt.hashSync('password11'),
    email: 'Heath_Watsica89@hotmail.com'
  },
  {
    firstName: 'Amina',
    lastName: 'Huels',
    username: 'Trevor_Graham17',
    hashedPassword: bcrypt.hashSync('password12'),
    email: 'Karlee70@hotmail.com'
  },
  {
    firstName: 'Naomie',
    lastName: 'Mayert',
    username: 'Dedric.Goldner',
    hashedPassword: bcrypt.hashSync('password13'),
    email: 'Martin_Wyman99@hotmail.com'
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

    await queryInterface.bulkInsert(options, users, {})

  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */

    await queryInterface.bulkDelete(options, users, {})

  }
};
