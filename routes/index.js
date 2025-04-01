const express = require('express')
const actions = require('../methods/action')
const router = express.Router()

router.get('/', (req, res) => {
    res.send('Hello World')
})

router.get('/pass', (req, res) => {
    res.json({succes:true,name:'TICKET_RECONNU_PASS'})
})

router.get('/used', (req, res) => {
    res.json({succes:true,name:'TICKET_RECONNU_USED'})
})

router.get('/dashboard', (req, res) => {
    res.send('Dashboard')
})

//@route POST /addqr
router.post('/addqr', actions.addNewQr)

//@route GET /updateonly
router.get('/updateonly/:qrCode', actions.mafonction)

//@route GET /findAndUpdateQr
router.get('/mafonction2/:qrCode', actions.mafonction2)

router.get('/permission/:qrCode', actions.permission)

router.get('/tousqr', actions.tousqr);

module.exports = router