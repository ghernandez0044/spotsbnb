// Neccessary Imports
const express = require('express')
const router = express.Router()
const { requireAuth } = require('../../utils/auth')
const { Op } = require('sequelize')
const { Spot, SpotImage, Review, User, ReviewImage, sequelize} = require('../../db/models');

// Get all Reviews of the Current User - require authentication
router.get('/current', requireAuth, async (req, res, next) => {
    const reviews = await Review.findAll({
        include: [
            {
                model: User,
                attributes: ['id', 'firstName', 'lastName']
            },
            {
                model: Spot,
                include: [
                    { model: SpotImage, attributes: ['url'] }
                ]
            },
            {
                model: ReviewImage,
                attributes: ['id', 'url']
            }
        ],
        where: {
            userId: req.user.id
        }
    })

    if(reviews){
        
        let payload = reviews[0].toJSON()
        let url = payload.Spot.SpotImages[0].url

        payload.Spot.previewImage = url

        delete payload.Spot.SpotImages


        return res.status(200).json({
            Reviews: payload
        })
    }
})







module.exports = router