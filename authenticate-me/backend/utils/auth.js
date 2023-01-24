// Needed imports
const jwt = require('jsonwebtoken')
const { jwtConfig } = require('../config')
const { User } = require('../db/models')
const { secret, expiresIn } = jwtConfig

// This function sets up the JWT cookie after a user us logged in or signed up
function setTokenCookie(res, user){
    // Create the token
    const token = jwt.sign(
        {
            data: user.toSafeObject()
        },
        secret,
        {
            expiresIn: parseInt(expiresIn)
        }
    )

    const isProduction = process.env.NODE_ENV === 'production'

    // Set the token cookie
    res.cookie('token', token, {
        maxAge: expiresIn * 1000,
        httpOnly: true,
        secure: isProduction,
        sameSite: isProduction && "Lax"
    })

    return token
}

// This function will restore the session user based on the contents of the JWT cookie
function restoreUser(req, res, next){
    // Token parsed from cookies
    const { token } = req.cookies
    req.user = null

    return jwt.verify(token, secret, null, async (err, jwtPayload) => {
        if(err){
            return next()
        }

        try {
            const { id } = jwtPayload.data
            req.user = await User.scope('currentUser').findByPk(id)
        } catch (e) {
            res.clearCookie('token')
            return next()
        }

        if(!req.user){
            res.clearCookie('token')
        }

        return next()

    })
}

// This function will be for requiring a session user to be authenticated before accessing a route
function requireAuth(req, res, next){
    if(req.user) return next()

    // If there is no current user, return an error
    const err = new Error('Authentication required')
    err.title = 'Authentication required'
    err.errors = ['Authentication required'],
    err.status = 401
    return next(err)
}

// Export all of the helper functions
module.exports = { setTokenCookie, restoreUser, requireAuth }