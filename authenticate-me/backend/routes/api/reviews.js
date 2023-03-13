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

    if(!reviews[0]){
        return res.status(400).json({
            "message": "No reviews found",
            "statusCode": 400
        })
    } else {
        // let payload = reviews
        // console.log('payload: ', payload)
        const reviewArray = []
        for(let review of reviews){
            let payload = review.toJSON()
            console.log('payload: ', payload)
            delete payload.Spot.createdAt
            delete payload.Spot.updatedAt
            delete payload.Spot.description
            let url = payload.Spot.SpotImages[0] ? payload.Spot.SpotImages[0].url : null
        
            payload.Spot.previewImage = url
        
            delete payload.Spot.SpotImages
            reviewArray.push(payload)
        }
    
        return res.status(200).json({
            Reviews: reviewArray
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


// Edit a Review - require authentication - require authorization
router.put('/:reviewId', requireAuth, async (req, res, next) => {
    const currentReview = await Review.findByPk(req.params.reviewId)

    if(!currentReview){
        const err = new Error("Review couldn't be found")
        err.status = 400
        next(err)
    }

    if(currentReview.userId !== req.user.id){
        const err = new Error("Review doesn't belong to user")
        err.status = 400
        next(err)
    }

    const { review, stars } = req.body

    // if(review){
    //     currentReview.review = review
    // }
    // if(stars){
    //     currentReview.stars = stars
    // }

    currentReview.set({
        review,
        stars
    })

    await currentReview.save()

    const payload = await Review.findByPk(req.params.reviewId)

    return res.status(200).json(payload)

})

// Delete a Review - require authentication - require authorization
router.delete('/:reviewId', requireAuth, async (req, res, next) => {
    const review = await Review.findByPk(req.params.reviewId)

    if(!review){
        const err = new Error("Review couldn't be found")
        err.status = 404
        next(err)
    }

    if(review.userId !== req.user.id){
        const err = new Error("Review doesn't belong to user")
        err.status = 400
        next(err)
    }

    await review.destroy()

    return res.status(200).json({
        "message": "Successfully deleted",
        "statusCode": 200
      })

})




module.exports = router