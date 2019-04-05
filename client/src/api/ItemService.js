const axios = require('axios')

const url = 'http://localhost:8081/api/items/'

class ItemService {
  static getItem() {
    return new Promise(async (resolve, reject) => {
      try {
        const res = await axios.get(url)
        resolve(res.data)
      } catch(err) {
        reject(err)
      }
    })
  }

  static postItem(item) {
    return axios.post(url, item)
  }

  static deleteItem(id) {
    return axios.delete(`${url}${id}`)
  }
}

export default ItemService