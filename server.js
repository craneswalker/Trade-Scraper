const express = require('express')
const cors = require('cors')
const scraper = require('./scraper')
const app = express()

app.use(cors())

app.get('/', (req, res) => {
  res.json({
    message: 'scraping is fun'
  })
})

app.get('/search/:title', (req, res) => {
  scraper.searchCards(req.params.title)
    .then(cards => {
      res.json(cards)
    })
})

const port = process.env.PORT || 3000
app.listen(port, ()=> {
  console.log(`listening on ${port}`)
})