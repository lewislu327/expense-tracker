const express = require('express')
const router = express.Router()
const Record = require('../../models/Record')


router.get('/', (req, res) => {
  Record.find()
  .lean()
  .sort({ date: 'asc' }) 
  .then( records => {
    let total = 0
    for (let i = 0; i < records.length; i++) {
      total += records[i].amount
    }
    (res.render('index', {records, total} ))
    })
  .catch(error => console.error(error))
})

module.exports = router