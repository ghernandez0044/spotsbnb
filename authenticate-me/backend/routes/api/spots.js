// Neccessary Imports
const express = require('express')
const router = express.Router()
const { handleValidationErrors } = require('../../utils/validation')
const { requireAuth } = require('../../utils/auth')
const { Op } = require('sequelize')
const { Spot, SpotImage, Review, User, ReviewImage, Booking, sequelize} = require('../../db/models');


// Get all Spots
router.get('/', handleValidationErrors, async (req, res, next) => {
    const where = {}

    const size = req.query.size ? req.query.size : 20
    const page = req.query.page ? req.query.page : 1

    if(page <= 0){
        const err = new Error('Page must be greater than or equal to 1')
        err.status = 400
        next(err)
    }

    if(size <= 0){
        const err = new Error('Size must be greater than or equal to 1')
        err.status = 400
        next(err)
    }

   const minLat = req.query.minLat ? req.query.minLat : null
   const maxLat = req.query.maxLat ? req.query.maxLat : null
   const minLng = req.query.minLng ? req.query.minLng : null
   const maxLng = req.query.maxLng ? req.query.maxLng : null
   const minPrice = req.query.minPrice ? req.query.minPrice : null
   const maxPrice = req.query.maxPrice ? req.query.maxPrice : null

   if(maxLat > 90){
    const err = new Error('Maximum latitude is invalid')
    err.status = 400
    next(err)
   }

   if(minLat < 0){
    const err = new Error('Maximum latitude is invalid')
    err.status = 400
    next(err)
   }

   if(minLng < -90){
    const err = new Error('Minimum longitude is invalid')
    err.status = 400
    next(err)
   }

   if(maxLng > 90){
    const err = new Error('Maximum longitude is invalid')
    err.status = 400
    next(err)
   }

   if(minPrice < 0){
    const err = new Error('Minimum price must be greater than or equal to 0')
    err.status = 400
    next(err)
   }

   if(maxPrice < 0){
    const err = new Error('Maximum price must be greater than or equal to 0')
    err.status = 400
    next(err)
   }

    if(minLat && maxLat){
        where.lat = {
                [Op.between]: [minLat, maxLat]
            }
    } else if(minLat){
        where.lat = {
            [Op.gte]: minLat
        }
    } else if(maxLat){
        where.lat = {
            [Op.lte]: maxLat
        }
    }


   if(minLng && maxLng){
    where.lng =  {
            [Op.between]: [minLng, maxLng]
        }
    } else if(minLng){
        where.lng = {
            [Op.gte]: minLng
        }
    } else if(maxLat){
        where.lng = {
            [Op.lte]: maxLat
        }
    }

    if(minPrice && maxPrice){
        where.price =  {
                [Op.between]: [minPrice, maxPrice]
            }
        } else if(minPrice){
            where.price = {
                [Op.gte]: minPrice
            }
        } else if(maxPrice){
            where.price = {
                [Op.lte]: maxPrice
            }
        }

    const spots = await Spot.findAll({
        limit: size,
        offset: (page - 1) * size,
        where
    })

    for(let spot of spots){
        // const avgRating = await Review.findAll({
        //     attributes: {
        //         include: [ 
        //             [
        //               sequelize.fn("AVG", sequelize.col("stars")), 
        //               "avgRating"
        //             ]
        //         ]
        //     },
        //     where: {
        //         spotId: spot.id
        //     },
        //     subQuery: false,
        //     raw: true
        // })

        const reviews = await Review.findAll({
            where: {
               spotId: spot.id 
            }
        })

        let totalStars = 0

        for(let review of reviews){
            const rating = review.stars
            totalStars += rating
        }

        const avgRating = Number(Number(totalStars / reviews.length).toFixed(1))

        spot.dataValues.avgRating = avgRating ? avgRating : 0

        // spot.dataValues.avgRating = Number(Number.parseFloat(avgRating[0].avgRating).toFixed(1))

        const previewImages = await SpotImage.findAll({
            where: {
                spotId: spot.id
            },
            attributes: {
                include: ['url']
            }
        })

        let previewUrl = ''
        for(let previewImage of previewImages){
            if(previewImage.dataValues.preview === true){
                previewUrl = previewImage.dataValues.url
            }
        }

        spot.dataValues.previewImage = previewUrl
        spot.dataValues.reviewCount = reviews.length ? reviews.length : 0
    }

    return res.status(200).json({
        Spots: spots,
        page,
        size
    })
})
// Get all Searched Spots
router.post('/search', handleValidationErrors, async (req, res, next) => {


    const where = {}
    const size = req.query.size ? req.query.size : 20
    const page = req.query.page ? req.query.page : 1
    const spotCity = req.body.city ? req.body.city : ''


    if(page <= 0){
        const err = new Error('Page must be greater than or equal to 1')
        err.status = 400
        next(err)
    }

    if(size <= 0){
        const err = new Error('Size must be greater than or equal to 1')
        err.status = 400
        next(err)
    }

   const minLat = req.query.minLat ? req.query.minLat : null
   const maxLat = req.query.maxLat ? req.query.maxLat : null
   const minLng = req.query.minLng ? req.query.minLng : null
   const maxLng = req.query.maxLng ? req.query.maxLng : null
   const minPrice = req.query.minPrice ? req.query.minPrice : null
   const maxPrice = req.query.maxPrice ? req.query.maxPrice : null

   if(maxLat > 90){
    const err = new Error('Maximum latitude is invalid')
    err.status = 400
    next(err)
   }

   if(minLat < 0){
    const err = new Error('Maximum latitude is invalid')
    err.status = 400
    next(err)
   }

   if(minLng < -90){
    const err = new Error('Minimum longitude is invalid')
    err.status = 400
    next(err)
   }

   if(maxLng > 90){
    const err = new Error('Maximum longitude is invalid')
    err.status = 400
    next(err)
   }

   if(minPrice < 0){
    const err = new Error('Minimum price must be greater than or equal to 0')
    err.status = 400
    next(err)
   }

   if(maxPrice < 0){
    const err = new Error('Maximum price must be greater than or equal to 0')
    err.status = 400
    next(err)
   }

    if(minLat && maxLat){
        where.lat = {
                [Op.between]: [minLat, maxLat]
            }
    } else if(minLat){
        where.lat = {
            [Op.gte]: minLat
        }
    } else if(maxLat){
        where.lat = {
            [Op.lte]: maxLat
        }
    }


   if(minLng && maxLng){
    where.lng =  {
            [Op.between]: [minLng, maxLng]
        }
    } else if(minLng){
        where.lng = {
            [Op.gte]: minLng
        }
    } else if(maxLat){
        where.lng = {
            [Op.lte]: maxLat
        }
    }

    if(minPrice && maxPrice){
        where.price =  {
                [Op.between]: [minPrice, maxPrice]
            }
        } else if(minPrice){
            where.price = {
                [Op.gte]: minPrice
            }
        } else if(maxPrice){
            where.price = {
                [Op.lte]: maxPrice
            }
        }

    if(spotCity.length > 1){
        where.city = {
            [Op.iLike]: `%${spotCity}%`
        }
    }

    const spots = await Spot.findAll({
        limit: size,
        offset: (page - 1) * size,
        where
    })

    for(let spot of spots){
        // const avgRating = await Review.findAll({
        //     attributes: {
        //         include: [ 
        //             [
        //               sequelize.fn("AVG", sequelize.col("stars")), 
        //               "avgRating"
        //             ]
        //         ]
        //     },
        //     where: {
        //         spotId: spot.id
        //     },
        //     subQuery: false,
        //     raw: true
        // })

        const reviews = await Review.findAll({
            where: {
               spotId: spot.id 
            }
        })

        let totalStars = 0

        for(let review of reviews){
            const rating = review.stars
            totalStars += rating
        }

        const avgRating = Number(Number(totalStars / reviews.length).toFixed(1))

        spot.dataValues.avgRating = avgRating ? avgRating : 0

        // spot.dataValues.avgRating = Number(Number.parseFloat(avgRating[0].avgRating).toFixed(1))

        const previewImages = await SpotImage.findAll({
            where: {
                spotId: spot.id
            },
            attributes: {
                include: ['url']
            }
        })

        let previewUrl = ''
        for(let previewImage of previewImages){
            if(previewImage.dataValues.preview === true){
                previewUrl = previewImage.dataValues.url
            }
        }

        spot.dataValues.previewImage = previewUrl
        spot.dataValues.reviewCount = reviews.length ? reviews.length : 0
    }

    return res.status(200).json({
        Spots: spots,
        page,
        size
    })
})

