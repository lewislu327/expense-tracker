const db = require('../../config/mongoose')
const Record = require('../Record')
const { records } = require('./seeds.json')


db.once('open', () => {
  Record.create(records)
    .then(() => {
      console.log('Records created!')
      return db.close()
    })
    .then(() => console.log('Database connection closed'))
    .catch(error => console.log(error))
})