// Neccessary Imports
const express = require('express')
const router = express.Router()
const { handleValidationErrors } = require('../../utils/validation')
const { Op } = require('sequelize')
const { Spot, SpotImage, Review, sequelize} = require('../../db/models');

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









module.exports = router