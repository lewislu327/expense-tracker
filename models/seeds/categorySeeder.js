const db = require('../../config/mongoose')
const Category = require('../Category')
const { categories } = require('./seeds.json')

db.once('open', () => { 
  Category.create(categories)
    .then(() => {
      console.log('Category created!')
      return db.close()
    })
    .then(() => console.log('Database connection closed'))
    .catch(error => console.log(error))
})
  



