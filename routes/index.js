const express = require('express')
const router = express.Router()
const { authenticator } = require('../middleware/auth')
const home = require('./modules/home')
const records = require('./modules/records')
const users = require('./modules/users')

router.use('/users', users)
router.use('/', authenticator, home)
router.use('/', authenticator, records)


module.exports = router