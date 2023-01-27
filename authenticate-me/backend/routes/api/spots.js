// Neccessary Imports
const express = require('express')
const router = express.Router()
const { handleValidationErrors } = require('../../utils/validation')
const { requireAuth } = require('../../utils/auth')
const { Op } = require('sequelize')
const { Spot, SpotImage, Review, User, sequelize} = require('../../db/models');

// Get all Spots
router.get('/', async (req, res, next) => {

    const spots = await Spot.findAll()

    for(let spot of spots){
        const avgRating = await Review.findAll({
            attributes: {
                include: [ 
                    [
                      sequelize.fn("AVG", sequelize.col("stars")), 
                      "avgRating"
                    ] 
                ]
            },
            where: {
                spotId: spot.id
            }
        })

        spot.dataValues.avgRating = Number(Number.parseFloat(avgRating[0].toJSON().avgRating).toFixed(1))

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
    }

    res.status(200).json({
        Spots: spots
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
        const avgRating = await Review.findAll({
            attributes: {
                include: [ 
                    [
                      sequelize.fn("AVG", sequelize.col("stars")), 
                      "avgRating"
                    ] 
                ]
            },
            where: {
                spotId: currentUserSpot.id
            }
        })

        currentUserSpot.dataValues.avgRating = Number(Number.parseFloat(avgRating[0].toJSON().avgRating).toFixed(1))

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

    res.status(200).json(currentUserSpots)
})

// Get details of a Spot from an id - no authentication required
router.get('/:spotId', async (req, res, next) => {

    const spot = await Spot.findOne({
        where: {
            id: req.params.spotId
        },
        include: {
            model: SpotImage,
            attributes: ['id', 'url', 'preview']
        }
    })

    if(spot){
        res.status(200).json(spot)
    } else {
        const err = new Error("Spot couldn't be found")
        err.status = 404
        next(err)
    }

})

// Create a spot - require authentication
router.post('/', requireAuth, async (req, res, next) => {
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
        res.status(201).json(createdSpot)
    }

})

// Add an Image to a Spot based on the Spot's id - require authentication - require authorization
router.post('/:spotId/images', requireAuth, async (req, res, next) => {
    const spot = await Spot.findByPk(req.params.spotId)

    console.log(spot)
    const { url, preview } = req.body

    if(!spot){
        const err = new Error("Spot couldn't be found")
        err.status = 404
        next(err)
    }

    console.log(spot.ownerId)
    console.log(req.user.id)
    
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








module.exports = router