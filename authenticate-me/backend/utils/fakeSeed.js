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

function seedSpots(num){
    const spots = new Array(num).fill('')

    let basePrice = 100.50

    for(i in spots){
        spots[i] = {
            ownerId: rNum(13),
            address: faker.address.streetAddress(false),
            city: faker.address.cityName(),
            state: faker.address.state(),
            country: faker.address.country(),
            lat: Number(faker.address.latitude()),
            lng: Number(faker.address.longitude()),
            name: faker.name.firstName(),
            description: faker.lorem.paragraph(1),
            price: basePrice += 10.75
        }

        while(spots[i].name.length >= 50){
            spots.name = faker.name.firstName()
        }

        while(spots[i].description.length >= 254){
            spots.description = faker.lorem.paragraph(1)
        }

    }

    return spots
}

function seedSpotImages(num){
    const spotImages = new Array(num).fill('')

    for(i in spotImages){
        spotImages[i] = {
            spotId: rNum(13),
            url: faker.image.city(),
            preview: faker.datatype.boolean()
        }
    }

    return spotImages
}

function seedBookings(num){
    const bookings = new Array(num).fill('')

    for(i in bookings){

        let startingDate = faker.date.soon()

        bookings[i] = {
            spotId: rNum(13),
            userId: rNum(13),
            startDate: startingDate,
            endDate: faker.date.future(1, startingDate)
        }
    }
    return bookings
}

function seedReviews(num){
    const reviews = new Array(num).fill('')

    for(i in reviews){
        reviews[i] = {
            spotId: rNum(13),
            userId: rNum(13),
            review: faker.lorem.paragraph(1),
            stars: rNum(5)
        }

        while(reviews[i].stars === 0){
            reviews[i].stars = rNum(5)
        }

        while(reviews[i].review.length >= 254){
            reviews[i].review = faker.lorem.paragraph(1)
        }

    }
    return reviews
}

function seedReviewImages(num){
    const reviewImages = new Array(num).fill('')

    for(i in reviewImages){
        reviewImages[i] = {
            reviewId: rNum(10),
            url: faker.image.city()
        }
    }

    return reviewImages
}

module.exports = {
    seedUsers,
    seedSpots,
    seedSpotImages,
    seedBookings,
    seedReviews,
    seedReviewImages
}