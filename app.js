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


db.on('error', () => {
  console.log('mongodb error!')
})
db.once('open', () => {
  console.log('mongodb connected!')
})




app.get('/', (req, res) => {
  Record.find()
  .lean() 
  .then( records => res.render('index', {records} ))
  .catch(error => console.error(error))
})




app.listen(port, () => {
  console.log(`APP is running on http://localhost:${port}`)
})