const express = require('express')
const app = express()
const port = 3000
const mongoose = require('mongoose')
mongoose.connect('mongodb://localhost/expense-tracker',{ useNewUrlParser: true, useUnifiedTopology: true })
const db = mongoose.connection
const exphbs = require('express-handlebars')
app.engine('hbs', exphbs({ defaultLayout: 'main', extname: '.hbs'}))
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
  record.icon = categoryToIcon(category)  
  //之後要想更好的切換方法
  return Record.create(record)
    .then(() => res.redirect('/'))
    .catch(error => console.log(error))
})


app.listen(port, () => {
  console.log(`APP is running on http://localhost:${port}`)
})

function categoryToIcon(category) {
  switch (category) {
    case 'house':
      return 'fas fa-home';
    case 'traffic':
      return 'fas fa-shuttle-van';
    case 'entertainment':
      return 'fas fa-grin-beam';
    case 'food':
      return 'fas fa-utensils';
    case 'others':
      return 'fas fa-pen';
  }
}