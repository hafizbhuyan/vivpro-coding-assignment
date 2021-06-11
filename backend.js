// Require packages and set the port
const express = require('express')
const port = 3002
const app = express()
const bodyParser = require('body-parser')
let fs = require('fs')
let parse = require('csv-parse')
let parser = parse({columns: true, delimiter: ','}, function(err, records) {
  app.get('/', (request, response) => {
    console.log(`URL: ${request.url}`)
    response.send(records)
  })  

  // Start the server
  const server = app.listen(port, (error) => {
    if (error) return console.log(`Error: ${error}`)

    console.log(`Server listening on port ${server.address().port}`)
  })
})

fs.createReadStream(__dirname+'/output.csv').pipe(parser)
