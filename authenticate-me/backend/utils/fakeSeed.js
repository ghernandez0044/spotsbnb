const { faker } = require('@faker-js/faker');
const bcrypt = require('bcryptjs');

//simple random number generator
const rNum = (num) => Math.floor(Math.random() * Math.floor(num) + 1)


// Seed for Users
function seedUsers(num){
    const users = new Array(num).fill('')

    for(i in users){
        users[i] = {
            firstName: faker.name.firstName(),
            lastName: faker.name.lastName(),
            username: faker.internet.userName(),
            hashedPassword: bcrypt.hashSync(faker.internet.password()),
            email: faker.internet.email(),
        }
    }

    return users

}

// console.log(seedUsers(2))

function seedSpots(num){
    const spots = new Array(num).fill('')

    for(i in spots){
        spots[i] = {
            ownerId: rNum(10),
            address: faker.address.streetAddress(false),
            city: faker.address.cityName(),
            state: faker.address.state(),
            country: faker.address.country(),
            lat: faker.address.latitude(),
            lng: faker.address.longitude(),
            name: faker.name.firstName(),
            description: faker.lorem.paragraph(3),
            price: faker.commerce.price(50)
        }
    }

    return spots
}

// console.log(seedSpots(2))



module.exports = {
    seedUsers,
    seedSpots
}