const mongoose = require('mongoose')
const Category = require('../Category')
mongoose.connect('mongodb://localhost/expense-tracker',{ useNewUrlParser: true, useUnifiedTopology: true })
const db = mongoose.connection

const categories = [
    {
      "category": "house",
      "category_cn": "-- 家居物業 --",
      "categoryIcon": "fas fa-home"
    },
    {
      "category": "traffic",
      "category_cn": "-- 交通出行 --",
      "categoryIcon": "fas fa-shuttle-van"
    },
    {
      "category": "entertainment",
      "category_cn": "-- 休閒娛樂 --",
      "categoryIcon": "fas fa-grin-beam"
    },
    {
      "category": "food",
      "category_cn": "-- 餐飲食品 --",
      "categoryIcon": "fas fa-utensils"
    },
    {
      "category": "others",
      "category_cn": "-- 其他 --",
      "categoryIcon": "fas fa-pen"
    }
  ]

db.on('error', () => {
  console.log('mongodb error!')
})
db.once('open', () => { 
  Category.create(...categories)
  .then(() => {  
  console.log('category seeder loaded!')
  return db.close()
  })
})
  



