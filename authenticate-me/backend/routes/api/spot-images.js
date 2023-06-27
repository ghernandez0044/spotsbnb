// Neccessary imports
const express = require('express')
const router = express.Router()
const { requireAuth } = require('../../utils/auth')
const { Op } = require('sequelize')
const { Spot, SpotImage, Review, User, ReviewImage, Booking, sequelize} = require('../../db/models');

// Delete a Spot Image - require authentication - require authorization
router.delete('/:imageId', requireAuth, async (req, res, next) => {
    const spotImage = await SpotImage.findByPk(req.params.imageId)

    if(!spotImage){
        const err = new Error("SpotImage couldn't be found")
        err.status = 400
        next(err)
    }
    
    const spot = await Spot.findOne({
        where: {
            id: spotImage.spotId
        }
    })
    
    if(spot.ownerId !== req.user.id){
        const err = new Error("User doesn't own this spot")
        err.status = 400
        next(err)
    }

    await spotImage.destroy()

    return res.status(200).json({
        "message": "Successfully deleted",
        "statusCode": 200
      })
})


module.exports = router