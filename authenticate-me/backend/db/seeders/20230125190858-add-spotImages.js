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
    url: 'https://images.pexels.com/photos/1029599/pexels-photo-1029599.jpeg',
    preview: true
  },
  {
    spotId: 1,
    url: 'https://as1.ftcdn.net/v2/jpg/02/21/50/94/1000_F_221509408_ekUpElITcvwAGKDIanHpIDLuEZ5Jdfy7.jpg',
    preview: false
  },
  {
    spotId: 1,
    url: 'https://as2.ftcdn.net/v2/jpg/02/61/89/29/1000_F_261892957_6jyBXvEgM79iYr1eEiJKCosnVPJdvHHr.jpg',
    preview: false
  },
  {
    spotId: 1,
    url: 'https://as2.ftcdn.net/v2/jpg/02/38/38/35/1000_F_238383517_I7Y8UfyFT5N2GZUprYd8gUPoPWZWzZR7.jpg',
    preview: false
  },
  {
    spotId: 1,
    url: 'https://as2.ftcdn.net/v2/jpg/02/96/38/87/1000_F_296388747_okm1qzMnWwMsvjO9cRV76feAXnmOjBMN.jpg',
    preview: false
  },
  {
    spotId: 2,
    url: 'https://as1.ftcdn.net/v2/jpg/00/62/13/24/1000_F_62132429_pw8W4rc1qLlCAP9SS9pPFDZyyPJZHwpw.jpg',
    preview: true
  },
  {
    spotId: 2,
    url: 'https://as1.ftcdn.net/v2/jpg/02/21/50/94/1000_F_221509408_ekUpElITcvwAGKDIanHpIDLuEZ5Jdfy7.jpg',
    preview: false
  },
  {
    spotId: 2,
    url: 'https://as2.ftcdn.net/v2/jpg/02/61/89/29/1000_F_261892957_6jyBXvEgM79iYr1eEiJKCosnVPJdvHHr.jpg',
    preview: false
  },
  {
    spotId: 2,
    url: 'https://as2.ftcdn.net/v2/jpg/02/38/38/35/1000_F_238383517_I7Y8UfyFT5N2GZUprYd8gUPoPWZWzZR7.jpg',
    preview: false
  },
  {
    spotId: 2,
    url: 'https://as2.ftcdn.net/v2/jpg/02/96/38/87/1000_F_296388747_okm1qzMnWwMsvjO9cRV76feAXnmOjBMN.jpg',
    preview: false
  },
  {
    spotId: 3,
    url: 'https://as1.ftcdn.net/v2/jpg/01/62/06/40/1000_F_162064034_HI2YEgV7km3HMy0rccQczKH2vvpI4OnB.jpg',
    preview: true
  },
  {
    spotId: 3,
    url: 'https://as1.ftcdn.net/v2/jpg/02/21/50/94/1000_F_221509408_ekUpElITcvwAGKDIanHpIDLuEZ5Jdfy7.jpg',
    preview: false
  },
  {
    spotId: 3,
    url: 'https://as2.ftcdn.net/v2/jpg/02/61/89/29/1000_F_261892957_6jyBXvEgM79iYr1eEiJKCosnVPJdvHHr.jpg',
    preview: false
  },
  {
    spotId: 3,
    url: 'https://as2.ftcdn.net/v2/jpg/02/38/38/35/1000_F_238383517_I7Y8UfyFT5N2GZUprYd8gUPoPWZWzZR7.jpg',
    preview: false
  },
  {
    spotId: 3,
    url: 'https://as2.ftcdn.net/v2/jpg/02/96/38/87/1000_F_296388747_okm1qzMnWwMsvjO9cRV76feAXnmOjBMN.jpg',
    preview: false
  },
  {
    spotId: 4,
    url: 'https://as1.ftcdn.net/v2/jpg/01/57/36/74/1000_F_157367489_FSqP231EvpCB9fqD5s5PhCp8MOuEcfih.jpg',
    preview: true
  },
  {
    spotId: 4,
    url: 'https://as1.ftcdn.net/v2/jpg/02/21/50/94/1000_F_221509408_ekUpElITcvwAGKDIanHpIDLuEZ5Jdfy7.jpg',
    preview: false
  },
  {
    spotId: 4,
    url: 'https://as2.ftcdn.net/v2/jpg/02/61/89/29/1000_F_261892957_6jyBXvEgM79iYr1eEiJKCosnVPJdvHHr.jpg',
    preview: false
  },
  {
    spotId: 4,
    url: 'https://as2.ftcdn.net/v2/jpg/02/38/38/35/1000_F_238383517_I7Y8UfyFT5N2GZUprYd8gUPoPWZWzZR7.jpg',
    preview: false
  },
  {
    spotId: 4,
    url: 'https://as2.ftcdn.net/v2/jpg/02/96/38/87/1000_F_296388747_okm1qzMnWwMsvjO9cRV76feAXnmOjBMN.jpg',
    preview: false
  },
  {
    spotId: 5,
    url: 'https://as1.ftcdn.net/v2/jpg/05/09/62/16/1000_F_509621631_5o3hQKN5vzNVFMdOj68uyBCNUFNlxAX8.jpg',
    preview: true
  },
  {
    spotId: 5,
    url: 'https://as1.ftcdn.net/v2/jpg/02/21/50/94/1000_F_221509408_ekUpElITcvwAGKDIanHpIDLuEZ5Jdfy7.jpg',
    preview: false
  },
  {
    spotId: 5,
    url: 'https://as2.ftcdn.net/v2/jpg/02/61/89/29/1000_F_261892957_6jyBXvEgM79iYr1eEiJKCosnVPJdvHHr.jpg',
    preview: false
  },
  {
    spotId: 5,
    url: 'https://as2.ftcdn.net/v2/jpg/02/38/38/35/1000_F_238383517_I7Y8UfyFT5N2GZUprYd8gUPoPWZWzZR7.jpg',
    preview: false
  },
  {
    spotId: 5,
    url: 'https://as2.ftcdn.net/v2/jpg/02/96/38/87/1000_F_296388747_okm1qzMnWwMsvjO9cRV76feAXnmOjBMN.jpg',
    preview: false
  },
  {
    spotId: 6,
    url: 'https://as1.ftcdn.net/v2/jpg/00/04/97/06/1000_F_4970668_G73XyO5DxFLgPxTuUk1HXYeCIuGvNiNU.jpg',
    preview: true
  },
  {
    spotId: 6,
    url: 'https://as1.ftcdn.net/v2/jpg/02/21/50/94/1000_F_221509408_ekUpElITcvwAGKDIanHpIDLuEZ5Jdfy7.jpg',
    preview: false
  },
  {
    spotId: 6,
    url: 'https://as2.ftcdn.net/v2/jpg/02/61/89/29/1000_F_261892957_6jyBXvEgM79iYr1eEiJKCosnVPJdvHHr.jpg',
    preview: false
  },
  {
    spotId: 6,
    url: 'https://as2.ftcdn.net/v2/jpg/02/38/38/35/1000_F_238383517_I7Y8UfyFT5N2GZUprYd8gUPoPWZWzZR7.jpg',
    preview: false
  },
  {
    spotId: 6,
    url: 'https://as2.ftcdn.net/v2/jpg/02/96/38/87/1000_F_296388747_okm1qzMnWwMsvjO9cRV76feAXnmOjBMN.jpg',
    preview: false
  },
  {
    spotId: 7,
    url: 'https://as1.ftcdn.net/v2/jpg/00/07/18/66/1000_F_7186611_FQMa3C1FjlqB5UusjgTnjJ9SYxu7BMGH.jpg',
    preview: true
  },
  {
    spotId: 7,
    url: 'https://as1.ftcdn.net/v2/jpg/02/21/50/94/1000_F_221509408_ekUpElITcvwAGKDIanHpIDLuEZ5Jdfy7.jpg',
    preview: false
  },
  {
    spotId: 7,
    url: 'https://as2.ftcdn.net/v2/jpg/02/61/89/29/1000_F_261892957_6jyBXvEgM79iYr1eEiJKCosnVPJdvHHr.jpg',
    preview: false
  },
  {
    spotId: 7,
    url: 'https://as2.ftcdn.net/v2/jpg/02/38/38/35/1000_F_238383517_I7Y8UfyFT5N2GZUprYd8gUPoPWZWzZR7.jpg',
    preview: false
  },
  {
    spotId: 7,
    url: 'https://as2.ftcdn.net/v2/jpg/02/96/38/87/1000_F_296388747_okm1qzMnWwMsvjO9cRV76feAXnmOjBMN.jpg',
    preview: false
  },
  {
    spotId: 8,
    url: 'https://as2.ftcdn.net/v2/jpg/00/07/75/17/1000_F_7751763_QPouzImfvleFd1dYZ1XmQXyLs47PgGww.jpg',
    preview: true
  },
  {
    spotId: 8,
    url: 'https://as1.ftcdn.net/v2/jpg/02/21/50/94/1000_F_221509408_ekUpElITcvwAGKDIanHpIDLuEZ5Jdfy7.jpg',
    preview: false
  },
  {
    spotId: 8,
    url: 'https://as2.ftcdn.net/v2/jpg/02/61/89/29/1000_F_261892957_6jyBXvEgM79iYr1eEiJKCosnVPJdvHHr.jpg',
    preview: false
  },
  {
    spotId: 8,
    url: 'https://as2.ftcdn.net/v2/jpg/02/38/38/35/1000_F_238383517_I7Y8UfyFT5N2GZUprYd8gUPoPWZWzZR7.jpg',
    preview: false
  },
  {
    spotId: 8,
    url: 'https://as2.ftcdn.net/v2/jpg/02/96/38/87/1000_F_296388747_okm1qzMnWwMsvjO9cRV76feAXnmOjBMN.jpg',
    preview: false
  },
  {
    spotId: 9,
    url: 'https://as1.ftcdn.net/v2/jpg/02/48/04/28/1000_F_248042859_HuLjz9HRsXJCDd320BFl5nH847BueQMm.jpg',
    preview: true
  },
  {
    spotId: 9,
    url: 'https://as1.ftcdn.net/v2/jpg/02/21/50/94/1000_F_221509408_ekUpElITcvwAGKDIanHpIDLuEZ5Jdfy7.jpg',
    preview: false
  },
  {
    spotId: 9,
    url: 'https://as2.ftcdn.net/v2/jpg/02/61/89/29/1000_F_261892957_6jyBXvEgM79iYr1eEiJKCosnVPJdvHHr.jpg',
    preview: false
  },
  {
    spotId: 9,
    url: 'https://as2.ftcdn.net/v2/jpg/02/38/38/35/1000_F_238383517_I7Y8UfyFT5N2GZUprYd8gUPoPWZWzZR7.jpg',
    preview: false
  },
  {
    spotId: 9,
    url: 'https://as2.ftcdn.net/v2/jpg/02/96/38/87/1000_F_296388747_okm1qzMnWwMsvjO9cRV76feAXnmOjBMN.jpg',
    preview: false
  },
  {
    spotId: 10,
    url: 'https://as2.ftcdn.net/v2/jpg/01/34/40/57/1000_F_134405789_7KL1mtbvyFnyEMMzaTWoLaUrWvOLyxpw.jpg',
    preview: true
  },
  {
    spotId: 10,
    url: 'https://as1.ftcdn.net/v2/jpg/02/21/50/94/1000_F_221509408_ekUpElITcvwAGKDIanHpIDLuEZ5Jdfy7.jpg',
    preview: false
  },
  {
    spotId: 10,
    url: 'https://as2.ftcdn.net/v2/jpg/02/61/89/29/1000_F_261892957_6jyBXvEgM79iYr1eEiJKCosnVPJdvHHr.jpg',
    preview: false
  },
  {
    spotId: 10,
    url: 'https://as2.ftcdn.net/v2/jpg/02/38/38/35/1000_F_238383517_I7Y8UfyFT5N2GZUprYd8gUPoPWZWzZR7.jpg',
    preview: false
  },
  {
    spotId: 10,
    url: 'https://as2.ftcdn.net/v2/jpg/02/96/38/87/1000_F_296388747_okm1qzMnWwMsvjO9cRV76feAXnmOjBMN.jpg',
    preview: false
  },
  {
    spotId: 11,
    url: 'https://as2.ftcdn.net/v2/jpg/00/57/68/81/1000_F_57688175_PeIsD8zskMwobbM0NIVMIII0nRegWsal.jpg',
    preview: true
  },
  {
    spotId: 11,
    url: 'https://as1.ftcdn.net/v2/jpg/02/21/50/94/1000_F_221509408_ekUpElITcvwAGKDIanHpIDLuEZ5Jdfy7.jpg',
    preview: false
  },
  {
    spotId: 11,
    url: 'https://as2.ftcdn.net/v2/jpg/02/61/89/29/1000_F_261892957_6jyBXvEgM79iYr1eEiJKCosnVPJdvHHr.jpg',
    preview: false
  },
  {
    spotId: 11,
    url: 'https://as2.ftcdn.net/v2/jpg/02/38/38/35/1000_F_238383517_I7Y8UfyFT5N2GZUprYd8gUPoPWZWzZR7.jpg',
    preview: false
  },
  {
    spotId: 11,
    url: 'https://as2.ftcdn.net/v2/jpg/02/96/38/87/1000_F_296388747_okm1qzMnWwMsvjO9cRV76feAXnmOjBMN.jpg',
    preview: false
  },
  {
    spotId: 12,
    url: 'https://as1.ftcdn.net/v2/jpg/00/58/37/10/1000_F_58371096_Fl4bCsCi3bVWbnCXeWjJx5keCcxRjx1p.jpg',
    preview: true
  },
  {
    spotId: 12,
    url: 'https://as1.ftcdn.net/v2/jpg/02/21/50/94/1000_F_221509408_ekUpElITcvwAGKDIanHpIDLuEZ5Jdfy7.jpg',
    preview: false
  },
  {
    spotId: 12,
    url: 'https://as2.ftcdn.net/v2/jpg/02/61/89/29/1000_F_261892957_6jyBXvEgM79iYr1eEiJKCosnVPJdvHHr.jpg',
    preview: false
  },
  {
    spotId: 12,
    url: 'https://as2.ftcdn.net/v2/jpg/02/38/38/35/1000_F_238383517_I7Y8UfyFT5N2GZUprYd8gUPoPWZWzZR7.jpg',
    preview: false
  },
  {
    spotId: 12,
    url: 'https://as2.ftcdn.net/v2/jpg/02/96/38/87/1000_F_296388747_okm1qzMnWwMsvjO9cRV76feAXnmOjBMN.jpg',
    preview: false
  },
  {
    spotId: 13,
    url: 'https://as1.ftcdn.net/v2/jpg/04/32/56/22/1000_F_432562253_0AJEmoX8idRHQiBDCCgHjdsHUBZG7ppx.jpg',
    preview: true
  },
  {
    spotId: 13,
    url: 'https://as1.ftcdn.net/v2/jpg/02/21/50/94/1000_F_221509408_ekUpElITcvwAGKDIanHpIDLuEZ5Jdfy7.jpg',
    preview: false
  },
  {
    spotId: 13,
    url: 'https://as2.ftcdn.net/v2/jpg/02/61/89/29/1000_F_261892957_6jyBXvEgM79iYr1eEiJKCosnVPJdvHHr.jpg',
    preview: false
  },
  {
    spotId: 13,
    url: 'https://as2.ftcdn.net/v2/jpg/02/38/38/35/1000_F_238383517_I7Y8UfyFT5N2GZUprYd8gUPoPWZWzZR7.jpg',
    preview: false
  },
  {
    spotId: 13,
    url: 'https://as2.ftcdn.net/v2/jpg/02/96/38/87/1000_F_296388747_okm1qzMnWwMsvjO9cRV76feAXnmOjBMN.jpg',
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
