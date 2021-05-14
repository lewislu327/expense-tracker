const mongoose = require('mongoose')
const Record = require('../Record')
mongoose.connect('mongodb://localhost/expense-tracker',{ useNewUrlParser: true, useUnifiedTopology: true })
const db = mongoose.connection

const records =[
    {
      "name": "早餐",
      "date": "2021-02-30",
      "category": "food",
      "amount": 150
    },
    {
      "name": "計程車",
      "date": "2021-03-01",
      "category": "traffic",
      "amount": 1500
    },
    {
      "name": "電子書閱讀器",
      "date": "2021-03-27",
      "category": "entertainment",
      "amount": 5000
    },
    {
      "name": "電競椅",
      "date": "2021-04-14",
      "category": "house",
      "amount": 7500
    },
    {
      "name": "孝親費",
      "date": "2021-5-20",
      "category": "others",
      "amount": 16800
    }
  ]

db.on('error', () => {
  console.log('mongodb error!')
})
db.once('open', () => {
  Record.create(...records)
  console.log('record seeder loaded!')
})