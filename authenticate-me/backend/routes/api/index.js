const router = require('express').Router()

// Test endpoint
router.post('/test', (req, res) => {
    res.json({
        requestBody: req.body
    })
})






module.exports = router