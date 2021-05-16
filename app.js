const express = require('express')
const app = express()
const port = 3000
const mongoose = require('mongoose')
mongoose.connect('mongodb://localhost/expense-tracker',{ useNewUrlParser: true, useUnifiedTopology: true })
const db = mongoose.connection
const exphbs = require('express-handlebars')
const hbshelpers = require('handlebars-helpers')
const multihelpers = hbshelpers()
app.engine('hbs', exphbs({ defaultLayout: 'main', extname: '.hbs', helpers: multihelpers}))
app.set('view engine', 'hbs')
const Record = require('./models/Record')
const Category = require('./models/Category')


db.on('error', () => {
  console.log('mongodb error!')
})
db.once('open', () => {
  console.log('mongodb connected!')
})

app.use(express.urlencoded({ extended: true }))


app.get('/', (req, res) => {
  Record.find()
  .lean() 
  .then( records => res.render('index', {records} ))
  .catch(error => console.error(error))
})

app.get('/new', (req, res) => {
  return res.render('new')
})

app.post('/', (req, res) => {
  const record = req.body
  const category = req.body.category
  Category.findOne({ category: category })
    .lean()
    .then(function (item) {
      return (record.icon = item.categoryIcon)
    })
    .then(() => {
      Record.create(record).then(() => res.redirect('/'))
    })
    .catch((error) => console.log(error))
})

app.get('/:id/edit', (req, res) => { 
  const id = req.params.id
  const categoryList = []
  console.log(res)
  Category.find()
    .lean()
    .then((items) => {
      items.forEach((item) => categoryList.push(item))
    })

  return Record.findById(id)
    .lean()
    .then((record) => res.render('edit', { record, categoryList }))
})


app.post('/:id/edit', (req, res) => {
  const id = req.params.id
  const {name, date, category, amount, category_cn} = req.body

  return Record.findById(id)
    .then(record => {
      record.name = name
      record.date = date
      record.category = category
      record.amount = amount
      Category.findOne({ category: category })
      .lean()
      .then(function (item) {
      return (record.icon = item.categoryIcon)   
      })
    .then(() => {
        record.save()
      })
    .then(()=> res.redirect('/'))
    .catch(error => console.log(error))
  })  
})

app.post('/:id/delete', (req, res) => {
  const id = req.params.id
  return Record.findById(id)
    .then(record => record.remove())
    .then(() => res.redirect('/'))
    .catch(error => console.log(error))
})

app.listen(port, () => {
  console.log(`APP is running on http://localhost:${port}`)
})
