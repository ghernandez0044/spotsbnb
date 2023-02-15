// Neccessary imports
const express = require('express')
const router = express.Router()
const { setTokenCookie, restoreUser } = require('../../utils/auth');
const { User } = require('../../db/models');
const { check } = require('express-validator')
const { handleValidationErrors } = require('../../utils/validation')
const { Op } = require('sequelize')


// Middleware for validating log in
const validateLogin = [
    check('credential').exists({ checkFalsy: true })
                       .notEmpty()
                       .withMessage('Please provide a valid email or username.'),
    check('password').exists({ checkFalsy: true })
                     .withMessage('Please provide a password'),
    handleValidationErrors
]


// Restore session user - Get the Current User
router.get('/', restoreUser, (req, res) => {
    const { user } = req

    if(user){
        return res.json({
            user: user.toSafeObject()
        })
    } else {
        return res.json({
            user: null
        })
    }
})

// User Login
router.post('/', validateLogin, async (req, res, next) => {
    const { credential, password } = req.body

    const user = await User.login({ credential, password })

    if(!user){
        const err = new Error('Login failed')
        err.status = 401
        err.title = 'Login failed'
        err.errors = ['The provided credential-password combination was invalid']
        return next(err)
    }

    await setTokenCookie(res, user)

    return res.json({
        user: {
            id: user.id,
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            username: user.username
        }
    })

})

// User Log Out
router.delete('/', (req, res) => {
    res.clearCookie('token')
    return res.json({
        "message": "success"
    })
})









module.exports = router