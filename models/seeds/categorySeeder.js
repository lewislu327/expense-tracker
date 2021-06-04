if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}
const db = require('../../config/mongoose')
const Category = require('../Category')
const seeds = require('./seeds.json')

db.once('open', () => { 
  return Promise.all(Array.from(
        { length: 5 },
        (_, i) => Category.create({ 
          ...seeds.categories[i]
        })
  )) 
  .then(() => {
    console.log('Category created!')
    return db.close()
  })
  .then(() => console.log('Database connection closed'))
  .catch(error => console.log(error))
})
  



