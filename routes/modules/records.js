const express = require('express')
const router = express.Router()
const Record = require('../../models/Record')
const Category = require('../../models/Category')

router.get('/new', (req, res) => {
  return res.render('new')
})

router.post('/', (req, res) => {
  const record = req.body
  const category = req.body.category
  const userId = req.user._id 
  Category.findOne({ category })
    .lean()
    .then( item => (record.icon = item.categoryIcon))
    .then(()=> {
      const {merchant, name, date, category, amount, icon} = record
      return Record.create({ merchant,name, date, category, amount, icon, userId })
        .then(() => res.redirect('/'))     
    })
    .catch(error => console.log(error))
})

router.get('/:id/edit', (req, res) => { 
  const _id = req.params.id
  const userId = req.user._id
  return Category.find()
  .lean()
  .then((category) => {
    Record.findOne({ _id, userId })
    .lean()
    .then((record) => res.render('edit', { record, category }))
  })
  .catch(error => console.log(error))  
})


router.put('/:id/edit', (req, res) => {
  const _id = req.params.id
  const userId = req.user._id
  const { name, date, category, amount, merchant } = req.body

  return Record.findOne({ _id, userId })
    .then(record => {
      record.merchant = merchant
      record.name = name
      record.date = date
      record.category = category
      record.amount = amount
      Category.findOne({ category })
      .lean()
      .then( item => (record.icon = item.categoryIcon))
    .then(() => {
        record.save()
        .then(()=> res.redirect('/'))
      })
    .catch(error => console.log(error))
  })  
})

router.delete('/:id/delete', (req, res) => {
  const _id = req.params.id
  const userId = req.user._id
  return Record.findOne({ _id, userId })
    .then(record => record.remove())
    .then(() => res.redirect('/'))
    .catch(error => console.log(error))
})

module.exports = router