const express = require('express')
const app = express()
const port = 3000
require('./config/mongoose')
const exphbs = require('express-handlebars')
const hbshelpers = require('handlebars-helpers')
const multihelpers = hbshelpers()
const methodOverride = require('method-override')
const routes = require('./routes') 
app.engine('hbs', exphbs({ defaultLayout: 'main', extname: '.hbs', helpers: multihelpers}))
app.set('view engine', 'hbs')

app.use(express.urlencoded({ extended: true }))
app.use(methodOverride('_method'))
app.use(routes)


app.listen(port, () => {
  console.log(`APP is running on http://localhost:${port}`)
})
