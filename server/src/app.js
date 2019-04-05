const bodyParser = require('body-parser')
const cors = require('cors')
const express = require('express')
const mongodb = require('mongodb')
const morgan = require('morgan')

const app = express()
app.use(bodyParser.json())
app.use(cors())
app.use(morgan('combined'))

const url = 'mongodb+srv://admin:admin@cuplaza-api-tooxw.mongodb.net/test?retryWrites=true'

async function loadItems() {
  const client = await mongodb.MongoClient.connect(url, { useNewUrlParser: true })
  return client.db('api').collection('items')
}

app.get('/api/items', async (req, res) => {
  const data = await loadItems()
  const json = await data.find().toArray()
  console.log(json)
  res.send(json)
})

app.post('/api/items', async (req, res) => {
  const data = await loadItems()
  const json = {
    ...req.body,
    timeStamp: new Date().toJSON()
  }
  console.log(json)
  await data.insertOne(json)
  res.status(201).send()
})

app.delete('/api/items/:id', async (req, res) => {
  const data = await loadItems()
  await data.deleteOne({
    _id: new mongodb.ObjectId(req.params.id)
  })
  res.status(200).send()
})

app.listen(8081, () => {
    console.log('app listening on port 8081...')
})