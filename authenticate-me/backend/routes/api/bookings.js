// Neccessary Imports
const express = require('express')
const router = express.Router()
const { requireAuth } = require('../../utils/auth')
const { Op } = require('sequelize')
const { Spot, SpotImage, Review, User, ReviewImage, Booking, sequelize} = require('../../db/models');

// Get all of the Current User's Bookings - require authentication
router.get('/current', requireAuth, async (req, res, next) => {
    const bookings = await Booking.findAll({
        where: {
            userId: req.user.id
        },
        include: [
            { model: Spot, attributes: { exclude: ['createdAt', 'updatedAt', 'description'] }, include: { model: SpotImage, attributes: ['url'] } }
        ]
    })

    const payload = bookings[0].toJSON()

    const url = payload.Spot.SpotImages[0].url

    delete payload.Spot.SpotImages

    payload.Spot.previewImage = url

    return res.status(200).json({
        Bookings: payload
    })

})







module.exports = router