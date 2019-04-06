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

async function loadCollection(colName) {
  const client = await mongodb.MongoClient.connect(url, { useNewUrlParser: true })
  return client.db('api').collection(colName)
}

// APIs
// Item API
app.get('/api/items', async (req, res) => {
  const data = await loadCollection('items')
  const json = await data.find().toArray()
  res.send(json)
})

app.post('/api/items', async (req, res) => {
  const data = await loadCollection('items')
  const json = {
    ...req.body,
    timeStamp: new Date().toJSON()
  }
  await data.insertOne(json)
  res.status(201).send()
})

app.delete('/api/items/:id', async (req, res) => {
  const data = await loadCollection('items')
  await data.deleteOne({
    _id: new mongodb.ObjectId(req.params.id)
  })
  res.status(200).send()
})

// User API
app.get('/api/users', async (req, res) => {
  const data = await loadCollection('users')
  const json = await data.find().toArray()
  res.send(json)
})

app.post('/api/users', async (req, res) => {
  const data = await loadCollection('users')
  const json = {
    ...req.body,
    timeStamp: new Date().toJSON()
  }
  await data.insertOne(json)
  res.status(201).send()
})

app.delete('/api/users/:id', async (req, res) => {
  const data = await loadCollection('users')
  await data.deleteOne({
    _id: new mongodb.ObjectId(req.params.id)
  })
  res.status(200).send()
})
// End of API part

app.listen(8081, () => {
    console.log('app listening on port 8081...')
})