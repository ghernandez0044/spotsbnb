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

// Edit a Booking - require authentication - require authorization
router.put('/:bookingId', requireAuth, async (req, res, next) => {
    const booking = await Booking.findByPk(req.params.bookingId)

    if(!booking){
        const err = new Error("Booking couldn't be found")
        err.status = 404
        next(err)
    }

    const today = new Date()

    const { startDate, endDate } = req.body

    if(today.getTime() <= booking.startDate.getTime()){
        const err = new Error("Past bookings can't be modified")
        err.status = 403
        next(err)
    }

    const potentialBookings = await Booking.findAll({
        where: {
            spotId: booking.spotId
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


    if(startDate){
        booking.startDate = new Date(startDate)
    }
    if(endDate){
        booking.endDate = new Date(endDate)
    }

    await booking.save()

    const payload = await Booking.findByPk(req.params.bookingId)

    return res.status(200).json(payload)

})





module.exports = router