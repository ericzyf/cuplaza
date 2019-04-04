const bodyParser = require('body-parser')
const cors = require('cors')
const express = require('express')
const mongodb = require('mongodb')
const morgan = require('morgan')

const app = express()
app.use(morgan('combined'))
app.use(bodyParser.json())
app.use(cors())

async function loadCollection() {
  const client = await mongodb.MongoClient.connect('mongodb+srv://admin:admin@cuplaza-api-tooxw.mongodb.net/test?retryWrites=true', { useNewUrlParser: true})
  return client.db('api').collection('items')
}

app.get('/api', async (req, res) => {
  const data = await loadCollection()
  const json = await data.find().toArray()
  console.log(json)
  res.send(json)
})

app.listen(8081, () => {
    console.log('app listening on port 8081...')
})