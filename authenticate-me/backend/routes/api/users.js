// Needed imports
const express = require('express')
const router = express.Router()
const { setTokenCookie, requireAuth } = require('../../utils/auth')
const { User } = require('../../db/models')
const { check } = require('express-validator')
const { handleValidationErrors } = require('../../utils/validation')


// Middleware for validating sign up credentials
const validateSignup = [
    check('email').exists({ checkFalsy: true })
                  .isEmail()
                  .withMessage('Please provide a valid email'),
    check('username').exists({ checkFalsy: true })
                     .isLength({ min: 4 })
                     .withMessage('Please provide a username with at least 4 characters'),
    check('username').not()
                     .isEmail()
                     .withMessage('Username cannot be an email.'),
    check('password').exists({ checkFalsy: true })
                     .isLength({ min: 6 })
                     .withMessage('Password must be 6 characters or more'),
    handleValidationErrors
]

// User Sign Up
router.post('/', validateSignup, async (req, res, next) => {
    const { firstName, lastName, email, password, username } = req.body

    const potentialUser = await User.scope('includeEmail').findAll({
        where: {
            email: email
        }
    })
    
    if(potentialUser.email === email){
        const err = new Error('User with that email already exists')
        err.status = 400
        next(err)
    }
    
    const potentialUser2 = await User.scope('includeEmail').findAll({
        where: {
            username: username
        }
    })

    if(potentialUser2.username === username){
        const err = new Error('User with that username already exists')
        err.status = 400
        next(err)
    }

    const user = await User.signup({
        firstName,
        lastName,
        email,
        username,
        password
    })

   const cookie = await setTokenCookie(res, user)

    return res.json({
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        username: user.username,
        password: user.password,
        token: cookie
    })
})







module.exports = router