// Get all Spots owned by the Current User - require authentication
router.get('/current', requireAuth, async (req, res, next) => {

    const currentUserSpots = await Spot.findAll({
        where: {
            ownerId: req.user.id
        }
    })

    for(let currentUserSpot of currentUserSpots){
        // const avgRating = await Review.findAll({
        //     attributes: {
        //         include: [ 
        //             [
        //               sequelize.fn("AVG", sequelize.col("stars")), 
        //               "avgRating"
        //             ] 
        //         ]
        //     },
        //     where: {
        //         spotId: currentUserSpot.id
        //     }
        // })

        // currentUserSpot.dataValues.avgRating = Number(Number.parseFloat(avgRating[0].toJSON().avgRating).toFixed(1))

        const reviews = await Review.findAll({
            where: {
               spotId: currentUserSpot.id 
            }
        })

        let totalStars = 0

        for(let review of reviews){
            const rating = review.stars
            totalStars += rating
        }

        const avgRating = Number(Number(totalStars / reviews.length).toFixed(1))

        currentUserSpot.dataValues.avgRating = avgRating ? avgRating : 0

        const previewImages = await SpotImage.findAll({
            where: {
                spotId: currentUserSpot.id
            },
            attributes: {
                include: ['url']
            }
        })

        let previewUrl = ''
        for(let previewImage of previewImages){
            if(previewImage.dataValues.preview === true){
                previewUrl = previewImage.dataValues.url
            }
        }

        currentUserSpot.dataValues.previewImage = previewUrl

    }

    return res.status(200).json({
        Spots: currentUserSpots
    })
})

