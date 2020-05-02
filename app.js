/**
 * require Express
 * set static files location
 * require template engine : Handlebars
 * require restaurant JSON
 */
const express = require('express')
const app = express()
const port = 3000
app.use(express.static('public'))
const exphbs = require('express-handlebars')
app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')
const restaurantList = require('./restaurant.json').results

/**
 * set routing GET
 */
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
  if (restaurants.length === 0) {
    res.render('notfound')
  } else {
    res.render('index', { restaurant: restaurants, keyword })
  }
})

app.listen(port, () => { console.log(`The server listening on localhost:${port}`) })