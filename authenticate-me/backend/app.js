// Import needed packages
const express = require('express')
require('express-async-errors')
const morgan = require('morgan')
const cors = require('cors')
const csurf = require('csurf')
const helmet = require('helmet')
const cookieParser = require('cookie-parser')

// Import Sequelize error handler
const { ValidationError } = require('sequelize')

// Import routes
const routes = require('./routes')

// Check if environment is in production or not
const { environment } = require('./config')
const isProduction = environment === 'production'


// Initialize the Express application
const app = express()

// Connect the morgan middleware for logging information about requests and responses
app.use(morgan('dev'))

// Connect cookie-parser middleware for parsing cookies 
app.use(cookieParser())

// Connect the express.json middleware for parsing json bodies of requests
app.use(express.json())

// SECURITY MIDDLEWARES

// Connect the cors middleware only in development
if(!isProduction){
    app.use(cors())
}

// Connect the helmet middleware for overall better security
app.use(
    helmet.crossOriginResourcePolicy({
        policy: 'cross-origin'
    })
)

// Connect the csurf middleware and configure it to use cookies
app.use(
    csurf({
        cookie: {
            secure: isProduction,
            sameSite: isProduction && 'Lax',
            httpOnly: true
        }
    })
)

// Connect all routes
app.use(routes)


// Connect error handlers

// Catch unhandled requests and forward to error handler
app.use((req, res, next) => {
    const err = new Error('The requested resource could not be found.')
    err.title = 'Resource Not Found'
    err.errors = ['The requested resource could not be found.']
    err.status = 404
    next(err)
})

// Process Sequelize errors
app.use((err, req, res, next) => {
    // Check if error is a Sequelize error
    if(err instanceof ValidationError){
        err.errors = err.errors.map((e) => e.message)
        err.title = 'Validation error'
    }
    next(err)
})

// Error formatter error handler
app.use((err, req, res, next) => {
    res.status(err.status || 500)
    res.json({
        title: err.title || 'Server Error',
        message: err.message,
        errors: err.errors,
        stack: isProduction ? null : err.stack
    })
})

// Export the app 
module.exports = app