const axios = require('axios')

const url = 'http://localhost:8081/api/orders/'

/**
 * This is the order service api.
 * ------------------------------
 * This component handles all the requests related to
 * the order history system. It can be used to retrieve
 * all the order records in the order history database,
 * as well as create a new record in the database.
 */

class OrderService {
  /**
   * make http GET request
   * get all records in 'orders' collection
   */
  static getOrder() {
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
   * create a new order record in 'orders' collection
   * @param order order info in json
   */
  static postOrder(order) {
    return axios.post(url, order)
  }
}

export default OrderService