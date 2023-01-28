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


// Add an Image to a Review based on the Review's id - require authentication = require authorization
router.post('/:reviewId/images', requireAuth, async (req, res, next) => {
    const { url } = req.body
    const review = await Review.findOne({
        include: [
            { model: ReviewImage }
        ],
        where: {
            id: req.params.reviewId
        }
    })

    if(!review){
        const err = new Error("Review couldn't be found")
        err.status = 400
        next(err)
    }

    if(review.userId !== req.user.id){
        const err = new Error("Review doesn't belong to user")
        err.status = 400
        next(err)
    }

    const numOfImg = review.toJSON().ReviewImages.length
    
    if(numOfImg >= 10){
        const err = new Error('Maximum number of images for this resource was reached')
        err.status = 403
        next(err)
    }

    const reviewImage = await review.createReviewImage({ url })
    
    return res.status(200).json({
        id: reviewImage.id,
        url: reviewImage.url
    })
})







module.exports = router