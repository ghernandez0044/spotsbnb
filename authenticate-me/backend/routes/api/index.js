const router = require('express').Router()
const { setTokenCookie, restoreUser, requireAuth } = require('../../utils/auth')
const { User } = require('../../db/models')
const sessionRouter = require('./session')
const usersRouter = require('./users')
const spotsRouter = require('./spots')
const reviewsRouter = require('./reviews')
const bookingsRouter =require('./bookings')

// Global middleware
router.use(restoreUser)

// Connecting routers
router.use('/session', sessionRouter)
router.use('/users', usersRouter)
router.use('/spots', spotsRouter)
router.use('/reviews', reviewsRouter)
router.use('/bookings', bookingsRouter)

// Test endpoint
router.post('/test', (req, res) => {
    res.json({
        requestBody: req.body
    })
})

// // Another test endpoint (for setTokenCookie)
// router.get('/set-token-cookie', async (req, res) => {
//     const user = await User.findOne({
//         where: {
//             username: 'FakeUser2'
//         }
//     })

//     setTokenCookie(res, user)

//     return res.json({
//         user
//     })
// })

// // Another test endpoint (for restoreUser)
// router.get('/restore-user', (req, res) => {
//     return res.json(req.user)
// })

// // Another test endpoint (for requireAuth)
// router.get('/require-auth', requireAuth, (req, res) => {
//     return res.json(req.user)
// })









module.exports = router