const express = require('express')
const app = express()
const PORT = process.env.PORT || 3000
require('./config/mongoose')
const exphbs = require('express-handlebars')
const hbshelpers = require('handlebars-helpers')
const multihelpers = hbshelpers()
const methodOverride = require('method-override')
const routes = require('./routes') 
const session = require('express-session')
const usePassport = require('./config/passport')

app.engine('hbs', exphbs({ defaultLayout: 'main', extname: '.hbs', helpers: multihelpers}))
app.set('view engine', 'hbs')

app.use(session({
  secret: 'helloWorld',
  resave: false,
  saveUninitialized: true
}))


app.use(express.urlencoded({ extended: true }))
app.use(methodOverride('_method'))
usePassport(app)
app.use((req, res, next) => {
  res.locals.isAuthenticated = req.isAuthenticated()
  res.locals.user = req.user
  next()
})
app.use(routes)


app.listen(PORT, () => {
  console.log(`APP is running on http://localhost:${PORT}`)
})
