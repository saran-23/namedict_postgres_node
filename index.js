const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const port = 3000
const db = require('./queries')

app.use(bodyParser.json())
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
)

app.get('/', (request, response) => {
    response.json({ info: 'Node.js, Express, and Postgres API' })
  })

  app.listen(port, () => {
    console.log(`App running on port ${port}.`)
  })
  
  app.get('/users', db.getUsers)
  app.get('/users/:english_name', db.getUserById)
  app.post('/users', db.createUser)
  app.put('/users/:english_name', db.updateUser)
  app.delete('/users/:english_name', db.deleteUser)

  