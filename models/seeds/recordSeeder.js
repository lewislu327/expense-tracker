const mongoose = require('mongoose')
const Record = require('../Record')
mongoose.connect('mongodb://localhost/expense-tracker',{ useNewUrlParser: true, useUnifiedTopology: true })
const db = mongoose.connection

const records =[
    {
      "name": "早餐",
      "date": "2021-02-22",
      "category": "food",
      "amount": 150,
      "icon": 'fas fa-utensils'
    },
    {
      "name": "計程車",
      "date": "2021-03-01",
      "category": "traffic",
      "amount": 1500,
      "icon": 'fas fa-shuttle-van'
    },
    {
      "name": "電子書閱讀器",
      "date": "2021-03-27",
      "category": "entertainment",
      "amount": 5000,
      "icon": 'fas fa-grin-beam'
    },
    {
      "name": "電競椅",
      "date": "2021-04-14",
      "category": "house",
      "amount": 7500,
      "icon":"fas fa-home"
    },
    {
      "name": "孝親費",
      "date": "2021-05-20",
      "category": "others",
      "amount": 16800,
      "icon": 'fas fa-pen'
    }
  ]

db.on('error', () => {
  console.log('mongodb error!')
})
db.once('open', () => {
  Record.create(...records)
  console.log('record seeder loaded!')
})