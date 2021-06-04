const bcrypt = require('bcryptjs')
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}

const db = require('../../config/mongoose')
const Record = require('../Record')
const User = require('../user')
const seeds  = require('./seeds.json')

const SEED_USER = {
  name: 'user1',
  email: 'user1@example.com',
  password: '12345678'
}

db.once('open', () => {
  bcrypt
    .genSalt(10)
    .then(salt => bcrypt.hash(SEED_USER.password, salt))
    .then(hash => User.create({
      name: SEED_USER.name,
      email: SEED_USER.email,
      password: hash
    }))
    .then(user => {
      const userId = user._id 
      return Promise.all(Array.from(
        { length: 5 },
        (_, i) => Record.create({ 
          ...seeds.records[i],userId

        })
      )) 
    })
    .then(() => {
      console.log('Database connection closed')
      process.exit()
    })
    
    .catch(error => console.log(error))
})