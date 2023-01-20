// Import needed packages
const express = require('express')
require('express-async-errors')
const morgan = require('morgan')
const cors = require('cors')
const csurf = require('csurf')
const helmet = require('helmet')
const cookieParser = require('cookie-parser')

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