// Get details of a Spot from an id - no authentication required
router.get('/:spotId', async (req, res, next) => {

    const spot = await Spot.findOne({
        where: {
            id: req.params.spotId
        },
        include: [
            {
            model: SpotImage,
            attributes: ['id', 'url', 'preview']
        },
        {
            model: User,
            attributes: ['id', 'firstName', 'lastName']
        }
    ]
    })

    const reviews = await Review.findAll({
        where: {
           spotId: spot.id 
        }
    })

    let totalStars = 0

    for(let review of reviews){
        const rating = review.stars
        totalStars += rating
    }

    const avgRating = Number(Number(totalStars / reviews.length).toFixed(1))

    spot.dataValues.avgRating = avgRating ? avgRating : 0

    if(spot){
        const owner = spot.dataValues.User
        delete spot.dataValues.User
        spot.dataValues.Owner = owner
        return res.status(200).json(spot)
    } else {
        const err = new Error("Spot couldn't be found")
        err.status = 404
        next(err)
    }

})

// Create a spot - require authentication
router.post('/', requireAuth, handleValidationErrors, async (req, res, next) => {
    const { address, city, state, country, lat, lng, name, description, price } = req.body

    const createdSpot = await Spot.create({
                                            ownerId: req.user.id,
                                            address,
                                            city,
                                            state,
                                            country,
                                            lat,
                                            lng,
                                            name,
                                            description,
                                            price
                                           })

    if(createdSpot){
        return res.status(201).json(createdSpot)
    }

})

// Add an Image to a Spot based on the Spot's id - require authentication - require authorization
router.post('/:spotId/images', requireAuth, async (req, res, next) => {
    const spot = await Spot.findByPk(req.params.spotId)

    const { url, preview } = req.body

    if(!spot){
        const err = new Error("Spot couldn't be found")
        err.status = 404
        next(err)
    }
    
    if(spot.ownerId !== req.user.id){
        const err = new Error('User does not own this spot')
        err.status = 400
        next(err)
    }

    const newImage = await SpotImage.create({
        spotId: spot.id,
        url,
        preview
    })

    return res.status(200).json({
        id: newImage.id,
        url,
        preview
    })

})


// Edit a Spot - require authentication - require authorization
router.put('/:spotId', requireAuth, handleValidationErrors, async (req, res, next) => {
    const { address, city, state, country, lat, lng, name, description, price } =  req.body
    const paramsId = Number(req.params.spotId)

    const spot = await Spot.findByPk(paramsId)

    if(!spot){
        const err = new Error("Spot couldn't be found")
        err.status = 400
        next(err)
    }

    if(spot.ownerId !== req.user.id){
        const err = new Error("Spot doesn't belong to this user")
        err.status = 400
        next(err)
    } else {
        // if(address){
        //     spot.dataValues.address = address
        //     if(!address) {
        //         const err = new Error('Street address is required')
        //         err.status = 400
        //         next(err)
        //     }
        // }
        // if(city){
        //     spot.dataValues.city = city
        // }
        // if(state){
        //     spot.dataValues.state = state
        // }
        // if(country){
        //     spot.dataValues.country = country
        // }
        // if(lat){
        //     spot.dataValues.lat = lat
        // }
        // if(lng){
        //     spot.dataValues.lng = lng
        // }
        // if(name){
        //     spot.dataValues.name = name
        // }
        // if(description){
        //     spot.dataValues.description = description
        // }
        // if(price){
        //     spot.dataValues.price = price
        // }

        spot.set({
            address,
            city,
            state,
            country,
            lat,
            lng,
            name,
            description,
            price
        })
    
        await spot.save()

        return res.status(200).json(spot)
    }
})


// Delete a Spot - require authentication - require authorization
router.delete('/:spotId', requireAuth, async (req, res, next) => {
    const paramsId = Number(req.params.spotId)
    const currentSpot = await Spot.findByPk(paramsId)

    if(!currentSpot){
        const err = new Error("Spot couldn't be found.")
        err.status = 404
        next(err)
    }

    if(currentSpot.ownerId !== req.user.id){
        const err = new Error("Spot doesn't belong to this user")
        err.status = 400
        next(err)
    } else {
        await currentSpot.destroy()

        return res.status(200).json({
            message: "Succesfully deleted",
            statusCode: 200
        })
    }

})

