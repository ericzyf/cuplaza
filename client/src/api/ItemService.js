const axios = require('axios')

const url = 'http://localhost:8081/api/items/'

class ItemService {
  /**
   * make http GET request
   * get all records in 'items' collection
   */
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

  /**
   * make http POST request
   * @param item item info in json
   */
  static postItem(item) {
    return axios.post(url, item)
  }

  /**
   * make http DELETE request
   * @param id id of the item to be deleted
   */
  static deleteItem(id) {
    return axios.delete(`${url}${id}`)
  }
}

export default ItemService