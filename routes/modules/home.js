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
    if ( time ) {
      records = records.filter(items => {
        if ( moment(items.date).format("YYYY").match(year) && moment(items.date).format("MM").match(month) ) {
          return items 
        }
      })
    }

    if ( selectedCategory ){
      records = records.filter( items => {
        if ( items.category === selectedCategory ) {
          return items
        }
      })
    }
    let total = 0
    for (let i = 0; i < records.length; i++) {
      total += records[i].amount
    }
    Category.find()
    .lean()
    .then(category => res.render('index', {records, total, category, time, selectedCategory })
    )
  })
  .catch(error => console.error(error))
})

module.exports = router