// Get all Reviews by a Spot's id - no authentication required
router.get('/:spotId/reviews', async (req, res, next) => {
    const reviews = await Review.findAll({
        include: [
            { model: User, attributes: ['id', 'firstName', 'lastName'] },
            { model: ReviewImage, attributes: ['id', 'url'] }
        ],
        where: {
            spotId: req.params.spotId
        }
    })
    
    if(!reviews){
        const err = new Error("Spot couldn't be found")
        err.status = 404
        next(err)
    } else {
     return res.status(200).json({
                         Reviews: reviews
                                 })
    }

})


// Create a Review for a Spot based on the Spot's id - require authentication
router.post('/:spotId/reviews', requireAuth, handleValidationErrors, async (req, res, next) => {
    const spot = await Spot.findByPk(req.params.spotId)

    const { review, stars } = req.body

    if(!spot){
        const err = new Error("Spot couldn't be found")
        err.status = 400
        next(err)
    }

    const potentialReview = await Review.findOne({
        where: {
            spotId: req.params.spotId,
            userId: req.user.id
        }
    })

    if(potentialReview){
        const err = new Error('User already has a review for this spot')
        err.status = 403
        next(err)
    }

   const createdReview = await spot.createReview({
        userId: req.user.id,
        review,
        stars
    })

    return res.status(201).json(createdReview)

})

// Get all Bookings for a Spot based on the Spot's id - require authentication
router.get('/:spotId/bookings', requireAuth, async (req, res, next) => {

    const spot = await Spot.findByPk(req.params.spotId)

    if(!spot){
        const err = new Error("Spot couldn't be found")
        err.status = 400
        next(err)
    }

    const bookings = await Booking.findAll({
        where: {
            spotId: req.params.spotId
        },
        include: [
            { model: User, attributes: ['id', 'firstName', 'lastName'] }
        ]
    })

    if(bookings.userId !== req.user.id){

        const safeArray = []

        for(let booking of bookings){
            const bookingObj = booking.toJSON()
            delete bookingObj.id
            delete bookingObj.userId
            delete bookingObj.createdAt
            delete bookingObj.updatedAt
            delete bookingObj.User

            safeArray.push(bookingObj)
        }

        return res.status(200).json({
            Bookings: safeArray
        })

    } else {
        return res.status(200).json({
            Bookings: bookings
        })
    }

})

// Create a Booking from a Spot based on the Spot's id - require authentication - requires proper authorization
router.post('/:spotId/bookings', requireAuth, async (req, res, next) => {
    const spot = await Spot.findByPk(req.params.spotId)

    if(!spot){
        const err = new Error("Spot couldn't be found")
        err.status = 400
        next(err)
    }

    if(spot.id === req.user.id){
        const err = new Error("Cannot Book your own Spot")
        err.status = 400
        next(err)
    }

    const { startDate, endDate } = req.body

    const potentialBookings = await Booking.findAll({
        where: {
            spotId: req.params.spotId
        }
    })

    for(let booking of potentialBookings){
        const year = new Date(booking.startDate).getFullYear()
        const month = new Date(booking.startDate).getMonth()
        const day = new Date(booking.startDate).getDay()

        const newYear = new Date(startDate).getFullYear()
        const newMonth = new Date(startDate).getMonth()
        const newDay = new Date(startDate).getDay()

        if(year === newYear && month === newMonth && day === newDay){
            const err = new Error('Start date conflicts with an existing booking')
            err.status = 403
            next(err)
        }

        const endYear = new Date(booking.endDate).getFullYear()
        const endMonth = new Date(booking.endDate).getMonth()
        const endDay = new Date(booking.endDate).getDay()

        const newEndYear = new Date(endDate).getFullYear()
        const newEndMonth = new Date(endDate).getMonth()
        const newEndDay = new Date(endDate).getDay()

        if(endYear === newEndYear && endMonth === newEndMonth && endDay === newEndDay){
            const err = new Error('End date conflicts with an existing booking')
            err.status = 403
            next(err)
        }
    }

    const startDateArray = startDate.split('-')
    const startYear = Number(startDateArray[0])
    const startMonth = Number(startDateArray[1]) - 1
    const startDay = Number(startDateArray[2])

    const endDateArray = endDate.split('-')
    const endYear = Number(endDateArray[0])
    const endMonth = Number(endDateArray[1]) - 1
    const endDay = Number(endDateArray[2])

    const booking = await spot.createBooking({
        userId: req.user.id,
        startDate: startDate,
        endDate: endDate
    })

    return res.status(200).json(booking)

    // return res.status(200)

})


module.exports = router