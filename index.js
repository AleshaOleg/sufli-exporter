const fs = require('fs')
var home = require('os').homedir();
const express = require('express')

const app = express()
const port = 3000

app.get('/', (req, res) => {
  const filePath = `${home}/Documents/Translations/sufli-translations.txt`
  const wordAndTranslation = `${req.query.text},${req.query.translation}\n`

  fs.exists(filePath, exists => {
    if (exists) {
      fs.appendFile(filePath, wordAndTranslation, err => {
        if (err) throw err
        console.log(
          '\x1b[32m%s\x1b[0m',
          `Translation of word "${req.query.text}" as "${req.query.translation}" saved!`
        )
      })
      return
    }

    fs.writeFile(filePath, wordAndTranslation, err => {
      if (err) throw err
      console.log(
        '\x1b[32m%s\x1b[0m',
        `Translation of word "${req.query.text}" as "${req.query.translation}" saved!`
      )
    })
  })
})

app.listen(port, () => console.log('\x1b[36m%s\x1b[0m', `Example app listening on port ${port}!`))
