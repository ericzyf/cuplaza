const axios = require('axios')

const url = 'http://localhost:8081/api/items/'

/**
 * This is the item service api.
 * -----------------------------
 * This component handles all the requests related to
 * the item management system. It can be used to
 * retrieve all the records in the item database,
 * create a new record, as well as delete a record in
 * the item database.
 */

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
   * create a new record in 'items' collection
   * @param item item info in json
   */
  static postItem(item) {
    return axios.post(url, item)
  }

  /**
   * make http DELETE request
   * delete a record in 'items' collection
   * @param id id of the item to be deleted
   */
  static deleteItem(id) {
    return axios.delete(`${url}${id}`)
  }
}

export default ItemService