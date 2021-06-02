const express = require('express')
const Category = require('../../models/Category')
const router = express.Router()
const Record = require('../../models/Record')


router.get('/', (req, res) => {
  const userId = req.user._id
  Record.find({ userId })
  .lean()
  .sort({ date: 'asc' }) 
  .then( records => {
    let total = 0
    for (let i = 0; i < records.length; i++) {
      total += records[i].amount
    }
    Category.find()
    .lean()
    .then(category => res.render('index', {records, total, category })
    )
  })
  .catch(error => console.error(error))
})

module.exports = router