// Neccessary imports
const express = require('express')
const router = express.Router()
const { requireAuth } = require('../../utils/auth')
const { Op } = require('sequelize')
const { Spot, SpotImage, Review, User, ReviewImage, Booking, sequelize} = require('../../db/models');

// Delete a Review Image - require authentication - require authorization
router.delete('/:imageId', requireAuth, async (req, res, next) => {
    const reviewImage = await ReviewImage.findByPk(req.params.imageId)

    if(!reviewImage){
        const err = new Error("Review Image couldn't be found")
        err.status = 400
        next(err)
    }

    const review = await Review.findOne({
        where: {
            id: reviewImage.reviewId
        }
    })

    if(review.userId !== req.user.id){
        const err = new Error("Review Image doesn't belong to this user")
        err.status = 403
        next(err)
    }

    await reviewImage.destroy()

    res.status(200).json({
        "message": "Successfully deleted",
        "statusCode": 200
      })

})



module.exports = router