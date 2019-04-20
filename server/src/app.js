const base64url = require('base64url')
const bodyParser = require('body-parser')
const cors = require('cors')
const express = require('express')
const mongodb = require('mongodb')
const morgan = require('morgan')

const app = express()
app.use(bodyParser.json())
app.use(cors())
app.use(morgan('combined'))

// mongodb server url
const url = 'mongodb+srv://admin:admin@cuplaza-api-tooxw.mongodb.net/test?retryWrites=true'

// expose mongodb client as global variable
var client

//// establish connection to mongodb server
async function loadClient() {
  client = await mongodb.MongoClient.connect(url, { useNewUrlParser: true })
}

// connect to mongodb server only once
loadClient()

// load mongodb collection by collection name
function loadCollection(colName) {
  return client.db('api').collection(colName)
}
////

//// APIs
// Item API
/**
 * handle http GET method for items
 * @return all records in 'items' collection in json
 */
app.get('/api/items', async (req, res) => {
  const data = loadCollection('items')
  const json = await data.find().toArray()
  res.send(json)
})

/**
 * handle http POST method for items
 * create new record in 'items' collection
 */
app.post('/api/items', async (req, res) => {
  const data = loadCollection('items')
  const json = {
    ...req.body,
    // insert current timestamp
    timeStamp: new Date().toJSON()
  }
  await data.insertOne(json)
  res.status(201).send()
})

/**
 * handle http DELETE method for items
 * delete the item with the specified id
 */
app.delete('/api/items/:id', async (req, res) => {
  const data = loadCollection('items')
  await data.deleteOne({
    _id: new mongodb.ObjectId(req.params.id)
  })
  res.status(200).send()
})

// User API
/**
 * handle http GET method for users
 * @return all records in 'users' collection in json
 */
app.get('/api/users', async (req, res) => {
  const data = loadCollection('users')
  const json = await data.find().toArray()
  res.send(json)
})

/**
 * handle http POST method for users
 * create new record in 'users' collection
 */
app.post('/api/users', async (req, res) => {
  const data = loadCollection('users')
  const json = {
    ...req.body,
    // insert current timestamp
    timeStamp: new Date().toJSON()
  }
  await data.insertOne(json)
  res.status(201).send()
})

/**
 * handle http DELETE method for users
 * delete the user with the specified id
 */
app.delete('/api/users/:id', async (req, res) => {
  const data = loadCollection('users')
  await data.deleteOne({
    _id: new mongodb.ObjectId(req.params.id)
  })
  res.status(200).send()
})

// Order API
/**
 * handle http GET method
 * @return all records in 'orders' collection in json
 */
app.get('/api/orders', async (req, res) => {
  const data = loadCollection('orders')
  const json = await data.find().toArray()
  res.send(json)
})

/**
 * handle http POST method
 * create new record in 'orders' collection
 */
app.post('/api/orders', async (req, res) => {
  const data = loadCollection('orders')
  const json = {
    ...req.body,
    // insert current timestamp
    timeStamp: new Date().toJSON()
  }
  await data.insertOne(json)
  res.status(201).send()
})
//// End of API part

//// Search System
/**
 * main search function
 * @param b64 base64url encoded search keyword entered by user
 * @return all the items that are matched with the search keyword in json
 */
app.get('/api/search/:b64', async (req, res) => {
  const data = loadCollection('items')
  const json = await data.find().toArray()
  // decode base64, remove all spaces in the string, and convert all char to lowercase
  const searchKeyword = base64url.decode(req.params.b64).replace(/\s/g, '').toLowerCase()
  let filteredJson = []
  for (let i = 0; i !== json.length; ++i) {
    // remove all spaces, and convert to lowercase
    let itemTitle = json[i].title.replace(/\s/g, '').toLowerCase()
    // if the search keyword is a substring of the item title
    if (itemTitle.indexOf(searchKeyword) !== -1) {
      filteredJson.push(json[i])
    }
  }
  res.send(filteredJson)
})
////

app.listen(8081, () => {
    console.log('app listening on port 8081...')
})