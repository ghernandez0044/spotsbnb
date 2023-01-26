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






module.exports = router