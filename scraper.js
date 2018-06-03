const fetch = require('node-fetch')
const cheerio = require('cheerio')

const url = 'https://www.cardkingdom.com/catalog/search?filter%5Bipp%5D=60&filter%5Bsort%5D=name&filter%5Bname%5D='

function searchCards(searchTerm) {
  return fetch(`${url}${searchTerm}`)
    .then(response => response.text())
    .then(body => {
      const cards = []
      const $ = cheerio.load(body)
      $('.productCardWrapper').each(function(i, element){
        const $element = $(element)
        const $image = $element.find('div a img')
        const $border = $element.find('div').attr('class')
        const $title = $element.find('div:nth-child(2) table tbody tr td span')
        const $set = $element.find('div:nth-child(2) table tbody tr td div')
        const $url = $title.find('a').attr('href')
        const $price = $element.find('.stylePrice')
        const card = {
          title: $title.text(),
          url: $url,
          set: $set.text().replace(/(\r\n\t|\n|\r\t)/gm,""),
          image: $image.attr('data-src'),
          border: $border,
          price: $price.text().trim().replace(/(\r\n\t|\n|\r\t)/gm,"").replace(/\$/g,"").split(" "),
        }
        cards.push(card)
      })
      return cards
    })
}

module.exports = {
  searchCards
}
  
