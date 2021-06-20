const express = require('express')
const Category = require('../../models/Category')
const router = express.Router()
const Record = require('../../models/Record')
const moment = require('moment')

router.get('/', (req, res) => {
  const userId = req.user._id
  const time = req.query.time || ''
  const [year, month] = time.split('-')
  const selectedCategory = req.query.category || ''
  
  Record.find({ userId })
  .lean()
  .sort({ date: 'asc' }) 
  .then( records => {
    if (time) {
      Record.find({date: {$gte: time + '-01', $lte: time+'-31' }})
        .lean()
        .then(items => {
          return records = items
        })
    }

    if ( selectedCategory ){
      Record.find({ category: selectedCategory})
        .lean()
        .then(items => {
          return records = items
        })
    }
    
    Category.find()
    .lean()
    .then((category) => {
      let total = 0
      for (let i = 0; i < records.length; i++) {
        total += records[i].amount
      }
      res.render('index', {records, total, category, time, selectedCategory }
      )}
    )
  })
  .catch(error => console.error(error))
})

module.exports = router