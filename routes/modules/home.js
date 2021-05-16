const express = require('express')
const router = express.Router()
const Record = require('../../models/Record')


router.get('/', (req, res) => {
  Record.find()
  .lean()
  .sort({ date: 'asc' }) 
  .then( records => {
    const total = []
    records.forEach(data => total.push(Number(data.amount)))
    (res.render('index', {records, total} ))
    })
  .catch(error => console.error(error))
})

module.exports = router