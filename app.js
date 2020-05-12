const express = require('express')
const app = express()
const port = 3000
const exphbs = require('express-handlebars')
const restaurantList = require('./restaurant.json').results
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const db = mongoose.connection

app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')
app.use(express.static('public'))
app.use((bodyParser.urlencoded({ extended: true })))
app.listen(port, () => console.log(`The server listening on localhost:${port}`))

// 連接啟動資料庫
mongoose.connect('mongodb://localhost/restaurant-list', { useNewUrlParser: true, useUnifiedTopology: true })
db.on('error', () => console.log('MongoDB error!'))
db.once('open', () => console.log('MongoDB connected!'))

// 路由設定
app.get('/', (req, res) => {
  res.render('index', { restaurant: restaurantList })
})

app.get('/restaurants/:id', (req, res) => {
  const restaurantId = restaurantList.find(item => {
    return item.id.toString() === req.params.id
  })
  res.render('show', { restaurant: restaurantId })
})

app.get('/search', (req, res) => {
  const keyword = req.query.keyword.trim()
  console.log(keyword)
  const restaurants = restaurantList.filter(item => {
    return item.category.includes(keyword) ||
      item.name.toLowerCase().includes(keyword.toLowerCase())
  })
  res.render('index', { restaurant: restaurants, keyword })
})

